/**
 * Single source of truth for every public route's SEO metadata.
 *
 * Used by:
 *  - the client (useRouteSeo) to update <title>/meta on SPA navigation
 *  - scripts/prerender.mjs at build time to write per-route static HTML,
 *    sitemap.xml and robots.txt
 *
 * Adding a page: add its <Route> in App.tsx AND an entry here. Routes with
 * `indexable: false` get a noindex tag and are left out of the sitemap.
 */

export const SITE_URL = "https://aibizlab.org";
export const SITE_NAME = "AI Business Lab";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

export type RouteSeo = {
  /** Path as matched by the router, no trailing slash (except "/"). */
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  /** Source file of the page, used to derive <lastmod> from git history. */
  source: string;
  /** Extra JSON-LD objects for this page only. */
  jsonLd?: Record<string, unknown>[];
};

export const ORGANIZATION_JSON_LD: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "AI Biz Lab",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  founder: { "@type": "Person", name: "James Greulich" },
  areaServed: [
    { "@type": "State", name: "Massachusetts" },
    { "@type": "State", name: "Rhode Island" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}/contact`,
    areaServed: ["US-MA", "US-RI"],
    availableLanguage: "English",
  },
};

const provider = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME };

export const ROUTES: RouteSeo[] = [
  {
    path: "/",
    title: "AI Business Lab | AI Consulting & Training for Teams",
    description:
      "Add an autonomous AI workforce to your team. AI strategy, implementation and hands-on AI training for companies in Massachusetts and Rhode Island.",
    indexable: true,
    source: "src/pages/home.tsx",
  },
  {
    path: "/services",
    title: "AI Consulting Services | AI Business Lab",
    description:
      "AI strategy, workflow automation and implementation services that turn AI tools your team already pays for into measurable efficiency gains.",
    indexable: true,
    source: "src/pages/services.tsx",
  },
  {
    path: "/system",
    title: "The AI Transformation System | AI Business Lab",
    description:
      "A monthly operating cadence, 90-day roadmap, team training and hands-on implementation that makes your organization AI-native.",
    indexable: true,
    source: "src/pages/system.tsx",
  },
  {
    path: "/training",
    title: "Corporate AI Training Programs | AI Business Lab",
    description:
      "Live, hands-on AI training for executives and technical teams. Boardroom AI Fluency and Applied Engineering programs where teams build real AI tools.",
    indexable: true,
    source: "src/pages/training.tsx",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Boardroom AI Fluency",
        description:
          "Executive AI training program that gives leadership teams the mental models and tactical skills to operate in an AI-first paradigm.",
        url: `${SITE_URL}/training`,
        provider,
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Applied Engineering",
        description:
          "Hands-on AI training for technical teams to design, build and deploy AI tools and workflows.",
        url: `${SITE_URL}/training`,
        provider,
      },
    ],
  },
  {
    path: "/insights",
    title: "AI School: Guides & Insights | AI Business Lab",
    description:
      "Practical AI guides, frameworks and insights for business leaders adopting AI across sales, HR, marketing and operations.",
    indexable: true,
    source: "src/pages/insights.tsx",
  },
  {
    path: "/about",
    title: "About AI Business Lab | Founder James Greulich",
    description:
      "AI Business Lab helps companies actually use the AI tools they pay for. Founded by operator and AI practitioner James Greulich.",
    indexable: true,
    source: "src/pages/about.tsx",
  },
  {
    path: "/contact",
    title: "Book an AI Strategy Session | AI Business Lab",
    description:
      "Book a 30-minute strategy session to find where AI can deliver a 20%+ efficiency gain in your business.",
    indexable: true,
    source: "src/pages/contact.tsx",
  },
  {
    path: "/website-builder",
    title: "AI Website Builder | AI Business Lab",
    description:
      "Describe your business and watch AI generate a complete website draft in seconds. A live demo from AI Business Lab.",
    indexable: true,
    source: "src/pages/website-builder.tsx",
  },
];

export const NOT_FOUND_SEO = {
  title: "Page Not Found | AI Business Lab",
  description: "The page you are looking for does not exist.",
};

export function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function findRoute(path: string): RouteSeo | undefined {
  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return ROUTES.find((r) => r.path === normalized);
}
