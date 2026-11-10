/**
 * Post-build step: prerenders every route in src/seo/routes.ts to static
 * HTML, then writes 404.html, sitemap.xml and robots.txt into dist/.
 *
 * Run after `vite build` (client) and `vite build --ssr` (server entry).
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const {
  render, ROUTES, ORGANIZATION_JSON_LD, NOT_FOUND_SEO, DEFAULT_OG_IMAGE, SITE_URL, canonicalUrl,
} = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

function headFor({ title, description, canonical, indexable, extraJsonLd = [] }) {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${indexable ? "index, follow" : "noindex, follow"}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="AI Business Lab" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    canonical ? `<meta property="og:url" content="${canonical}" />` : "",
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    jsonLd(ORGANIZATION_JSON_LD),
    ...extraJsonLd.map(jsonLd),
  ];
  return tags.filter(Boolean).join("\n    ");
}

function page(url, head) {
  const appHtml = render(url);
  if (!/<h1[\s>]/.test(appHtml)) throw new Error(`Prerender of ${url} produced no <h1>`);
  // Framer Motion renders its `initial` state (opacity:0 + transform) into
  // inline styles. Strip it so the static HTML paints immediately; the client
  // render (hidden under the intro overlay) re-applies the entrance animation.
  const visibleHtml = appHtml.replace(/ style="opacity:0(?:;transform:[^";]*)?;?"/g, "");
  return template
    .replace(/<title>[\s\S]*?<\/title>/, head)
    .replace('<div id="root"></div>', `<div id="root">${visibleHtml}</div>`);
}

// Pages. "/services" -> dist/services.html (served at /services via
// Vercel cleanUrls); "/" -> dist/index.html.
for (const r of ROUTES) {
  const html = page(r.path, headFor({
    title: r.title,
    description: r.description,
    canonical: canonicalUrl(r.path),
    indexable: r.indexable,
    extraJsonLd: r.jsonLd,
  }));
  const file = r.path === "/" ? "index.html" : `${r.path.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`prerendered ${r.path} -> dist/${file}`);
}

// 404 page (Vercel serves dist/404.html with a 404 status).
fs.writeFileSync(
  path.join(dist, "404.html"),
  page("/__not-found__", headFor({ ...NOT_FOUND_SEO, canonical: null, indexable: false })),
);
console.log("prerendered 404 -> dist/404.html");

// lastmod: last git commit touching the page source, only when full git
// history is available (a shallow clone would report wrong dates).
function lastmod(source) {
  try {
    const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: root }).toString().trim();
    if (shallow !== "false") return null;
    const d = execFileSync("git", ["log", "-1", "--format=%cs", "--", source], { cwd: root }).toString().trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
  } catch {
    return null;
  }
}

const urls = ROUTES.filter((r) => r.indexable).map((r) => {
  const lm = lastmod(r.source);
  return `  <url>\n    <loc>${canonicalUrl(r.path)}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ""}\n  </url>`;
});
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`wrote sitemap.xml (${urls.length} URLs)`);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
console.log("wrote robots.txt");

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
