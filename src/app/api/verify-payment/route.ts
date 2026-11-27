import { NextRequest, NextResponse } from "next/server";
import { getSuccessfulPayment } from "@/lib/cashfree";
import { markPaidAndNotify } from "@/lib/confirmPayment";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object" || !body.orderId) {
      return NextResponse.json(
        { error: "orderId is required." },
        { status: 400 }
      );
    }

    const { orderId } = body;

    // Check configured expected price (temporarily defaulting to 1 INR for production testing)
    const configuredPrice = process.env.WEBINAR_PRICE_INR;
    const expectedAmount = configuredPrice ? parseFloat(configuredPrice) : 1.0;

    // 1. Check with Cashfree API directly (never trust the browser)
    const payment = await getSuccessfulPayment(orderId, expectedAmount);

    if (!payment) {
      return NextResponse.json({
        paid: false,
      });
    }

    // 2. Mark registration paid and send WhatsApp/Email notifications once
    await markPaidAndNotify({
      orderId,
      paymentId: payment.cf_payment_id,
    });

    // 3. Return confirmation and community link
    return NextResponse.json({
      paid: true,
      communityLink:
        process.env.WHATSAPP_COMMUNITY_LINK ||
        "https://chat.whatsapp.com/F1plK69ahDzGdGWuaJhnnG",
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { paid: false, error: "Payment verification failed." },
      { status: 500 }
    );
  }
}
