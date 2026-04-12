import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { ArrowRight, Loader2, Copy, Check, RotateCcw, Monitor, Smartphone } from "lucide-react"
import { useState, useRef } from "react"

export default function WebsiteBuilder() {
  const [description, setDescription] = useState("")
  const [html, setHtml] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  async function handleGenerate() {
    if (!description.trim() || loading) return
    setLoading(true)
    setError("")
    setHtml("")

    try {
      const res = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setHtml(data.html)
    } catch (err: any) {
      setError(err.message || "Failed to generate website")
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!html) return
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    setDescription("")
    setHtml("")
    setError("")
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#070E1C] -mt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[#1E3A8A]/30 blur-[120px]" />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 w-[600px] h-[400px] rounded-full bg-[#3B82F6]/10 blur-[100px]" />
        </div>

        <Container className="relative z-10 pt-28 pb-10 md:pt-36 md:pb-14">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-4"
            >
              AI Website <span className="text-[#3B82F6]">Generator</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed max-w-2xl"
            >
              Describe the website you want and we'll generate a fully designed sample in seconds.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── Builder Tool ── */}
      <Section className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Input panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div>
                <label
                  htmlFor="website-description"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Describe your website
                </label>
                <textarea
                  id="website-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. A modern landing page for a dental clinic in Austin, TX. Should have a hero section with booking CTA, services grid, patient testimonials, and a contact form. Use calming blue and white colors."
                  className="w-full h-48 px-4 py-3 rounded-lg border border-border bg-white text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Be specific: mention your industry, colors, sections, and any features you want.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!description.trim() || loading}
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white border-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Website
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                {html && (
                  <>
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 text-base border-border"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 w-4 h-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 w-4 h-4" />
                          Copy HTML
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="lg"
                      className="h-12 px-6 text-base border-border"
                    >
                      <RotateCcw className="mr-2 w-4 h-4" />
                      Start Over
                    </Button>
                  </>
                )}
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
            </motion.div>

            {/* Right: Preview panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Preview toolbar */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Preview</p>
                {html && (
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode("desktop")}
                      className={`p-1.5 rounded-md transition-colors ${previewMode === "desktop" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode("mobile")}
                      className={`p-1.5 rounded-md transition-colors ${previewMode === "mobile" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Preview area */}
              <div className="relative flex-1 min-h-[500px] rounded-lg border border-border bg-muted/30 overflow-hidden flex items-center justify-center">
                {loading && (
                  <div className="flex flex-col items-center gap-4 text-center p-8">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <div>
                      <p className="text-foreground font-semibold mb-1">Generating your website...</p>
                      <p className="text-muted-foreground text-sm">This usually takes 10–20 seconds</p>
                    </div>
                  </div>
                )}

                {!loading && !html && !error && (
                  <div className="flex flex-col items-center gap-3 text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Monitor className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-semibold">Your preview will appear here</p>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Describe the website you want on the left and click Generate
                    </p>
                  </div>
                )}

                {!loading && html && (
                  <div
                    className="w-full h-full flex justify-center bg-[#e5e7eb] p-2"
                    style={{ minHeight: 500 }}
                  >
                    <iframe
                      ref={iframeRef}
                      srcDoc={html}
                      title="Generated website preview"
                      sandbox="allow-scripts"
                      className="bg-white shadow-lg rounded transition-all duration-300"
                      style={{
                        width: previewMode === "mobile" ? 375 : "100%",
                        height: "100%",
                        minHeight: 500,
                        border: "none",
                      }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

    </div>
  )
}
