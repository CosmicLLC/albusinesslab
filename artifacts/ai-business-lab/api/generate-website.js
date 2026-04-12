import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  maxDuration: 60,
};

const SYSTEM_PROMPT = `Role: Senior UI/UX Architect & Frontend Engineer.
Objective: Transform a brief business description into a production-ready, high-fidelity single-page landing page mockup.

Output Rules:

Format: Output ONLY raw, valid HTML. No markdown code blocks, no preamble, no conversational text.

Dependencies:
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.
- Use Google Fonts (Inter): <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">.
- Use Lucide-Icons via CDN or standard SVG paths.
- Imagery: Use https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=1200 with contextually relevant photo IDs (e.g., luxury furniture for logistics, clean tech for SaaS).

Design System Requirements:

Layout: Use a Bento Box grid for features. Ensure 80px+ vertical padding between sections.

Styling: Use rounded-2xl or rounded-3xl for all containers. Implement subtle backdrop-blur-md on navigation bars.

Colors: Default to a "Dark Mode" aesthetic (bg-slate-950) with primary accents in #3b82f6 (Blue) unless the user description implies a different brand palette.

Copywriting: Generate professional headers, subheaders, and benefit-driven bullet points. Do not use "Lorem Ipsum."

Structural Template:

Navigation: Sticky top, minimalist logo, "Get Started" CTA.

Hero: Impactful H1, sub-headline, and primary/secondary button pair.

Social Proof: A "Trusted By" marquee or a testimonial block.

Features: A 3-to-4 item Bento Grid showcasing specific business benefits.

Final CTA: A high-contrast section with a lead-capture form or button.

Footer: Minimalist links and copyright.

Constraint: The code must be fully responsive (mobile-friendly) using standard Tailwind responsive prefixes (md:, lg:).

Handling Minimal Input:

Users will often provide very brief descriptions like "dentist in Austin" or "SaaS dashboard tool." You MUST expand minimal input into a fully realized website by making smart inferences:

1. Business Intelligence: Infer the industry, target audience, typical services/features, competitive positioning, and tone from even a few words. A "plumber" implies local service, trust signals, emergency availability, before/after photos. A "fintech startup" implies security, speed, integrations, developer-friendly.

2. Content Generation: Always generate realistic, specific content — never generic. Instead of "We provide great services," write "24/7 emergency plumbing with a 45-minute response guarantee." Invent a plausible business name, tagline, phone number, and location if not provided.

3. Color & Mood Inference: Match the color palette to the industry. Healthcare = calming blues/greens. Restaurants = warm amber/burgundy. Tech/SaaS = dark mode with electric blue or purple accents. Legal = navy and gold. Creative agencies = bold gradients or monochrome with one pop color.

4. Image Selection: Pick Unsplash photo IDs that are contextually specific. For a bakery, use actual bakery/bread photos, not generic business stock. Use real Unsplash photo IDs that you know exist (e.g., photo-1509440159596-0249088772ff for bread, photo-1504674900247-0877df9cc836 for food plating).

5. Section Depth: Even if the user says nothing about sections, ALWAYS generate at minimum:
   - Hero with a specific, benefit-driven headline and realistic subtext
   - 3-4 specific services or features with icons and descriptions tailored to the business
   - Social proof (2-3 fabricated but realistic testimonials with names, roles, and star ratings)
   - A pricing section OR a stats/metrics bar (whichever fits the business model)
   - A strong final CTA with urgency language appropriate to the industry
   - Complete footer with fabricated but realistic address, phone, email, and social links

6. Micro-interactions: Add CSS hover effects on all cards and buttons (scale, shadow lift, color transitions). Add subtle gradient overlays on hero images. Use CSS animations for the hero text (fade-in-up on load).

7. Typography Hierarchy: Use clear size differentiation — hero H1 at text-5xl/6xl, section headers at text-3xl/4xl, card titles at text-xl. Never let two adjacent text elements look the same size.

8. Whitespace: When in doubt, add MORE whitespace. Generous padding (py-20 to py-32 between sections) makes even simple content look premium.`;

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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `### STRATEGIC CONTEXT ENHANCEMENT
The following business description is provided by a user. Your goal is to amplify this minimal input into a high-converting, professional design by applying these "Expert Inference" rules:

1. INDUSTRY CLASSIFICATION:
   - Identify the industry (e.g., Logistics, SaaS, Retail, Service).
   - Apply an appropriate color palette:
     - Logistics/Industrial: Slate/Amber/Navy.
     - Tech/AI: Black/Electric Blue/Violet.
     - Health/Wellness: White/Sage/Stone.

2. CONTENT EXPANSION:
   - If user input < 10 words, generate a "Hero H1" that focuses on the VALUE, not the product.
   - Invent 3 specific "Key Benefits" (e.g., "Global Tracking," "White-Glove Delivery," "Sustainable Sourcing").
   - Create a "Process" section explaining how the business works in 3 steps.

3. THE "STITCH" DESIGN DNA:
   - Layout: Heavy use of "Bento Grids" (asymmetrical rounded cards).
   - Components: Glassmorphism headers, high-contrast buttons with ring offsets, and oversized typography (text-5xl to text-7xl).
   - Assets: All <img> tags must use professional Unsplash IDs. Do not use generic placeholders.

4. TECHNICAL OUTPUT:
   - Return ONLY raw HTML/Tailwind code.
   - Ensure the <head> includes Tailwind Play CDN and 'Inter' font.
   - All code must be responsive (mobile-first).

### USER INPUT TO TRANSFORM:
"${description}"` },
    ]);

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
