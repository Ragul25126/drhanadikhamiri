export type BookingNotificationDetails = {
  id?: string | number;
  patient_name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
};

export async function sendTelegramBookingNotification(booking: BookingNotificationDetails): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.');
    return false;
  }

  const message = [
    '🔔 New Booking Notification',
    '-------------------------',
    `Booking ID: ${booking.id ?? 'N/A'}`,
    `Patient Name: ${booking.patient_name}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
    `Selected Service: ${booking.service}`,
    `Booking Status: ${booking.status}`,
  ].join('\n');

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => 'No response body');
      console.error(`Telegram API request failed with status ${response.status}: ${errorData}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error instanceof Error ? error.message : error);
    return false;
  }
}
