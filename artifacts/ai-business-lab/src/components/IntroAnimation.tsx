import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "aibl_intro_seen_v1";
const TOTAL_DURATION_MS = 3200;
const FADE_MS = 600;

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

// Mirrors the original animation-range values (% of total intro time).
const CELL_RANGES: Array<[number, number]> = [
  [40, 50], [20, 30], [52, 62], [50, 60],
  [45, 55], [10, 20], [90, 100], [30, 40],
  [80, 90], [70, 80],
  [-10, 50],
  [52, 62], [15, 25], [7, 17], [75, 85],
  [3, 13], [87, 97], [42, 52], [57, 67],
  [37, 47], [12, 22], [8, 18], [84, 94],
  [33, 43], [48, 58], [13, 23], [78, 88],
  [62, 72], [31, 41], [8, 18], [4, 14],
  [74, 84], [61, 71], [26, 36], [63, 73],
  [11, 21], [89, 99], [33, 43], [88, 98],
  [22, 32], [16, 26], [26, 36], [66, 76],
  [3, 13], [44, 54], [11, 21], [23, 33],
  [39, 49], [59, 69], [6, 16],
];

// Mirrors the per-cell grid-area assignments. Indices that share a cell
// produce overlapping zoom layers — that's the depth effect.
const CELL_GRID: Array<[number, number]> = [
  [1,1],[1,2],[1,3],[1,4],
  [2,1],[2,2],[2,3],[2,4],
  [3,1],[3,2],
  [2,2],
  [3,4],[4,1],[4,2],[4,3],
  [4,4],[2,1],[2,2],[2,3],[2,4],
  [3,1],[3,2],[3,3],[3,4],[1,1],
  [1,2],[1,3],[1,4],[4,1],[4,2],
  [4,3],[4,4],[2,1],[2,2],[2,3],
  [2,4],[3,1],[3,2],[3,3],[3,4],
  [1,1],[1,2],[1,3],[1,4],[4,1],
  [4,2],[4,3],[4,4],[3,1],[3,2],
];

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"playing" | "fading">("playing");
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), TOTAL_DURATION_MS);
    const doneTimer = setTimeout(
      () => onDoneRef.current(),
      TOTAL_DURATION_MS + FADE_MS,
    );
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
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
        transition: `opacity ${FADE_MS}ms ease-out`,
        pointerEvents: phase === "fading" ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      <div className="aibl-intro-glow aibl-intro-glow--center" aria-hidden />
      <div className="aibl-intro-glow aibl-intro-glow--bottom" aria-hidden />
      <div className="aibl-intro-grid">
        {WORDS.map((word, i) => {
          const [start, end] = CELL_RANGES[i];
          const delayMs = (start / 100) * TOTAL_DURATION_MS;
          const durationMs = ((end - start) / 100) * TOTAL_DURATION_MS;
          const [row, col] = CELL_GRID[i];
          const isSpecial = i === SPECIAL_INDEX;
          return (
            <div
              key={i}
              className={
                isSpecial
                  ? "aibl-intro-cell aibl-intro-cell--special"
                  : "aibl-intro-cell"
              }
              style={{
                gridRow: isSpecial ? `${row} / span 2` : row,
                gridColumn: isSpecial ? `${col} / span 2` : col,
                animationDelay: `${delayMs}ms`,
                animationDuration: `${durationMs}ms`,
              }}
            >
              {isSpecial ? <b>{word}</b> : word}
            </div>
          );
        })}
      </div>

      <style>{INTRO_CSS}</style>
    </div>
  );
}

const INTRO_CSS = `
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
  position: absolute;
  inset: 0;
  perspective: 1000px;
  transform-style: preserve-3d;
  display: grid;
  grid-template-rows: repeat(4, 25dvh);
  grid-template-columns: repeat(4, 25dvw);
  place-items: center;
  overflow: clip;
  color: #f5f5f7;
  font-family: 'Inter', system-ui, sans-serif;
  z-index: 1;
}

.aibl-intro-cell {
  transform-style: preserve-3d;
  font-size: 5vmin;
  font-weight: 300;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.70);
  animation-name: aibl-zoom-in;
  animation-timing-function: linear;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  will-change: transform, opacity, filter;
}

@media (prefers-reduced-motion: reduce) {
  .aibl-intro-cell {
    animation: none;
  }
}

.aibl-intro-cell > b {
  font-size: clamp(1.5rem, 7vmin, 6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, #ffffff 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
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

    if (seen || reduced) {
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
