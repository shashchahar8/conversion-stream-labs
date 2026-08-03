/**
 * Central route registry. Sitemap, navigation and metadata derive from
 * this map so a new page cannot silently drift out of sync.
 */
export interface RouteDefinition {
  path: string;
  label: string;
  group: "main" | "capability" | "industry" | "campaign" | "conversion" | "legal" | "content";
  indexable: boolean;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const capabilitySlugs = [
  "websites",
  "paid-acquisition",
  "seo",
  "crm-and-pipeline",
  "ai-automation",
  "growth-strategy",
] as const;

export const industrySlugs = [
  "allied-health",
  "beauty-and-aesthetics",
  "dental",
  "legal-and-conveyancing",
  "accounting-and-bookkeeping",
  "brokers",
  "ndis",
  "cosmetic-surgery",
] as const;

export const campaignSlugs = [
  "physiotherapy-clinics",
  "podiatry-clinics",
  "physiotherapy-and-podiatry",
  "beauty-clinics",
  "dental-practices",
  "legal-and-conveyancing",
  "accounting-and-bookkeeping",
  "brokers",
  "ndis-providers",
] as const;

export type CapabilitySlug = (typeof capabilitySlugs)[number];
export type IndustrySlug = (typeof industrySlugs)[number];
export type CampaignSlug = (typeof campaignSlugs)[number];

export const routeRegistry: RouteDefinition[] = [
  {
    path: "/",
    label: "Home",
    group: "main",
    indexable: true,
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/growth-systems",
    label: "Growth Systems",
    group: "main",
    indexable: true,
    priority: "0.9",
  },
  { path: "/capabilities", label: "Capabilities", group: "main", indexable: true, priority: "0.8" },
  ...capabilitySlugs.map<RouteDefinition>((s) => ({
    path: `/capabilities/${s}`,
    label: s,
    group: "capability",
    indexable: true,
    priority: "0.7",
  })),
  { path: "/industries", label: "Industries", group: "main", indexable: true, priority: "0.8" },
  ...industrySlugs.map<RouteDefinition>((s) => ({
    path: `/industries/${s}`,
    label: s,
    group: "industry",
    indexable: true,
    priority: "0.7",
  })),
  { path: "/work", label: "Work", group: "main", indexable: true, priority: "0.7" },
  { path: "/approach", label: "Approach", group: "main", indexable: true, priority: "0.6" },
  { path: "/about", label: "About", group: "main", indexable: true, priority: "0.6" },
  { path: "/insights", label: "Insights", group: "main", indexable: false, priority: "0.6" },
  { path: "/contact", label: "Contact", group: "main", indexable: true, priority: "0.6" },
  { path: "/apply", label: "Apply", group: "main", indexable: true, priority: "0.8" },
  ...campaignSlugs.map<RouteDefinition>((s) => ({
    path: `/growth-partners/${s}`,
    label: s,
    group: "campaign",
    indexable: s !== "physiotherapy-and-podiatry",
    priority: "0.75",
  })),
  {
    path: "/shared-upside/cosmetic-surgery",
    label: "Shared Upside — Cosmetic Surgery",
    group: "campaign",
    indexable: true,
    priority: "0.75",
  },
  { path: "/booking", label: "Booking", group: "conversion", indexable: false },
  {
    path: "/thank-you/growth-audit",
    label: "Thank you — Growth Audit",
    group: "conversion",
    indexable: false,
  },
  {
    path: "/thank-you/founding-partner",
    label: "Thank you — Founding Partner",
    group: "conversion",
    indexable: false,
  },
  {
    path: "/thank-you/shared-upside",
    label: "Thank you — Shared Upside",
    group: "conversion",
    indexable: false,
  },
  { path: "/privacy", label: "Privacy", group: "legal", indexable: true, priority: "0.3" },
  { path: "/terms", label: "Terms", group: "legal", indexable: true, priority: "0.3" },
];
