export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox";

export interface FormFieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: readonly string[];
  maxLength?: number;
  helpText?: string;
}

export interface FormStepDef {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldDef[];
}

export interface FormDefinition {
  id: string;
  steps: FormStepDef[];
  submitLabel: string;
}

export type FormVariant = "hero" | "diagnostic" | "full" | "modal" | "sticky";
export type FormPlacement =
  | "hero"
  | "mid-page"
  | "offer"
  | "bottom"
  | "sticky-mobile"
  | "cta-modal"
  | "standalone";

export interface LeadContact {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  businessName: string;
  website?: string;
  noWebsite?: boolean;
}

export interface LeadQualification {
  industry?: string;
  role?: string;
  teamSize?: string;
  locations?: string;
  revenueBand?: string;
  primaryService?: string;
  customerValue?: string;
  currentChannels?: string[];
  monthlySpend?: string;
  capacity?: string;
  bottleneck?: string;
  launchTiming?: string;
  authority?: string;
  adSpendWillingness?: string;
  crm?: string;
  challenge?: string;
  referralSource?: string;
}

export interface LeadConsent {
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export interface LeadAttribution {
  currentUrl: string;
  originalLandingUrl: string;
  pageSlug: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  campaignId?: string;
  creativeId?: string;
  adClickId?: string;
  firstVisitTimestamp: string;
  submissionTimestamp: string;
  formVariant: FormVariant;
  formPlacement: FormPlacement;
  bottleneck?: string;
}

export interface LeadSubmission {
  contact: LeadContact;
  qualification: LeadQualification;
  consent: LeadConsent;
  attribution: LeadAttribution;
  formDefinitionId: string;
  campaignId?: string;
  industryId?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  nextAction?: "redirect" | "schedule" | "acknowledge";
  redirectUrl?: string;
  message?: string;
  errors?: Record<string, string>;
}
