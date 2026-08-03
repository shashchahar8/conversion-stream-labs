import type { IndustryConfig } from "@/types/content";

const commonCapabilities = [
  "websites",
  "paid-acquisition",
  "seo",
  "crm-and-pipeline",
  "ai-automation",
  "growth-strategy",
] as const;

export const industries: IndustryConfig[] = [
  {
    slug: "allied-health",
    name: "Allied Health",
    shortName: "Allied Health",
    audienceLabel: "Physiotherapy, podiatry, exercise physiology and multidisciplinary clinics",
    eyebrow: "Allied health",
    headline: "Growth systems for allied health clinics that respect the clinical setting.",
    subheadline:
      "Predictable booked appointments through connected acquisition, conversion and follow-up — without discount marketing.",
    primaryCta: {
      label: "Apply for the Clinic Growth Systems Audit",
      href: "/growth-partners/physiotherapy-clinics",
    },
    secondaryCta: { label: "See how the system works", href: "/growth-systems" },
    commercialProblem:
      "Most allied health clinics rely on a mix of referrals, directories and inconsistent advertising. When any single source dips, the diary follows.",
    painPoints: [
      "Diary gaps despite steady advertising",
      "Reception team unable to follow up new enquiries fast enough",
      "Referrers who send irregular volume",
      "Location pages that never rank locally",
    ],
    consequences: [
      "Practitioner utilisation below target",
      "New locations take too long to fill",
      "Advertising results attributed only to gut feel",
    ],
    systemStages: [
      "Attention",
      "Consideration",
      "Enquiry",
      "Qualification",
      "Booking",
      "Retention",
    ],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established multi-practitioner clinic",
      "Capacity to see additional patients",
      "Willingness to fund media spend separately",
    ],
    exclusions: [
      "Solo practitioners exploring first marketing spend",
      "Clinics unwilling to update booking workflows",
    ],
    faqIds: ["global-what", "global-how-measured", "regulated-industries"],
    complianceNote:
      "We do not collect patient information through the Stonehurst Lane website. All marketing complies with Ahpra and AHPRA-adjacent advertising guidelines.",
    formDefinitionId: "default-lead-form",
    campaignId: "physiotherapy-clinics",
    seo: {
      title: "Allied Health Growth Systems | Stonehurst Lane",
      description:
        "Predictable booked appointments for physiotherapy, podiatry and multidisciplinary allied health clinics.",
    },
  },
  {
    slug: "beauty-and-aesthetics",
    name: "Beauty & Aesthetics",
    shortName: "Beauty",
    audienceLabel: "Skin clinics, injectables and premium beauty operators",
    eyebrow: "Beauty & aesthetics",
    headline: "Growth systems for premium skin and aesthetic clinics.",
    subheadline:
      "Full-diary clinics attract the right clientele through positioning, not perpetual discounting.",
    primaryCta: {
      label: "Apply for the Beauty Clinic Growth Audit",
      href: "/growth-partners/beauty-clinics",
    },
    commercialProblem:
      "The beauty vertical is saturated with discount marketing. Premium operators need positioning, offer design and disciplined follow-up — not another 20% off promotion.",
    painPoints: [
      "Attracting price-sensitive one-off clients instead of loyal ones",
      "Injector or therapist utilisation below target",
      "Weak follow-up on consultations",
      "Location pages losing to national franchises",
    ],
    consequences: [
      "Discounting compresses margin",
      "Retention below what the service level deserves",
      "Growth capped by inconsistent enquiry quality",
    ],
    systemStages: [
      "Attention",
      "Consideration",
      "Consultation",
      "Booking",
      "Retention",
      "Referral",
    ],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established clinic with clinical or premium positioning",
      "Willingness to invest in brand-appropriate creative",
    ],
    exclusions: ["Deal-of-the-day operators", "New clinics before regulatory setup"],
    faqIds: ["global-what", "regulated-industries"],
    complianceNote:
      "Advertising for cosmetic and injectable services complies with TGA and AHPRA guidelines.",
    formDefinitionId: "default-lead-form",
    campaignId: "beauty-clinics",
    seo: {
      title: "Beauty & Aesthetics Growth Systems | Stonehurst Lane",
      description:
        "Growth systems for premium skin, injectable and aesthetic clinics — without discount marketing.",
    },
  },
  {
    slug: "dental",
    name: "Dental",
    shortName: "Dental",
    audienceLabel: "General, cosmetic and specialist dental practices",
    eyebrow: "Dental",
    headline: "Growth systems for dental practices that value case quality, not just volume.",
    subheadline:
      "Attract, qualify and convert higher-value cases through a connected system across acquisition, conversion and follow-up.",
    primaryCta: {
      label: "Apply for the Dental Growth Systems Audit",
      href: "/growth-partners/dental-practices",
    },
    commercialProblem:
      "Dental marketing is dominated by whitening promotions and check-up specials. Practices with cosmetic, implant or specialist ambitions need a different system entirely.",
    painPoints: [
      "New-patient enquiries stuck at the reception layer",
      "High-value cases lost to slow follow-up",
      "Marketing spend not visible in production numbers",
    ],
    consequences: [
      "Under-utilised chairs and specialists",
      "Marketing measured only by patient count",
    ],
    systemStages: ["Attention", "Consideration", "Enquiry", "Consultation", "Case Acceptance"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established practice with cosmetic, implant or specialist scope",
      "Capacity to book qualified new patients",
    ],
    exclusions: ["Startups pre-fit-out", "Practices unwilling to update intake workflow"],
    faqIds: ["global-what", "regulated-industries"],
    complianceNote:
      "Dental advertising complies with Ahpra guidelines and the Dental Board of Australia code of conduct.",
    formDefinitionId: "default-lead-form",
    campaignId: "dental-practices",
    seo: {
      title: "Dental Growth Systems | Stonehurst Lane",
      description:
        "Growth systems for dental practices seeking higher-value cases through a connected acquisition and conversion system.",
    },
  },
  {
    slug: "legal-and-conveyancing",
    name: "Legal & Conveyancing",
    shortName: "Legal",
    audienceLabel: "Boutique law firms and conveyancing practices",
    eyebrow: "Legal",
    headline: "Pipeline systems for firms that need better matters, not just more calls.",
    subheadline:
      "Position, qualify and route legal enquiries so senior time is spent on the matters that actually move the practice forward.",
    primaryCta: {
      label: "Apply for the Legal Pipeline Audit",
      href: "/growth-partners/legal-and-conveyancing",
    },
    commercialProblem:
      "Legal websites either look like brochures or like directory clones. Neither is built to convert qualified enquiries.",
    painPoints: [
      "Enquiries dominated by low-fee or price-shopping matters",
      "Partners doing intake themselves",
      "No visibility into where matters originate",
    ],
    consequences: [
      "Senior time spent on the wrong matters",
      "Difficulty attributing revenue to any marketing spend",
    ],
    systemStages: ["Attention", "Consideration", "Enquiry", "Intake", "Retainer"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established firm with defined practice areas",
      "Willingness to route intake through a defined process",
    ],
    exclusions: ["Sole practitioners with no intake support"],
    faqIds: ["global-what", "regulated-industries"],
    complianceNote:
      "Advertising complies with the applicable Legal Profession Uniform Rules in each jurisdiction.",
    formDefinitionId: "default-lead-form",
    campaignId: "legal-and-conveyancing",
    seo: {
      title: "Legal & Conveyancing Growth Systems | Stonehurst Lane",
      description:
        "Pipeline systems that help boutique law firms win better matters without spending partner time on intake.",
    },
  },
  {
    slug: "accounting-and-bookkeeping",
    name: "Accounting & Bookkeeping",
    shortName: "Accounting",
    audienceLabel: "Progressive accounting and bookkeeping firms",
    eyebrow: "Accounting",
    headline: "Pipeline systems for firms building advisory-led practices.",
    subheadline:
      "Position and qualify enquiries so the pipeline reflects the practice the partners want to build, not the practice they inherited.",
    primaryCta: {
      label: "Apply for the Advisory Pipeline Audit",
      href: "/growth-partners/accounting-and-bookkeeping",
    },
    commercialProblem:
      "Accounting firms typically grow through referrals until the referrer network stalls. Building a repeatable pipeline requires positioning, packaging and system.",
    painPoints: [
      "Enquiry mix dominated by compliance-only work",
      "Partners uncertain how to package advisory services",
      "No system for outbound or nurture",
    ],
    consequences: ["Slow migration to advisory revenue", "Growth capped by partner network"],
    systemStages: ["Attention", "Consideration", "Enquiry", "Discovery", "Onboarding"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established firm with advisory ambition",
      "Willingness to define productised services",
    ],
    exclusions: ["Firms unwilling to package or price services"],
    faqIds: ["global-what"],
    formDefinitionId: "default-lead-form",
    campaignId: "accounting-and-bookkeeping",
    seo: {
      title: "Accounting & Bookkeeping Growth Systems | Stonehurst Lane",
      description: "Pipeline systems for firms migrating toward advisory-led revenue.",
    },
  },
  {
    slug: "brokers",
    name: "Brokers",
    shortName: "Brokers",
    audienceLabel: "Mortgage, finance and insurance brokers",
    eyebrow: "Brokers",
    headline: "Pipeline systems for brokers who compete on service, not on rate.",
    subheadline:
      "Consistent qualified enquiries and a follow-up system that converts them into settled deals.",
    primaryCta: { label: "Apply for the Broker Pipeline Audit", href: "/growth-partners/brokers" },
    commercialProblem:
      "Broker enquiries are commoditised by comparison sites. Sustainable growth requires a positioning and system that surfaces the right buyer, then converts them fast.",
    painPoints: [
      "Slow response losing deals to competitors",
      "Rate-shopper enquiries dominating pipeline",
    ],
    consequences: [
      "Settled volume dictated by comparison-site whims",
      "Team burnout on low-quality enquiries",
    ],
    systemStages: ["Attention", "Consideration", "Enquiry", "Fact Find", "Settlement"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established broker with lender panel access",
      "Capacity for additional applications",
    ],
    exclusions: ["New brokers pre-accreditation"],
    faqIds: ["global-what", "regulated-industries"],
    complianceNote:
      "Advertising complies with ASIC guidance for credit-representative and financial-services advertising.",
    formDefinitionId: "default-lead-form",
    campaignId: "brokers",
    seo: {
      title: "Broker Pipeline Systems | Stonehurst Lane",
      description:
        "Pipeline systems for mortgage, finance and insurance brokers who compete on service.",
    },
  },
  {
    slug: "ndis",
    name: "NDIS Providers",
    shortName: "NDIS",
    audienceLabel: "Registered and self-managed NDIS providers",
    eyebrow: "NDIS",
    headline: "Growth systems for NDIS providers that respect participants and compliance.",
    subheadline:
      "Fill capacity with well-matched participants through a compliant, dignified acquisition and intake system.",
    primaryCta: {
      label: "Apply for the NDIS Provider Growth Audit",
      href: "/growth-partners/ndis-providers",
    },
    commercialProblem:
      "NDIS marketing sits between clinical care, compliance and commercial pressure. Most providers rely on Support Coordinators and inconsistent digital presence.",
    painPoints: [
      "Support Coordinator relationships as the only growth channel",
      "Enquiries misaligned to service capacity",
      "Slow intake losing participants to competitors",
    ],
    consequences: [
      "Capacity gaps across services and locations",
      "Reputational risk from inconsistent messaging",
    ],
    systemStages: ["Awareness", "Consideration", "Enquiry", "Intake", "Onboarding"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Registered or committed-to-registration provider",
      "Capacity for additional well-matched participants",
    ],
    exclusions: ["Providers unable to demonstrate compliance readiness"],
    faqIds: ["global-what", "regulated-industries"],
    complianceNote:
      "All marketing complies with NDIS Practice Standards and the NDIS Commission advertising guidance.",
    formDefinitionId: "default-lead-form",
    campaignId: "ndis-providers",
    seo: {
      title: "NDIS Provider Growth Systems | Stonehurst Lane",
      description: "Compliant, dignified growth systems for registered NDIS providers.",
    },
  },
  {
    slug: "cosmetic-surgery",
    name: "Cosmetic Surgery",
    shortName: "Cosmetic Surgery",
    audienceLabel: "Established cosmetic surgery clinics",
    eyebrow: "Cosmetic surgery",
    headline: "A shared-upside growth arrangement for a small number of established clinics.",
    subheadline:
      "For clinics with operational, clinical and compliance infrastructure already in place.",
    primaryCta: {
      label: "Apply for the Shared-Upside Growth Assessment",
      href: "/shared-upside/cosmetic-surgery",
    },
    commercialProblem:
      "Cosmetic surgery clinics operate under heavy compliance, high consult-to-procedure ratios, and long consideration windows. Standard marketing playbooks fail here.",
    painPoints: [
      "High-value consultations lost between web enquiry and booking",
      "Weak attribution from advertising to procedure",
      "Compliance uncertainty around advertising claims",
    ],
    consequences: [
      "Wasted advertising spend on unqualified enquiries",
      "Surgeon utilisation below target",
    ],
    systemStages: ["Attention", "Consideration", "Consultation", "Booking", "Procedure"],
    capabilityIds: [...commonCapabilities],
    qualification: [
      "Established clinic with surgical infrastructure",
      "Ability to service additional demand safely",
      "CRM and call-tracking already in place or willing to implement",
    ],
    exclusions: ["Providers unwilling to submit content for compliance review"],
    faqIds: ["cosmetic-shared-upside", "cosmetic-attribution", "guarantees"],
    complianceNote:
      "All marketing is subject to compliance review against TGA and AHPRA advertising guidance for cosmetic surgery. No patient-facing medical claims are made.",
    formDefinitionId: "default-lead-form",
    campaignId: "cosmetic-surgery",
    seo: {
      title: "Cosmetic Surgery Growth Systems | Stonehurst Lane",
      description:
        "Shared-upside growth arrangements for a small number of established cosmetic-surgery clinics.",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
