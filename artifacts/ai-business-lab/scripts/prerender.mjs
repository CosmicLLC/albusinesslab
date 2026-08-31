/**
 * Build-time prerenderer.
 *
 * Renders every route in the SEO registry to static HTML so that crawlers which
 * do not execute JavaScript receive real content and real metadata. That is not
 * a nice-to-have here: network-scale measurement (Vercel/MERJ) shows GPTBot,
 * OAI-SearchBot, ClaudeBot and PerplexityBot fetch HTML and never run the
 * bundle, and Bing renders JS only selectively. Before this existed, all routes
 * served `<div id="root"></div>` and were invisible to every one of them.
 *
 * Runs after both Vite builds and needs no headless browser, so it works on
 * Vercel's build machine:
 *   vite build            -> dist/      (client bundle + HTML template)
 *   vite build --ssr      -> dist-ssr/  (this script's render function)
 *   node scripts/prerender.mjs
 *
 * Also emits sitemap.xml, robots.txt and llms.txt from that same registry, so
 * none of them can drift from the routes that actually exist.
 */
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, "..")
const dist = join(root, "dist")
const distSsr = join(root, "dist-ssr")

const ssrEntry = join(distSsr, "entry-server.js")
if (!existsSync(ssrEntry)) {
  console.error(`[prerender] missing ${ssrEntry}\n  run \`vite build --ssr\` first`)
  process.exit(1)
}

const { renderRoute, PAGES, NOT_FOUND_META, SITE_URL, absolute } = await import(
  pathToFileURL(ssrEntry).href
)

const template = readFileSync(join(dist, "index.html"), "utf-8")

/**
 * React 19 emits resource hints (<link rel="preload"> for <img>, stylesheets)
 * inline in the renderToString output, but on the client it hoists them into
 * <head>. Left in place they become the first child of #root on the server and
 * absent on the client — a guaranteed hydration mismatch that makes React throw
 * away the prerendered DOM and re-render, silently discarding the SSG benefit.
 *
 * Hoisting them here matches the client's own behaviour and is where preload
 * hints belong anyway.
 */
const HOISTABLE = /<link\b[^>]*\brel="(?:preload|stylesheet|preconnect|dns-prefetch|modulepreload)"[^>]*\/?>/g

function hoistResourceHints(appHtml) {
  const hints = appHtml.match(HOISTABLE) ?? []
  return { body: appHtml.replace(HOISTABLE, ""), hints }
}

// NOTE: do not strip framer-motion's `initial` inline styles (opacity:0) from
// this markup. The client's first render emits them too, so removing them here
// creates the very hydration mismatch it looks like it would prevent. Content
// rendering at opacity:0 for visitors without JavaScript is handled instead by
// a <noscript> override in index.html, which cannot affect hydration.

/** Inject rendered markup and head tags into the client build's HTML shell. */
function buildHtml({ appHtml, headHtml }) {
  const { body, hints } = hoistResourceHints(appHtml)
  let html = template

  // Drop the placeholder <title> so the document never carries two.
  html = html.replace(/\s*<title>[\s\S]*?<\/title>/, "")

  const hintHtml = hints.length ? `\n    ${hints.join("\n    ")}` : ""
  html = html.replace("</head>", `${headHtml}${hintHtml}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  return html
}

function writePage(routePath, html) {
  // Directory-per-route with index.html: works with Vercel's cleanUrls and with
  // any plain static host, and keeps the canonical URL extensionless.
  const outDir = routePath === "/" ? dist : join(dist, routePath)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, "index.html"), html)
}

/* ── Render every route ──────────────────────────────────────────────────── */

let rendered = 0
const emptyRoutes = []

for (const page of PAGES) {
  const result = renderRoute(page.path)

  // A route whose markup is trivially short means the component rendered
  // nothing server-side — exactly the failure this pipeline exists to prevent,
  // so fail loudly rather than shipping an empty page.
  if (result.appHtml.replace(/<[^>]*>/g, "").trim().length < 200) {
    emptyRoutes.push(page.path)
  }

  writePage(page.path, buildHtml(result))
  rendered++
}

if (emptyRoutes.length) {
  console.error(
    `[prerender] FAILED — these routes rendered little or no server-side content:\n` +
      emptyRoutes.map((p) => `    ${p}`).join("\n") +
      `\n  A component is almost certainly gating its subtree on client-only state.`
  )
  process.exit(1)
}

// SPA fallback for unknown URLs. noindex, and deliberately not in the sitemap.
const notFound = renderRoute("/__not_found__")
writeFileSync(join(dist, "404.html"), buildHtml(notFound))

/* ── sitemap.xml ─────────────────────────────────────────────────────────── */

const indexable = PAGES.filter((p) => !p.noindex)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) => `  <url>
    <loc>${absolute(p.path)}</loc>${p.lastUpdated ? `\n    <lastmod>${p.lastUpdated}</lastmod>` : ""}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
writeFileSync(join(dist, "sitemap.xml"), sitemap)

/* ── robots.txt ──────────────────────────────────────────────────────────── */

// Tokens verified against each vendor's own crawler documentation.
//
// Two corrections to the commonly-circulated list, worth keeping written down:
//   - Google-Extended and Applebot-Extended are NOT crawlers. Neither has its
//     own user agent; they are control tokens governing whether already-crawled
//     content may be used for Gemini/Apple model training and grounding.
//     Allowing them does nothing for ordinary search visibility. They are listed
//     because the business wants to permit that use, not to help ranking.
//   - "Claude-Web" is a deprecated Anthropic token. The current three are
//     ClaudeBot, Claude-User and Claude-SearchBot.
//
// Everything is allowed by default, so these blocks are explicit documentation
// and insurance against a future restrictive default rather than a behaviour
// change today.
const AI_AGENTS = [
  ["GPTBot", "OpenAI — model training"],
  ["OAI-SearchBot", "OpenAI — ChatGPT search results"],
  ["ChatGPT-User", "OpenAI — user-initiated fetches"],
  ["ClaudeBot", "Anthropic — model training"],
  ["Claude-User", "Anthropic — user-initiated fetches"],
  ["Claude-SearchBot", "Anthropic — search indexing"],
  ["PerplexityBot", "Perplexity — search indexing"],
  ["Googlebot", "Google Search"],
  ["Bingbot", "Bing — also feeds ChatGPT search retrieval"],
  ["Google-Extended", "control token: permits Gemini grounding/training"],
  ["Applebot-Extended", "control token: permits Apple model training"],
]

const robots = `# ${SITE_URL}
# Crawling is open. AI retrieval crawlers are explicitly permitted — being
# cited by ChatGPT, Claude and Perplexity requires that they can read the page.

User-agent: *
Allow: /

${AI_AGENTS.map(([ua, note]) => `# ${note}\nUser-agent: ${ua}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`
writeFileSync(join(dist, "robots.txt"), robots)

/* ── llms.txt ────────────────────────────────────────────────────────────── */

// Note: no major AI provider has confirmed consuming llms.txt as a ranking or
// citation signal. Included because it is nearly free to generate from data we
// already maintain — not because it is expected to move anything on its own.
const groups = [
  ["Start here", ["/", "/workforce-training-fund-ai-training", "/contact"]],
  ["Services", ["/services", "/training", "/system", "/website-builder"]],
  ["By industry", PAGES.filter((p) => p.path.startsWith("/industries")).map((p) => p.path)],
  ["By location", PAGES.filter((p) => p.path.startsWith("/ai-consulting")).map((p) => p.path)],
  ["Decision guides", PAGES.filter((p) => p.path.startsWith("/vs")).map((p) => p.path)],
  ["Guides and articles", PAGES.filter((p) => p.path.startsWith("/insights/")).map((p) => p.path)],
  ["About", ["/about", "/insights"]],
]

// Every indexable page must appear somewhere above, or it is silently omitted
// from llms.txt as new sections get added.
const grouped = new Set(groups.flatMap(([, paths]) => paths))
const ungrouped = PAGES.filter((p) => !p.noindex && !grouped.has(p.path)).map((p) => p.path)
if (ungrouped.length) {
  groups.push(["Other", ungrouped])
  console.warn(`[prerender] llms.txt: ${ungrouped.length} page(s) had no section — listed under "Other"`)
}

const byPath = new Map(PAGES.map((p) => [p.path, p]))
const llms = `# AI Business Lab

> AI training and workflow automation for Massachusetts small businesses. Our
> AI Fundamentals Workshops are structured to qualify for reimbursement under
> the Massachusetts Workforce Training Fund Program (WTFP) Express track.

${groups
  .map(([heading, paths]) => {
    const lines = paths
      .map((p) => byPath.get(p))
      .filter(Boolean)
      .map((p) => `- [${p.title}](${absolute(p.path)}): ${p.summary}`)
    return lines.length ? `## ${heading}\n\n${lines.join("\n")}` : ""
  })
  .filter(Boolean)
  .join("\n\n")}
`
writeFileSync(join(dist, "llms.txt"), llms)

/* ── Clean up the SSR bundle so it is not deployed ───────────────────────── */
rmSync(distSsr, { recursive: true, force: true })

console.log(
  `[prerender] ${rendered} routes -> static HTML` +
    `\n[prerender] sitemap.xml (${indexable.length} urls), robots.txt, llms.txt, 404.html`
)
