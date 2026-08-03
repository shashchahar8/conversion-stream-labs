import { describe, expect, test } from "bun:test";
import { leadStartSchema } from "../../src/lib/lead-start-schema";
import { validLeadStartPayload } from "./fixtures";

describe("leadStartSchema", () => {
  test("accepts a valid lead-start payload", () => {
    expect(leadStartSchema.safeParse(validLeadStartPayload).success).toBe(true);
  });

  test("rejects an invalid email", () => {
    const result = leadStartSchema.safeParse({ ...validLeadStartPayload, email: "invalid" });
    expect(result.success).toBe(false);
  });

  test("rejects an invalid session UUID", () => {
    const result = leadStartSchema.safeParse({ ...validLeadStartPayload, sessionId: "session-1" });
    expect(result.success).toBe(false);
  });

  test("requires affirmative privacy consent", () => {
    const result = leadStartSchema.safeParse({
      ...validLeadStartPayload,
      privacyConsent: false,
    });
    expect(result.success).toBe(false);
  });

  test("rejects oversized visitor-controlled fields", () => {
    const result = leadStartSchema.safeParse({
      ...validLeadStartPayload,
      organisationName: "x".repeat(201),
    });
    expect(result.success).toBe(false);
  });
});
