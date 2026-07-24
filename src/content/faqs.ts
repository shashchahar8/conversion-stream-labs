import type { FaqItem } from "@/types/content";

export const faqs: FaqItem[] = [
  {
    id: "global-what",
    category: "global",
    question: "What does Stonehurst Lane actually do?",
    answer:
      "We connect websites, paid acquisition, search, CRM and follow-up into one measurable system. We are not a channel-specific agency — we diagnose where growth is being lost and fix that.",
  },
  {
    id: "global-who",
    category: "global",
    question: "Who is Stonehurst Lane best suited to?",
    answer:
      "Established service businesses with real delivery capacity and a willingness to fund advertising properly. We work best with operators serving high-value customers, patients, matters or transactions.",
  },
  {
    id: "global-start",
    category: "global",
    question: "Can we begin with only one service?",
    answer:
      "Sometimes. If the constraint on growth is clearly a single capability, we will scope narrowly. More often the constraint spans two or three parts of the system.",
  },
  {
    id: "global-website",
    category: "capability",
    question: "Do we need a new website?",
    answer:
      "Only if the current site cannot carry the buyer through a decision. We will tell you honestly. Sometimes surgical improvements are enough.",
  },
  {
    id: "global-how-measured",
    category: "global",
    question: "How are results measured?",
    answer:
      "Against pipeline outcomes — qualified enquiries, booked conversations, opportunities and revenue — not against session counts or impressions.",
  },
  {
    id: "is-ad-spend-included",
    category: "offer",
    question: "Is advertising spend included?",
    answer:
      "No. Advertising spend is paid directly to the platforms and is separate from Stonehurst Lane fees.",
  },
  {
    id: "management-offer-includes",
    category: "offer",
    question: "What does the $100 first-month management offer include?",
    answer:
      "Campaign management for the first month at a reduced rate to lower initial risk. It does not include ad spend, software or third-party costs. Full inclusions are defined in the engagement agreement.",
  },
  {
    id: "what-is-included-website",
    category: "offer",
    question: "What is included in the founding-partner website?",
    answer:
      "A defined-scope, conversion-focused website built to the Stonehurst Lane standard. Scope, revisions and timeline are documented in the engagement agreement.",
  },
  {
    id: "what-is-included-seo",
    category: "offer",
    question: "What is included in foundational SEO?",
    answer:
      "Technical foundations, local presence hardening and priority commercial pages over the first three months.",
  },
  {
    id: "founding-seo-rate",
    category: "offer",
    question: "How does the founding SEO rate work?",
    answer:
      "Founding partners lock in a preferential ongoing SEO rate for the life of the engagement.",
  },
  {
    id: "no-qualifying-result",
    category: "offer",
    question: "What happens if no qualifying result is generated?",
    answer:
      "A defined management-fee fallback applies. Terms are documented in the engagement agreement, not decided ad hoc.",
  },
  {
    id: "regulated-industries",
    category: "industry",
    question: "Do you work with regulated industries?",
    answer:
      "Yes. We work with allied health, dental, cosmetic, legal, financial and NDIS providers. All marketing is designed to comply with the relevant regulator's advertising guidance.",
  },
  {
    id: "cosmetic-shared-upside",
    category: "cosmetic",
    question: "How does the cosmetic shared-upside arrangement work?",
    answer:
      "Commercial upside is aligned to attributable procedure revenue, not lead volume. Attribution infrastructure — CRM, call-tracking and revenue reconciliation — is a prerequisite.",
  },
  {
    id: "cosmetic-attribution",
    category: "cosmetic",
    question: "How is revenue attributed?",
    answer:
      "Through an agreed attribution model at the point of arrangement — typically combining CRM data, call-tracking, campaign signals and periodic revenue reconciliation.",
  },
  {
    id: "guarantees",
    category: "cosmetic",
    question: "Does Stonehurst Lane guarantee revenue?",
    answer:
      "No. We do not guarantee procedures, patient outcomes or revenue. What we commit to is a defined system, defined measurement and defined operational cadence.",
  },
  {
    id: "who-owns-website",
    category: "capability",
    question: "Who owns the website and assets at the end of an engagement?",
    answer:
      "You do. The website, content, tracking configuration and CRM configuration remain with the business.",
  },
];

export function getFaqsByIds(ids: string[]) {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is FaqItem => Boolean(f));
}

export const homepageFaqIds = [
  "global-what",
  "global-who",
  "global-start",
  "global-website",
  "global-how-measured",
  "is-ad-spend-included",
  "management-offer-includes",
  "no-qualifying-result",
  "regulated-industries",
];
