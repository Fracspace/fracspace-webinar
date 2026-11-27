import "server-only";
import nodemailer from "nodemailer";

export interface SendEmailParams {
  email: string;
  name: string;
  webinarTitle?: string;
  webinarDate?: string;
  communityLink?: string;
  amountInr?: number;
  orderId?: string;
}

/**
 * Creates and reuses a nodemailer SMTP transporter instance.
 * Works with any standard SMTP provider: Gmail, Zoho Mail, Hostinger, AWS SES, etc.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a transactional confirmation email to the user with the webinar access details
 * and WhatsApp community link via standard SMTP (Nodemailer).
 */
export async function sendConfirmationEmail({
  email,
  name,
  webinarTitle = process.env.WEBINAR_TITLE || "Can You Own a Holiday Home in Parts?",
  webinarDate = process.env.WEBINAR_DATE || "Upcoming Webinar",
  communityLink = process.env.WHATSAPP_COMMUNITY_LINK || "",
  amountInr,
  orderId,
}: SendEmailParams): Promise<void> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      "[Email Service] SMTP configuration missing (SMTP_HOST, SMTP_USER, SMTP_PASS). Email notification skipped."
    );
    return;
  }

  const fromAddress =
    process.env.SMTP_FROM || `Fracspace Webinar <${process.env.SMTP_USER}>`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Fracspace Webinar Registration is Confirmed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6fb; margin: 0; padding: 24px; color: #2D2A3E; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(27,22,64,0.08); }
    .header { background: #1B1640; color: #ffffff; padding: 32px 28px; text-align: center; }
    .content { padding: 32px 28px; }
    .badge { display: inline-block; padding: 6px 14px; border-radius: 999px; background: #F59E0B; color: #1B1640; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; line-height: 1.25; margin: 0 0 8px; color: #ffffff; }
    .subtitle { font-size: 14px; color: #DCD3EE; margin: 0; }
    .box { background: #FFF8EF; border: 1px solid #F1E4D3; border-radius: 14px; padding: 20px; margin: 24px 0; }
    .btn { display: block; text-align: center; background: #16A34A; color: #ffffff !important; padding: 16px 24px; border-radius: 12px; font-weight: 700; font-size: 16px; text-decoration: none; margin: 24px 0 16px; }
    .footer { text-align: center; font-size: 12px; color: #7A7593; padding: 20px 28px; border-top: 1px solid #EFEAFB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">Registration Confirmed</span>
      <h1 class="title">${webinarTitle}</h1>
      <p class="subtitle">${webinarDate} · Live on Zoom</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.6; color: #5B5670;">
        Thank you for reserving your seat. Your payment has been received and your registration is confirmed.
      </p>

      <div class="box">
        <h3 style="margin: 0 0 10px; font-size: 16px; color: #1B1640;">Webinar Details</h3>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Topic:</strong> How Fractional Holiday Home Ownership Works in India</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Host:</strong> Srinivasa Unnath Reddy (Founder & MD, Fracspace)</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Format:</strong> 55 minutes, including open audience Q&A</p>
        ${amountInr ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Amount Paid:</strong> ₹${amountInr}</p>` : ""}
        ${orderId ? `<p style="margin: 4px 0; font-size: 12px; color: #7A7593;">Registration ID: ${orderId}</p>` : ""}
      </div>

      <p style="font-size: 15px; line-height: 1.6; color: #5B5670;">
        Join our dedicated WhatsApp Community to receive session reminders, Q&A guidelines, and the direct Zoom joining link:
      </p>

      ${
        communityLink
          ? `<a href="${communityLink}" class="btn">👉 Join Webinar WhatsApp Community</a>`
          : ""
      }

      <p style="font-size: 13px; line-height: 1.6; color: #7A7593; text-align: center;">
        The Zoom link will also be sent to your WhatsApp and email 30 minutes before we go live.
      </p>
    </div>
    <div class="footer">
      © 2026 Fracspace. 4th Floor, Dreamscape Hotel, Road No. 12, Banjara Hills, Hyderabad 500034.<br/>
      Need support? Contact <a href="mailto:support@fracspace.com" style="color: #1B1640;">support@fracspace.com</a> or WhatsApp +91 98806 26111.
    </div>
  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: `Registration Confirmed: ${webinarTitle}`,
    html: htmlContent,
  });
}
