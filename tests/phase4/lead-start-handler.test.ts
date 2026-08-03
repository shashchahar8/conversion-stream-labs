import { afterEach, describe, expect, spyOn, test } from "bun:test";
import { handleLeadStartRequest } from "../../src/lib/lead-start-handler.server";
import type { LeadStartRepository } from "../../src/lib/lead-start.server";
import { ServerConfigurationError } from "../../src/lib/server-env.server";
import { validLeadStartPayload } from "./fixtures";

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
    insert: async () => ({ id: LEAD_ID }),
    ...overrides,
  };
}

describe("handleLeadStartRequest", () => {
  test("creates a persisted lead and returns 201", async () => {
    const response = await handleLeadStartRequest(request(), {
      createRepository: () => repository(),
      now: () => new Date("2026-08-03T00:00:00.000Z"),
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ success: true, leadId: LEAD_ID });
  });

  test("returns the existing lead for the same session without inserting", async () => {
    let insertCalls = 0;
    const response = await handleLeadStartRequest(request(), {
      createRepository: () =>
        repository({
          findBySessionId: async () => ({ id: LEAD_ID }),
          insert: async () => {
            insertCalls += 1;
            return { id: LEAD_ID };
          },
        }),
    });

    expect(response.status).toBe(200);
    expect(insertCalls).toBe(0);
    expect(await response.json()).toEqual({ success: true, leadId: LEAD_ID });
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
