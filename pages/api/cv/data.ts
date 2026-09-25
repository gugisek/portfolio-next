import type { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated, isSameOrigin } from "@lib/cv-api";
import { readPortfolio, writePortfolio } from "@lib/portfolio-store";

export const config = {
  api: { bodyParser: { sizeLimit: "2mb" } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (!isAuthenticated(req)) return res.status(401).json({ error: "unauthorized" });

  if (req.method === "GET") {
    return res.status(200).json(await readPortfolio());
  }

  if (req.method === "PUT") {
    if (!isSameOrigin(req)) return res.status(403).json({ error: "forbidden" });
    if (!req.body || typeof req.body !== "object" || !req.body.profile) {
      return res.status(400).json({ error: "invalid_body" });
    }
    try {
      return res.status(200).json(await writePortfolio(req.body));
    } catch (error) {
      console.error("[cv] saving portfolio.json failed", error);
      return res.status(500).json({ error: "write_failed" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "method_not_allowed" });
}
