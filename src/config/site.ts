export const site = {
  name: "Stonehurst Lane",
  shortName: "Stonehurst Lane",
  tagline: "Growth systems that make revenue more predictable.",
  description:
    "Stonehurst Lane connects websites, paid acquisition, search, CRM and follow-up into one measurable system designed to generate, qualify and move better opportunities.",
  primaryCta: {
    label: "Book a Growth Systems Audit",
    href: "/apply",
  },
  secondaryCta: {
    label: "See How the System Works",
    href: "/growth-systems",
  },
  contactEmail: "hello@stonehurstlane.com",
  // No verified phone number yet — do not render a tel: link until confirmed.
  phone: null as string | null,
  ogImage: null as string | null,
} as const;
