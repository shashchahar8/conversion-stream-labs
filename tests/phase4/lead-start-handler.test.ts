import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { handleLeadStartRequest } from "../../src/lib/lead-start-handler.server";
import type { LeadStartRepository } from "../../src/lib/lead-start.server";
import { ServerConfigurationError } from "../../src/lib/server-env.server";
import { TrelloIntegrationError } from "../../src/lib/trello.server";
import { persistedLead, validLeadStartPayload } from "./fixtures";

const LEAD_ID = "67e55044-10b1-426f-9247-bb680e5fe0c8";

afterEach(() => {
  spyOn(console, "error").mockRestore();
});

function request(payload: unknown = validLeadStartPayload): Request {
  return new Request("https://stonehurstlane.com/api/leads/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

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

describe("handleLeadStartRequest", () => {
  test("creates a persisted lead and returns 201", async () => {
    const response = await handleLeadStartRequest(request(), {
      createRepository: () => repository(),
      createTrelloClient: () => ({
        createCard: async () => ({ id: "trello-card", url: "https://trello.com/c/test" }),
      }),
      now: () => new Date("2026-08-03T00:00:00.000Z"),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      success: true,
      leadId: LEAD_ID,
      trelloSync: "synced",
    });
  });

  test("returns the existing lead for the same session without inserting", async () => {
    let insertCalls = 0;
    let trelloClientCalls = 0;
    const response = await handleLeadStartRequest(request(), {
      createRepository: () =>
        repository({
          findBySessionId: async () => ({
            ...persistedLead,
            trelloCardId: "trello-card",
            trelloCardUrl: "https://trello.com/c/test",
            trelloSyncStatus: "synced",
          }),
          insert: async () => {
            insertCalls += 1;
            return persistedLead;
          },
        }),
      createTrelloClient: () => {
        trelloClientCalls += 1;
        return {
          createCard: async () => ({ id: "new-card", url: "https://trello.com/c/new-card" }),
        };
      },
    });

    expect(response.status).toBe(200);
    expect(insertCalls).toBe(0);
    expect(trelloClientCalls).toBe(0);
    expect(await response.json()).toEqual({
      success: true,
      leadId: LEAD_ID,
      trelloSync: "synced",
    });
  });

  test("returns persisted success when Trello fails", async () => {
    spyOn(console, "error").mockImplementation(() => undefined);
    let failureCode = "";
    const response = await handleLeadStartRequest(request(), {
      createRepository: () =>
        repository({
          markTrelloFailed: async (_leadId, code) => {
            failureCode = code;
          },
        }),
      createTrelloClient: () => ({
        createCard: async () => {
          throw new TrelloIntegrationError("missing_configuration");
        },
      }),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({
      success: true,
      leadId: LEAD_ID,
      trelloSync: "failed",
    });
    expect(failureCode).toBe("missing_configuration");
  });

  test("returns a safe 503 when persistence fails", async () => {
    spyOn(console, "error").mockImplementation(() => undefined);
    const response = await handleLeadStartRequest(request(), {
      createRepository: () =>
        repository({
          insert: async () => {
            throw new Error("https://secret-project.supabase.co table leads failed");
          },
        }),
    });
    const body = JSON.stringify(await response.json());

    expect(response.status).toBe(503);
    expect(body).not.toContain("supabase");
    expect(body).not.toContain("table");
    expect(body).not.toContain("secret-project");
  });

  test("returns a safe 503 when server configuration is missing", async () => {
    spyOn(console, "error").mockImplementation(() => undefined);
    const response = await handleLeadStartRequest(request(), {
      createRepository: () => {
        throw new ServerConfigurationError();
      },
    });

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      success: false,
      message: "We could not save your details right now. Please try again.",
    });
  });

  test("rejects invalid content types", async () => {
    const response = await handleLeadStartRequest(
      new Request("https://stonehurstlane.com/api/leads/start", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "not json",
      }),
    );

    expect(response.status).toBe(415);
  });

  test("rejects oversized request bodies", async () => {
    const response = await handleLeadStartRequest(
      request({ ...validLeadStartPayload, referrer: "x".repeat(17_000) }),
    );

    expect(response.status).toBe(413);
  });
});
