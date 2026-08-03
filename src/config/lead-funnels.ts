import type { LeadFunnelConfig } from "@/types/lead-funnel";

const shared = {
  industryId: "allied-health",
  organisationLabel: "Clinic name",
  dialogTitle: "See if your clinic qualifies",
  dialogDescription: "Five short steps. Each completed step is saved before you continue.",
  callbackConfirmation:
    "We’ll review your details and usually contact you within one business day.",
  calLink: "stonehurst-lane/free-growth-strategy-call",
  calNamespace: "free-growth-strategy-call",
} as const;

export const alliedHealthLeadFunnels: Record<
  "physiotherapy-clinics" | "podiatry-clinics",
  LeadFunnelConfig
> = {
  "physiotherapy-clinics": {
    ...shared,
    id: "physiotherapy-lead-funnel",
    campaignId: "physiotherapy-clinics",
    vertical: "physiotherapy",
  },
  "podiatry-clinics": {
    ...shared,
    id: "podiatry-lead-funnel",
    campaignId: "podiatry-clinics",
    vertical: "podiatry",
  },
};
