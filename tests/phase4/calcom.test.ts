import { describe, expect, test } from "bun:test";
import { CALCOM_BOOKING_EVENT, parseCalBookingEvent } from "../../src/lib/calcom-embed";
import { handleCalcomWebhook, verifyCalcomSignature } from "../../src/lib/calcom-webhook.server";
import { persistedLead } from "./fixtures";

const secret = "a-test-webhook-secret-that-is-long";

async function sign(body: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

describe("Cal.com integration", () => {
  test("uses only the documented bookingSuccessfulV2 client signal", () => {
    expect(
      parseCalBookingEvent({ detail: { type: CALCOM_BOOKING_EVENT, data: { uid: "booking-1" } } }),
    ).toEqual({ uid: "booking-1", startTime: undefined });
    expect(parseCalBookingEvent({ detail: { type: "bookingSuccessful", data: {} } })).toBeNull();
  });

  test("verifies the raw body HMAC", async () => {
    const body = '{"hello":"world"}';
    expect(await verifyCalcomSignature(body, await sign(body), secret)).toBe(true);
    expect(await verifyCalcomSignature(`${body} `, await sign(body), secret)).toBe(false);
  });

  test("rejects an invalid signature before repository access", async () => {
    let accessed = false;
    const response = await handleCalcomWebhook(
      new Request("http://localhost/api/integrations/calcom/webhook", {
        method: "POST",
        headers: { "x-cal-signature-256": "bad" },
        body: "{}",
      }),
      {
        secret,
        createRepository: () => {
          accessed = true;
          throw new Error("unused");
        },
      },
    );
    expect(response.status).toBe(401);
    expect(accessed).toBe(false);
  });

  test("persists a signed booking and treats Trello as best effort", async () => {
    const body = JSON.stringify({
      triggerEvent: "BOOKING_CREATED",
      createdAt: "2026-08-03T04:00:00.000Z",
      payload: {
        uid: "booking-1",
        startTime: "2026-08-04T04:00:00.000Z",
        timeZone: "Australia/Sydney",
        metadata: { leadId: persistedLead.id },
      },
    });
    let patch: Record<string, unknown> = {};
    const response = await handleCalcomWebhook(
      new Request("http://localhost/api/integrations/calcom/webhook", {
        method: "POST",
        headers: { "x-cal-signature-256": await sign(body) },
        body,
      }),
      {
        secret,
        createRepository: () => ({
          findOwned: async () => null,
          findById: async () => persistedLead,
          findByCalBookingUid: async () => null,
          updateOwned: async () => persistedLead,
          updateCalBooking: async (_id, next) => {
            patch = next;
            return { ...persistedLead, calBookingUid: "booking-1" };
          },
          recordTrelloRefresh: async () => undefined,
        }),
        refreshTrello: async () => "failed",
      },
    );
    expect(response.status).toBe(200);
    expect(patch).toMatchObject({
      next_action: "booking",
      cal_booking_status: "created",
      cal_booking_uid: "booking-1",
    });
  });

  test("acknowledges duplicate authoritative delivery without repeating side effects", async () => {
    const body = JSON.stringify({
      triggerEvent: "BOOKING_CREATED",
      createdAt: "2026-08-03T04:00:00.000Z",
      payload: { uid: "booking-1", metadata: { leadId: persistedLead.id } },
    });
    let updates = 0;
    const response = await handleCalcomWebhook(
      new Request("http://localhost/api/integrations/calcom/webhook", {
        method: "POST",
        headers: { "x-cal-signature-256": await sign(body) },
        body,
      }),
      {
        secret,
        createRepository: () => ({
          findOwned: async () => null,
          findById: async () => ({
            ...persistedLead,
            calBookingUid: "booking-1",
            calBookingStatus: "created",
          }),
          findByCalBookingUid: async () => null,
          updateOwned: async () => persistedLead,
          updateCalBooking: async () => {
            updates += 1;
            return persistedLead;
          },
          recordTrelloRefresh: async () => undefined,
        }),
        refreshTrello: async () => {
          updates += 1;
          return "synced";
        },
      },
    );
    expect(response.status).toBe(200);
    expect(updates).toBe(0);
  });
});
