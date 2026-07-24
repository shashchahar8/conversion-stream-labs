import type { FormDefinition } from "@/types/lead";

/**
 * Default lead form definition. Industry / campaign configurations may
 * override steps or add fields via their own FormDefinition.
 */
export const defaultLeadForm: FormDefinition = {
  id: "default-lead-form",
  submitLabel: "Submit Application",
  steps: [
    {
      id: "contact",
      title: "Contact",
      description: "How should we reach you?",
      fields: [
        { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name" },
        { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name" },
        { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
        { name: "phone", label: "Telephone", type: "tel", required: true, autoComplete: "tel" },
        { name: "businessName", label: "Business name", type: "text", required: true },
        { name: "website", label: "Website", type: "url", placeholder: "https://" },
        { name: "noWebsite", label: "I do not currently have a website", type: "checkbox" },
      ],
    },
    {
      id: "business",
      title: "Business profile",
      description: "So we can benchmark against comparable operators.",
      fields: [
        {
          name: "industry",
          label: "Industry",
          type: "select",
          required: true,
          options: [
            "Allied health",
            "Beauty & aesthetics",
            "Dental",
            "Legal & conveyancing",
            "Accounting & bookkeeping",
            "Brokers",
            "NDIS",
            "Cosmetic surgery",
            "Other",
          ],
        },
        { name: "role", label: "Your role", type: "text", required: true },
        {
          name: "teamSize",
          label: "Team size",
          type: "select",
          required: true,
          options: ["1–5", "6–15", "16–50", "51–200", "200+"],
        },
        {
          name: "locations",
          label: "Number of locations",
          type: "select",
          options: ["1", "2–3", "4–10", "10+"],
        },
        {
          name: "revenueBand",
          label: "Approximate annual revenue",
          type: "select",
          required: true,
          options: [
            "Under $500k",
            "$500k–$1M",
            "$1M–$3M",
            "$3M–$10M",
            "$10M–$25M",
            "$25M+",
          ],
        },
        { name: "primaryService", label: "Primary service", type: "text" },
        {
          name: "customerValue",
          label: "Approximate value per customer / patient / matter",
          type: "text",
          placeholder: "e.g. $3,500",
        },
      ],
    },
    {
      id: "readiness",
      title: "Growth readiness",
      description: "Where the current system is losing opportunity.",
      fields: [
        {
          name: "currentChannels",
          label: "Current acquisition channels",
          type: "multiselect",
          options: [
            "Referrals",
            "SEO / organic search",
            "Google Ads",
            "Meta Ads",
            "Directories",
            "Partnerships",
            "Outbound",
            "None currently",
          ],
        },
        {
          name: "monthlySpend",
          label: "Monthly marketing spend",
          type: "select",
          options: [
            "Not currently spending",
            "Under $2k",
            "$2k–$5k",
            "$5k–$15k",
            "$15k–$40k",
            "$40k+",
          ],
        },
        {
          name: "capacity",
          label: "Capacity for additional customers this quarter",
          type: "select",
          options: ["Significant", "Some", "Limited", "None right now"],
        },
        {
          name: "bottleneck",
          label: "Primary growth bottleneck",
          type: "select",
          required: true,
          options: [
            "We need better leads",
            "Our website is not converting",
            "Follow-up is too slow",
            "We cannot track pipeline properly",
            "We need a connected growth system",
            "Not sure yet",
          ],
        },
        {
          name: "launchTiming",
          label: "Desired launch timing",
          type: "select",
          options: ["Immediately", "Within 30 days", "This quarter", "Exploring"],
        },
        {
          name: "authority",
          label: "Decision-making authority",
          type: "select",
          options: ["Sole decision-maker", "Shared with partners", "Recommender"],
        },
        {
          name: "adSpendWillingness",
          label: "Willing to fund advertising spend separately from fees",
          type: "select",
          options: ["Yes", "Not sure", "No"],
        },
        {
          name: "crm",
          label: "Current CRM or pipeline system",
          type: "text",
          placeholder: "e.g. HubSpot, Cliniko, none",
        },
      ],
    },
    {
      id: "context",
      title: "Context & consent",
      fields: [
        {
          name: "challenge",
          label: "Describe the business challenge in your own words",
          type: "textarea",
          required: true,
          maxLength: 1000,
        },
        {
          name: "referralSource",
          label: "How did you hear about Stonehurst Lane?",
          type: "text",
        },
        {
          name: "privacyConsent",
          label:
            "I have read and agree to the privacy policy and consent to Stonehurst Lane processing this enquiry.",
          type: "checkbox",
          required: true,
        },
        {
          name: "marketingConsent",
          label: "I consent to receive occasional relevant insights (optional).",
          type: "checkbox",
        },
      ],
    },
  ],
};

/**
 * Registry of available form definitions. Industries / campaigns can point
 * at a custom form via their `formDefinitionId`.
 */
export const formDefinitions: Record<string, FormDefinition> = {
  "default-lead-form": defaultLeadForm,
};
