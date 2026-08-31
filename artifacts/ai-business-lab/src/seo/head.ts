/**
 * Derives the complete <head> tag set for a route from the SEO registry.
 *
 * Returns a neutral descriptor list rather than DOM nodes or an HTML string so
 * the same definition can drive both renderers:
 *   - src/components/Seo.tsx applies them to document.head on client navigation
 *   - scripts/prerender.mjs serializes them into the static HTML crawlers get
 *
 * One definition, two renderers — so the tags a crawler sees and the tags a
 * client-side navigation produces cannot disagree.
 */
import {
  absolute,
  jsonLdFor,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  type PageMeta,
} from "./pages"

export interface HeadTag {
  tag: "title" | "meta" | "link" | "script"
  attrs: Record<string, string>
  /** Text content, for <title> and <script type="application/ld+json">. */
  content?: string
  /**
   * Stable identity used to find-or-create the tag on the client and to avoid
   * duplicating it during prerender.
   */
  key: string
}

export function headTagsFor(page: PageMeta): HeadTag[] {
  const url = absolute(page.path)
  const ogImage = `${SITE_URL}${OG_IMAGE_PATH}`

  const tags: HeadTag[] = [
    { key: "title", tag: "title", attrs: {}, content: page.title },
    { key: "m:description", tag: "meta", attrs: { name: "description", content: page.description } },
    { key: "l:canonical", tag: "link", attrs: { rel: "canonical", href: url } },

    { key: "m:og:title", tag: "meta", attrs: { property: "og:title", content: page.title } },
    { key: "m:og:description", tag: "meta", attrs: { property: "og:description", content: page.description } },
    { key: "m:og:url", tag: "meta", attrs: { property: "og:url", content: url } },
    { key: "m:og:type", tag: "meta", attrs: { property: "og:type", content: "website" } },
    { key: "m:og:site_name", tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { key: "m:og:image", tag: "meta", attrs: { property: "og:image", content: ogImage } },

    { key: "m:tw:card", tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { key: "m:tw:title", tag: "meta", attrs: { name: "twitter:title", content: page.title } },
    { key: "m:tw:description", tag: "meta", attrs: { name: "twitter:description", content: page.description } },
    { key: "m:tw:image", tag: "meta", attrs: { name: "twitter:image", content: ogImage } },
  ]

  if (page.noindex) {
    tags.push({ key: "m:robots", tag: "meta", attrs: { name: "robots", content: "noindex, follow" } })
  }

  if (page.lastUpdated) {
    tags.push({
      key: "m:modified",
      tag: "meta",
      attrs: { property: "article:modified_time", content: page.lastUpdated },
    })
  }

  jsonLdFor(page).forEach((block, i) => {
    tags.push({
      key: `jsonld:${i}`,
      tag: "script",
      attrs: { type: "application/ld+json" },
      content: JSON.stringify(block),
    })
  })

  return tags
}

/* ── HTML serialization (used by the prerenderer) ────────────────────────── */

const escapeAttr = (v: string): string =>
  v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const escapeText = (v: string): string =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

/**
 * JSON-LD sits inside a raw-text <script>, so HTML entity escaping does not
 * apply and would corrupt the JSON. Neutralize only the sequences that could
 * terminate the script element.
 */
const escapeJsonLd = (v: string): string =>
  v.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")

/**
 * Every emitted tag carries data-seo="<key>". <Seo> uses that to find and update
 * the prerendered tag in place on client navigation rather than appending a
 * duplicate — without it, hydrating a prerendered page would leave two <title>
 * elements and two copies of every meta tag.
 */
export function renderHeadTags(tags: HeadTag[], indent = "    "): string {
  return tags
    .map((t) => {
      const attrs = Object.entries({ ...t.attrs, "data-seo": t.key })
        .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
        .join("")

      if (t.tag === "title") return `${indent}<title${attrs}>${escapeText(t.content ?? "")}</title>`
      if (t.tag === "script")
        return `${indent}<script${attrs}>${escapeJsonLd(t.content ?? "")}</script>`
      return `${indent}<${t.tag}${attrs}>`
    })
    .join("\n")
}
