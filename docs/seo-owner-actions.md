# AI Business Lab — SEO actions that need the owner

Everything in this file requires account access, a real-world action, or a
business decision. None of it can be done from the repository, which is why it
is separated from the engineering work already shipped.

Site: **https://aibizlab.org** (note: `.org`, not `.com`)

---

## 0. Decisions needed first

These are live and now indexed. They are business calls, not engineering ones.

| # | What | Where | Why it matters |
|---|---|---|---|
| 1 | Four statistics under **"Research-Backed Impact Metrics"** — 92% unprepared, 68% productivity gain, 62% skills-gap reduction, 2 days to value | homepage | Presented as "research-backed" with no source named. Either cite the study for each figure, or drop the "research-backed" framing. Unsourced statistics attributed to research are the single easiest thing for a prospect or regulator to challenge. |
| 2 | **"If we can't find a 20%+ efficiency gain, we won't take you on as a client"** | homepage hero | This reads as a guarantee. Confirm you will honour it exactly as written, or soften to a qualified claim. |
| 3 | ~~`/insights` placeholder articles incl. a fabricated "99.8% precision" case study~~ — **resolved** | `/insights` | Replaced with four real guides; the `noindex` has been lifted and the section is indexed again. Nothing needed from you. |
| 4 | **Direct contact address** | `/contact` | The old address was `partners@aibusinesslab.example.com`. `.example.com` is a reserved domain that cannot receive mail — every inquiry sent there bounced silently. The page now points at the booking calendar and form. Supply a real inbox and it goes back. |
| 5 | Existing pages (`/`, `/services`, `/training`, `/system`, `/about`) still describe **enterprise AI consulting**, not the Massachusetts small-business / WTFP positioning | sitewide | Left untouched per your earlier instruction. Until reconciled, a visitor arriving on the WTFP page and clicking "Services" meets a different business. |

---

## 1. Search Console & Bing — do this first, takes ~20 minutes

Nothing else in this document matters until the site is verified and the
sitemap is submitted.

1. **Google Search Console** → https://search.google.com/search-console
   - Add property → **Domain** property → `aibizlab.org` (needs one DNS TXT
     record; covers all subdomains and both protocols).
   - Sitemaps → submit `sitemap.xml`
   - Then check: Indexing → Pages, and Experience → Core Web Vitals.
2. **Bing Webmaster Tools** → https://www.bing.com/webmasters
   - Import directly from Google Search Console (fastest path).
   - Submit the same sitemap.
   - Bing matters more than its search share suggests: it feeds part of
     ChatGPT's search retrieval.

**Full sitemap URL:** `https://aibizlab.org/sitemap.xml` (24 indexable URLs)
**Robots:** `https://aibizlab.org/robots.txt`
**llms.txt:** `https://aibizlab.org/llms.txt`

Re-submit the sitemap after each batch of new pages.

---

## 2. Google Business Profile

Set up at https://business.google.com. For local intent this often decides
whether you appear at all, and a large share of searchers never click past it.

**Configure as a service-area business** — hide the street address, define
service areas instead. Use real city names.

| Field | Value to use |
|---|---|
| Business name | The exact legal/brand name. **Do not** append keywords like "AI Consulting Massachusetts" — that risks suspension. |
| Primary category | Pick the most specific applicable one. Too broad is a common ranking mistake. |
| Service areas | Start with the three the site covers — Boston, Worcester, Quincy — plus Walpole and immediate neighbours. Max 20. Do not overreach; an implausibly wide area gets relevance suppressed. |
| Phone | A real local number. Not toll-free, not a tracking-only line. |
| Website | `https://aibizlab.org` — or point city-relevant traffic at the matching page below. |
| Services | List each tier separately: AI Readiness Snapshot, AI Fundamentals Workshops, AI Workflow Automation Sprint, Fractional AI Ops Retainer. Do not lump them into one entry. |

City pages to link from the profile where relevant:
- `https://aibizlab.org/ai-consulting/boston-ma`
- `https://aibizlab.org/ai-consulting/worcester-ma`
- `https://aibizlab.org/ai-consulting/quincy-ma`

**Photos:** aim for 20–30 real ones to start (team, workshop sessions,
behind-the-scenes) and keep adding. This is consistently underrated.

**Posts:** post regularly; mention the specific city when it fits naturally
(e.g. an upcoming Worcester workshop).

**Reviews:** respond to every one. Volume, recency and response rate all feed
local ranking. This is an ongoing habit, not setup.

---

## 3. NAP consistency

Agree one canonical block and reuse it byte-for-byte everywhere. A single
inconsistent listing is worth more to fix than a new listing is to add.

```
Name:     AI Business Lab
Address:  Walpole, MA  [confirm: full street address, or service-area only]
Phone:    [needed — a real local number]
Website:  https://aibizlab.org
Email:    [needed — see decision #4]
```

Build citations in this order:

1. **Core:** Google Business Profile, Bing Places, Apple Business Connect,
   Facebook Business, LinkedIn company page
2. **General:** BBB, Yelp
3. **Industry:** AI / consulting / training directories
4. **Local:** Massachusetts and Rhode Island chambers of commerce, local
   business associations, MassHire workforce board partner listings

Audit quarterly. Any change to name, phone or service area means updating
every existing listing, not just the new one.

---

## 4. Links worth pursuing

Realistic targets given a new domain and a Massachusetts focus, roughly in
order of value-per-effort:

1. **Commonwealth Corporation / WTFP training-provider directory.** Once
   registered, this is a genuinely authoritative, topically-exact link from a
   state-affiliated source. Pursue it as an SEO asset, not only as a lead
   channel. It is the single best link available to this business.
2. **Chamber of commerce membership** in Boston / Worcester / Quincy — chamber
   directories are the classic easy local-authority link.
3. **Teach a free workshop** at a local library, chamber event or small-business
   association. Tends to produce links from trusted local sites, and the
   audience is the buyer.
4. **Original research, once you have real data.** After enough workshops, a
   short write-up of genuine first-party findings is the kind of asset that
   earns links and gets cited by AI answers. First-party only — see decision #1.
5. **Unlinked mentions.** Periodically search for "AI Business Lab" and ask for
   a link where a mention already exists.

Avoid paid links, bulk directory submissions, and anything selling "guaranteed
backlinks."

---

## 5. Corrections to the source brief

Verified against vendor documentation and primary sources while implementing.
Worth fixing in the brief so they don't get re-applied later.

- **`Google-Extended` and `Applebot-Extended` are not crawlers.** Google's own
  docs: *"Google-Extended doesn't have a separate HTTP request user agent
  string… the robots.txt user-agent token is used in a control capacity."*
  They govern whether already-crawled content may be used for Gemini/Apple
  model training and grounding. Allowing them does nothing for search
  visibility. They are in `robots.txt` because you presumably want to permit
  that use — not as a ranking lever.
- **`Claude-Web` is deprecated.** The current Anthropic tokens are `ClaudeBot`,
  `Claude-User` and `Claude-SearchBot`.
- **`Perplexity-User` ignores robots.txt** by Perplexity's own documentation,
  as it is treated as a user-directed fetch. You cannot control it there.
- **`llms.txt` has no confirmed consumer.** No major provider has stated they
  use it as a ranking or citation signal. It is generated because it is nearly
  free, not because it is expected to do anything on its own. Do not prioritise
  it.
- **FAQPage rich results — verify before relying on them.** Google restricted
  FAQ rich results to a narrow set of authoritative sites, so the WTFP page's
  `FAQPage` markup should not be expected to produce FAQ snippets. It is kept
  because the structured Q&A still helps machines parse the answers, which is
  the part that matters for AI retrieval. **Confirm current eligibility before
  making it a goal.**
- **If a CDN or WAF sits in front of the site, check it before trusting
  robots.txt.** Cloudflare blocks GPTBot, ClaudeBot and PerplexityBot by
  default on zones created since 1 July 2025. The edge returns 403 before
  robots.txt is ever read.

---

## 6. What to expect, and when

So this is neither judged too early nor assumed to have failed.

| Signal | Realistic timeline |
|---|---|
| Pages indexed in Google/Bing | days to ~2 weeks after sitemap submission |
| Movement on long-tail terms (WTFP, city, vertical) | ~4–12 weeks |
| Citations in ChatGPT / Perplexity / AI Overviews via live retrieval | ~2–6 weeks after the content is crawlable |
| A model "knowing" the business from training data | 6–12 months, tied to model refresh cycles |
| Competitive head terms ("AI consulting Massachusetts") | not the goal — deliberately not targeted |

**How to check AI visibility:** ask ChatGPT, Perplexity and Google AI Overviews
the actual target questions ("how do I get AI training reimbursed in
Massachusetts", "AI consultant for a Worcester small business") and note
whether AI Business Lab is cited. Manual testing is still the most reliable
method; tracking tools are immature.

---

## 7. Engineering follow-ups

Not blocking, and none require a decision — just noting them.

- **Image weight.** `logo.png` is 101 KB but renders at 40×40, and `james.png`
  is 300 KB. Both want resizing/WebP conversion; no image tooling was available
  in the build environment to do it here. `public/builder/clouds.mp4` is 6.7 MB
  but only loads on `/website-builder`, which lazy-loads its 3D scene.
- **`/website-builder` is thin.** Only ~516 characters of crawlable text, most
  of it footer, because the page is an interactive tool. Consider adding real
  copy or setting it `noindex`.
- **The intro animation still gates every page load** for roughly 3.8 seconds.
  Content now renders underneath it rather than being blocked by it, but a
  visitor arriving from Google on the WTFP page watches the animation first.
  Worth considering limiting it to the homepage or to first visit per session.
- **Core Web Vitals need field data.** Only measurable after deploy, via Search
  Console's Core Web Vitals report (real Chrome user data). Lab tools can
  approximate; they are not the ranking input.

---

## 8. Guardrails now enforced in code

So these do not silently regress:

- `pnpm run verify:seo` fails the build on: a route missing from the metadata
  registry, a duplicate or over-length title/description, a wrong canonical, a
  missing or duplicated `h1`, unparseable JSON-LD, an orphan page, a page more
  than three clicks from the homepage, or sitemap/route drift.
- The prerenderer aborts if any route renders with almost no server-side
  content — the failure mode that made the site invisible in the first place.
- `scripts/serve-static.mjs` reproduces the production hosting contract for
  local testing. **Do not use `vite preview` to check prerendered output** —
  its SPA fallback serves the homepage shell for every path and will invent
  failures that do not exist.
