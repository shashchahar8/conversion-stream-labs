import { z } from "zod";
import { getCalcomEnv } from "./server-env.server";
import {
  createLeadQualificationRepository,
  type LeadQualificationRepository,
} from "./lead-qualification.server";
import { refreshLeadTrelloCard } from "./trello-sync.server";

const MAX_WEBHOOK_BYTES = 65_536;

const payloadSchema = z
  .object({
    triggerEvent: z.enum(["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED"]),
    createdAt: z.string().datetime(),
    payload: z
      .object({
        uid: z.string().min(1).max(255),
        rescheduleUid: z.string().max(255).optional(),
        startTime: z.string().datetime().optional(),
        timeZone: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
        metadata: z.record(z.unknown()).optional(),
      })
      .passthrough(),
  })
  .strict();

export async function handleCalcomWebhook(
  request: Request,
  dependencies: {
    secret?: string;
    createRepository?: () => LeadQualificationRepository;
    refreshTrello?: typeof refreshLeadTrelloCard;
  } = {},
): Promise<Response> {
  const rawBody = await request.text().catch(() => "");
  if (new TextEncoder().encode(rawBody).byteLength > MAX_WEBHOOK_BYTES) return safeResponse(413);
  const signature = request.headers.get("x-cal-signature-256") ?? "";
  let secret: string;
  try {
    secret = dependencies.secret ?? getCalcomEnv().SL_CALCOM_WEBHOOK_SECRET;
  } catch {
    return safeResponse(503);
  }
  if (!(await verifyCalcomSignature(rawBody, signature, secret))) return safeResponse(401);

  let decoded: unknown;
  try {
    decoded = JSON.parse(rawBody);
  } catch {
    return safeResponse(400);
  }
  const parsed = payloadSchema.safeParse(decoded);
  if (!parsed.success) return safeResponse(400);

  try {
    const repository = (dependencies.createRepository ?? createLeadQualificationRepository)();
    const event = parsed.data;
    const metadataLeadId =
      typeof event.payload.metadata?.leadId === "string"
        ? event.payload.metadata.leadId
        : undefined;
    if (metadataLeadId && !/^[0-9a-f-]{36}$/i.test(metadataLeadId)) return safeResponse(202);
    let lead = metadataLeadId
      ? await repository.findById(metadataLeadId)
      : await repository.findByCalBookingUid(event.payload.uid);
    if (!lead && event.triggerEvent === "BOOKING_RESCHEDULED" && event.payload.rescheduleUid) {
      lead = await repository.findByCalBookingUid(event.payload.rescheduleUid);
    }

    if (!lead) return safeResponse(202);

    const alreadyHandled =
      (event.triggerEvent === "BOOKING_CREATED" &&
        lead.calBookingUid === event.payload.uid &&
        lead.calBookingStatus === "created") ||
      (event.triggerEvent === "BOOKING_CANCELLED" &&
        lead.calBookingUid === event.payload.uid &&
        lead.calBookingStatus === "cancelled") ||
      (event.triggerEvent === "BOOKING_RESCHEDULED" &&
        lead.calBookingUid === event.payload.uid &&
        lead.calBookingStatus === "rescheduled");
    if (alreadyHandled) return safeResponse(200);

    const receivedAt = event.createdAt;
    const common = { cal_webhook_received_at: receivedAt };
    if (event.triggerEvent === "BOOKING_CREATED") {
      lead = await repository.updateCalBooking(lead.id, {
        ...common,
        next_action: "booking",
        cal_booking_status: "created",
        cal_booking_uid: event.payload.uid,
        cal_booking_start_at: event.payload.startTime,
        cal_booking_timezone: event.payload.timeZone ?? event.payload.timezone,
        cal_booking_created_at: receivedAt,
        funnel_completed_at: receivedAt,
      });
    } else if (event.triggerEvent === "BOOKING_RESCHEDULED") {
      lead = await repository.updateCalBooking(lead.id, {
        ...common,
        cal_booking_status: "rescheduled",
        cal_booking_uid: event.payload.uid,
        cal_booking_start_at: event.payload.startTime,
        cal_booking_timezone: event.payload.timeZone ?? event.payload.timezone,
      });
    } else {
      lead = await repository.updateCalBooking(lead.id, {
        ...common,
        cal_booking_status: "cancelled",
        cal_booking_cancelled_at: receivedAt,
      });
    }
    await (dependencies.refreshTrello ?? refreshLeadTrelloCard)(lead);
    return safeResponse(200);
  } catch {
    console.error("[calcom-webhook] processing unavailable");
    return safeResponse(503);
  }
}

export async function verifyCalcomSignature(
  body: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  if (!signature || !secret) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1)
    mismatch |= expected.charCodeAt(index) ^ signature.toLowerCase().charCodeAt(index);
  return mismatch === 0;
}

function safeResponse(status: number): Response {
  return Response.json(
    { success: status >= 200 && status < 300 },
    { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
  );
}
