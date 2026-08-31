/**
 * SEO verification harness. Run after a build: `pnpm run verify:seo`.
 *
 * Asserts against the BUILT OUTPUT in dist/, i.e. exactly the bytes a crawler
 * receives with no JavaScript executed. Everything here is objectively
 * checkable from the repo.
 *
 * What this deliberately does NOT claim: rankings, AI citations, or real-user
 * Core Web Vitals. Those depend on the live web and cannot be proven from a
 * build directory — only measured after deploy.
 *
 * Exits non-zero on any failure so it can gate a deploy.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, "..")
const dist = join(root, "dist")

const MAX_TITLE = 60
const MAX_DESC = 155
const MIN_BODY_TEXT = 500
const MAX_CLICK_DEPTH = 3

const failures = []
const warnings = []
const fail = (m) => failures.push(m)
const warn = (m) => warnings.push(m)

if (!existsSync(dist)) {
  console.error("dist/ not found — run `pnpm run build` first.")
  process.exit(1)
}

/* ── Collect prerendered routes ──────────────────────────────────────────── */

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc)
    else if (name === "index.html") acc.push(p)
  }
  return acc
}

const htmlFiles = walk(dist)
const routeOf = (file) => {
  const rel = relative(dist, file).replace(/index\.html$/, "").replace(/\/$/, "")
  return "/" + rel
}

const pages = htmlFiles.map((file) => ({ file, route: routeOf(file), html: readFileSync(file, "utf-8") }))

/* ── Registry / route-table parity ───────────────────────────────────────── */

const appTsx = readFileSync(join(root, "src/App.tsx"), "utf-8")
const appRoutes = [...appTsx.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1])

const sitemap = existsSync(join(dist, "sitemap.xml"))
  ? readFileSync(join(dist, "sitemap.xml"), "utf-8")
  : ""
const sitemapRoutes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
  (m) => m[1] || "/"
)

const prerendered = new Set(pages.map((p) => p.route))

for (const r of appRoutes) {
  // Parameterized routes (e.g. /insights/:slug) are prerendered once per
  // registry entry rather than under the literal pattern.
  if (r.includes(":")) {
    const prefix = r.slice(0, r.indexOf(":"))
    if (![...prerendered].some((p) => p.startsWith(prefix) && p !== prefix.replace(/\/$/, ""))) {
      fail(`dynamic route ${r} has no prerendered pages — add its entries to the SEO registry`)
    }
    continue
  }
  if (!prerendered.has(r)) {
    fail(`route ${r} is in App.tsx but was not prerendered — it will 404 on direct load`)
  }
}
for (const r of sitemapRoutes) {
  if (!prerendered.has(r)) fail(`sitemap lists ${r} but no static HTML was generated for it`)
}
// A prerendered page must be served by some <Route> — either an exact match or
// a parameterized pattern with the same segment count (e.g. /insights/:slug).
const matchesRoute = (route) =>
  appRoutes.some((r) => {
    const a = r.split("/")
    const b = route.split("/")
    return a.length === b.length && a.every((seg, i) => seg.startsWith(":") || seg === b[i])
  })

for (const p of pages) {
  if (p.route !== "/404" && p.route !== "/" && !matchesRoute(p.route)) {
    warn(`prerendered ${p.route} has no matching <Route> in App.tsx`)
  }
}

/* ── Per-page checks ─────────────────────────────────────────────────────── */

const titles = new Map()
const descriptions = new Map()
const linkGraph = new Map()

const textOf = (html) => {
  const body = html.split('<div id="root">')[1] ?? ""
  return body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

for (const { route, html } of pages) {
  const label = route

  // Title
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.trim()
  if (!title) fail(`${label}: no <title> in served HTML`)
  else {
    if (title.length > MAX_TITLE) fail(`${label}: title ${title.length} chars (max ${MAX_TITLE}) — "${title}"`)
    if (titles.has(title)) fail(`${label}: duplicate title, also on ${titles.get(title)}`)
    titles.set(title, label)
  }
  if ((html.match(/<title/g) || []).length > 1) fail(`${label}: more than one <title> element`)

  // Description
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  if (!desc) fail(`${label}: no meta description in served HTML`)
  else {
    if (desc.length > MAX_DESC) fail(`${label}: description ${desc.length} chars (max ${MAX_DESC})`)
    if (descriptions.has(desc)) fail(`${label}: duplicate description, also on ${descriptions.get(desc)}`)
    descriptions.set(desc, label)
  }

  // Canonical
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
  if (!canonical) fail(`${label}: no canonical link`)
  else if (route !== "/404" && !canonical.endsWith(route === "/" ? "/" : route)) {
    fail(`${label}: canonical "${canonical}" does not match its own route`)
  }

  // Open Graph image
  if (!/property="og:image"/.test(html)) warn(`${label}: no og:image — link previews will be bare`)

  // Real server-rendered content
  const text = textOf(html)
  if (text.length < MIN_BODY_TEXT) {
    fail(`${label}: only ${text.length} chars of crawler-visible text (min ${MIN_BODY_TEXT})`)
  }

  // Exactly one h1
  const h1s = (html.match(/<h1[\s>]/g) || []).length
  if (h1s === 0) fail(`${label}: no <h1>`)
  if (h1s > 1) fail(`${label}: ${h1s} <h1> elements (expected exactly 1)`)

  // JSON-LD must parse
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1].replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\u0026/g, "&"))
      if (!parsed["@context"] || !parsed["@type"]) {
        fail(`${label}: JSON-LD block missing @context or @type`)
      }
    } catch (e) {
      fail(`${label}: JSON-LD does not parse — ${e.message}`)
    }
  }

  // noindex must never appear on a sitemap'd URL
  if (/name="robots"[^>]*noindex/.test(html) && sitemapRoutes.includes(route)) {
    fail(`${label}: marked noindex but listed in sitemap.xml`)
  }

  // Internal links, for the reachability graph
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)]
    .map((m) => m[1].replace(/\/$/, "") || "/")
    .filter((h) => !h.startsWith("/assets") && !/\.[a-z0-9]+$/i.test(h))
  linkGraph.set(route, new Set(hrefs))
}

/* ── Reachability: no orphans, within click budget ───────────────────────── */

const depth = new Map([["/", 0]])
const queue = ["/"]
while (queue.length) {
  const cur = queue.shift()
  for (const next of linkGraph.get(cur) ?? []) {
    if (!prerendered.has(next) || depth.has(next)) continue
    depth.set(next, depth.get(cur) + 1)
    queue.push(next)
  }
}

for (const { route } of pages) {
  if (route === "/404") continue
  if (!depth.has(route)) {
    fail(`${route}: ORPHAN — not reachable by any internal link from the homepage`)
  } else if (depth.get(route) > MAX_CLICK_DEPTH) {
    fail(`${route}: ${depth.get(route)} clicks from homepage (max ${MAX_CLICK_DEPTH})`)
  }
}

/* ── Site-level files ────────────────────────────────────────────────────── */

for (const f of ["robots.txt", "sitemap.xml", "llms.txt", "404.html"]) {
  if (!existsSync(join(dist, f))) fail(`dist/${f} missing`)
}

const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf-8") : ""
for (const ua of ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Bingbot"]) {
  if (!robots.includes(ua)) fail(`robots.txt does not mention ${ua}`)
}
if (!robots.includes("Sitemap:")) fail("robots.txt has no Sitemap: directive")

/* ── Report ──────────────────────────────────────────────────────────────── */

const bodyChars = pages.map((p) => textOf(p.html).length)
const minText = Math.min(...bodyChars)

console.log(`\nSEO verification — ${pages.length} prerendered routes\n`)
console.log(`  crawler-visible text   min ${minText}, median ${bodyChars.sort((a, b) => a - b)[Math.floor(bodyChars.length / 2)]} chars`)
console.log(`  unique titles          ${titles.size}/${pages.length}`)
console.log(`  unique descriptions    ${descriptions.size}/${pages.length}`)
console.log(`  max click depth        ${Math.max(...[...depth.values()])}`)
console.log(`  sitemap urls           ${sitemapRoutes.length}`)

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`)
  warnings.forEach((w) => console.log(`  ! ${w}`))
}

if (failures.length) {
  console.error(`\n${failures.length} FAILURE(S):`)
  failures.forEach((f) => console.error(`  x ${f}`))
  process.exit(1)
}

console.log("\nAll checks passed.\n")
