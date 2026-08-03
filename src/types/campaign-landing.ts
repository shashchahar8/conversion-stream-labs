/**
 * Content contract for the allied-health ads landing template.
 *
 * The template (`AlliedHealthAdsLanding`) renders purely from this shape so a
 * second discipline (podiatry, Phase 3) can reuse it by supplying a different
 * content object — no layout changes required.
 */
export interface AdsLandingContent {
  /** Campaign slug — used for analytics + lead attribution. */
  campaignId: string;
  /** Industry slug — used for lead attribution. */
  industryId: string;

  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    qualification: string;
    primaryCta: string;
    microcopy: string;
  };

  proof: {
    eyebrow: string;
    result: string;
    supporting: string;
    qualification: string;
  };

  problem: {
    eyebrow: string;
    headline: string;
    points: string[];
    selfCheck: {
      title: string;
      prompts: string[];
    };
    closing: string;
  };

  system: {
    eyebrow: string;
    headline: string;
    supporting: string;
    stages: string[];
  };

  offer: {
    eyebrow: string;
    headline: string;
    items: { title: string; description: string }[];
    clarifications: string[];
  };

  caseStudy: {
    eyebrow: string;
    headline: string;
    label: string;
    challenge: string;
    approach: string[];
    result: string;
    resultDetail: string;
    qualification: string;
  };

  qualification: {
    eyebrow: string;
    headline: string;
    goodFit: string[];
    notSuitable: string[];
    processTitle: string;
    process: string[];
  };

  faqs: { question: string; answer: string }[];

  finalCta: {
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    microcopy: string;
  };

  /** Label used on the mobile sticky button. */
  stickyCtaLabel: string;
}
