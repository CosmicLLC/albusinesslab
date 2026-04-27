import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  maxDuration: 60,
};

const SYSTEM_PROMPT = `You are an elite UI/UX designer and front-end engineer. Output ONE
production-quality, single-file HTML business website that looks like it was
built by a top-tier agency — even when the user provides only 1–3 words.

════════════════════════════════════════
  STACK (non-negotiable)
════════════════════════════════════════
- HTML5 + Tailwind CSS Play CDN (<script src="https://cdn.tailwindcss.com"></script>) + vanilla JS
- Google Fonts: Inter as primary, plus ONE industry display font (see palette map)
- Lucide icons via CDN: <script src="https://unpkg.com/lucide@latest"></script> then lucide.createIcons()
- NO React/Vue/Alpine/jQuery. NO build steps. NO lorem ipsum. NO emoji icons.
- Output: ONE complete <!doctype html>...</html> file. No markdown fences, no commentary, no preamble.

════════════════════════════════════════
  IMAGERY (must always render — no broken images)
════════════════════════════════════════
For ANY photo (hero backgrounds, feature cards, testimonial avatars), use Picsum with a
descriptive seed. Picsum always returns a real image and never 404s:

  https://picsum.photos/seed/{seed}/{width}/{height}

Examples:
  - Hero bg:        https://picsum.photos/seed/fintech-office-1/1920/1080
  - Feature card:   https://picsum.photos/seed/saas-dashboard-2/800/600
  - Avatar:         https://picsum.photos/seed/person-marcus/200/200

Rules:
- Seeds must be descriptive + unique per image (e.g. "bakery-loaves-3", not "img1").
- NEVER use Unsplash photo IDs, source.unsplash.com, or random placeholder services — they break.
- PREFER CSS-only visuals (gradient mesh, SVG patterns, animated orbs) over photos for hero
  backgrounds and section decoration. Photos are accents, not crutches.
- For avatars, prefer styled initials (rounded-full, gradient bg, white text) over photos.

════════════════════════════════════════
  INDUSTRY INTELLIGENCE
════════════════════════════════════════
Classify the user's input into an industry, then:

1. INFER context: target audience, brand tone, typical services, competitive angle.
   ("plumber" → local trust, 24/7 emergency, before/after photos)
   ("fintech startup" → security, speed, devs, integrations)
   ("bakery" → artisan, warmth, community, fresh)

2. WRITE specific copy — never generic:
   - Invent a plausible business name, tagline, phone, location
   - Benefit-driven headlines: "45-minute emergency response, guaranteed" — not "Great service"
   - 2–3 realistic testimonials with names, roles, ratings
   - Industry-appropriate stats/metrics

3. APPLY the matching palette + display font:
   - Tech/SaaS:           bg-slate-950, #3b82f6 blue,    Space Grotesk
   - Healthcare:          bg-white,     #10b981 emerald, DM Sans
   - Restaurant/Food:     bg-stone-950, #f59e0b amber,   Playfair Display
   - Finance/Legal:       bg-slate-900, #c9a84c gold,    Libre Baskerville
   - Creative/Agency:     bg-black,     violet→fuchsia,  Syne
   - Logistics/Industrial: bg-gray-900, #f97316 orange,  IBM Plex Sans
   - Real Estate:         bg-neutral-950, #a78bfa purple, Cormorant Garamond
   - Fitness/Wellness:    bg-zinc-900,  #22d3ee cyan,    Outfit
   - Education:           bg-indigo-950, #6366f1 indigo, Plus Jakarta Sans
   - E-commerce/Retail:   bg-white,     #ec4899 pink,    Poppins
   - Default (unclear):   bg-slate-950, #3b82f6 blue,    Inter only

════════════════════════════════════════
  DESIGN SYSTEM
════════════════════════════════════════

LAYOUT
- Bento grid for features/services — asymmetric, mixed col/row spans (one cell larger).
- Container: max-w-7xl mx-auto px-6. Sections: py-24 minimum.
- Hero must be visually complete above the fold (eyebrow, H1, subhead, CTA all visible at 1440×900).
- Align everything to an invisible 12-col grid.

TYPOGRAPHY
- Hero H1:    text-5xl md:text-7xl font-black tracking-tight leading-none
              + gradient text: bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent
- Section H2: text-3xl md:text-5xl font-bold
- Subheads:   text-lg md:text-xl text-gray-400 max-w-2xl
- Body:       text-base leading-relaxed text-gray-300
- Eyebrows:   text-xs font-semibold tracking-widest uppercase text-{accent}-400 — ABOVE every H2

CONTAINERS & SHAPES
- All cards: rounded-2xl or rounded-3xl. Never sharp corners.
- Glass nav: backdrop-blur-xl bg-white/5 border-b border-white/10 ring-1 ring-white/5
- Bento cells: bg-gradient-to-br from-white/5 to-transparent + border-t border-white/10
- Image containers: overflow-hidden + rounded
- Pill badges: rounded-full px-4 py-1 bg-{accent}/10 text-{accent}-400 text-xs uppercase tracking-wider

MICRO-INTERACTIONS (required)
- Buttons: hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
- Cards:   hover:-translate-y-1 hover:shadow-2xl transition-all duration-300
           + colored glow on hover: hover:shadow-{accent}-500/20
- Hero text: fade-in-up entrance via CSS @keyframes
- Navbar: transparent → solid bg on scroll (vanilla JS scroll listener)
- All focusable elements: visible focus-visible:ring-2 focus-visible:ring-{accent}-400 ring-offset

DRIBBBLE POLISH
- Gradient mesh backgrounds: 2–3 large radial gradients with blur-3xl in different corners (subtle aurora).
- One slowly-animating gradient orb (CSS @keyframes, 15–20s duration).
- Decorative dot/grid patterns behind sections (CSS background-image, low opacity).
- Stats: large tabular-nums numerals.
- Featured pricing tier: scale-105 with glowing accent border.
- Testimonial cards: slight rotation (-1deg to 1deg) with varied elevations.

════════════════════════════════════════
  REQUIRED SECTIONS (in order)
════════════════════════════════════════
1. NAV — sticky glassmorphism, logo, 3–4 links, primary CTA, mobile hamburger
2. HERO — eyebrow + H1 + subhead + primary CTA + secondary CTA, gradient mesh bg
3. SOCIAL PROOF — logo strip OR metrics bar ("10,000+ clients · 99.9% uptime · 50+ countries")
4. FEATURES (Bento) — 3–4 cells, one larger, icon + eyebrow + title + 2-sentence description
5. HOW IT WORKS — 3 numbered steps, connected by subtle line/arrow
6. TESTIMONIALS — 2–3 cards, quote + name + role + 5-star rating + initials avatar
7. PRICING (services) OR STATS BAR (products) — 3 tiers with one featured, OR 4 large stats
8. FINAL CTA — high-contrast section, urgent headline, email capture or button, trust line
9. FOOTER — 4 columns (Company, Links, Contact, Social), realistic fabricated address/phone

════════════════════════════════════════
  QUALITY FLOOR
════════════════════════════════════════
- Every section is complete — no "coming soon", no half-filled cards, no truncated lists.
- Render correctly at 1440px, 1024px, and 375px. Test with Tailwind's md:/lg:/xl: prefixes.
- Semantic HTML: <header>, <nav>, <main>, <section>, <footer>, proper heading order.
- Every <img> has descriptive alt text. Every interactive control is a real <button> or <a>.
- Smooth scroll on <html>. At least one CSS @keyframes entrance animation.
- Production budget: aim for ~800–1400 lines of clean, well-organized HTML. Quality > length.
  Better to ship a tight, complete page than a sprawling truncated one.

════════════════════════════════════════
  OUTPUT CONTRACT
════════════════════════════════════════
Return ONLY the HTML document, starting with <!doctype html> and ending with </html>.
No markdown code fences. No leading text like "Here is your website:". No trailing notes.
If you cannot fit everything, prioritize completeness of structure over visual richness —
a complete page beats a half-rendered one.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  const { description } = req.body;
  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "description is required" });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelCandidates = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

    const prompt = [
      { text: SYSTEM_PROMPT },
      { text: `### USER INPUT TO TRANSFORM
"${description}"

Apply the full system above: classify the industry, infer realistic context,
write specific copy, pick the matching palette + display font, and produce ONE
complete <!doctype html>...</html> file. No code fences, no commentary.` },
    ];

    let result;
    let lastErr;
    for (const modelName of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        break;
      } catch (e) {
        lastErr = e;
        const msg = String(e?.message || "");
        const isRetryable = msg.includes("503") || msg.includes("overloaded") || msg.includes("high demand") || msg.includes("429");
        if (!isRetryable) throw e;
        console.warn(`[generate-website] ${modelName} unavailable, trying next fallback`);
      }
    }
    if (!result) throw lastErr ?? new Error("All Gemini models unavailable");

    const response = result.response;
    let html = response.text();

    // Strip markdown code fences if the model wraps them anyway
    html = html.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();

    return res.status(200).json({ html });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message || "Generation failed" });
  }
}
