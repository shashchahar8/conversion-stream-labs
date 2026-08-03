import type { PersistedLead } from "./lead-start.server";
import type { QualifiedLead } from "./lead-qualification.server";

const MAX_TITLE_LENGTH = 160;

export interface TrelloCardDraft {
  name: string;
  desc: string;
}

export function buildTrelloCard(lead: PersistedLead | QualifiedLead): TrelloCardDraft {
  return {
    name: buildCardTitle(lead),
    desc: buildCardDescription(lead),
  };
}

export function buildCardTitle(lead: PersistedLead): string {
  const prefix =
    lead.campaignId === "physiotherapy-clinics"
      ? "[PHYSIO]"
      : lead.campaignId === "podiatry-clinics"
        ? "[PODIATRY]"
        : "[LEAD]";
  const title = `${prefix} ${sanitiseLine(lead.firstName)} — ${sanitiseLine(lead.organisationName)}`;
  return title.slice(0, MAX_TITLE_LENGTH).trim();
}

export function buildCardDescription(lead: PersistedLead | QualifiedLead): string {
  const supplied = (value?: string) => sanitiseLine(value) || "Not supplied";
  const qualified = lead as QualifiedLead;

  return [
    "CONTACT",
    "",
    `Name: ${supplied(lead.firstName)}`,
    `Organisation: ${supplied(lead.organisationName)}`,
    `Phone: ${supplied(lead.phone)}`,
    `Email: ${supplied(lead.email)}`,
    "",
    "CLINIC PROFILE",
    "",
    `Practitioners: ${supplied(qualified.practitionerRange)}`,
    `Locations: ${supplied(qualified.locationRange)}`,
    `Capacity: ${supplied(qualified.capacityStatus)}`,
    `Acquisition source: ${supplied(qualified.acquisitionSource)}`,
    `Website: ${supplied(qualified.websiteUrl)}`,
    "",
    "READINESS",
    "",
    `Decision authority: ${supplied(qualified.decisionAuthority)}`,
    `Google Ads status: ${supplied(qualified.googleAdsStatus)}`,
    `Planned ad spend: ${supplied(qualified.plannedAdSpendRange)}`,
    `Timing: ${supplied(qualified.implementationTiming)}`,
    `Website status: ${supplied(qualified.websiteStatus)}`,
    "",
    "PRIMARY ISSUE",
    "",
    `Issue: ${supplied(qualified.primaryGrowthProblem)}`,
    `Context: ${supplied(qualified.additionalContext)}`,
    "",
    "NEXT ACTION",
    "",
    `Choice: ${supplied(qualified.nextAction)}`,
    `Callback preference: ${supplied(qualified.callbackPreference)}`,
    `Cal.com status: ${supplied(qualified.calBookingStatus)}`,
    `Booking start: ${supplied(qualified.calBookingStartAt)}`,
    "",
    "ATTRIBUTION",
    "",
    `Campaign: ${supplied(lead.campaignId)}`,
    `Industry: ${supplied(lead.industryId)}`,
    `Landing page: ${supplied(lead.currentLandingPage ?? lead.firstLandingPage)}`,
    `CTA location: ${supplied(lead.ctaLocation)}`,
    "",
    `UTM source: ${supplied(lead.utmSource)}`,
    `UTM medium: ${supplied(lead.utmMedium)}`,
    `UTM campaign: ${supplied(lead.utmCampaign)}`,
    `UTM content: ${supplied(lead.utmContent)}`,
    `UTM term: ${supplied(lead.utmTerm)}`,
    `fbclid: ${supplied(lead.fbclid)}`,
    "",
    "SYSTEM",
    "",
    `Lead ID: ${supplied(lead.id)}`,
    "Status: started",
    `Created: ${supplied(lead.createdAt)}`,
  ].join("\n");
}

function sanitiseLine(value?: string): string {
  return Array.from(value ?? "")
    .map((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127 ? " " : character;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
