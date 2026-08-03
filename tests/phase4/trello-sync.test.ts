import { afterEach, describe, expect, spyOn, test } from "bun:test";
import type { LeadStartRepository } from "../../src/lib/lead-start.server";
import { syncLeadToTrello } from "../../src/lib/trello-sync.server";
import { TrelloIntegrationError } from "../../src/lib/trello.server";
import { persistedLead } from "./fixtures";

afterEach(() => {
  spyOn(console, "error").mockRestore();
});

function repository(overrides: Partial<LeadStartRepository> = {}): LeadStartRepository {
  return {
    findBySessionId: async () => null,
    insert: async () => persistedLead,
    markTrelloAttempt: async () => undefined,
    markTrelloSynced: async () => undefined,
    markTrelloFailed: async () => undefined,
    ...overrides,
  };
}

describe("syncLeadToTrello", () => {
  test("saves the Trello card ID and URL to Supabase", async () => {
    let saved: unknown[] = [];
    const result = await syncLeadToTrello(
      persistedLead,
      repository({
        markTrelloSynced: async (...values) => {
          saved = values;
        },
      }),
      {
        createClient: () => ({
          createCard: async () => ({ id: "card-id", url: "https://trello.com/c/card-id" }),
        }),
        now: () => new Date("2026-08-03T01:00:00.000Z"),
      },
    );

    expect(result).toBe("synced");
    expect(saved).toEqual([
      persistedLead.id,
      "card-id",
      "https://trello.com/c/card-id",
      "2026-08-03T01:00:00.000Z",
    ]);
  });

  test("keeps the persisted lead successful when Trello fails", async () => {
    spyOn(console, "error").mockImplementation(() => undefined);
    let failureCode = "";
    const result = await syncLeadToTrello(
      persistedLead,
      repository({
        markTrelloFailed: async (_leadId, code) => {
          failureCode = code;
        },
      }),
      {
        createClient: () => ({
          createCard: async () => {
            throw new TrelloIntegrationError("trello_unavailable");
          },
        }),
      },
    );

    expect(result).toBe("failed");
    expect(failureCode).toBe("trello_unavailable");
  });

  test("does not create a second card when a card ID already exists", async () => {
    let creates = 0;
    let attempts = 0;
    const result = await syncLeadToTrello(
      { ...persistedLead, trelloCardId: "existing-card", trelloSyncStatus: "synced" },
      repository({
        markTrelloAttempt: async () => {
          attempts += 1;
        },
      }),
      {
        createClient: () => ({
          createCard: async () => {
            creates += 1;
            return { id: "new-card", url: "https://trello.com/c/new-card" };
          },
        }),
      },
    );

    expect(result).toBe("synced");
    expect(creates).toBe(0);
    expect(attempts).toBe(0);
  });

  test("logs only a safe failure category", async () => {
    const log = spyOn(console, "error").mockImplementation(() => undefined);
    await syncLeadToTrello(persistedLead, repository(), {
      createClient: () => ({
        createCard: async () => {
          throw new Error("credential test-api-token for jordan@example.com");
        },
      }),
    });

    const output = JSON.stringify(log.mock.calls);
    expect(output).toContain("trello_unavailable");
    expect(output).not.toContain("test-api-token");
    expect(output).not.toContain("jordan@example.com");
  });
});
