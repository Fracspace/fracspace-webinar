import { NextRequest, NextResponse } from "next/server";
import { normalizeIndianPhone } from "@/lib/phone";
import { createPendingRegistration, setOrderId } from "@/lib/registrations";
import { createOrder } from "@/lib/cashfree";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid JSON body provided." },
        { status: 400 }
      );
    }

    const { name, email, phone } = body;

    // Validate Name (2 - 100 characters)
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Please enter a valid full name (between 2 and 100 characters)." },
        { status: 400 }
      );
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate and Normalize Phone Number
    const normalizedPhone = normalizeIndianPhone(phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }

    // Amount comes strictly from server environment variable
    const configuredPrice = process.env.WEBINAR_PRICE_INR;
    const amountInr = configuredPrice ? parseFloat(configuredPrice) : 99.0;

    if (isNaN(amountInr) || amountInr <= 0) {
      console.error("Invalid WEBINAR_PRICE_INR configured:", configuredPrice);
      return NextResponse.json(
        { error: "Webinar pricing configuration error." },
        { status: 500 }
      );
    }

    const webinarSlug = process.env.WEBINAR_SLUG || "fracspace-webinar";
    const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");

    // 1. Create Pending Registration in database
    const registrationId = await createPendingRegistration({
      webinarSlug,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: normalizedPhone,
      amountInr,
    });

    // 2. Prepare Cashfree details
    // customer_phone for Cashfree should be 10 digits
    const customerPhone10 = normalizedPhone.slice(2);
    const orderId = registrationId; // Use registration uuid as order_id

    let returnUrl = `${siteUrl}/success?order_id={order_id}`;
    let notifyUrl = `${siteUrl}/api/cashfree-webhook`;

    // Cashfree Production API strictly requires https:// on return_url and notify_url
    if (!returnUrl.startsWith("https://")) {
      returnUrl = returnUrl.replace(/^http:\/\//i, "https://");
    }
    if (!notifyUrl.startsWith("https://")) {
      notifyUrl = notifyUrl.replace(/^http:\/\//i, "https://");
    }

    // 3. Create Cashfree Order
    const cfOrder = await createOrder({
      orderId,
      amountInr,
      customer: {
        customerId: `c_${normalizedPhone}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: customerPhone10,
      },
      returnUrl,
      notifyUrl,
      note: `Registration for ${process.env.WEBINAR_TITLE || "Fracspace Webinar"}`,
    });

    // 4. Update order_id on registration
    await setOrderId(registrationId, cfOrder.order_id);

    const mode = process.env.CASHFREE_ENV === "production" ? "production" : "sandbox";

    // 5. Respond with only the required fields
    return NextResponse.json({
      orderId: cfOrder.order_id,
      paymentSessionId: cfOrder.payment_session_id,
      mode,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
