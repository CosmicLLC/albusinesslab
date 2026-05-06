import { useEffect, useRef, useState } from "react"

type Phase =
  | "idle"
  | "ascending"
  | "generating"
  | "descending"
  | "revealed"
  | "minimized"

const ASCENT_S = 4.2
const DESCENT_S = 1.4 // fast dive into the streets
const VIDEO_SRC =
  (import.meta.env.BASE_URL || "/").replace(/\/$/, "") + "/builder/clouds.mp4"

/**
 * Loading scene — uses an MP4 cloudscape ("up in the clouds") as the live
 * background while Gemini generates the page.
 *
 * Smoothness:
 *   - Two <video> elements alternate. While one plays, the other is queued
 *     just past the loop start. We crossfade between them in the last
 *     LOOP_OVERLAP_S seconds → no visible cut at the loop boundary.
 *
 * Atmosphere:
 *   - Soft drifting cloud-wisp overlays painted on top of the video. They
 *     give the frame more parallax depth and reinforce the "still flying" feel.
 *
 * Phases:
 *   ascending   slow zoom-in (1.00 → 1.08), fade in
 *   generating  continuous slow zoom; "Loading" indicator pulses bottom-right
 *   descending  fast zoom (current → 3.6x) over DESCENT_S, then fade out
 */
export default function SkyScene({ phase }: { phase: Phase }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale, setScale] = useState(1.0)
  const [containerOpacity, setContainerOpacity] = useState(0)
  // Video opacity is separate — it fades in AFTER the cloud-puff transition,
  // so the user sees clouds first, then the video reveals "above the clouds".
  const [videoOpacity, setVideoOpacity] = useState(0)
  // Sky background gradient phase — from light/white (Phase 1 bg) toward dark.
  const [skyBlend, setSkyBlend] = useState(0)
  const phaseStartRef = useRef(performance.now())
  const lastPhaseRef = useRef<Phase>(phase)
  const startScaleRef = useRef(1.0)

  useEffect(() => {
    if (lastPhaseRef.current !== phase) {
      phaseStartRef.current = performance.now()
      startScaleRef.current = scale
      lastPhaseRef.current = phase
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Animation loop.
  useEffect(() => {
    let raf = 0
    let cancelled = false
    function frame() {
      if (cancelled) return
      const elapsed = (performance.now() - phaseStartRef.current) / 1000
      const startScale = startScaleRef.current

      let nextScale = scale
      let nextContainer = containerOpacity
      let nextVideo = videoOpacity
      let nextSky = skyBlend

      if (phase === "ascending") {
        const k = Math.min(elapsed / ASCENT_S, 1)
        const eased = easeOutCubic(k)
        nextScale = lerp(startScale, 1.08, eased)
        // Container fades in fast so clouds appear immediately.
        nextContainer = Math.min(k * 2.4, 1)
        // Video lags — only starts revealing at 40% through ascent, fully at end.
        nextVideo = Math.max(0, Math.min((k - 0.40) / 0.60, 1))
        // Sky transitions from light (Phase 1 white) to dark (video bg) over ascent.
        nextSky = eased
      } else if (phase === "generating") {
        nextScale = Math.min(1.08 + elapsed * 0.012, 1.35)
        nextContainer = 1
        nextVideo = 1
        nextSky = 1
      } else if (phase === "descending") {
        const k = Math.min(elapsed / DESCENT_S, 1)
        const eased = easeInQuart(k)
        nextScale = lerp(startScale, 3.6, eased)
        nextContainer = 1 - Math.max(0, (k - 0.65) / 0.35)
        nextVideo = 1 - Math.max(0, (k - 0.55) / 0.45)
        nextSky = 1
      } else {
        nextContainer = 0
        nextVideo = 0
      }

      if (Math.abs(nextScale - scale) > 0.0005) setScale(nextScale)
      if (Math.abs(nextContainer - containerOpacity) > 0.005) setContainerOpacity(nextContainer)
      if (Math.abs(nextVideo - videoOpacity) > 0.005) setVideoOpacity(nextVideo)
      if (Math.abs(nextSky - skyBlend) > 0.005) setSkyBlend(nextSky)

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Ping-pong looping: play forward to the end, then play backward to the
  // start, then forward again — eliminates the hard cut at the loop boundary.
  // We use native playback at speed 1 in the forward direction; in the reverse
  // direction we drive currentTime ourselves with rAF (browsers don't reliably
  // honour negative playbackRate on <video>).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    let direction: 1 | -1 = 1
    let raf = 0
    let lastFrameTime = performance.now()
    let cancelled = false

    v.muted = true
    v.playsInline = true
    v.loop = false
    v.playbackRate = 0.5

    const tryPlay = () => v.play().catch(() => {})
    tryPlay()
    v.addEventListener("loadedmetadata", tryPlay)
    v.addEventListener("canplay", tryPlay)

    function step() {
      if (cancelled) return
      const now = performance.now()
      const dt = (now - lastFrameTime) / 1000
      lastFrameTime = now
      const dur = v!.duration
      if (Number.isFinite(dur) && dur > 0) {
        if (direction === 1) {
          // Forward — let native playback drive. Switch to reverse just before
          // the very end so we never hit the visible loop seam.
          if (v!.currentTime >= dur - 0.08) {
            direction = -1
            v!.pause()
            v!.currentTime = Math.max(0, dur - 0.08)
          }
        } else {
          // Reverse — keep video paused, advance currentTime backwards by hand.
          // Match the forward playbackRate (0.5) so both directions feel equal.
          if (v!.paused === false) v!.pause()
          const next = v!.currentTime - dt * 0.5
          if (next <= 0.05) {
            v!.currentTime = 0
            direction = 1
            tryPlay()
          } else {
            v!.currentTime = next
          }
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      v.removeEventListener("loadedmetadata", tryPlay)
      v.removeEventListener("canplay", tryPlay)
    }
  }, [])

  // Sky background gradient: starts as light Phase-1 white, transitions to
  // dark cloud-night through `skyBlend`. Mixing to a slightly tinted blue
  // mid-tone gives a brief "atmospheric haze" feel as we ascend.
  const skyBg = (() => {
    // Three-stop gradient that morphs with skyBlend (0 → 1).
    const top = lerpColor([248, 251, 255], [12, 22, 56], skyBlend) // sky top
    const mid = lerpColor([225, 232, 245], [8, 14, 36], skyBlend)
    const bot = lerpColor([200, 215, 240], [3, 6, 22], skyBlend)
    return `linear-gradient(180deg, rgb(${top}) 0%, rgb(${mid}) 55%, rgb(${bot}) 100%)`
  })()

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: skyBg,
        opacity: containerOpacity,
        transition: "opacity 0.3s linear",
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // Always opacity 1 so the browser doesn't skip preload. Cloud puffs
          // stacked on top hide the video during the transition.
          opacity: 1,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      {/* Cloud-cover transition layer — sits ON TOP of the video. Fully opaque
          at the start of ascent (camera below the cloud line, video hidden);
          fades and breaks apart as we "rise above" the clouds, revealing the
          cityscape below; reappears during descent. */}
      <CloudPuffs phase={phase} skyBlend={skyBlend} />

      {/* Drifting cloud-wisp overlays for parallax depth, on top of everything. */}
      <CloudWisps phase={phase} />

      {/* Soft radial vignette so edges blend into the page background. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(6,9,26,0.55) 100%)",
        }}
      />

      {/* GTA-style "Loading" indicator, bottom-right. Only visible while a
          generation is actually in progress. */}
      {(phase === "ascending" ||
        phase === "generating" ||
        phase === "descending") && <LoadingChip />}
    </div>
  )
}

/* ===================================================================== *
 *  Big puffy "rising-through-clouds" transition layer.
 *  Five large soft white blobs that animate from below the viewport up
 *  through it, scaling up as they pass — like cloud cover passing the camera
 *  as we ascend. Most prominent during ASCENDING and DESCENDING; muted
 *  during GENERATING (we're "above" them).
 * ===================================================================== */

function CloudPuffs({ phase, skyBlend }: { phase: Phase; skyBlend: number }) {
  // Layer opacity: opaque cloud cover at the start of ascent, dissolving as
  // we "rise above" the cloud line, almost invisible during generating, and
  // reappearing during the dive. Use ease-in falloff so the sky breaks open
  // late in the ascent rather than gradually washing out.
  const layerOpacity =
    phase === "ascending"
      ? Math.max(0, 1 - Math.pow(skyBlend, 1.4) * 1.0) // 1 → 0 as ascent completes
      : phase === "generating"
        ? 0.10
        : phase === "descending"
          ? 0.85
          : 0
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: layerOpacity,
        transition: "opacity 0.5s ease-out",
        // Soft solid pale fill underneath the puffs so they read as a unified
        // cloud bank rather than scattered blobs. Pale at top → pale-blue at
        // bottom (more atmospheric scatter where the sun is below).
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(238,245,255,0.78) 50%, rgba(215,228,252,0.72) 100%)",
      }}
    >
      {/* Puffy blobs that drift slowly across the cloud bank. */}
      {PUFFS.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}vw`,
            height: `${p.size * 0.7}vw`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at 45% 40%, rgba(255,255,255,${p.alpha}) 0%, rgba(245,250,255,${p.alpha * 0.7}) 30%, rgba(225,235,250,${p.alpha * 0.35}) 55%, rgba(200,215,240,0) 75%)`,
            filter: `blur(${p.blur}px)`,
            animation: `cloud-puff-${i} ${p.duration}s ease-in-out infinite`,
            mixBlendMode: "screen",
          }}
        />
      ))}
      <style>{PUFF_KEYFRAMES}</style>
    </div>
  )
}

interface Puff {
  x: number
  y: number
  size: number
  alpha: number
  blur: number
  duration: number
}

const PUFFS: Puff[] = [
  { x: -10, y: 60, size: 70, alpha: 0.85, blur: 24, duration: 24 },
  { x:  35, y: 70, size: 85, alpha: 0.75, blur: 30, duration: 28 },
  { x:  60, y: 35, size: 75, alpha: 0.70, blur: 26, duration: 22 },
  { x:   5, y: 20, size: 60, alpha: 0.60, blur: 22, duration: 26 },
  { x:  70, y: 80, size: 65, alpha: 0.65, blur: 20, duration: 30 },
]

const PUFF_KEYFRAMES = PUFFS.map((p, i) => `
@keyframes cloud-puff-${i} {
  0%   { transform: translate(0, ${p.y < 50 ? "-6vh" : "6vh"}) scale(1.0); }
  50%  { transform: translate(${i % 2 === 0 ? "5vw" : "-5vw"}, 0) scale(1.08); }
  100% { transform: translate(0, ${p.y < 50 ? "-6vh" : "6vh"}) scale(1.0); }
}`).join("\n")


/* ===================================================================== *
 *  Drifting cloud-wisp overlays. Pure CSS — six radial-gradient blobs at
 *  different speeds and altitudes, drifting horizontally at a steady rate.
 * ===================================================================== */

function CloudWisps({ phase }: { phase: Phase }) {
  const visible = phase !== "idle" && phase !== "revealed" && phase !== "minimized"
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s linear",
        mixBlendMode: "screen",
      }}
    >
      {WISPS.map((w, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${w.startX}%`,
            top: `${w.y}%`,
            width: `${w.size}vw`,
            height: `${w.size * 0.55}vw`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, rgba(255,255,255,${w.alpha}) 0%, rgba(220,235,255,${w.alpha * 0.5}) 35%, rgba(180,205,250,0) 70%)`,
            filter: `blur(${w.blur}px)`,
            animation: `cloud-drift-${i} ${w.duration}s linear infinite`,
          }}
        />
      ))}
      <style>{WISP_KEYFRAMES}</style>
    </div>
  )
}

interface Wisp {
  startX: number // % from left
  y: number // % from top
  size: number // vw
  alpha: number
  blur: number
  duration: number // seconds for one full pass
}

const WISPS: Wisp[] = [
  { startX: -25, y:  6, size: 50, alpha: 0.18, blur: 18, duration: 60 },
  { startX:  20, y: 22, size: 65, alpha: 0.14, blur: 24, duration: 85 },
  { startX:  60, y: 48, size: 70, alpha: 0.16, blur: 28, duration: 95 },
  { startX: -10, y: 70, size: 55, alpha: 0.12, blur: 22, duration: 75 },
  { startX:  35, y: 84, size: 60, alpha: 0.15, blur: 20, duration: 70 },
  { startX:  80, y: 30, size: 45, alpha: 0.10, blur: 16, duration: 55 },
]

const WISP_KEYFRAMES = WISPS.map(
  (_, i) => `
@keyframes cloud-drift-${i} {
  from { transform: translateX(0vw); }
  to   { transform: translateX(160vw); }
}`,
).join("\n")

/* ===================================================================== *
 *  GTA-style "Loading" chip — bottom right, subtle white text + spinner.
 * ===================================================================== */

function LoadingChip() {
  return (
    <div
      style={{
        position: "absolute",
        right: 24,
        bottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(12px)",
        borderRadius: 6,
        border: "1px solid rgba(255, 255, 255, 0.10)",
        color: "rgba(255, 255, 255, 0.92)",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        zIndex: 5,
        pointerEvents: "none",
        animation: "loading-chip-fade 0.6s ease-out",
      }}
    >
      <Spinner />
      <span>Loading</span>
      <style>{`
        @keyframes loading-chip-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .skyloader-dot { animation: loading-pulse 1.4s ease-in-out infinite; }
        @keyframes loading-pulse {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "loading-spin 1.1s linear infinite" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="rgba(255, 255, 255, 0.95)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ===================================================================== *
 *  Helpers
 * ===================================================================== */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function lerpColor(a: number[], b: number[], t: number): string {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ].join(",")
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}
function easeInQuart(t: number) {
  return t * t * t * t
}
