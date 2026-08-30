// Regenerates public/sitemap.xml from src/seo/routes.json before every
// build. Keep routes.json in sync with the <Route> list in src/App.tsx —
// this script has no way to discover routes on its own.
import { readFileSync, writeFileSync } from "node:fs"

const SITE_URL = process.env.SITE_URL ?? "https://aibizlab.org"

const routesPath = new URL("../src/seo/routes.json", import.meta.url)
const outPath = new URL("../public/sitemap.xml", import.meta.url)

const routes = JSON.parse(readFileSync(routesPath, "utf-8"))

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(outPath, xml)
console.log(`[generate-sitemap] wrote ${routes.length} routes to public/sitemap.xml`)
