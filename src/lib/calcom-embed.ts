export const CALCOM_ORIGIN = "https://app.cal.com";
export const CALCOM_SCRIPT_URL = `${CALCOM_ORIGIN}/embed/embed.js`;
export const CALCOM_BOOKING_EVENT = "bookingSuccessfulV2";

export interface CalBookingSignal {
  uid?: string;
  startTime?: string;
}

export function parseCalBookingEvent(event: unknown): CalBookingSignal | null {
  if (!event || typeof event !== "object") return null;
  const detail = (event as { detail?: { type?: unknown; data?: unknown } }).detail;
  if (detail?.type !== CALCOM_BOOKING_EVENT || !detail.data || typeof detail.data !== "object")
    return null;
  const data = detail.data as Record<string, unknown>;
  return {
    uid: typeof data.uid === "string" ? data.uid : undefined,
    startTime: typeof data.startTime === "string" ? data.startTime : undefined,
  };
}
