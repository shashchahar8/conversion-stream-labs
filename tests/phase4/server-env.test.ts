import { describe, expect, test } from "bun:test";
import { readServerEnv, ServerConfigurationError } from "../../src/lib/server-env.server";

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
});
