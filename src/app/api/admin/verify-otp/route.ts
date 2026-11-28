import { NextRequest, NextResponse } from "next/server";
import {
  OTP_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  createAdminSessionToken,
  isAllowedAdminEmail,
  verifyOtpChallenge,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

    if (!email || !otp || !isAllowedAdminEmail(email)) {
      return NextResponse.json({ error: "Invalid email or OTP." }, { status: 400 });
    }

    const challengeToken = request.cookies.get(OTP_COOKIE_NAME)?.value;
    if (!challengeToken) {
      return NextResponse.json(
        { error: "OTP session expired or missing. Please request a new OTP." },
        { status: 400 }
      );
    }

    const isValid = verifyOtpChallenge(challengeToken, email, otp);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid or expired OTP code." }, { status: 401 });
    }

    const sessionToken = createAdminSessionToken(email);
    const response = NextResponse.json({ ok: true, email });

    response.cookies.delete(OTP_COOKIE_NAME);
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin OTP verification error:", err);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
