import type { NextApiRequest, NextApiResponse } from "next";
import { checkPassword, createSession, isConfigured } from "@lib/cv-auth";
import { clientIp, isSameOrigin, setSessionCookie } from "@lib/cv-api";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

// in-memory brute force guard: 5 wrong passwords lock the IP for 15 minutes
const globalForAttempts = globalThis as unknown as { cvLoginAttempts?: Map<string, { count: number; until: number }> };
const attempts = (globalForAttempts.cvLoginAttempts ??= new Map());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: "forbidden" });
  if (!isConfigured()) return res.status(503).json({ error: "not_configured" });

  const ip = clientIp(req);
  const entry = attempts.get(ip);
  if (entry && entry.until > Date.now()) {
    return res.status(429).json({ error: "locked", retryAfter: Math.ceil((entry.until - Date.now()) / 1000) });
  }

  if (!checkPassword(req.body?.password)) {
    const count = (entry && entry.until === 0 ? entry.count : 0) + 1;
    attempts.set(ip, { count, until: count >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : 0 });
    await new Promise((resolve) => setTimeout(resolve, 600));
    return res.status(401).json({ error: "wrong_password", attemptsLeft: Math.max(0, MAX_ATTEMPTS - count) });
  }

  attempts.delete(ip);
  setSessionCookie(req, res, createSession());
  return res.status(200).json({ ok: true });
}
