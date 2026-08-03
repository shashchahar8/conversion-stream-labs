import { describe, expect, test } from "bun:test";
import { readServerEnv, ServerConfigurationError } from "../../src/lib/server-env.server";

describe("readServerEnv", () => {
  test("rejects missing server configuration without exposing field details", () => {
    expect(() => readServerEnv({})).toThrow(ServerConfigurationError);

    try {
      readServerEnv({});
    } catch (error) {
      expect(String(error)).not.toContain("SUPABASE_SECRET_KEY");
      expect(String(error)).not.toContain("SUPABASE_URL");
    }
  });
});
