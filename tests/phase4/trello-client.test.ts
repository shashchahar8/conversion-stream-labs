import { describe, expect, test } from "bun:test";
import type { TrelloEnv } from "../../src/lib/server-env.server";
import { createTrelloClient, TrelloIntegrationError } from "../../src/lib/trello.server";

const env: TrelloEnv = {
  SL_TRELLO_API_KEY: "test-api-key",
  SL_TRELLO_API_TOKEN: "test-api-token",
  SL_TRELLO_BOARD_ID: "board-id",
  SL_TRELLO_NEW_LEAD_LIST_ID: "list-id",
};

const draft = { name: "[LEAD] Jordan — Harbour Podiatry", desc: "Description" };

describe("Trello client", () => {
  test("validates the list and creates a card without credentials in the URL or body", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetchMock = async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      requests.push({ url, init });
      if (url.includes("/1/lists/")) {
        return Response.json({ idBoard: "board-id" });
      }
      return Response.json({ id: "card-id", url: "https://trello.com/c/card-id" });
    };
    const client = createTrelloClient({
      env,
      fetch: fetchMock as typeof fetch,
      validationCache: new Map(),
    });

    await expect(client.createCard(draft)).resolves.toEqual({
      id: "card-id",
      url: "https://trello.com/c/card-id",
    });
    expect(requests).toHaveLength(2);
    expect(requests[1]?.url).toBe("https://api.trello.com/1/cards");
    expect(requests[1]?.url).not.toContain(env.SL_TRELLO_API_KEY);
    expect(requests[1]?.url).not.toContain(env.SL_TRELLO_API_TOKEN);
    const body = String(requests[1]?.init?.body);
    expect(body).toContain("idList=list-id");
    expect(body).not.toContain(env.SL_TRELLO_API_KEY);
    expect(body).not.toContain(env.SL_TRELLO_API_TOKEN);
    expect(new Headers(requests[1]?.init?.headers).get("Authorization")).toContain(
      "oauth_consumer_key",
    );
  });

  test.each([
    [401, "authentication_failed"],
    [429, "rate_limited"],
  ] as const)("maps HTTP %i to %s", async (status, code) => {
    const client = createTrelloClient({
      env,
      fetch: (async () => new Response(null, { status })) as typeof fetch,
      validationCache: new Map(),
    });

    try {
      await client.createCard(draft);
      throw new Error("Expected Trello request to fail.");
    } catch (error) {
      expect(error).toBeInstanceOf(TrelloIntegrationError);
      expect((error as TrelloIntegrationError).code).toBe(code);
    }
  });

  test("rejects invalid Trello responses", async () => {
    const client = createTrelloClient({
      env,
      fetch: (async () => Response.json({ unexpected: true })) as typeof fetch,
      validationCache: new Map(),
    });

    await expect(client.createCard(draft)).rejects.toMatchObject({ code: "invalid_response" });
  });
});
