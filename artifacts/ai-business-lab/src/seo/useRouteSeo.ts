import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  DEFAULT_OG_IMAGE,
  NOT_FOUND_SEO,
  canonicalUrl,
  findRoute,
} from "./routes";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Keeps <title>, description, canonical and OG tags in sync on client-side
 * navigation. The initial values come from the prerendered HTML.
 */
export function useRouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const route = findRoute(location);
    const title = route?.title ?? NOT_FOUND_SEO.title;
    const description = route?.description ?? NOT_FOUND_SEO.description;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", route?.indexable ? "index, follow" : "noindex, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", DEFAULT_OG_IMAGE);
    if (route) {
      setMeta("property", "og:url", canonicalUrl(route.path));
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonicalUrl(route.path);
    }
  }, [location]);
}
