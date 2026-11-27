import "server-only";
import {
  markPaidOnce,
  recordWhatsappSent,
  recordWhatsappError,
  recordEmailSent,
  recordEmailError,
  RegistrationRow,
} from "./registrations";
import { sendWelcomeMessage } from "./whatsapp";
import { sendConfirmationEmail } from "./email";

export interface ConfirmPaymentResult {
  row: RegistrationRow | null;
  alreadyPaid: boolean;
}

/**
 * Confirms payment atomically and dispatches both WhatsApp and Email welcome messages.
 * Guaranteed to send messages exactly once because markPaidOnce returns
 * the row ONLY if this execution transitioned status from pending -> paid.
 * Delivery failures will never undo or fail the payment confirmation.
 */
export async function markPaidAndNotify({
  orderId,
  paymentId,
}: {
  orderId: string;
  paymentId?: string | null;
}): Promise<ConfirmPaymentResult> {
  // Atomic single update
  const row = await markPaidOnce({ orderId, paymentId });

  if (row) {
    // 1. Send WhatsApp Welcome Message
    try {
      await sendWelcomeMessage({ phone: row.phone, name: row.name });
      await recordWhatsappSent(row.id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`WhatsApp notification failed for registration ${row.id}:`, message);
      await recordWhatsappError(row.id, message);
    }

    // 2. Send Confirmation Email with WhatsApp Community Link
    try {
      await sendConfirmationEmail({
        email: row.email,
        name: row.name,
        amountInr: typeof row.amount_inr === "number" ? row.amount_inr : parseFloat(String(row.amount_inr)),
        orderId: row.order_id || row.id,
      });
      await recordEmailSent(row.id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Email notification failed for registration ${row.id}:`, message);
      await recordEmailError(row.id, message);
    }

    return { row, alreadyPaid: false };
  }

  // Already paid by earlier request or webhook
  return { row: null, alreadyPaid: true };
}
