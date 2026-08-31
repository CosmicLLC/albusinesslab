import { useEffect } from "react"
import { useLocation } from "wouter"
import { getPageMeta, NOT_FOUND_META } from "@/seo/pages"
import { headTagsFor, type HeadTag } from "@/seo/head"

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * Mounted once in Layout and driven by the router, so a page cannot forget to
 * declare its metadata — everything comes from the registry in src/seo/pages.ts.
 *
 * On first load the tags are already present in the prerendered HTML (emitted by
 * scripts/prerender.mjs from the same registry), each marked with data-seo. This
 * component finds those by key and updates them in place rather than duplicating
 * them, then prunes any that the new route no longer needs.
 */

const MANAGED = "data-seo"

function applyTags(tags: HeadTag[]) {
  const head = document.head
  const seen = new Set<string>()

  for (const t of tags) {
    seen.add(t.key)
    let el = head.querySelector<HTMLElement>(`[${MANAGED}="${CSS.escape(t.key)}"]`)

    if (!el || el.tagName.toLowerCase() !== t.tag) {
      el?.remove()
      el = document.createElement(t.tag)
      el.setAttribute(MANAGED, t.key)
      head.appendChild(el)
    }

    for (const [k, v] of Object.entries(t.attrs)) {
      if (el.getAttribute(k) !== v) el.setAttribute(k, v)
    }
    if (t.content !== undefined && el.textContent !== t.content) {
      el.textContent = t.content
    }
  }

  // Drop tags left over from the previous route (e.g. a page with JSON-LD
  // navigating to one without).
  head.querySelectorAll<HTMLElement>(`[${MANAGED}]`).forEach((el) => {
    const key = el.getAttribute(MANAGED)
    if (key && !seen.has(key)) el.remove()
  })

  // The static template ships a fallback <title>; remove it once ours is live
  // so the document never carries two.
  head.querySelectorAll("title").forEach((el) => {
    if (!el.hasAttribute(MANAGED)) el.remove()
  })
}

export function Seo() {
  const [location] = useLocation()

  useEffect(() => {
    const page = getPageMeta(location) ?? { ...NOT_FOUND_META, path: location }
    applyTags(headTagsFor(page))
  }, [location])

  return null
}

export { SITE_URL, SITE_NAME } from "@/seo/pages"
