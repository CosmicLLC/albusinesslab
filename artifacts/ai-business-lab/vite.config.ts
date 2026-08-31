import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// PORT and BASE_PATH are provided by Replit at dev/preview time.
// For static builds (e.g. Vercel) they're irrelevant, so fall back to
// sane defaults instead of throwing at config-load time.
const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

// Two builds run from this config:
//   `vite build`       -> dist/      (client bundle + index.html template)
//   `vite build --ssr` -> dist-ssr/  (entry-server, used by scripts/prerender.mjs)
// isSsrBuild tells them apart so the SSR pass doesn't inherit client-only
// settings like manualChunks, which Rollup rejects for SSR output.
export default defineConfig(async ({ isSsrBuild }) => ({
  base: basePath,
  // DIAG=1 builds against React's development bundle so hydration mismatches
  // report the offending element instead of a minified error code. Diagnostic
  // only — never set in a real build.
  ...(process.env.DIAG
    ? { define: { "process.env.NODE_ENV": JSON.stringify("development") } }
    : {}),
  plugins: [
    react(),
    tailwindcss(),
    // Replit-only dev overlay — skip on non-Replit hosts (e.g. Vercel).
    ...(process.env.REPL_ID !== undefined ? [runtimeErrorOverlay()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    // Output to package-local dist/ so it matches the Vite preset's
    // default and the outputDirectory configured in vercel.json (with
    // Vercel Root Directory set to artifacts/ai-business-lab).
    outDir: path.resolve(import.meta.dirname, isSsrBuild ? "dist-ssr" : "dist"),
    emptyOutDir: true,
    ssr: isSsrBuild ? path.resolve(import.meta.dirname, "src/entry-server.tsx") : undefined,
    // `root` points at the package dir, so Rollup's input would otherwise
    // default to index.html — which SSR builds reject. Name the entry directly.
    rollupOptions: isSsrBuild ? {
      input: path.resolve(import.meta.dirname, "src/entry-server.tsx"),
    } : {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom")) return "react-dom";
          if (id.match(/[\\/]react[\\/]/)) return "react";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("lucide-react") || id.includes("react-icons")) return "icons";
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) return "forms";
          if (id.includes("recharts")) return "charts";
          if (id.includes("embla-carousel")) return "carousel";
          if (id.includes("date-fns") || id.includes("react-day-picker")) return "dates";
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
}));
