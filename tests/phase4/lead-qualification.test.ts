import { describe, expect, test } from "bun:test";
import { qualificationUpdateSchema } from "../../src/lib/lead-qualification-schema";
import { handleLeadQualificationRequest } from "../../src/lib/lead-qualification-handler.server";
import { persistedLead } from "./fixtures";

const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const leadId = "123e4567-e89b-42d3-a456-426614174000";

describe("qualification updates", () => {
  test("rejects arbitrary fields", () => {
    expect(
      qualificationUpdateSchema.safeParse({
        sessionId,
        completedStep: 2,
        practitionerRange: "solo",
        locationRange: "1",
        capacityStatus: "some",
        acquisitionSource: "referrals",
        trelloCardId: "attack",
      }).success,
    ).toBe(false);
  });

  test("requires all fields belonging to the completed step", () => {
    expect(
      qualificationUpdateSchema.safeParse({
        sessionId,
        completedStep: 3,
        decisionAuthority: "owner",
      }).success,
    ).toBe(false);
  });

  test("rejects a wrong lead/session pair without updating Trello", async () => {
    let refreshed = false;
    const response = await handleLeadQualificationRequest(
      new Request("http://localhost/api/leads/x", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          completedStep: 4,
          primaryGrowthProblem: "referral-reliance",
        }),
      }),
      leadId,
      {
        createRepository: () => ({
          findOwned: async () => null,
          findById: async () => null,
          findByCalBookingUid: async () => null,
          updateOwned: async () => null,
          updateCalBooking: async () => persistedLead,
          recordTrelloRefresh: async () => undefined,
        }),
        refreshTrello: async () => {
          refreshed = true;
          return "synced";
        },
      },
    );
    expect(response.status).toBe(404);
    expect(refreshed).toBe(false);
  });

  test("keeps Supabase success when Trello refresh fails", async () => {
    const qualifiedLead = {
      ...persistedLead,
      practitionerRange: "solo",
      locationRange: "1",
      capacityStatus: "some",
      acquisitionSource: "referrals",
      decisionAuthority: "owner",
      googleAdsStatus: "never",
      plannedAdSpendRange: "1000-1500",
      implementationTiming: "30-days",
      websiteStatus: "needs-improvement",
      primaryGrowthProblem: "referral-reliance",
      qualificationCompletedAt: "2026-08-03T04:00:00.000Z",
    };
    const response = await handleLeadQualificationRequest(
      new Request("http://localhost/api/leads/x", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          completedStep: 5,
          nextAction: "callback",
          callbackPreference: "morning",
        }),
      }),
      leadId,
      {
        createRepository: () => ({
          findOwned: async () => qualifiedLead,
          findById: async () => qualifiedLead,
          findByCalBookingUid: async () => null,
          updateOwned: async () => qualifiedLead,
          updateCalBooking: async () => qualifiedLead,
          recordTrelloRefresh: async () => undefined,
        }),
        refreshTrello: async () => "failed",
      },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, trelloSync: "failed" });
  });
});
