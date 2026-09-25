import type { NextApiRequest, NextApiResponse } from "next";
import { clearSessionCookie, isSameOrigin } from "@lib/cv-api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  if (!isSameOrigin(req)) return res.status(403).json({ error: "forbidden" });

  clearSessionCookie(req, res);
  return res.status(200).json({ ok: true });
}
