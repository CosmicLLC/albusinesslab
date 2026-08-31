/**
 * Canonical SEO registry — the single source of truth for per-route metadata.
 *
 * Four consumers read this and only this:
 *   1. <Seo> (src/components/Seo.tsx) — updates <head> on client-side navigation
 *   2. scripts/prerender.mjs          — bakes tags into the static HTML crawlers get
 *   3. the sitemap generator          — derives sitemap.xml
 *   4. the llms.txt generator         — derives llms.txt
 *
 * Consolidating them prevents two failure modes we actually care about:
 *   - route/sitemap drift (a page that exists but is never listed, or vice versa)
 *   - schema drift (JSON-LD asserting something the visible page doesn't say)
 *
 * Adding a route means adding it HERE and in src/App.tsx. The verification
 * harness (scripts/verify-seo.mjs) fails the build if the two disagree.
 */
import { WTFP_FAQS } from "@/content/wtfp-faq"

export const SITE_URL = "https://aibizlab.org"
export const SITE_NAME = "AI Business Lab"
export const OG_IMAGE_PATH = "/opengraph.jpg"

/** Where the business actually operates. Used for schema areaServed. */
export const SERVICE_REGION = "Massachusetts"

export type JsonLd = Record<string, unknown>

export interface Crumb {
  name: string
  path: string
}

export interface PageMeta {
  path: string
  /** <= 60 chars. Primary keyword near the front. */
  title: string
  /** <= 155 chars. Primary keyword near the front. */
  description: string
  changefreq: "weekly" | "monthly" | "yearly"
  priority: number
  /** One-line plain-language purpose. Feeds llms.txt. */
  summary: string
  /** ISO date. Set on pages carrying time-sensitive or numeric claims. */
  lastUpdated?: string
  /** Trail excluding Home, which is prepended automatically. */
  breadcrumbs?: Crumb[]
  /** Page-specific structured data. Breadcrumbs are appended automatically. */
  jsonLd?: JsonLd[]
  noindex?: boolean
}

export const absolute = (path: string): string =>
  `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`

/* ── Shared schema fragments ─────────────────────────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`

/**
 * Site-wide publisher identity. Referenced by @id from other nodes rather than
 * repeated, so there is exactly one Organization definition across the site.
 */
export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "AI training and workflow automation for Massachusetts small businesses, including Workforce Training Fund–eligible workshops.",
  areaServed: { "@type": "State", name: SERVICE_REGION },
})

export const websiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
})

/** A single offering. `areaServed` narrows to a city where relevant. */
const serviceJsonLd = (opts: {
  name: string
  description: string
  area?: JsonLd
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  provider: { "@id": ORG_ID },
  areaServed: opts.area ?? { "@type": "State", name: SERVICE_REGION },
})

const cityArea = (city: string): JsonLd => ({
  "@type": "City",
  name: city,
  address: {
    "@type": "PostalAddress",
    addressLocality: city,
    addressRegion: "MA",
    addressCountry: "US",
  },
})

export const breadcrumbJsonLd = (crumbs: Crumb[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absolute(c.path),
  })),
})

const faqPageJsonLd = (faqs: { q: string; a: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
})

/* ── The registry ────────────────────────────────────────────────────────── */

const INDUSTRIES_CRUMB: Crumb = { name: "Industries", path: "/industries" }
const LOCATIONS_CRUMB: Crumb = { name: "Locations", path: "/ai-consulting" }
const COMPARISONS_CRUMB: Crumb = { name: "Comparisons", path: "/vs" }

export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "AI Business Lab | Enterprise AI Transformation",
    description:
      "Add an autonomous AI workforce to your team. Strategy, implementation, and training for organizations ready to move decisively on AI.",
    summary:
      "Homepage. Overview of AI Business Lab's training and implementation services.",
    changefreq: "weekly",
    priority: 1.0,
    jsonLd: [organizationJsonLd(), websiteJsonLd()],
  },
  {
    path: "/services",
    title: "AI Consulting Services | AI Business Lab",
    description:
      "End-to-end AI consulting: strategy, custom LLM/RAG architectures, data readiness, autonomous agents, systems integration, and governance.",
    summary: "Full catalogue of AI consulting service lines.",
    changefreq: "monthly",
    priority: 0.8,
    jsonLd: [
      serviceJsonLd({
        name: "AI Consulting",
        description:
          "Strategy, custom LLM and RAG architectures, data readiness, autonomous agents, systems integration, and AI governance.",
      }),
    ],
  },
  {
    path: "/system",
    title: "The AI Transformation System | AI Business Lab",
    description:
      "Our four-phase methodology for enterprise AI deployment: reconnaissance, architecture blueprint, prototyping, and production rollout.",
    summary: "The four-phase delivery methodology used on engagements.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/training",
    title: "Corporate AI Training | AI Business Lab",
    description:
      "Equip leadership and technical teams with practical AI skills — executive fluency programs and hands-on applied engineering workshops.",
    summary: "Corporate AI training programmes for executive and technical teams.",
    changefreq: "monthly",
    priority: 0.7,
    jsonLd: [
      serviceJsonLd({
        name: "Corporate AI Training",
        description:
          "Executive AI fluency programmes and hands-on applied engineering workshops for technical teams.",
      }),
    ],
  },
  {
    path: "/insights",
    title: "AI School | Insights & Analysis | AI Business Lab",
    description:
      "Technical breakdowns and strategic analysis on enterprise AI — architecture, governance, and implementation.",
    summary: "Article index covering AI architecture, governance and implementation.",
    changefreq: "weekly",
    priority: 0.6,
  },
  {
    path: "/about",
    title: "About AI Business Lab",
    description:
      "How AI Business Lab works with Massachusetts businesses — our philosophy, our operating principles, and what we will and won't take on.",
    summary: "Company background, philosophy and operating principles.",
    changefreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/contact",
    title: "Contact | Book a Strategy Session | AI Business Lab",
    description:
      "Book a free 30-minute strategy session with AI Business Lab, or send an inquiry directly to our team.",
    summary: "Booking and contact page.",
    changefreq: "yearly",
    priority: 0.6,
    jsonLd: [organizationJsonLd()],
  },
  {
    path: "/website-builder",
    title: "AI Website Builder | AI Business Lab",
    description:
      "Describe your business and generate a working website in minutes with AI Business Lab's AI-powered website builder.",
    summary: "Interactive tool that generates a website from a text description.",
    changefreq: "monthly",
    priority: 0.5,
  },

  /* ── Cluster A: the differentiator ──────────────────────────────────── */
  {
    path: "/workforce-training-fund-ai-training",
    title: "AI Training Massachusetts | WTFP Reimbursement",
    description:
      "Get AI training for your Massachusetts small business reimbursed through the WTFP Express track. See who qualifies and how it works.",
    summary:
      "Explains how Massachusetts small businesses can get AI training reimbursed via the Workforce Training Fund Program (WTFP) Express track — eligibility, reimbursement mechanics, and how to apply.",
    changefreq: "monthly",
    priority: 0.9,
    lastUpdated: "2026-08-30",
    jsonLd: [faqPageJsonLd(WTFP_FAQS)],
  },

  /* ── Cluster E: comparisons ─────────────────────────────────────────── */
  {
    path: "/vs",
    title: "AI Buying Decisions Compared | AI Business Lab",
    description:
      "Straight comparisons for small business owners weighing how to adopt AI — consultant vs in-house hire, agency vs software vendor.",
    summary: "Index of consideration-stage comparison guides.",
    changefreq: "monthly",
    priority: 0.5,
  },
  {
    path: "/vs/ai-consulting-vs-hiring-in-house",
    title: "AI Consulting vs. Hiring In-House | AI Business Lab",
    description:
      "Should your Massachusetts small business hire an in-house AI person or work with a consultant? A practical, cost-and-speed comparison.",
    summary:
      "Compares hiring an in-house AI employee against engaging an outside consultant, on cost, speed, breadth and commitment.",
    changefreq: "monthly",
    priority: 0.6,
    breadcrumbs: [COMPARISONS_CRUMB],
  },
  {
    path: "/vs/ai-automation-agency-vs-software-vendor",
    title: "AI Automation Agency vs. Software Vendor",
    description:
      "Buying another SaaS tool vs. hiring an AI automation agency to build workflows around your process — a comparison for small business owners.",
    summary:
      "Compares buying off-the-shelf SaaS against commissioning custom workflow automation.",
    changefreq: "monthly",
    priority: 0.6,
    breadcrumbs: [COMPARISONS_CRUMB],
  },

  /* ── Cluster C: verticals ───────────────────────────────────────────── */
  {
    path: "/industries",
    title: "AI by Industry | Massachusetts Small Business",
    description:
      "How AI workflow automation applies to specific Massachusetts industries — trades and home services, retail, and professional services.",
    summary: "Index of industry-specific AI guidance.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/industries/trades-home-services",
    title: "AI for Trades & Home Service Businesses in MA",
    description:
      "AI workflow automation for Massachusetts trades and home service businesses — faster quotes, fewer missed calls, less paperwork after hours.",
    summary:
      "AI use cases for plumbers, electricians, HVAC, landscapers and contractors: quoting, intake, service reports, review requests.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [INDUSTRIES_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Workflow Automation for Trades & Home Services",
        description:
          "Quote drafting, after-hours intake, automated service reports and review requests for trades and home service businesses.",
      }),
    ],
  },
  {
    path: "/industries/retail",
    title: "AI for Retail Small Businesses in Massachusetts",
    description:
      "AI tools for Massachusetts retail small businesses — smarter reordering, faster customer replies, and marketing content that keeps up.",
    summary:
      "AI use cases for independent retailers: stock-out prediction, product copy, customer message triage, sales summaries.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [INDUSTRIES_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Workflow Automation for Retail",
        description:
          "Inventory signal monitoring, product and campaign copy drafting, and customer message triage for independent retailers.",
      }),
    ],
  },
  {
    path: "/industries/professional-services",
    title: "AI for Professional Services Firms in Massachusetts",
    description:
      "AI workflow automation for Massachusetts professional services firms — reclaiming billable hours lost to admin work.",
    summary:
      "AI use cases for law, accounting, financial advisory and insurance firms: document summarisation, intake, client updates, meeting notes.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [INDUSTRIES_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Workflow Automation for Professional Services Firms",
        description:
          "Document summarisation, client intake, routine client updates and meeting notes for professional services firms.",
      }),
    ],
  },

  /* ── Cluster B: locations ───────────────────────────────────────────── */
  {
    path: "/ai-consulting",
    title: "AI Consulting by Location | Massachusetts",
    description:
      "AI training and workflow automation for small businesses across Massachusetts — Boston, Worcester, Quincy and the surrounding areas.",
    summary: "Index of location-specific AI consulting pages.",
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    path: "/ai-consulting/boston-ma",
    title: "AI Consulting for Small Businesses in Boston, MA",
    description:
      "AI training and workflow automation for small businesses in Boston, MA — free readiness Snapshot, WTFP-eligible workshops, automation sprints.",
    summary: "AI consulting and training for Boston, MA small businesses.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [LOCATIONS_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Consulting and Training in Boston, MA",
        description:
          "AI readiness assessment, Workforce Training Fund–eligible workshops, and workflow automation for Boston small businesses.",
        area: cityArea("Boston"),
      }),
    ],
  },
  {
    path: "/ai-consulting/worcester-ma",
    title: "AI Consulting for Small Businesses in Worcester, MA",
    description:
      "AI training and workflow automation for small businesses in Worcester, MA — free readiness Snapshot, WTFP-eligible workshops, sprints.",
    summary: "AI consulting and training for Worcester, MA small businesses.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [LOCATIONS_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Consulting and Training in Worcester, MA",
        description:
          "AI readiness assessment, Workforce Training Fund–eligible workshops, and workflow automation for Worcester small businesses.",
        area: cityArea("Worcester"),
      }),
    ],
  },
  {
    path: "/ai-consulting/quincy-ma",
    title: "AI Consulting for Small Businesses in Quincy, MA",
    description:
      "AI training and workflow automation for small businesses in Quincy, MA — free readiness Snapshot, WTFP-eligible workshops, automation sprints.",
    summary: "AI consulting and training for Quincy, MA small businesses.",
    changefreq: "monthly",
    priority: 0.7,
    breadcrumbs: [LOCATIONS_CRUMB],
    jsonLd: [
      serviceJsonLd({
        name: "AI Consulting and Training in Quincy, MA",
        description:
          "AI readiness assessment, Workforce Training Fund–eligible workshops, and workflow automation for Quincy small businesses.",
        area: cityArea("Quincy"),
      }),
    ],
  },
]

const BY_PATH = new Map(PAGES.map((p) => [p.path, p]))

/** Metadata for a route, or undefined for anything not in the registry (404). */
export const getPageMeta = (path: string): PageMeta | undefined =>
  BY_PATH.get(path === "/" ? "/" : path.replace(/\/$/, ""))

/** Page JSON-LD plus its auto-derived BreadcrumbList. */
export const jsonLdFor = (page: PageMeta): JsonLd[] => [
  ...(page.jsonLd ?? []),
  ...(page.breadcrumbs?.length
    ? [breadcrumbJsonLd([...page.breadcrumbs, { name: page.title, path: page.path }])]
    : []),
]

/** Metadata used for routes with no registry entry. Never indexed. */
export const NOT_FOUND_META: PageMeta = {
  path: "/404",
  title: "Page Not Found | AI Business Lab",
  description: "That page doesn't exist. Browse our AI training and automation services instead.",
  summary: "404.",
  changefreq: "yearly",
  priority: 0.0,
  noindex: true,
}
