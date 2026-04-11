import { Router, type IRouter } from "express";
import { createClient } from "@supabase/supabase-js";
import { logger } from "../lib/logger";

const router: IRouter = Router();

function getSupabase() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) {
    throw new Error("Supabase credentials not configured on server.");
  }
  return createClient(url, key);
}

router.post("/contact", async (req, res) => {
  const { name, company, email, message } = req.body as {
    name?: string;
    company?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required." });
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        company: company ?? null,
        email,
        message,
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      logger.error({ err: error }, "Supabase insert error");
      res.status(500).json({ error: "Failed to save submission." });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
