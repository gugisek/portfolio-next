// Server only: password check and signed session cookie for /cv_edit.
// The password lives in .env.local as CV_EDIT_PASSWORD; without it the editor stays locked.
import crypto from "crypto";

export const SESSION_COOKIE = "cv_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

function password() {
  return process.env.CV_EDIT_PASSWORD ?? "";
}

function secret() {
  // changing the password also invalidates every open session
  return process.env.CV_EDIT_SECRET || sha256(`cv-session:${password()}`).toString("hex");
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest();
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function isConfigured() {
  return password().length > 0;
}

export function checkPassword(input: unknown) {
  if (!isConfigured() || typeof input !== "string") return false;
  return crypto.timingSafeEqual(sha256(input), sha256(password()));
}

export function createSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${expires}.${sign(String(expires))}`;
}

export function verifySession(token: string | undefined) {
  if (!isConfigured() || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}
