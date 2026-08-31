/**
 * Minimal static server that mirrors the production hosting contract:
 * cleanUrls (/about -> dist/about/index.html) with NO trailing-slash redirect,
 * and 404.html for unknown paths.
 *
 * `vite preview` is not a substitute: it applies an SPA fallback, serving the
 * homepage shell for every unmatched path. Testing prerendered output through
 * it silently compares the wrong document and invents hydration errors that do
 * not exist in production.
 *
 *   node scripts/serve-static.mjs [port]
 */
import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { extname, join, normalize } from "node:path"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist")
const port = Number(process.argv[2] ?? 5400)

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
}

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile()
  } catch {
    return false
  }
}

createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname)
  const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "")

  const candidates = [join(dist, safe), join(dist, safe, "index.html"), join(dist, `${safe}.html`)]

  for (const c of candidates) {
    if (await isFile(c)) {
      res.writeHead(200, { "content-type": TYPES[extname(c)] ?? "application/octet-stream" })
      res.end(await readFile(c))
      return
    }
  }

  res.writeHead(404, { "content-type": "text/html; charset=utf-8" })
  res.end(await readFile(join(dist, "404.html")).catch(() => "Not found"))
}).listen(port, () => console.log(`static server on http://localhost:${port}`))
