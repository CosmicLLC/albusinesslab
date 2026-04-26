import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import generateWebsiteHandler from "./api/generate-website.js";
import contactHandler from "./api/contact.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, ".env");
if (existsSync(envPath)) {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (match) {
      const val = match[2].replace(/^["']|["']$/g, "");
      if (!process.env[match[1]]) process.env[match[1]] = val;
    }
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function wrapRes(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
    return res;
  };
  return res;
}

const routes = {
  "/api/generate-website": generateWebsiteHandler,
  "/api/contact": contactHandler,
};

const server = createServer(async (req, res) => {
  wrapRes(res);
  const url = new URL(req.url, `http://${req.headers.host}`);
  const handler = routes[url.pathname];
  if (!handler) {
    return res.status(404).json({ error: "Not found" });
  }
  try {
    req.body = await parseBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  try {
    await handler(req, res);
  } catch (e) {
    console.error("[api] handler error:", e);
    if (!res.headersSent) {
      res.status(500).json({ error: e.message || "Server error" });
    }
  }
});

const port = Number(process.env.API_PORT) || 8080;
server.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn("[warn] GEMINI_API_KEY not set — /api/generate-website will return 500 until you add it to .env");
  }
});
