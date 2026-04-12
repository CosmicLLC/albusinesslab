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

Constraint: The code must be fully responsive (mobile-friendly) using standard Tailwind responsive prefixes (md:, lg:).`;

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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `Build a website based on this description:\n\n${description}` },
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
