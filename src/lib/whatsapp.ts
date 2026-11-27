import "server-only";

export interface SendWhatsappParams {
  phone: string; // 91XXXXXXXXXX
  name: string;
}

/**
 * Sends the webinar welcome WhatsApp message via Meta WhatsApp Cloud API.
 * Uses official template with 4 body parameters:
 * 1: customer name
 * 2: WEBINAR_TITLE
 * 3: WEBINAR_DATE
 * 4: WHATSAPP_COMMUNITY_LINK
 */
export async function sendWelcomeMessage({ phone, name }: SendWhatsappParams): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const graphVersion = process.env.GRAPH_API_VERSION || "v21.0";
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || "en";
  const webinarTitle = process.env.WEBINAR_TITLE || "Can You Own a Holiday Home in Parts?";
  const webinarDate = process.env.WEBINAR_DATE || "Upcoming Webinar";
  const communityLink = process.env.WHATSAPP_COMMUNITY_LINK || "";

  if (!token || !phoneNumberId || !templateName) {
    throw new Error(
      "Missing WhatsApp Cloud API credentials in environment variables (WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, or WHATSAPP_TEMPLATE_NAME)."
    );
  }

  // Format recipient phone number: ensure no leading +
  const recipientPhone = phone.replace(/\D/g, "");

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: templateLang,
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: webinarTitle },
            { type: "text", text: webinarDate },
            { type: "text", text: communityLink },
          ],
        },
      ],
    },
  };

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const detail = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`WhatsApp API error: ${detail}`);
  }
}
