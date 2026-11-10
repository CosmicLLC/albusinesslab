import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "./App";

/** Build-time only: render one route to static HTML for prerendering. */
export function render(url: string): string {
  const queryClient = new QueryClient();
  return renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router ssrPath={url}>
          <AppRoutes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>,
  );
}

export { ROUTES, ORGANIZATION_JSON_LD, NOT_FOUND_SEO, SITE_URL, DEFAULT_OG_IMAGE, canonicalUrl } from "./seo/routes";
