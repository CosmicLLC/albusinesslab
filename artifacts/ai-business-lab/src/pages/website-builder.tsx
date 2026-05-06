import { useEffect, useRef, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Download,
  RefreshCw,
} from "lucide-react"
import SkyScene from "@/components/builder/SkyScene"

/**
 * Website Builder — three-phase cinematic experience.
 *
 *   idle       Apple Spotlight–style landing. Blank canvas, glassmorphic input.
 *   ascending  Camera flies up through a Three.js cloud field while the
 *              /api/generate-website call runs in parallel.
 *   generating Camera holds above the clouds; sky is brand-blue. Continues
 *              until API responds.
 *   descending Camera descends back through the clouds.
 *   revealed   Generated site rendered in an iframe at ~95vw / 95vh.
 *   minimized  iframe shrinks into a macOS-style browser mockup floating on
 *              the original minimal background. Click frame to re-expand.
 *
 * The Three.js scene is lazy-loaded so visitors who don't kick off a
 * generation never pay the bundle cost.
 */

type Phase =
  | "idle"
  | "ascending"
  | "generating"
  | "descending"
  | "revealed"
  | "minimized"

const ASCENT_MS = 4200
const DESCENT_MS = 1400 // fast zoom-into-streets, then iframe reveal

export default function WebsiteBuilder() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [description, setDescription] = useState("")
  const [html, setHtml] = useState("")
  const [error, setError] = useState("")
  const apiResultRef = useRef<{ html?: string; error?: string } | null>(null)

  // Phase orchestration.
  useEffect(() => {
    if (phase === "ascending") {
      const t = setTimeout(() => {
        // If API is already done by the time ascent ends, go straight to descent.
        if (apiResultRef.current) decideAfterAscent(apiResultRef.current)
        else setPhase("generating")
      }, ASCENT_MS)
      return () => clearTimeout(t)
    }
    if (phase === "descending") {
      const t = setTimeout(() => setPhase("revealed"), DESCENT_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  // While in "generating" phase, react to API result as soon as it lands.
  useEffect(() => {
    if (phase !== "generating") return
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      if (apiResultRef.current) decideAfterAscent(apiResultRef.current)
      else setTimeout(tick, 120)
    }
    tick()
    return () => {
      cancelled = true
    }
  }, [phase])

  function decideAfterAscent(r: { html?: string; error?: string }) {
    if (r.html) {
      setHtml(r.html)
      setPhase("descending")
    } else {
      setError(r.error || "Generation failed. Please try again.")
      setPhase("idle")
    }
  }

  async function handleSubmit() {
    if (!description.trim() || phase !== "idle") return
    setError("")
    setHtml("")
    apiResultRef.current = null
    setPhase("ascending")

    try {
      const res = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim() }),
      })
      const text = await res.text()
      let data: any
      try {
        data = JSON.parse(text)
      } catch {
        apiResultRef.current = { error: "Server returned an invalid response." }
        return
      }
      if (!res.ok) {
        apiResultRef.current = { error: data.error || "Generation failed." }
      } else {
        apiResultRef.current = { html: data.html }
      }
    } catch (e: any) {
      apiResultRef.current = { error: e?.message || "Network error." }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSubmit()
  }

  /** Back to spotlight — keeps the prompt so the user can edit and resubmit. */
  function backToPrompt() {
    setPhase("idle")
    setHtml("")
    setError("")
    apiResultRef.current = null
  }

  /** Full reset — clears prompt + result. */
  function reset() {
    setPhase("idle")
    setDescription("")
    setHtml("")
    setError("")
    apiResultRef.current = null
  }

  /** Re-run generation with the same prompt — useful when the result is poor. */
  function regenerate() {
    setHtml("")
    setError("")
    apiResultRef.current = null
    void handleSubmit()
  }

  /** Trigger a download of the generated HTML as a standalone file. */
  function downloadHtml() {
    if (!html) return
    const blob = new Blob([html], { type: "text/html;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${slugify(description) || "generated-website"}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const showLanding = phase === "idle"
  const showScene =
    phase === "ascending" || phase === "generating" || phase === "descending"
  const showReveal = phase === "revealed" || phase === "minimized"
  const isTyping = description.length > 0

  return (
    <div className="fixed inset-x-0 top-20 bottom-0 z-[40] overflow-hidden bg-white text-[#111827]">
      {/* Sky gradient layered behind everything (Phase 1's "minimal background"). */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #eef2f7 100%)",
        }}
      />

      {/* Three.js cloud scene — only mounted during ascent/peak/descent. */}
      <AnimatePresence>
        {showScene && (
          <motion.div
            key="scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Suspense fallback={null}>
              <SkyScene phase={phase} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1 — Landing */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -120, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <motion.h1
              animate={{
                opacity: isTyping ? 0 : 1,
                scale: isTyping ? 1.06 : 1,
                filter: isTyping ? "blur(6px)" : "blur(0px)",
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 text-center font-light tracking-[-0.02em] text-[#1f2937]"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 4.25rem)",
                fontWeight: 200,
                letterSpacing: "-0.04em",
              }}
            >
              Let's create a website
            </motion.h1>

            <SpotlightInput
              value={description}
              onChange={setDescription}
              onKeyDown={handleKeyDown}
              onSubmit={handleSubmit}
              disabled={phase !== "idle"}
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#6B7280]/70">
              Press Enter to begin
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3 — Reveal (full) and Minimized (browser mockup) */}
      <AnimatePresence>
        {showReveal && (
          <RevealedSite
            key="revealed"
            html={html}
            prompt={description}
            minimized={phase === "minimized"}
            onMinimize={() => setPhase("minimized")}
            onMaximize={() => setPhase("revealed")}
            onBack={backToPrompt}
            onReset={reset}
            onRegenerate={regenerate}
            onDownload={downloadHtml}
          />
        )}
      </AnimatePresence>

      {/* Subtle "above the clouds" status text during generation phase */}
      <AnimatePresence>
        {phase === "generating" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
          >
            <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-white/80" />
            <p className="text-xs uppercase tracking-[0.22em] text-white/80">
              Composing your website
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Spotlight-style input ---------- */

function SpotlightInput({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onSubmit: () => void
  disabled?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[640px]"
    >
      <div
        className="flex items-center gap-3 rounded-[28px] border border-white/40 bg-white/55 px-5 py-3.5 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.18)] backdrop-blur-2xl transition-shadow"
        style={{
          boxShadow: focused
            ? "0 12px 50px -8px rgba(59,130,246,0.25), inset 0 0 0 1px rgba(59,130,246,0.4)"
            : undefined,
        }}
      >
        <SearchGlyph />
        <div className="relative flex-1">
          <input
            autoFocus
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Describe the website you want…"
            className="w-full bg-transparent text-base font-light text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none"
            style={{ caretColor: "#3B82F6" }}
          />
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-[0_6px_18px_-4px_rgba(59,130,246,0.55)] transition-all hover:scale-105 hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:bg-[#cbd5e1] disabled:shadow-none"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function SearchGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64748b"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

/* ---------- Revealed site (full + minimized) ---------- */

function RevealedSite({
  html,
  prompt,
  minimized,
  onMinimize,
  onMaximize,
  onBack,
  onReset,
  onRegenerate,
  onDownload,
}: {
  html: string
  prompt: string
  minimized: boolean
  onMinimize: () => void
  onMaximize: () => void
  /** Back to spotlight (keeps the prompt populated). */
  onBack: () => void
  /** Full reset — clears prompt + state. */
  onReset: () => void
  onRegenerate: () => void
  onDownload: () => void
}) {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<number | null>(null)

  async function handleCopy() {
    if (!html) return
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be unavailable in iframes — silently fail */
    }
  }

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
    },
    [],
  )

  // Keyboard shortcuts when revealed.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (minimized) return
      if (e.key === "Escape") onBack()
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && e.shiftKey) {
        e.preventDefault()
        handleCopy()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minimized, onBack])

  return (
    <motion.div
      key="revealed-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex items-center justify-center px-6 py-6"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 130, damping: 24 }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          width: minimized ? "min(560px, 92vw)" : "min(1400px, 96vw)",
          height: minimized ? "min(380px, 70vh)" : "min(900px, 92vh)",
        }}
        className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_36px_90px_-22px_rgba(15,23,42,0.42)] ring-1 ring-black/[0.06]"
        onClick={minimized ? onMaximize : undefined}
        style={{ cursor: minimized ? "pointer" : "default" }}
      >
        <BrowserChrome
          minimized={minimized}
          prompt={prompt}
          copied={copied}
          onCopy={handleCopy}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onBack={onBack}
          onReset={onReset}
          onRegenerate={onRegenerate}
          onDownload={onDownload}
        />

        <iframe
          srcDoc={html}
          title="Generated website preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full flex-1 border-0 bg-white"
          style={{ pointerEvents: minimized ? "none" : "auto" }}
        />

        {minimized && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center"
          >
            <span className="rounded-full bg-black/65 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/95 backdrop-blur">
              Click to expand
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------- Browser chrome ---------- */

function BrowserChrome({
  minimized,
  prompt,
  copied,
  onCopy,
  onMinimize,
  onMaximize,
  onBack,
  onReset,
  onRegenerate,
  onDownload,
}: {
  minimized: boolean
  prompt: string
  copied: boolean
  onCopy: () => void
  onMinimize: () => void
  onMaximize: () => void
  onBack: () => void
  onReset: () => void
  onRegenerate: () => void
  onDownload: () => void
}) {
  // Build a fake URL string from the prompt so the address bar feels real.
  const slug = slugify(prompt) || "generated-site"
  const url = `preview.aibizlab.org/${slug}`

  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-[#e8ecf2] bg-gradient-to-b from-[#fbfcfe] to-[#f1f4f9] px-4 py-2.5">
      {/* Traffic-light dots — purely decorative. */}
      <div className="flex items-center gap-1.5">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57] ring-1 ring-black/5" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e] ring-1 ring-black/5" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840] ring-1 ring-black/5" />
      </div>

      {/* URL bar — shows the user's prompt as a fake URL. */}
      <div className="mx-1 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5 ring-1 ring-[#e2e8f0]">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#3B82F6]" aria-hidden />
        <span className="truncate text-[13px] text-[#475569]">{url}</span>
      </div>

      {/* Action buttons — only visible when not minimized; minimized state has
          a single expand button + click-to-expand hint at bottom. */}
      {!minimized ? (
        <div className="flex shrink-0 items-center gap-1">
          <ChromeButton
            label={copied ? "Copied" : "Copy HTML"}
            icon={copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onCopy()
            }}
          />
          <ChromeButton
            label="Download"
            icon={<Download className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onDownload()
            }}
          />
          <ChromeButton
            label="Regenerate"
            icon={<RefreshCw className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onRegenerate()
            }}
          />
          <div className="mx-1 h-5 w-px bg-[#e2e8f0]" aria-hidden />
          <ChromeButton
            label="Minimize"
            iconOnly
            icon={<Minimize2 className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          />
          <ChromeButton
            label="New website"
            icon={<ArrowLeft className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onBack()
            }}
          />
          <ChromeButton
            label="Clear"
            iconOnly
            title="Clear prompt and start over"
            icon={<span aria-hidden className="text-base leading-none">×</span>}
            onClick={(e) => {
              e.stopPropagation()
              onReset()
            }}
          />
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-1">
          <ChromeButton
            label="Expand"
            iconOnly
            icon={<Maximize2 className="h-3.5 w-3.5" />}
            onClick={(e) => {
              e.stopPropagation()
              onMaximize()
            }}
          />
          <ChromeButton
            label="Close"
            iconOnly
            icon={<span aria-hidden className="text-base leading-none">×</span>}
            onClick={(e) => {
              e.stopPropagation()
              onReset()
            }}
          />
        </div>
      )}
    </div>
  )
}

function ChromeButton({
  icon,
  label,
  iconOnly,
  title,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  iconOnly?: boolean
  title?: string
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || label}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] font-medium text-[#475569] transition hover:bg-black/5 hover:text-[#0f172a] active:bg-black/10"
    >
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center">{icon}</span>
      {!iconOnly && <span>{label}</span>}
    </button>
  )
}

/* ---------- helpers ---------- */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
}
