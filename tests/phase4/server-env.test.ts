import { describe, expect, test } from "bun:test";
import {
  readServerEnv,
  readCalcomEnv,
  readTrelloEnv,
  ServerConfigurationError,
  TrelloConfigurationError,
  CalcomConfigurationError,
} from "../../src/lib/server-env.server";

describe("readServerEnv", () => {
  test("rejects missing server configuration without exposing field details", () => {
    expect(() => readServerEnv({})).toThrow(ServerConfigurationError);

    try {
      readServerEnv({});
    } catch (error) {
      expect(String(error)).not.toContain("SL_SUPABASE_SECRET_KEY");
      expect(String(error)).not.toContain("SL_SUPABASE_URL");
    }
  });

  test("uses only the Stonehurst Lane runtime variable names", () => {
    expect(
      readServerEnv({
        SL_SUPABASE_URL: "https://example.supabase.co",
        SL_SUPABASE_SECRET_KEY: "test-secret",
      }),
    ).toEqual({
      SL_SUPABASE_URL: "https://example.supabase.co",
      SL_SUPABASE_SECRET_KEY: "test-secret",
    });

    expect(() =>
      readServerEnv({
        SUPABASE_URL: "https://legacy.supabase.co",
        SUPABASE_SECRET_KEY: "legacy-secret",
      }),
    ).toThrow(ServerConfigurationError);
  });

  test("requires all Trello runtime values", () => {
    expect(() => readTrelloEnv({})).toThrow(TrelloConfigurationError);
    expect(
      readTrelloEnv({
        SL_TRELLO_API_KEY: "api-key",
        SL_TRELLO_API_TOKEN: "api-token",
        SL_TRELLO_BOARD_ID: "board-id",
        SL_TRELLO_NEW_LEAD_LIST_ID: "list-id",
      }),
    ).toEqual({
      SL_TRELLO_API_KEY: "api-key",
      SL_TRELLO_API_TOKEN: "api-token",
      SL_TRELLO_BOARD_ID: "board-id",
      SL_TRELLO_NEW_LEAD_LIST_ID: "list-id",
    });
  });

  test("keeps the Cal.com webhook secret server-only and independently validated", () => {
    expect(() => readCalcomEnv({})).toThrow(CalcomConfigurationError);
    expect(readCalcomEnv({ SL_CALCOM_WEBHOOK_SECRET: "a-long-webhook-secret" })).toEqual({
      SL_CALCOM_WEBHOOK_SECRET: "a-long-webhook-secret",
    });
  });
});
