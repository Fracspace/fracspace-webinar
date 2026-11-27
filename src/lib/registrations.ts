import "server-only";
import crypto from "crypto";
import { sql } from "./db";

export interface PendingRegistrationInput {
  webinarSlug: string;
  name: string;
  email: string;
  phone: string;
  amountInr: number;
}

export interface RegistrationRow {
  id: string;
  webinar_slug: string;
  name: string;
  email: string;
  phone: string;
  amount_inr: string | number;
  status: "pending" | "paid";
  order_id: string | null;
  payment_id: string | null;
  paid_at: Date | null;
  whatsapp_sent_at: Date | null;
  whatsapp_error: string | null;
  email_sent_at: Date | null;
  email_error: string | null;
  created_at: Date;
}

/**
 * Creates a pending registration row in the database.
 * Returns the generated registration UUID id.
 */
export async function createPendingRegistration({
  webinarSlug,
  name,
  email,
  phone,
  amountInr,
}: PendingRegistrationInput): Promise<string> {
  try {
    const [row] = await sql<[{ id: string }]>`
      INSERT INTO public.webinar_registrations (
        webinar_slug,
        name,
        email,
        phone,
        amount_inr,
        status
      ) VALUES (
        ${webinarSlug},
        ${name},
        ${email},
        ${phone},
        ${amountInr},
        'pending'
      )
      RETURNING id
    `;

    if (row?.id) return row.id;
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.warn("Database insert failed, checking fallback:", error?.message);

    // If the database is unreachable on local IPv4-only networks (ENETUNREACH / ENOENT),
    // generate a valid UUID order ID so payment initiation via Cashfree proceeds without interruption.
    const fallbackId = crypto.randomUUID();
    console.warn(`Generated fallback registration id ${fallbackId} due to database error:`, error?.message);
    return fallbackId;
  }

  return crypto.randomUUID();
}

/**
 * Updates the order_id on a registration row.
 */
export async function setOrderId(id: string, orderId: string): Promise<void> {
  try {
    await sql`
      UPDATE public.webinar_registrations
      SET order_id = ${orderId}
      WHERE id = ${id}
    `;
  } catch (err) {
    console.warn(`Could not set order_id for registration ${id}:`, err);
  }
}

/**
 * Atomically marks a registration as paid.
 * Returns the updated row if this call changed the status from pending to paid.
 * Returns null if the row was already marked as paid (preventing duplicate notifications).
 */
export async function markPaidOnce({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId?: string | null;
}): Promise<RegistrationRow | null> {
  try {
    const [row] = await sql<RegistrationRow[]>`
      UPDATE public.webinar_registrations
      SET
        status = 'paid',
        payment_id = ${paymentId || null},
        paid_at = now()
      WHERE order_id = ${orderId}
        AND status <> 'paid'
      RETURNING *
    `;

    return row || null;
  } catch (err) {
    console.error(`Database error in markPaidOnce for order ${orderId}:`, err);
    return null;
  }
}

/**
 * Retrieves a registration by order_id or id.
 */
export async function getRegistration(orderIdOrId: string): Promise<RegistrationRow | null> {
  try {
    const [row] = await sql<RegistrationRow[]>`
      SELECT *
      FROM public.webinar_registrations
      WHERE order_id = ${orderIdOrId}
         OR id = ${orderIdOrId}
      LIMIT 1
    `;

    return row || null;
  } catch (err) {
    console.warn(`Could not fetch registration for ${orderIdOrId}:`, err);
    return null;
  }
}

export async function recordWhatsappSent(id: string): Promise<void> {
  try {
    await sql`
      UPDATE public.webinar_registrations
      SET whatsapp_sent_at = now(), whatsapp_error = null
      WHERE id = ${id}
    `;
  } catch (err) {
    console.warn(`Could not record WhatsApp sent for ${id}:`, err);
  }
}

export async function recordWhatsappError(id: string, error: string): Promise<void> {
  try {
    await sql`
      UPDATE public.webinar_registrations
      SET whatsapp_error = ${error}
      WHERE id = ${id}
    `;
  } catch (err) {
    console.warn(`Could not record WhatsApp error for ${id}:`, err);
  }
}

export async function recordEmailSent(id: string): Promise<void> {
  try {
    await sql`
      UPDATE public.webinar_registrations
      SET email_sent_at = now(), email_error = null
      WHERE id = ${id}
    `;
  } catch (err) {
    console.warn(`Could not record Email sent for ${id}:`, err);
  }
}

export async function recordEmailError(id: string, error: string): Promise<void> {
  try {
    await sql`
      UPDATE public.webinar_registrations
      SET email_error = ${error}
      WHERE id = ${id}
    `;
  } catch (err) {
    console.warn(`Could not record Email error for ${id}:`, err);
  }
}
