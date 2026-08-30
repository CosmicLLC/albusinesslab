import { useEffect } from "react"

// Client-rendered SPA — there's no SSR/prerendering, so these tags land in
// the DOM after React mounts rather than in the initial HTML response.
// Google's indexer executes JS and picks this up, but it's a weaker
// signal than server-rendered meta tags. Fine for now; revisit with a
// prerender step if crawl coverage becomes an issue.

export const SITE_URL = "https://aibizlab.org"
export const SITE_NAME = "AI Business Lab"

interface SeoProps {
  title: string
  description: string
  path: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

export function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title

    setMetaTag("name", "description", description)
    setMetaTag("property", "og:title", title)
    setMetaTag("property", "og:description", description)
    setMetaTag("property", "og:url", `${SITE_URL}${path}`)
    setMetaTag("property", "og:type", "website")
    setMetaTag("property", "og:site_name", SITE_NAME)
    setMetaTag("name", "twitter:card", "summary_large_image")
    setMetaTag("name", "twitter:title", title)
    setMetaTag("name", "twitter:description", description)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`)

    const scriptId = "seo-jsonld"
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script")
        script.id = scriptId
        script.type = "application/ld+json"
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
    // Tags intentionally aren't torn down on unmount — the next page's
    // <Seo> overwrites them, and removing on unmount would create a
    // flash of tagless <head> during route transitions.
  }, [title, description, path, jsonLd])

  return null
}
