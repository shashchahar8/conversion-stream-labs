export const mainNav = [
  { label: "Growth Systems", to: "/growth-systems" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "Work", to: "/work" },
  { label: "Approach", to: "/approach" },
  { label: "About", to: "/about" },
] as const;

export const footerNav = {
  system: [
    { label: "Growth Systems", to: "/growth-systems" },
    { label: "Approach", to: "/approach" },
    { label: "Work", to: "/work" },
  ],
  capabilities: [
    { label: "Websites", to: "/capabilities/websites" },
    { label: "Paid Acquisition", to: "/capabilities/paid-acquisition" },
    { label: "SEO", to: "/capabilities/seo" },
    { label: "CRM & Pipeline", to: "/capabilities/crm-and-pipeline" },
    { label: "AI Automation", to: "/capabilities/ai-automation" },
    { label: "Growth Strategy", to: "/capabilities/growth-strategy" },
  ],
  industries: [
    { label: "Allied Health", to: "/industries/allied-health" },
    { label: "Beauty & Aesthetics", to: "/industries/beauty-and-aesthetics" },
    { label: "Dental", to: "/industries/dental" },
    { label: "Legal & Conveyancing", to: "/industries/legal-and-conveyancing" },
    { label: "Accounting", to: "/industries/accounting-and-bookkeeping" },
    { label: "Brokers", to: "/industries/brokers" },
    { label: "NDIS", to: "/industries/ndis" },
    { label: "Cosmetic Surgery", to: "/industries/cosmetic-surgery" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Apply", to: "/apply" },
  ],
  legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ],
} as const;
