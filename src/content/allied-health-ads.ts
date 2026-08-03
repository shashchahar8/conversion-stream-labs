import type { AdsLandingContent } from "@/types/campaign-landing";

/**
 * Physiotherapy paid-traffic landing content.
 *
 * Deliberately separate from `src/content/campaigns.ts`: that config drives the
 * generic `/growth-partners/$slug` template and must not shift. This file only
 * feeds the dedicated ads landing route.
 */
export const physiotherapyAdsLanding: AdsLandingContent = {
  campaignId: "physiotherapy-clinics",
  industryId: "allied-health",

  hero: {
    eyebrow: "Founding offer for established physiotherapy clinics",
    headline: "Build a predictable source of patient enquiries beyond referrals.",
    supporting:
      "Your first month of Google Ads management is $100. The first five qualifying physiotherapy clinics also receive a new website at no additional cost.",
    qualification:
      "For established clinics with practitioner capacity, a defined service area and a decision-maker involved.",
    primaryCta: "See if your clinic qualifies",
    microcopy:
      "Advertising spend is separate. Standard management fees apply after month one. No lock-in contract.",
  },

  proof: {
    eyebrow: "Recorded result",
    result: "50+ patient enquiries per month",
    supporting:
      "Generated for an interstate mobile physiotherapy provider from approximately $1,000 in monthly Google Ads spend.",
    qualification:
      "Historical campaign result. Results vary by market, service mix, competition, budget, website performance and follow-up.",
  },

  problem: {
    eyebrow: "The commercial problem",
    headline: "Referrals are valuable. Depending on them is the problem.",
    points: [
      "GP, NDIS and professional referrals are useful, but they are difficult to control or forecast.",
      "Referral volume can slow unexpectedly, often without warning and rarely for a single clear reason.",
      "Adding a practitioner creates immediate pressure to generate demand that referrals alone may not cover.",
      "Most clinic owners cannot say with any confidence how many patient enquiries next month will bring.",
      "Paid traffic is wasted when the website and the follow-up process quietly lose people along the way.",
    ],
    selfCheck: {
      title: "Try booking through your own website.",
      prompts: [
        "How easily can the correct service be found?",
        "Is the value proposition clear within a few seconds?",
        "How obvious is the booking action on the page?",
        "Is the mobile journey genuinely frictionless?",
        "How quickly does an enquiry actually receive a response?",
      ],
    },
    closing:
      "Every unnecessary click, unclear page and delayed callback gives a potential patient another chance to leave.",
  },

  system: {
    eyebrow: "The connected system",
    headline: "More traffic only helps when the rest of the journey works.",
    supporting:
      "Stonehurst Lane connects acquisition, conversion and follow-up so you can see what creates enquiries and where opportunities are being lost.",
    stages: [
      "Google search",
      "Landing page",
      "Enquiry",
      "Fast follow-up",
      "Booking",
      "Outcome tracking",
    ],
  },

  offer: {
    eyebrow: "Founding partner offer",
    headline: "The founding physiotherapy clinic offer",
    items: [
      {
        title: "First month of Google Ads management — $100",
        description:
          "A reduced first-month management fee so the system can be proven before a standard fee applies.",
      },
      {
        title: "Website included for the first five qualifying clinics",
        description:
          "Provided at no additional cost within an agreed scope, confirmed during the initial consultation.",
      },
      {
        title: "No lock-in contract",
        description:
          "Standard management fees apply after month one. There is no lock-in contract.",
      },
    ],
    clarifications: [
      "Advertising spend is separate and paid to the platform directly.",
      "Standard management fees apply after month one.",
      "The website is provided within an agreed scope confirmed during the initial consultation.",
      "Five physiotherapy places are separate from the five podiatry places.",
      "Qualification applies.",
    ],
  },

  caseStudy: {
    eyebrow: "Case study",
    headline: "What this can look like in practice",
    label: "Anonymous interstate mobile physiotherapy provider",
    challenge:
      "The provider needed a more consistent source of patient enquiries across multiple service areas instead of relying predominantly on referral activity.",
    approach: [
      "Purpose-built Google Ads structure",
      "Service and location-led targeting",
      "Conversion-focused enquiry journey",
      "Lead tracking",
      "Ongoing search-term and campaign optimisation",
    ],
    result: "50+ leads per month",
    resultDetail: "From approximately $1,000 in monthly Google Ads spend",
    qualification:
      "This is a historical result from a specific campaign, not a guarantee. Performance varies by location, competition, offer, service demand, budget and follow-up.",
  },

  qualification: {
    eyebrow: "Fit and process",
    headline: "This is designed for established clinics ready to grow.",
    goodFit: [
      "Established and operating",
      "Capacity for additional patients",
      "Decision-maker involved",
      "Willing to fund Google Ads separately",
      "Defined service area",
      "Able to respond promptly to enquiries",
    ],
    notSuitable: [
      "The clinic has not launched",
      "There is no appointment capacity",
      "The only interest is the website",
      "There is no advertising budget",
      "Guaranteed patient numbers are expected",
    ],
    processTitle: "What happens next",
    process: [
      "Tell us about the clinic",
      "We review the current patient journey",
      "Meet for a no-obligation Growth Consult",
      "Confirm fit and campaign approach",
      "Begin campaign and website work",
    ],
  },

  faqs: [
    {
      question: "What does the $100 cover?",
      answer:
        "The $100 covers the first month of Google Ads campaign management — build, structure, targeting, tracking setup and ongoing optimisation for that month. It does not cover advertising spend.",
    },
    {
      question: "Is advertising spend included?",
      answer:
        "No. Advertising spend is separate and is paid to Google directly from your own account. We will recommend a starting budget based on your service area and competition.",
    },
    {
      question: "What happens after month one?",
      answer:
        "The standard monthly management fee applies from month two onward. The fee is confirmed in writing before month one begins, so there are no surprises.",
    },
    {
      question: "Is there a lock-in contract?",
      answer: "Standard management fees apply after month one. There is no lock-in contract.",
    },
    {
      question: "What is included in the website?",
      answer:
        "A conversion-focused site built around your services, service area and enquiry journey. The exact scope — pages, content and functionality — is agreed and documented during the initial consultation. It is a defined scope, not unlimited development.",
    },
    {
      question: "Do we need a new website?",
      answer:
        "Not necessarily. If the current site converts well, we would rather improve the enquiry journey than replace it. We will tell you honestly during the review which of the two makes more commercial sense.",
    },
    {
      question: "Can you guarantee 50 leads?",
      answer:
        "No. The 50+ enquiries per month figure is a historical result from one specific campaign. Enquiry volume depends on location, competition, budget, service demand, website performance and how quickly your team follows up. We do not guarantee patient numbers.",
    },
    {
      question: "How quickly can we launch?",
      answer:
        "Where the existing website is suitable, campaigns can typically be live within a couple of weeks of the consultation. Where a new website forms part of the scope, launch follows the agreed build timeline.",
    },
    {
      question: "Do you work with Cliniko or similar systems?",
      answer:
        "We work alongside whichever practice-management or booking system your clinic already uses, and we will design the enquiry journey to feed into it sensibly. We do not claim a native integration with any specific platform — what is technically possible is confirmed during the review.",
    },
    {
      question: "Is this suitable for a solo physiotherapist?",
      answer:
        "It can be, provided the practice is established, has genuine appointment capacity, a defined service area and the ability to respond to enquiries promptly. It is not suitable for a practice that has not yet launched.",
    },
    {
      question: "What makes a clinic qualify?",
      answer:
        "An established clinic with practitioner capacity, a defined service area, a decision-maker involved in the process and a willingness to fund advertising spend separately from fees.",
    },
    {
      question: "Are there five website places specifically for physiotherapy?",
      answer:
        "Yes. Five places are allocated to physiotherapy clinics. These are separate from the five places allocated to podiatry clinics.",
    },
  ],

  finalCta: {
    eyebrow: "Next step",
    headline: "Ready to build a patient-acquisition system your clinic can actually control?",
    supporting:
      "Tell us a little about the clinic. We'll review the current setup and confirm whether the founding offer is a suitable fit.",
    primaryCta: "See if your clinic qualifies",
    microcopy: "Free, no-obligation Growth Consult.",
  },

  stickyCtaLabel: "Check eligibility",
};

/**
 * Podiatry paid-traffic landing content.
 *
 * Mounts the same `AlliedHealthAdsLanding` template as physiotherapy with no
 * component changes. Proof is drawn solely from the verified single-location
 * podiatry case study in `src/content/library.ts`.
 */
export const podiatryAdsLanding: AdsLandingContent = {
  campaignId: "podiatry-clinics",
  industryId: "allied-health",

  hero: {
    eyebrow: "Founding offer for established podiatry clinics",
    headline: "Generate more suitable local patient enquiries for your podiatry clinic.",
    supporting:
      "Your first month of Google Ads management is $100. The first five qualifying podiatry clinics also receive a new website at no additional cost.",
    qualification:
      "For established clinics with practitioner capacity, a defined service area and a decision-maker involved.",
    primaryCta: "See if your clinic qualifies",
    microcopy:
      "Advertising spend is separate. Standard management fees apply after month one. No lock-in contract.",
  },

  proof: {
    eyebrow: "Recorded result",
    result: "80+ patient enquiries per month",
    supporting:
      "Generated for a single-location podiatry clinic from approximately $750 in monthly advertising spend.",
    qualification:
      "Historical campaign result. Performance varies by location, competition, services, budget, website performance and enquiry follow-up.",
  },

  problem: {
    eyebrow: "The commercial problem",
    headline: "Local demand exists. The problem is whether your clinic is capturing it.",
    points: [
      "Patients search by service and suburb, and they generally choose from the clinics they can find quickly.",
      "Weak local visibility means those searches are answered by another clinic rather than yours.",
      "GP, allied-health and word-of-mouth referrals are valuable, but they are difficult to control or forecast.",
      "Practitioner hours and treatment rooms sit unfilled while demand goes to more visible competitors.",
      "Unclear service pages leave patients unsure whether the clinic treats what they are looking for.",
      "Missed calls and slow enquiry responses quietly lose people who were ready to book.",
      "Most clinic owners have little visibility into which campaigns and services create real enquiries.",
    ],
    selfCheck: {
      title: "Search for your clinic the way a patient would.",
      prompts: [
        "Does the clinic appear for relevant service and suburb searches?",
        "Is it clear which services the clinic actually treats?",
        "Are location and opening hours easy to find?",
        "Is booking straightforward on a mobile phone?",
        "Is the enquiry path obvious without hunting for it?",
        "How quickly is an enquiry actually handled?",
      ],
    },
    closing:
      "A patient searching for help now will rarely work hard to understand a confusing clinic website.",
  },

  system: {
    eyebrow: "The connected system",
    headline: "Visibility is only useful when it turns into action.",
    supporting:
      "Stonehurst Lane connects search demand, clinic messaging and follow-up so you can see which services and locations are generating real enquiries.",
    stages: [
      "Local Google search",
      "Service and location page",
      "Enquiry",
      "Fast response",
      "Appointment",
      "Outcome tracking",
    ],
  },

  offer: {
    eyebrow: "Founding partner offer",
    headline: "The founding podiatry clinic offer",
    items: [
      {
        title: "First month of Google Ads management — $100",
        description:
          "A reduced first-month management fee so the system can be proven before a standard fee applies.",
      },
      {
        title: "Website included for the first five qualifying podiatry clinics",
        description:
          "Provided at no additional cost within an agreed scope, confirmed during the initial consultation.",
      },
      {
        title: "No lock-in contract",
        description:
          "Standard management fees apply after month one. There is no lock-in contract.",
      },
    ],
    clarifications: [
      "Advertising spend is separate and paid to the platform directly.",
      "Standard management fees apply after month one.",
      "The website is provided within an agreed scope confirmed during the initial consultation.",
      "Five podiatry places are separate from the five physiotherapy places.",
      "Qualification applies.",
    ],
  },

  caseStudy: {
    eyebrow: "Case study",
    headline: "What this can look like in practice",
    label: "Anonymous single-location podiatry clinic",
    challenge:
      "The clinic needed a more consistent flow of local enquiries and clearer visibility across the services patients were actively searching for.",
    approach: [
      "Service-specific Google Ads campaigns",
      "Local and suburb-based targeting",
      "Search-term refinement",
      "Conversion-focused enquiry journey",
      "Lead tracking",
      "Ongoing campaign optimisation",
    ],
    result: "80+ leads per month",
    resultDetail: "From approximately $750 in monthly advertising spend",
    qualification:
      "This is a historical result from a specific campaign, not a guarantee. Performance varies by location, competition, services, budget, website performance and follow-up.",
  },

  qualification: {
    eyebrow: "Fit and process",
    headline: "Designed for established podiatry clinics with capacity to grow.",
    goodFit: [
      "Established and operating",
      "Capacity for additional patients",
      "Decision-maker involved",
      "Defined geographic catchment",
      "Willing to fund Google Ads separately",
      "Able to respond promptly to enquiries",
      "Has commercially suitable services to promote",
    ],
    notSuitable: [
      "The clinic has not launched",
      "There is no appointment capacity",
      "There is no advertising budget",
      "The only interest is the website",
      "Guaranteed patient numbers are expected",
      "No decision-maker is involved",
    ],
    processTitle: "What happens next",
    process: [
      "Tell us about the clinic",
      "We review local visibility and the patient journey",
      "Meet for a no-obligation Growth Consult",
      "Confirm fit, services and geographic targeting",
      "Begin campaign and website work",
    ],
  },

  faqs: [
    {
      question: "What does the $100 cover?",
      answer:
        "The $100 covers the first month of Google Ads campaign management — build, structure, service and location targeting, tracking setup and ongoing optimisation for that month. It does not cover advertising spend.",
    },
    {
      question: "Is advertising spend included?",
      answer:
        "No. Advertising spend is separate and is paid to Google directly from your own account. We will recommend a starting budget based on your catchment and local competition.",
    },
    {
      question: "What happens after month one?",
      answer:
        "The standard monthly management fee applies from month two onward. The fee is confirmed in writing before month one begins, so there are no surprises.",
    },
    {
      question: "Is there a lock-in contract?",
      answer: "Standard management fees apply after month one. There is no lock-in contract.",
    },
    {
      question: "What is included in the website?",
      answer:
        "A conversion-focused site built around your services, catchment and enquiry journey. The exact scope — pages, content and functionality — is agreed and documented during the initial consultation. It is a defined scope, not unlimited development.",
    },
    {
      question: "Do we need a new website?",
      answer:
        "Not necessarily. If the current site converts well, we would rather improve the enquiry journey than replace it. We will tell you honestly during the review which of the two makes more commercial sense.",
    },
    {
      question: "Can you guarantee 80+ leads?",
      answer:
        "No. The 80+ enquiries per month figure is a historical result from one specific campaign. Enquiry volume depends on location, competition, budget, service demand, website performance and how quickly your team follows up. We do not guarantee patient numbers.",
    },
    {
      question: "Which services can be promoted?",
      answer:
        "Generally the services with clear local search demand and sensible commercial value to the clinic. Which of your services fit that description is confirmed during the review — we would rather promote a focused set well than everything thinly.",
    },
    {
      question: "Can campaigns target specific suburbs?",
      answer:
        "Yes. Campaigns can be structured around the suburbs and radius that make sense for your catchment, and refined over time based on where enquiries actually come from.",
    },
    {
      question: "Is this suitable for a one-location clinic?",
      answer:
        "Yes, provided the clinic is established, has genuine appointment capacity, a defined catchment and the ability to respond to enquiries promptly. The verified result referenced on this page came from a single-location clinic.",
    },
    {
      question: "Can you work around our booking software?",
      answer:
        "We can design the enquiry and booking journey around established clinic software. The exact setup depends on the clinic's current systems and workflow.",
    },
    {
      question: "What makes a clinic qualify?",
      answer:
        "An established clinic with practitioner capacity, a defined geographic catchment, a decision-maker involved in the process and a willingness to fund advertising spend separately from fees.",
    },
    {
      question: "Are there five website places specifically for podiatry?",
      answer:
        "Yes. Five places are allocated to podiatry clinics. These are separate from the five places allocated to physiotherapy clinics.",
    },
  ],

  finalCta: {
    eyebrow: "Next step",
    headline: "Ready to build a patient-acquisition system your clinic can actually control?",
    supporting:
      "Tell us a little about the clinic. We'll review the current setup and confirm whether the founding offer is a suitable fit.",
    primaryCta: "See if your clinic qualifies",
    microcopy: "Free, no-obligation Growth Consult.",
  },

  stickyCtaLabel: "Check eligibility",
};
