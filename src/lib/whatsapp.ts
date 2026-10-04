export type WhatsAppBookingNotificationDetails = {
  id?: string | number;
  patient_name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
};

/**
 * Sends a WhatsApp notification for a new booking using Meta WhatsApp Cloud API.
 * Uses a WhatsApp template if WHATSAPP_TEMPLATE_NAME is set, or falls back to a text message.
 */
export async function sendWhatsAppBookingNotification(
  booking: WhatsAppBookingNotificationDetails
): Promise<boolean> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const recipient = process.env.WHATSAPP_RECIPIENT_PHONE_NUMBER;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';

  if (!phoneNumberId || !accessToken || !recipient) {
    console.warn(
      'WhatsApp notification skipped: WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_ACCESS_TOKEN, or WHATSAPP_RECIPIENT_PHONE_NUMBER is not configured.'
    );
    return false;
  }

  // Clean recipient phone number (remove spaces, plus, hyphens if any)
  const cleanRecipient = recipient.replace(/[^0-9]/g, '');

  let payload: Record<string, unknown>;

  if (templateName) {
    // Template Message Payload (Recommended for Business-Initiated messaging outside 24h window)
    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanRecipient,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: templateLanguage,
        },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: String(booking.id ?? 'N/A') },
              { type: 'text', text: booking.patient_name },
              { type: 'text', text: booking.phone },
              { type: 'text', text: booking.email },
              { type: 'text', text: booking.service },
              { type: 'text', text: booking.status },
            ],
          },
        ],
      },
    };
  } else {
    // Fallback Text Message Payload (Works in Sandbox / test mode / active 24h user window)
    const textBody = [
      '🩺 *New Consultation Booking*',
      '--------------------------------',
      `🆔 *Booking ID:* ${booking.id ?? 'N/A'}`,
      `👤 *Patient:* ${booking.patient_name}`,
      `📞 *Phone:* ${booking.phone}`,
      `✉️ *Email:* ${booking.email}`,
      `🦷 *Service Focus:* ${booking.service}`,
      `📌 *Status:* ${booking.status}`,
    ].join('\n');

    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: cleanRecipient,
      type: 'text',
      text: {
        preview_url: false,
        body: textBody,
      },
    };
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.text().catch(() => 'No response body');
      // Log safely without exposing the token
      console.error(`WhatsApp Cloud API error (HTTP ${response.status}):`, errorResponse);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error instanceof Error ? error.message : error);
    return false;
  }
}
