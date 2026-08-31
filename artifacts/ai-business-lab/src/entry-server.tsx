/**
 * Server entry used only at build time by scripts/prerender.mjs.
 *
 * Vite bundles this with `vite build --ssr`, which is what lets a plain Node
 * script reach TypeScript modules, path aliases and the JSX in src/. No headless
 * browser is involved, so the whole pipeline runs on Vercel's build machine.
 */
import { renderToString } from "react-dom/server"
import App from "./App"
import { PAGES, getPageMeta, NOT_FOUND_META, type PageMeta } from "./seo/pages"
import { headTagsFor, renderHeadTags } from "./seo/head"

export interface RenderedRoute {
  path: string
  /** Markup for #root — what a crawler reads without executing any JavaScript. */
  appHtml: string
  /** Serialized <head> tags for this route. */
  headHtml: string
  meta: PageMeta
}

export function renderRoute(path: string): RenderedRoute {
  const meta = getPageMeta(path) ?? NOT_FOUND_META
  return {
    path,
    appHtml: renderToString(<App ssrPath={path} />),
    headHtml: renderHeadTags(headTagsFor(meta)),
    meta,
  }
}

export { PAGES, NOT_FOUND_META }
export { SITE_URL, SITE_NAME, absolute } from "./seo/pages"
