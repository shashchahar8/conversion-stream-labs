export interface LeadFunnelConfig {
  id: string;
  campaignId: string;
  industryId: string;
  vertical: "physiotherapy" | "podiatry" | "general";
  organisationLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  callbackConfirmation: string;
  calLink: string;
  calNamespace: string;
}

export interface LeadStartPayload {
  sessionId: string;
  firstName: string;
  organisationName: string;
  email: string;
  phone: string;
  campaignId: string;
  industryId: string;
  privacyConsent: true;
  firstLandingPage?: string;
  currentLandingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  ctaLocation?: string;
}
