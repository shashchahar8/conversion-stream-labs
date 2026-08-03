import type { CampaignConfig } from "@/types/content";

const foundingOffer: CampaignConfig["offerStack"] = [
  {
    title: "$100 first-month campaign management",
    description: "Reduce initial risk while we prove the system.",
  },
  {
    title: "Conversion-focused website",
    description: "Included in the founding partner arrangement.",
  },
  {
    title: "Three months of foundational SEO",
    description: "Technical and local foundations included.",
  },
  {
    title: "Founding-partner ongoing SEO rate",
    description: "Locked-in rate for the life of the engagement.",
  },
  {
    title: "CRM and pipeline foundation",
    description: "Configured around the actual sales motion.",
  },
  { title: "Growth Systems Audit", description: "Delivered before any spend is committed." },
];

const standardScope = [
  "Advertising spend is separate and paid to the platforms directly.",
  "Software and third-party costs are separate.",
  "Website and SEO scope is defined in the engagement agreement.",
  "Defined management-fee fallback where initial qualifying results are not achieved.",
];

const standardExclusions = [
  "Businesses seeking only free services",
  "Businesses unable to fund advertising spend",
  "Startups without an established service and delivery capacity",
];

const foundingRiskReversal =
  "The founding-partner arrangement exists to reduce initial risk for a small number of serious operators. Qualification applies. If the arrangement is not a fit, we will say so.";

function makeFoundingCampaign(
  slug: string,
  industryId: CampaignConfig["industryId"],
  eyebrow: string,
  headline: string,
  subheadline: string,
  icpCallout: string,
  commercialProblem: string,
  ctaLabel: string,
  seoDescription: string,
): CampaignConfig {
  return {
    slug,
    campaignType: "founding-growth-partner",
    industryId,
    eyebrow,
    headline,
    subheadline,
    icpCallout,
    commercialProblem,
    mechanism:
      "Stonehurst Lane connects websites, paid acquisition, search, CRM and follow-up into one measurable system — engineered around your specific commercial constraint.",
    offerStack: foundingOffer,
    scopeNotes: standardScope,
    qualification: [
      "Established operator with delivery capacity",
      "Willingness to fund advertising spend separately",
      "Decision-maker involved in the process",
    ],
    exclusions: standardExclusions,
    riskReversal: foundingRiskReversal,
    faqIds: [
      "global-what",
      "management-offer-includes",
      "no-qualifying-result",
      "founding-seo-rate",
    ],
    trelloRoutingKey: `founding-${slug}`,
    formDefinitionId: "default-lead-form",
    ctaLabel,
    seo: {
      title: `${headline} | Stonehurst Lane`,
      description: seoDescription,
    },
  };
}

export const campaigns: CampaignConfig[] = [
  {
    ...makeFoundingCampaign(
      "physiotherapy-clinics",
      "allied-health",
      "Founding Growth Partner — Physiotherapy",
      "Build a predictable source of patient enquiries beyond referrals.",
      "Google Ads, conversion infrastructure and follow-up for established physiotherapy clinics with room to grow.",
      "Established physiotherapy clinics with practitioner capacity and a defined service area.",
      "Referral demand can be inconsistent and difficult to scale. A connected acquisition and follow-up system gives established clinics a more controllable path to suitable patient enquiries.",
      "Apply for the Physiotherapy Clinic Growth Audit",
      "Google Ads, conversion infrastructure and follow-up for established physiotherapy clinics with room to grow.",
    ),
    mechanism:
      "Stonehurst Lane connects Google Ads, conversion infrastructure and follow-up so suitable local enquiries can move from search to booked appointment with less leakage.",
    offerStack: [
      {
        title: "$100 first month of Google Ads management",
        description: "A reduced first-month management fee for qualifying physiotherapy clinics.",
      },
      {
        title: "Website included for the first five qualifying clinics",
        description:
          "Available at no additional cost to the first five qualifying physiotherapy clinics.",
      },
    ],
    scopeNotes: [
      "Advertising spend is separate and paid to the platform directly.",
      "The standard management fee applies after month one.",
      "There is no lock-in contract.",
      "Qualification applies.",
    ],
    faqIds: [
      "global-what",
      "clinic-google-ads-offer",
      "clinic-website-scope",
      "no-qualifying-result",
      "founding-seo-rate",
    ],
    trelloRoutingKey: "founding-physiotherapy-clinics",
  },
  {
    ...makeFoundingCampaign(
      "podiatry-clinics",
      "allied-health",
      "Founding Growth Partner — Podiatry",
      "Generate more suitable local patient enquiries for your podiatry clinic.",
      "A connected acquisition system for established podiatry clinics with practitioner capacity and a defined service area.",
      "Established podiatry clinics with practitioner capacity and a defined service area.",
      "Local demand is often fragmented across referrals, directories and search. A connected acquisition system helps established clinics turn relevant local intent into suitable enquiries.",
      "Apply for the Podiatry Clinic Growth Audit",
      "A connected acquisition system for established podiatry clinics with practitioner capacity and a defined service area.",
    ),
    mechanism:
      "Stonehurst Lane connects Google Ads, conversion infrastructure and follow-up around the clinic's service area so suitable local enquiries have a clear path to booking.",
    offerStack: [
      {
        title: "$100 first month of Google Ads management",
        description: "A reduced first-month management fee for qualifying podiatry clinics.",
      },
      {
        title: "Website included for the first five qualifying clinics",
        description:
          "Available at no additional cost to the first five qualifying podiatry clinics.",
      },
    ],
    scopeNotes: [
      "Advertising spend is separate and paid to the platform directly.",
      "The standard management fee applies after month one.",
      "There is no lock-in contract.",
      "Qualification applies.",
    ],
    faqIds: [
      "global-what",
      "clinic-google-ads-offer",
      "clinic-website-scope",
      "no-qualifying-result",
      "founding-seo-rate",
    ],
    trelloRoutingKey: "founding-podiatry-clinics",
  },
  // Legacy campaign retained temporarily for existing direct links. Do not use for new CTAs or indexing.
  makeFoundingCampaign(
    "physiotherapy-and-podiatry",
    "allied-health",
    "Founding Growth Partner — Allied Health",
    "Predictable booked appointments for physiotherapy and podiatry clinics.",
    "A connected acquisition, conversion and follow-up system for established multi-practitioner clinics.",
    "Established clinics ready to fill diary gaps with better patients, not more discounting.",
    "Most clinics rely on referrals, directories and inconsistent advertising. When one dips, the diary follows.",
    "Apply for the Clinic Growth Systems Audit",
    "Predictable booked appointments for allied health clinics — website, ads, SEO, CRM and follow-up as one system.",
  ),
  makeFoundingCampaign(
    "beauty-clinics",
    "beauty-and-aesthetics",
    "Founding Growth Partner — Beauty",
    "A premium growth system for beauty and aesthetic clinics.",
    "Attract the right clientele through positioning — not perpetual discounting.",
    "Established premium clinics ready to build brand-appropriate demand.",
    "Discount marketing has commoditised the vertical. Premium operators need positioning, offer and follow-up.",
    "Apply for the Beauty Clinic Growth Audit",
    "A premium growth system for skin, injectable and aesthetic clinics.",
  ),
  makeFoundingCampaign(
    "dental-practices",
    "dental",
    "Founding Growth Partner — Dental",
    "Higher-value cases for cosmetic and specialist dental practices.",
    "Attract and convert the cases the practice actually wants to see.",
    "Established practices with cosmetic, implant or specialist scope.",
    "Whitening promotions and check-up specials will not build a cosmetic or implant practice.",
    "Apply for the Dental Growth Systems Audit",
    "Growth systems for dental practices focused on case quality.",
  ),
  makeFoundingCampaign(
    "legal-and-conveyancing",
    "legal-and-conveyancing",
    "Founding Growth Partner — Legal",
    "Better matters for boutique law and conveyancing firms.",
    "Position, qualify and route legal enquiries so senior time is spent well.",
    "Established firms with defined practice areas ready to route intake through a system.",
    "Directory-style legal websites do not convert qualified enquiries. Partners end up doing intake themselves.",
    "Apply for the Legal Pipeline Audit",
    "Pipeline systems for boutique law and conveyancing firms.",
  ),
  makeFoundingCampaign(
    "accounting-and-bookkeeping",
    "accounting-and-bookkeeping",
    "Founding Growth Partner — Accounting",
    "Advisory-led pipeline for accounting and bookkeeping firms.",
    "Position, package and qualify enquiries so pipeline reflects the practice the partners want to build.",
    "Established firms migrating toward advisory-led revenue.",
    "Growth stalls when the referrer network stalls. Building a repeatable pipeline requires packaging and system.",
    "Apply for the Advisory Pipeline Audit",
    "Pipeline systems for firms migrating toward advisory-led revenue.",
  ),
  makeFoundingCampaign(
    "brokers",
    "brokers",
    "Founding Growth Partner — Brokers",
    "Better applications for mortgage, finance and insurance brokers.",
    "Consistent qualified enquiries and follow-up that converts to settled deals.",
    "Established brokers with lender panel access and capacity for more applications.",
    "Broker enquiries are commoditised by comparison sites. Growth requires positioning and speed.",
    "Apply for the Broker Pipeline Audit",
    "Pipeline systems for brokers who compete on service.",
  ),
  makeFoundingCampaign(
    "ndis-providers",
    "ndis",
    "Founding Growth Partner — NDIS",
    "Well-matched participants for registered NDIS providers.",
    "A compliant, dignified acquisition and intake system across services and locations.",
    "Registered providers with capacity for well-matched participants.",
    "Support Coordinator relationships are not a scalable growth channel on their own.",
    "Apply for the NDIS Provider Growth Audit",
    "Compliant growth systems for registered NDIS providers.",
  ),
  {
    slug: "cosmetic-surgery",
    campaignType: "shared-upside",
    industryId: "cosmetic-surgery",
    eyebrow: "Shared-Upside Growth Arrangement",
    headline: "A shared-upside growth arrangement for established cosmetic-surgery clinics.",
    subheadline:
      "For a small number of clinics with operational, clinical and compliance infrastructure already in place.",
    icpCallout:
      "Established cosmetic-surgery clinics operating under Australian regulatory guidance, with capacity to safely service additional demand.",
    commercialProblem:
      "Cosmetic surgery marketing sits under heavy compliance, long consideration windows and high consult-to-procedure ratios. Standard playbooks fail — and non-compliant playbooks are unacceptable.",
    mechanism:
      "A shared-upside arrangement aligns incentives around attributable procedure revenue rather than lead volume. Attribution infrastructure is a prerequisite, not an add-on.",
    offerStack: [
      {
        title: "Shared-upside commercial model",
        description: "Aligned to attributable procedure revenue.",
      },
      {
        title: "Compliance-reviewed campaigns",
        description: "All creative and copy subject to compliance review.",
      },
      {
        title: "Attribution infrastructure",
        description: "CRM, call-tracking and revenue reconciliation.",
      },
      {
        title: "Clinic-side operational readiness support",
        description: "Intake, follow-up and reporting.",
      },
    ],
    scopeNotes: [
      "Media spend is the clinic's responsibility.",
      "Compliance review is mandatory before any campaign launches.",
      "Revenue reconciliation cadence is agreed in the arrangement.",
      "No patient-facing medical claims are made.",
      "No guarantee of procedures, patient outcomes or revenue is provided.",
    ],
    qualification: [
      "Established surgical infrastructure",
      "Existing CRM and call-tracking or willingness to implement",
      "Willingness to submit content for compliance review",
    ],
    exclusions: [
      "Clinics unwilling to submit content for compliance review",
      "Clinics without operational intake capacity",
    ],
    riskReversal:
      "The arrangement is intentionally selective. Stonehurst Lane will decline arrangements that cannot be operated safely or compliantly.",
    faqIds: ["cosmetic-shared-upside", "cosmetic-attribution", "guarantees"],
    trelloRoutingKey: "shared-upside-cosmetic-surgery",
    formDefinitionId: "default-lead-form",
    ctaLabel: "Apply for the Shared-Upside Growth Assessment",
    seo: {
      title: "Cosmetic Surgery — Shared-Upside Growth | Stonehurst Lane",
      description:
        "A shared-upside growth arrangement for a small number of established cosmetic-surgery clinics.",
    },
  },
];

export function getCampaign(slug: string) {
  return campaigns.find((c) => c.slug === slug);
}
