import "server-only";
import crypto from "crypto";

export interface CashfreeCustomer {
  customerId: string;
  name: string;
  email: string;
  phone: string; // 10 digits
}

export interface CreateOrderParams {
  orderId: string;
  amountInr: number;
  customer: CashfreeCustomer;
  returnUrl: string;
  notifyUrl: string;
  note?: string;
}

export interface CashfreeOrderResponse {
  order_id: string;
  payment_session_id: string;
  order_status?: string;
  order_amount?: number;
  order_currency?: string;
}

export interface CashfreePayment {
  cf_payment_id: string;
  order_id: string;
  payment_status: "SUCCESS" | "FAILED" | "PENDING" | "USER_DROPPED" | string;
  payment_amount: number;
  payment_currency: string;
  payment_time?: string;
  payment_message?: string;
}

function getCashfreeConfig() {
  const appId = process.env.CASHFREE_APP_ID?.trim();
  const secretKey = process.env.CASHFREE_SECRET_KEY?.trim();
  const apiVersion = (process.env.CASHFREE_API_VERSION || "2025-01-01").trim();

  if (!appId || !secretKey) {
    throw new Error("Missing CASHFREE_APP_ID or CASHFREE_SECRET_KEY in environment variables.");
  }

  const env = (
    process.env.CASHFREE_ENV ||
    (secretKey.startsWith("cfsk_ma_prod_") ? "production" : "sandbox")
  )
    .trim()
    .toLowerCase();

  const baseUrl =
    env === "production"
      ? "https://api.cashfree.com/pg"
      : "https://sandbox.cashfree.com/pg";

  return {
    baseUrl,
    appId,
    secretKey,
    apiVersion,
  };
}

/**
 * Creates a payment order on Cashfree Payment Gateway.
 */
export async function createOrder({
  orderId,
  amountInr,
  customer,
  returnUrl,
  notifyUrl,
  note,
}: CreateOrderParams): Promise<CashfreeOrderResponse> {
  const { baseUrl, appId, secretKey, apiVersion } = getCashfreeConfig();

  const payload = {
    order_id: orderId,
    order_amount: Number(amountInr.toFixed(2)),
    order_currency: "INR",
    customer_details: {
      customer_id: customer.customerId,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
    },
    order_meta: {
      return_url: returnUrl.startsWith("https://") ? returnUrl : returnUrl.replace(/^http:\/\//i, "https://"),
      notify_url: notifyUrl.startsWith("https://") ? notifyUrl : notifyUrl.replace(/^http:\/\//i, "https://"),
    },
    order_note: note || "Webinar Registration",
  };

  const response = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": appId,
      "x-client-secret": secretKey,
      "x-api-version": apiVersion,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Cashfree order creation failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  if (!data?.payment_session_id) {
    throw new Error("Cashfree response did not include payment_session_id");
  }

  return {
    order_id: data.order_id,
    payment_session_id: data.payment_session_id,
    order_status: data.order_status,
    order_amount: data.order_amount,
    order_currency: data.order_currency,
  };
}

/**
 * Fetches all payments for an order from Cashfree and returns the successful payment.
 * Also checks that the payment amount matches the expected amount if provided.
 */
export async function getSuccessfulPayment(
  orderId: string,
  expectedAmount?: number
): Promise<CashfreePayment | null> {
  const { baseUrl, appId, secretKey, apiVersion } = getCashfreeConfig();

  const response = await fetch(`${baseUrl}/orders/${encodeURIComponent(orderId)}/payments`, {
    method: "GET",
    headers: {
      "x-client-id": appId,
      "x-client-secret": secretKey,
      "x-api-version": apiVersion,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payments: CashfreePayment[] = await response.json();

  if (!Array.isArray(payments) || payments.length === 0) {
    return null;
  }

  // Find a payment with status SUCCESS
  const successfulPayment = payments.find(
    (p) => String(p.payment_status).toUpperCase() === "SUCCESS"
  );

  if (!successfulPayment) {
    return null;
  }

  // If an expected amount is specified, verify that the paid amount matches
  if (typeof expectedAmount === "number" && !isNaN(expectedAmount)) {
    const actualPaid = Number(successfulPayment.payment_amount);
    if (Math.abs(actualPaid - expectedAmount) > 0.01) {
      console.error(
        `Payment amount mismatch for order ${orderId}: expected ${expectedAmount}, received ${actualPaid}`
      );
      return null;
    }
  }

  return successfulPayment;
}

/**
 * Verifies the Cashfree webhook signature using HMAC-SHA256 and timingSafeEqual.
 */
export function verifyWebhookSignature(
  rawBody: string,
  timestamp: string,
  signature: string
): boolean {
  try {
    const { secretKey } = getCashfreeConfig();

    if (!timestamp || !signature || !rawBody || !secretKey) {
      return false;
    }

    const payload = `${timestamp}${rawBody}`;
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(payload)
      .digest("base64");

    const providedBuffer = Buffer.from(signature, "utf-8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf-8");

    if (providedBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
  } catch {
    return false;
  }
}
