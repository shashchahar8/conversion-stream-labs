import { describe, expect, test } from "bun:test";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createLeadStartRepository } from "../../src/lib/lead-start.server";
import { persistedLead } from "./fixtures";

describe("createLeadStartRepository", () => {
  test("finds an existing lead through a mocked Supabase client", async () => {
    const leadId = "67e55044-10b1-426f-9247-bb680e5fe0c8";
    let selectedTable = "";
    let matchedSession = "";

    const query = {
      select() {
        return this;
      },
      eq(_column: string, value: string) {
        matchedSession = value;
        return this;
      },
      async maybeSingle() {
        return {
          data: {
            id: leadId,
            status: "started",
            campaign_id: persistedLead.campaignId,
            industry_id: persistedLead.industryId,
            first_name: persistedLead.firstName,
            organisation_name: persistedLead.organisationName,
            email: persistedLead.email,
            phone: persistedLead.phone,
            first_landing_page: persistedLead.firstLandingPage,
            current_landing_page: persistedLead.currentLandingPage,
            utm_source: persistedLead.utmSource,
            utm_medium: persistedLead.utmMedium,
            utm_campaign: persistedLead.utmCampaign,
            fbclid: persistedLead.fbclid,
            cta_location: persistedLead.ctaLocation,
            created_at: persistedLead.createdAt,
            trello_sync_status: "pending",
          },
          error: null,
        };
      },
    };
    const supabase = {
      from(table: string) {
        selectedTable = table;
        return query;
      },
    } as unknown as SupabaseClient;

    const repository = createLeadStartRepository(supabase);
    const existing = await repository.findBySessionId("d9428888-122b-4c5f-a5a8-f34421d07c92");

    expect(selectedTable).toBe("leads");
    expect(matchedSession).toBe("d9428888-122b-4c5f-a5a8-f34421d07c92");
    expect(existing).toEqual(persistedLead);
  });

  test("saves Trello card details through the Supabase client", async () => {
    let updatedValues: Record<string, unknown> | undefined;
    let matchedLeadId = "";
    const query = {
      update(values: Record<string, unknown>) {
        updatedValues = values;
        return this;
      },
      async eq(_column: string, value: string) {
        matchedLeadId = value;
        return { error: null };
      },
    };
    const supabase = {
      from() {
        return query;
      },
    } as unknown as SupabaseClient;

    const repository = createLeadStartRepository(supabase);
    await repository.markTrelloSynced(
      persistedLead.id,
      "card-id",
      "https://trello.com/c/card-id",
      "2026-08-03T01:00:00.000Z",
    );

    expect(matchedLeadId).toBe(persistedLead.id);
    expect(updatedValues).toEqual({
      trello_card_id: "card-id",
      trello_card_url: "https://trello.com/c/card-id",
      trello_sync_status: "synced",
      trello_sync_error_code: null,
      trello_synced_at: "2026-08-03T01:00:00.000Z",
    });
  });
});
