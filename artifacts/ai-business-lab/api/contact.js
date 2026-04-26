export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, company, email, message } = req.body || {};
  if (!name || !company || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("[contact] inquiry received:", {
    name,
    company,
    email,
    messageLength: message.length,
    at: new Date().toISOString(),
  });

  return res.status(200).json({ ok: true });
}
