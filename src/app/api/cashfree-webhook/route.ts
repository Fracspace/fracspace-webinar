import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/cashfree";
import { markPaidAndNotify } from "@/lib/confirmPayment";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Read raw body as text BEFORE any JSON parsing to compute exact signature
    const rawBody = await request.text();

    const timestamp = request.headers.get("x-webhook-timestamp");
    const signature = request.headers.get("x-webhook-signature");

    if (!timestamp || !signature) {
      console.warn("Cashfree webhook missing timestamp or signature headers.");
      return NextResponse.json({ error: "Missing signature headers." }, { status: 400 });
    }

    // Verify webhook signature with constant-time equality
    const isValid = verifyWebhookSignature(rawBody, timestamp, signature);

    if (!isValid) {
      console.warn("Invalid Cashfree webhook signature.");
      return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);

    // Process PAYMENT_SUCCESS_WEBHOOK
    if (
      payload?.type === "PAYMENT_SUCCESS_WEBHOOK" &&
      payload?.data?.payment?.payment_status === "SUCCESS"
    ) {
      const orderId = payload.data?.order?.order_id;
      const paymentId = payload.data?.payment?.cf_payment_id;

      if (orderId) {
        await markPaidAndNotify({
          orderId,
          paymentId: paymentId ? String(paymentId) : undefined,
        });
      }
    }

    // Return 200 on success
    return NextResponse.json({ status: "ok" });
  } catch (error: unknown) {
    // Return 500 on processing errors so Cashfree retries the webhook
    console.error("Cashfree webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
