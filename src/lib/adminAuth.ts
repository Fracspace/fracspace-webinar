import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "vishnu@fracspace.com").trim().toLowerCase();
export const OTP_COOKIE_NAME = "fs_admin_otp_challenge";
export const SESSION_COOKIE_NAME = "fs_admin_session";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getAuthSecret(): string {
  return (
    process.env.ADMIN_AUTH_SECRET ||
    process.env.CASHFREE_SECRET_KEY ||
    process.env.DATABASE_URL ||
    "fracspace-webinar-admin-fallback-secret"
  );
}

function signHmac(data: string): string {
  return crypto.createHmac("sha256", getAuthSecret()).update(data).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function isAllowedAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}

export function createOtpChallenge(email: string): { otp: string; token: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const otp = crypto.randomInt(100000, 1000000).toString();
  const exp = Date.now() + OTP_TTL_MS;
  const payload = Buffer.from(JSON.stringify({ email: normalizedEmail, exp }), "utf-8").toString(
    "base64url"
  );
  const sig = signHmac(`${normalizedEmail}:${otp}:${exp}`);
  return { otp, token: `${payload}.${sig}` };
}

export function verifyOtpChallenge(token: string, email: string, otp: string): boolean {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const decoded = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8")) as {
      email?: string;
      exp?: number;
    };

    const normalizedEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!decoded.email || !decoded.exp) return false;
    if (decoded.email !== normalizedEmail || !isAllowedAdminEmail(normalizedEmail)) return false;
    if (Date.now() > decoded.exp) return false;

    const expectedSig = signHmac(`${normalizedEmail}:${cleanOtp}:${decoded.exp}`);
    return safeEqual(sig, expectedSig);
  } catch {
    return false;
  }
}

export function createAdminSessionToken(email: string): string {
  const normalizedEmail = email.trim().toLowerCase();
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = Buffer.from(JSON.stringify({ email: normalizedEmail, exp }), "utf-8").toString(
    "base64url"
  );
  const sig = signHmac(`session:${normalizedEmail}:${exp}`);
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string): { email: string } | null {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;

    const decoded = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8")) as {
      email?: string;
      exp?: number;
    };

    if (!decoded.email || !decoded.exp) return null;
    if (!isAllowedAdminEmail(decoded.email)) return null;
    if (Date.now() > decoded.exp) return null;

    const expectedSig = signHmac(`session:${decoded.email}:${decoded.exp}`);
    if (!safeEqual(sig, expectedSig)) return null;

    return { email: decoded.email };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}
