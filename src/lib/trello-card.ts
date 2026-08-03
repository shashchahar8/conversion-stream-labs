import type { PersistedLead } from "./lead-start.server";

const MAX_TITLE_LENGTH = 160;

export interface TrelloCardDraft {
  name: string;
  desc: string;
}

export function buildTrelloCard(lead: PersistedLead): TrelloCardDraft {
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

export function buildCardDescription(lead: PersistedLead): string {
  const supplied = (value?: string) => sanitiseLine(value) || "Not supplied";

  return [
    "CONTACT",
    "",
    `Name: ${supplied(lead.firstName)}`,
    `Organisation: ${supplied(lead.organisationName)}`,
    `Phone: ${supplied(lead.phone)}`,
    `Email: ${supplied(lead.email)}`,
    "",
    "CAMPAIGN",
    "",
    `Campaign: ${supplied(lead.campaignId)}`,
    `Industry: ${supplied(lead.industryId)}`,
    `Landing page: ${supplied(lead.currentLandingPage ?? lead.firstLandingPage)}`,
    `CTA location: ${supplied(lead.ctaLocation)}`,
    "",
    "ATTRIBUTION",
    "",
    `UTM source: ${supplied(lead.utmSource)}`,
    `UTM medium: ${supplied(lead.utmMedium)}`,
    `UTM campaign: ${supplied(lead.utmCampaign)}`,
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
