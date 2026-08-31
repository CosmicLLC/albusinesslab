import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// Every route is prerendered to static HTML at build time (scripts/prerender.mjs),
// so in production we attach to that markup instead of throwing it away and
// re-rendering. createRoot is the fallback for `vite dev`, where the container
// really is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />, {
    // Surface hydration mismatches while developing. Silent in production —
    // and note that `vite preview` cannot be trusted to reproduce them, since
    // its SPA fallback serves the homepage shell for every prerendered path.
    // Use `node scripts/serve-static.mjs` instead.
    onRecoverableError: import.meta.env.DEV
      ? (error, errorInfo) => console.error("[hydration]", error, errorInfo?.componentStack)
      : undefined,
  });
} else {
  createRoot(container).render(<App />);
}
