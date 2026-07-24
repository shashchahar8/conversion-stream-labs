import type { CapabilitySlug, CampaignSlug, IndustrySlug } from "@/config/routes";

export interface CapabilityConfig {
  slug: CapabilitySlug;
  name: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  problem: string;
  consequences: string[];
  implements: string[];
  systemInteraction: string;
  process: string[];
  deliverables: string[];
  useCases: string[];
  notForYou: string[];
  faqIds: string[];
  seo: { title: string; description: string };
}

export interface IndustryConfig {
  slug: IndustrySlug;
  name: string;
  shortName: string;
  audienceLabel: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  commercialProblem: string;
  painPoints: string[];
  consequences: string[];
  systemStages: string[];
  capabilityIds: CapabilitySlug[];
  qualification: string[];
  exclusions: string[];
  proofPlaceholder: string;
  faqIds: string[];
  complianceNote?: string;
  formDefinitionId: string;
  campaignId?: CampaignSlug | "cosmetic-surgery";
  seo: { title: string; description: string };
}

export interface CampaignConfig {
  slug: string;
  campaignType: "founding-growth-partner" | "shared-upside";
  industryId: IndustrySlug;
  eyebrow: string;
  headline: string;
  subheadline: string;
  icpCallout: string;
  commercialProblem: string;
  mechanism: string;
  offerStack: { title: string; description: string }[];
  scopeNotes: string[];
  qualification: string[];
  exclusions: string[];
  riskReversal: string;
  faqIds: string[];
  trelloRoutingKey: string;
  formDefinitionId: string;
  ctaLabel: string;
  seo: { title: string; description: string };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "global" | "offer" | "capability" | "industry" | "campaign" | "cosmetic";
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  status: "verified" | "pending-approval";
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  status: "published" | "draft";
}
