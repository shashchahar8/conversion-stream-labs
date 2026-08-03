import { describe, expect, test } from "bun:test";
import { omitAbsentStrings } from "../../src/services/lead-funnel-api";
import { leadStartSchema } from "../../src/lib/lead-start-schema";
import { alliedHealthLeadFunnels } from "../../src/config/lead-funnels";

describe("universal lead funnel contracts", () => {
  test("omits null and empty optional attribution without changing exact CTA location", () => {
    const normalized = omitAbsentStrings({
      referrer: null,
      utmContent: null,
      utmTerm: null,
      fbclid: null,
      ctaLocation: "sticky-mobile",
    });
    expect(normalized).toEqual({ ctaLocation: "sticky-mobile" });
  });

  test("server normalization accepts null optional attribution", () => {
    const parsed = leadStartSchema.safeParse({
      sessionId: "550e8400-e29b-41d4-a716-446655440000",
      firstName: "Jane",
      organisationName: "Clinic",
      email: "jane@example.com",
      phone: "0412345678",
      campaignId: "physiotherapy-clinics",
      industryId: "allied-health",
      privacyConsent: true,
      referrer: null,
      utmContent: null,
      utmTerm: null,
      fbclid: null,
      ctaLocation: "final-cta",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) expect(parsed.data.referrer).toBeUndefined();
  });

  test("maps both campaigns to exact repository IDs", () => {
    expect(alliedHealthLeadFunnels["physiotherapy-clinics"]).toMatchObject({
      campaignId: "physiotherapy-clinics",
      industryId: "allied-health",
      vertical: "physiotherapy",
    });
    expect(alliedHealthLeadFunnels["podiatry-clinics"]).toMatchObject({
      campaignId: "podiatry-clinics",
      industryId: "allied-health",
      vertical: "podiatry",
    });
  });
});
