import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "aibl_intro_seen_v1";

const WORDS = [
  "LLM", "RAG", "Agents", "Evals",
  "Fine-tune", "RLHF", "Inference", "Embeddings",
  "Tokens", "Context",
  "AIBIZLAB.ORG",
  "Prompts", "MCP", "Tool-use", "Vector",
  "Transformer", "Attention", "Distillation", "Quantization",
  "MoE", "Multi-modal", "Reasoning", "CoT",
  "Functions", "Retrieval", "Streaming", "Caching",
  "Guardrails", "Observability", "Grounding",
  "Workflow", "Pipeline", "Orchestration", "Memory",
  "Reflection", "Planning", "Routing", "Skills",
  "Sandbox", "Latency", "Throughput", "Cost",
  "Compliance", "Security", "ROI", "Strategy",
  "Adoption", "Roadmap", "Capability", "Transformation",
] as const;

const SPECIAL_INDEX = 10;

function smoothScroll(el: HTMLElement, durationMs: number) {
  return new Promise<void>((resolve) => {
    const target = el.scrollHeight - el.clientHeight;
    const start = el.scrollTop;
    const distance = target - start;
    if (distance <= 0) {
      resolve();
      return;
    }
    const startTime = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / durationMs, 1);
      el.scrollTop = start + distance * ease(t);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  const [phase, setPhase] = useState<"playing" | "fading">("playing");

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let cancelled = false;
    (async () => {
      await new Promise((r) => setTimeout(r, 80));
      if (cancelled) return;
      await smoothScroll(el, 3200);
      if (cancelled) return;
      setPhase("fading");
      setTimeout(() => {
        if (!cancelled) onDoneRef.current();
      }, 600);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      data-intro
      data-phase={phase}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#070E1C",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 600ms ease-out",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      <div className="aibl-intro-glow aibl-intro-glow--center" aria-hidden />
      <div className="aibl-intro-glow aibl-intro-glow--bottom" aria-hidden />
      <div
        ref={scrollerRef}
        className="aibl-intro-scroller"
        style={{
          height: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ minHeight: "400vh", position: "relative" }}>
          <div className="aibl-intro-grid">
            {WORDS.map((word, i) => (
              <div
                key={i}
                className={
                  i === SPECIAL_INDEX
                    ? "aibl-intro-cell aibl-intro-cell--special"
                    : "aibl-intro-cell"
                }
              >
                {i === SPECIAL_INDEX ? <b>{word}</b> : word}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{INTRO_CSS}</style>
    </div>
  );
}

const INTRO_CSS = `
.aibl-intro-scroller::-webkit-scrollbar { display: none; }

.aibl-intro-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 9999px;
  z-index: 0;
}
.aibl-intro-glow--center {
  left: 50%;
  top: 50%;
  width: 900px;
  height: 600px;
  max-width: 95vw;
  transform: translate(-50%, -50%);
  background: rgba(30, 58, 138, 0.30);
  filter: blur(120px);
}
.aibl-intro-glow--bottom {
  left: 50%;
  bottom: 0;
  width: 600px;
  height: 400px;
  max-width: 80vw;
  transform: translate(-50%, 33%);
  background: rgba(59, 130, 246, 0.10);
  filter: blur(100px);
}

@keyframes aibl-zoom-in {
  0%   { transform: translateZ(-1000px); opacity: 0; filter: blur(5px); }
  50%  { transform: translateZ(0px);     opacity: 1; filter: blur(0px); }
  100% { transform: translateZ(1000px);  opacity: 0; filter: blur(5px); }
}

.aibl-intro-grid {
  block-size: 100svh;
  perspective: 1000px;
  transform-style: preserve-3d;

  display: grid;
  grid-template-rows: repeat(4, 25dvh);
  grid-template-columns: repeat(4, 25dvw);
  place-items: center;

  position: sticky;
  top: 0;

  overflow: clip;

  color: #f5f5f7;
  font-family: 'Inter', system-ui, sans-serif;
}

.aibl-intro-cell {
  transform-style: preserve-3d;
  font-size: 5vmin;
  font-weight: 300;
  letter-spacing: -0.01em;
  text-wrap: nowrap;
  color: rgba(255, 255, 255, 0.70);
}

.aibl-intro-cell > b {
  font-size: clamp(2rem, 7vmin, 6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #ffffff 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
}

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .aibl-intro-cell {
      animation: aibl-zoom-in linear both;
      animation-timeline: scroll(nearest block);
      will-change: transform, opacity, filter;
    }
  }

  .aibl-intro-cell.aibl-intro-cell--special {
    grid-row: 2 / span 2;
    grid-column: 2 / span 2;
  }

  .aibl-intro-cell:nth-of-type(1)  { grid-area: 1/1; animation-range: 40% 50%; }
  .aibl-intro-cell:nth-of-type(2)  { grid-area: 1/2; animation-range: 20% 30%; }
  .aibl-intro-cell:nth-of-type(3)  { grid-area: 1/3; animation-range: 52% 62%; }
  .aibl-intro-cell:nth-of-type(4)  { grid-area: 1/4; animation-range: 50% 60%; }
  .aibl-intro-cell:nth-of-type(5)  { grid-area: 2/1; animation-range: 45% 55%; }
  .aibl-intro-cell:nth-of-type(6)  { grid-area: 2/2; animation-range: 10% 20%; }
  .aibl-intro-cell:nth-of-type(7)  { grid-area: 2/3; animation-range: 90% 100%; }
  .aibl-intro-cell:nth-of-type(8)  { grid-area: 2/4; animation-range: 30% 40%; }
  .aibl-intro-cell:nth-of-type(9)  { grid-area: 3/1; animation-range: 80% 90%; }
  .aibl-intro-cell:nth-of-type(10) { grid-area: 3/2; animation-range: 70% 80%; }
  .aibl-intro-cell:nth-of-type(11) { animation-range: -10% 50%; }
  .aibl-intro-cell:nth-of-type(12) { grid-area: 3/4; animation-range: 52% 62%; }
  .aibl-intro-cell:nth-of-type(13) { grid-area: 4/1; animation-range: 15% 25%; }
  .aibl-intro-cell:nth-of-type(14) { grid-area: 4/2; animation-range: 7% 17%; }
  .aibl-intro-cell:nth-of-type(15) { grid-area: 4/3; animation-range: 75% 85%; }
  .aibl-intro-cell:nth-of-type(16) { grid-area: 4/4; animation-range: 3% 13%; }
  .aibl-intro-cell:nth-of-type(17) { grid-area: 2/1; animation-range: 87% 97%; }
  .aibl-intro-cell:nth-of-type(18) { grid-area: 2/2; animation-range: 42% 52%; }
  .aibl-intro-cell:nth-of-type(19) { grid-area: 2/3; animation-range: 57% 67%; }
  .aibl-intro-cell:nth-of-type(20) { grid-area: 2/4; animation-range: 37% 47%; }
  .aibl-intro-cell:nth-of-type(21) { grid-area: 3/1; animation-range: 12% 22%; }
  .aibl-intro-cell:nth-of-type(22) { grid-area: 3/2; animation-range: 8% 18%; }
  .aibl-intro-cell:nth-of-type(23) { grid-area: 3/3; animation-range: 84% 94%; }
  .aibl-intro-cell:nth-of-type(24) { grid-area: 3/4; animation-range: 33% 43%; }
  .aibl-intro-cell:nth-of-type(25) { grid-area: 1/1; animation-range: 48% 58%; }
  .aibl-intro-cell:nth-of-type(26) { grid-area: 1/2; animation-range: 13% 23%; }
  .aibl-intro-cell:nth-of-type(27) { grid-area: 1/3; animation-range: 78% 88%; }
  .aibl-intro-cell:nth-of-type(28) { grid-area: 1/4; animation-range: 62% 72%; }
  .aibl-intro-cell:nth-of-type(29) { grid-area: 4/1; animation-range: 31% 41%; }
  .aibl-intro-cell:nth-of-type(30) { grid-area: 4/2; animation-range: 8% 18%; }
  .aibl-intro-cell:nth-of-type(31) { grid-area: 4/3; animation-range: 4% 14%; }
  .aibl-intro-cell:nth-of-type(32) { grid-area: 4/4; animation-range: 74% 84%; }
  .aibl-intro-cell:nth-of-type(33) { grid-area: 2/1; animation-range: 61% 71%; }
  .aibl-intro-cell:nth-of-type(34) { grid-area: 2/2; animation-range: 26% 36%; }
  .aibl-intro-cell:nth-of-type(35) { grid-area: 2/3; animation-range: 63% 73%; }
  .aibl-intro-cell:nth-of-type(36) { grid-area: 2/4; animation-range: 11% 21%; }
  .aibl-intro-cell:nth-of-type(37) { grid-area: 3/1; animation-range: 89% 99%; }
  .aibl-intro-cell:nth-of-type(38) { grid-area: 3/2; animation-range: 33% 43%; }
  .aibl-intro-cell:nth-of-type(39) { grid-area: 3/3; animation-range: 88% 98%; }
  .aibl-intro-cell:nth-of-type(40) { grid-area: 3/4; animation-range: 22% 32%; }
  .aibl-intro-cell:nth-of-type(41) { grid-area: 1/1; animation-range: 16% 26%; }
  .aibl-intro-cell:nth-of-type(42) { grid-area: 1/2; animation-range: 26% 36%; }
  .aibl-intro-cell:nth-of-type(43) { grid-area: 1/3; animation-range: 66% 76%; }
  .aibl-intro-cell:nth-of-type(44) { grid-area: 1/4; animation-range: 3% 13%; }
  .aibl-intro-cell:nth-of-type(45) { grid-area: 4/1; animation-range: 44% 54%; }
  .aibl-intro-cell:nth-of-type(46) { grid-area: 4/2; animation-range: 11% 21%; }
  .aibl-intro-cell:nth-of-type(47) { grid-area: 4/3; animation-range: 23% 33%; }
  .aibl-intro-cell:nth-of-type(48) { grid-area: 4/4; animation-range: 39% 49%; }
  .aibl-intro-cell:nth-of-type(49) { grid-area: 3/1; animation-range: 59% 69%; }
  .aibl-intro-cell:nth-of-type(50) { grid-area: 3/2; animation-range: 6% 16%; }
}
`;

export function IntroGate({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      setShowIntro(false);
      return;
    }

    const seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supported =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: scroll()");

    if (seen || reduced || !supported) {
      setShowIntro(false);
      window.localStorage.setItem(STORAGE_KEY, "1");
    } else {
      setShowIntro(true);
    }
  }, []);

  const handleDone = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setShowIntro(false);
  }, []);

  if (showIntro === null) return null;

  return (
    <>
      {children}
      {showIntro && <IntroAnimation onDone={handleDone} />}
    </>
  );
}
