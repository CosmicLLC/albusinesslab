import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  maxDuration: 60,
};

const SYSTEM_PROMPT = `You are an expert website builder. Given a description of a website, generate a complete, modern, visually polished, responsive HTML page with inline CSS and minimal inline JavaScript if needed.

Rules:
- Output ONLY the raw HTML. No markdown, no code fences, no explanation.
- The page must be fully self-contained — no external stylesheets, no CDN links, no external scripts.
- Use modern CSS (flexbox, grid, clamp, custom properties) for layout.
- Make it responsive and mobile-friendly.
- Use a professional color palette that fits the described business.
- Include realistic placeholder content (text, sections, calls to action).
- Add subtle visual polish: box shadows, border radius, smooth transitions, hover states.
- The HTML must start with <!DOCTYPE html> and be valid.`;

export default async function handler(req: any, res: any) {
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
  } catch (err: any) {
    console.error("Gemini error:", err);
    return res.status(500).json({ error: err.message || "Generation failed" });
  }
}
