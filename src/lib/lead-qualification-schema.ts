import { z } from "zod";

const nullableOptionalString = (maximum: number) =>
  z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.string().trim().max(maximum).optional(),
  );

export const qualificationUpdateSchema = z
  .object({
    sessionId: z.string().uuid(),
    practitionerRange: z.enum(["solo", "2-3", "4-6", "7-10", "11+"]).optional(),
    locationRange: z.enum(["1", "2", "3", "4+"]).optional(),
    capacityStatus: z.enum(["need-now", "some", "near-capacity", "unsure"]).optional(),
    acquisitionSource: z
      .enum(["referrals", "organic-google", "google-ads", "meta-ads", "partnerships", "other"])
      .optional(),
    websiteUrl: z.preprocess(
      (value) => (value === null || value === "" ? undefined : value),
      z.string().trim().url().max(2048).optional(),
    ),
    decisionAuthority: z.enum(["owner", "part-decision", "researching"]).optional(),
    googleAdsStatus: z.enum(["current", "previous", "never", "unsure"]).optional(),
    plannedAdSpendRange: z
      .enum(["under-1000", "1000-1500", "1500-3000", "3000+", "unsure"])
      .optional(),
    implementationTiming: z.enum(["immediately", "30-days", "1-3-months", "later"]).optional(),
    websiteStatus: z
      .enum(["performing", "needs-improvement", "need-new", "none", "unsure"])
      .optional(),
    primaryGrowthProblem: z
      .enum([
        "referral-reliance",
        "inconsistent-enquiries",
        "ads-underperforming",
        "website-not-converting",
        "poor-quality-leads",
        "limited-tracking",
        "other",
      ])
      .optional(),
    additionalContext: nullableOptionalString(1000),
    nextAction: z.enum(["booking", "callback"]).optional(),
    callbackPreference: z.enum(["morning", "afternoon", "no-preference"]).optional(),
    completedStep: z.number().int().min(2).max(5),
  })
  .strict()
  .superRefine((value, context) => {
    const requiredByStep: Record<number, (keyof typeof value)[]> = {
      2: ["practitionerRange", "locationRange", "capacityStatus", "acquisitionSource"],
      3: [
        "decisionAuthority",
        "googleAdsStatus",
        "plannedAdSpendRange",
        "implementationTiming",
        "websiteStatus",
      ],
      4: ["primaryGrowthProblem"],
      5: ["nextAction"],
    };
    for (const field of requiredByStep[value.completedStep] ?? []) {
      if (value[field] === undefined)
        context.addIssue({ code: "custom", path: [field], message: "Required" });
    }
  });

export type QualificationUpdateInput = z.infer<typeof qualificationUpdateSchema>;
