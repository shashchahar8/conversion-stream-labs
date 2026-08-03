import { z } from "zod";
import { campaigns } from "@/content/campaigns";
import { industries } from "@/content/industries";

const campaignIds = new Set<string>(campaigns.map((campaign) => campaign.slug));
const industryIds = new Set<string>(industries.map((industry) => industry.slug));

const optionalText = (maximum: number) =>
  z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.string().trim().max(maximum).optional(),
  );
const optionalUrl = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  z.string().trim().url().max(2048).optional(),
);

export const leadStartSchema = z
  .object({
    sessionId: z.string().uuid(),
    firstName: z.string().trim().min(1).max(100),
    organisationName: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(254),
    phone: z
      .string()
      .trim()
      .min(8)
      .max(50)
      .refine((value) => {
        const digitCount = value.replace(/\D/g, "").length;
        return digitCount >= 8 && digitCount <= 15;
      }, "Enter a plausible phone number."),
    campaignId: optionalText(100).refine(
      (value) => value === undefined || campaignIds.has(value),
      "Unknown campaign.",
    ),
    industryId: optionalText(100).refine(
      (value) => value === undefined || industryIds.has(value),
      "Unknown industry.",
    ),
    firstLandingPage: optionalUrl,
    currentLandingPage: optionalUrl,
    referrer: optionalText(2048),
    utmSource: optionalText(255),
    utmMedium: optionalText(255),
    utmCampaign: optionalText(255),
    utmContent: optionalText(255),
    utmTerm: optionalText(255),
    fbclid: optionalText(512),
    ctaLocation: optionalText(100),
    privacyConsent: z.literal(true),
  })
  .strict();

export type LeadStartInput = z.infer<typeof leadStartSchema>;
