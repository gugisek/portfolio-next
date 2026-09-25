// Server only: shared bits of the /api/cv/* routes.
import type { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, verifySession } from "./cv-auth";

export function isAuthenticated(req: NextApiRequest) {
  return verifySession(req.cookies[SESSION_COOKIE]);
}

/** Blocks cross-site form posts: a browser always sends Origin on POST/PUT. */
export function isSameOrigin(req: NextApiRequest) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

function isHttps(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-proto"];
  return forwarded === "https" || Boolean((req.socket as { encrypted?: boolean }).encrypted);
}

export function setSessionCookie(req: NextApiRequest, res: NextApiResponse, token: string) {
  res.setHeader("Set-Cookie", cookie(req, token, SESSION_TTL_SECONDS));
}

export function clearSessionCookie(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", cookie(req, "", 0));
}

function cookie(req: NextApiRequest, value: string, maxAge: number) {
  return [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${maxAge}`,
    isHttps(req) ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clientIp(req: NextApiRequest) {
  const forwarded = req.headers["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return first?.trim() || req.socket.remoteAddress || "unknown";
}
