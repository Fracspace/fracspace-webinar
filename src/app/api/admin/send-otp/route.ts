import { NextRequest, NextResponse } from "next/server";
import {
  OTP_COOKIE_NAME,
  createOtpChallenge,
  isAllowedAdminEmail,
} from "@/lib/adminAuth";
import { sendAdminOtpEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !isAllowedAdminEmail(email)) {
      return NextResponse.json(
        { error: "Unauthorized email address." },
        { status: 403 }
      );
    }

    const { otp, token } = createOtpChallenge(email);

    await sendAdminOtpEmail({ email, otp });

    const response = NextResponse.json({
      ok: true,
      message: `A 6-digit OTP has been sent to ${email}.`,
    });

    response.cookies.set(OTP_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60, // 10 minutes
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    console.error("Failed to send admin OTP:", err);
    const message =
      err instanceof Error ? err.message : "Failed to send OTP email. Please check SMTP settings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
