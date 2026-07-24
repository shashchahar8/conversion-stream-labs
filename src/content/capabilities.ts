import type { CapabilityConfig } from "@/types/content";

export const capabilities: CapabilityConfig[] = [
  {
    slug: "websites",
    name: "Websites",
    eyebrow: "Conversion infrastructure",
    headline: "Websites built to convert qualified demand, not to win awards.",
    subheadline:
      "Editorial, technically sound sites that carry a considered buyer from first click to booked conversation.",
    problem:
      "Most professional service websites are brochures. They describe what the business does, but they were never engineered to move a specific type of buyer through a decision.",
    consequences: [
      "Paid traffic lands on pages it cannot convert",
      "Enquiry rates stay below what the offer actually deserves",
      "SEO wins never translate into commercial results",
      "The team cannot see which pages produce real pipeline",
    ],
    implements: [
      "Offer-led information architecture",
      "Conversion-first page templates",
      "Speed, accessibility and Core Web Vitals engineering",
      "Structured schema for search and AI surfaces",
      "Analytics, event tracking and attribution wiring",
    ],
    systemInteraction:
      "Every website we build is designed to receive paid, organic and referral traffic — and to hand qualified enquiries directly into the CRM and follow-up layer.",
    process: ["Diagnose", "Architect", "Design", "Build", "Instrument", "Launch", "Improve"],
    deliverables: [
      "Full responsive website",
      "Reusable campaign landing-page system",
      "Analytics and conversion tracking",
      "Editable content structure",
    ],
    useCases: [
      "Replatforming a dated site that no longer reflects the business",
      "Preparing conversion infrastructure before opening ad spend",
      "Consolidating scattered landing pages into one measurable system",
    ],
    notForYou: [
      "You want a $500 template",
      "You are not planning to drive real traffic to the site",
      "You want unlimited redesign cycles without a defined scope",
    ],
    faqIds: ["what-is-included-website", "who-owns-website"],
    seo: {
      title: "Websites | Conversion Infrastructure | Stonehurst Lane",
      description:
        "Websites engineered to convert qualified demand for high-value service businesses. Speed, structure, and measurement built in.",
    },
  },
  {
    slug: "paid-acquisition",
    name: "Paid Acquisition",
    eyebrow: "Demand generation",
    headline: "Paid advertising built around the entire path to revenue.",
    subheadline:
      "Meta and Google campaigns designed with the site, offer and follow-up in mind — not in isolation.",
    problem:
      "Paid media agencies win clicks and lose commercial ground. Traffic is optimised in the ad platform while the site, offer and follow-up quietly leak most of the opportunity.",
    consequences: [
      "Cost per lead looks acceptable, cost per customer does not",
      "Ad platforms optimise toward the wrong signal",
      "Creative refreshes stop working within weeks",
      "Nobody can attribute revenue back to campaigns",
    ],
    implements: [
      "Meta and Google Ads strategy",
      "Offer and landing-page pairing",
      "Creative direction and iteration",
      "Conversion tracking and server-side signals",
      "Pipeline-based reporting",
    ],
    systemInteraction:
      "Campaigns are planned alongside the landing page, CRM stage design and follow-up so budget produces booked opportunities, not just form fills.",
    process: ["Diagnose", "Plan", "Build", "Launch", "Iterate", "Report", "Scale"],
    deliverables: [
      "Managed Meta and Google campaigns",
      "Creative concepts and iteration",
      "Landing pages",
      "Attribution and reporting",
    ],
    useCases: [
      "Established operators ready to fund advertising properly",
      "Businesses that need attributable, measurable growth",
      "Clinics, firms and practices with real capacity to fulfil more demand",
    ],
    notForYou: [
      "Under $2k/mo of intended media spend",
      "No landing infrastructure and no appetite to build one",
      "Expecting positive ROAS in week one",
    ],
    faqIds: ["is-ad-spend-included", "management-offer-includes"],
    seo: {
      title: "Paid Acquisition | Meta & Google Ads | Stonehurst Lane",
      description:
        "Paid campaigns engineered inside the full growth system — landing pages, CRM and follow-up included.",
    },
  },
  {
    slug: "seo",
    name: "SEO",
    eyebrow: "Organic acquisition",
    headline: "SEO built for commercial pages, not blog volume.",
    subheadline:
      "Technical, local and service-page SEO that compounds enquiries from the buyers you actually want.",
    problem:
      "Most SEO engagements ship content that ranks for terms nobody buys from. Technical foundations are ignored and commercial pages never mature.",
    consequences: [
      "Traffic looks like growth on paper only",
      "Ranking pages are informational, not transactional",
      "Local search presence is inconsistent across locations",
      "New services take too long to appear in results",
    ],
    implements: [
      "Technical SEO and Core Web Vitals",
      "Local SEO across single or multi-location businesses",
      "Service and location-page optimisation",
      "Search content aligned to real commercial intent",
      "Measurement tied to enquiries, not sessions",
    ],
    systemInteraction:
      "SEO and paid work share the same page infrastructure and analytics — organic wins reduce paid dependency over time.",
    process: ["Audit", "Prioritise", "Foundations", "Content", "Authority", "Measure"],
    deliverables: [
      "Technical remediation",
      "Local presence hardening",
      "Service and location pages",
      "Monthly commercial reporting",
    ],
    useCases: [
      "Established operators with capacity to serve organic demand",
      "Multi-location businesses with inconsistent local presence",
      "Businesses moving away from a single paid channel",
    ],
    notForYou: [
      "You need results within 30 days",
      "You want thousands of low-value blog posts",
      "You are unwilling to fix technical debt",
    ],
    faqIds: ["what-is-included-seo", "founding-seo-rate"],
    seo: {
      title: "SEO | Commercial Organic Search | Stonehurst Lane",
      description:
        "Technical, local and service-page SEO for high-value service businesses. Measured against enquiries, not sessions.",
    },
  },
  {
    slug: "crm-and-pipeline",
    name: "CRM & Pipeline",
    eyebrow: "Pipeline infrastructure",
    headline: "A CRM that actually reflects how the business wins work.",
    subheadline:
      "Pipeline stages, lead scoring, routing and Trello workflows designed around the real sales motion.",
    problem:
      "Most CRMs are configured once and abandoned. Leads pile up in an inbox, follow-up is inconsistent, and management cannot see where opportunities are stuck.",
    consequences: [
      "Speed-to-lead is measured in hours or days",
      "Salespeople work from memory and gut",
      "Pipeline reporting is theatre",
      "Marketing keeps investing without knowing what happens next",
    ],
    implements: [
      "CRM configuration or replatform",
      "Sales-stage and lifecycle design",
      "Lead scoring and routing rules",
      "Trello workflows for delivery-adjacent teams",
      "Reporting the leadership team actually uses",
    ],
    systemInteraction:
      "Marketing, sales, delivery and reporting all read from the same pipeline — every enquiry is visible, scored and routed.",
    process: ["Discover", "Design", "Configure", "Migrate", "Train", "Iterate"],
    deliverables: [
      "Configured CRM",
      "Sales pipeline definition",
      "Lead routing and scoring",
      "Trello board templates",
      "Weekly commercial dashboard",
    ],
    useCases: [
      "Teams that have outgrown their inbox",
      "Founders wanting visibility without micromanaging",
      "Businesses preparing to scale advertising responsibly",
    ],
    notForYou: [
      "You want to keep working out of shared email",
      "You are not willing to change any sales behaviour",
    ],
    faqIds: [],
    seo: {
      title: "CRM & Pipeline | Stonehurst Lane",
      description:
        "Sales pipeline, CRM configuration and Trello workflows engineered around the actual way the business wins work.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    eyebrow: "Automation",
    headline: "Automation that removes the delay between demand and response.",
    subheadline:
      "Immediate acknowledgement, structured nurturing, internal alerts and AI-assisted admin — quietly, in the background.",
    problem:
      "Most operators lose more revenue to slow follow-up than to bad marketing. Enquiries go cold before anyone even reads them.",
    consequences: [
      "Speed-to-lead is longer than the buyer's attention span",
      "Nurturing sequences never get built",
      "Admin work consumes senior time",
      "AI experiments never leave a tab",
    ],
    implements: [
      "Immediate lead acknowledgement",
      "Structured nurture and reminder sequences",
      "Internal alerting for high-intent leads",
      "AI-assisted intake, drafting and admin",
      "Guardrails and human review where required",
    ],
    systemInteraction:
      "Automation lives inside the CRM and pipeline layer so every enquiry gets a fast, consistent, measurable response.",
    process: ["Map", "Design", "Build", "Guardrail", "Deploy", "Iterate"],
    deliverables: [
      "Automation workflows",
      "Response templates",
      "AI-assisted admin routines",
      "Monitoring dashboards",
    ],
    useCases: [
      "High enquiry volume with slow response",
      "Small teams doing repetitive admin",
      "Regulated industries needing consistent language",
    ],
    notForYou: [
      "You want to fully replace the humans doing the work",
      "You do not have a defined enquiry process yet",
    ],
    faqIds: [],
    seo: {
      title: "AI Automation | Stonehurst Lane",
      description:
        "Automation and AI-assisted workflows that eliminate the delay between an enquiry and a qualified conversation.",
    },
  },
  {
    slug: "growth-strategy",
    name: "Growth Strategy",
    eyebrow: "Commercial optimisation",
    headline: "Strategy that starts with the bottleneck, not with a channel.",
    subheadline:
      "Diagnose, prioritise and design commercial experiments across the whole revenue system.",
    problem:
      "Businesses are usually sold whichever service the agency happens to sell. The actual constraint on growth is rarely the thing being fixed.",
    consequences: [
      "Investment goes to symptoms, not causes",
      "Wins in one part of the funnel are lost in the next",
      "Strategic direction changes every quarter",
      "Leadership loses trust in marketing entirely",
    ],
    implements: [
      "Growth Systems Audit",
      "Constraint diagnosis",
      "Prioritised roadmap",
      "Experiment design and measurement",
      "Executive-level reporting cadence",
    ],
    systemInteraction:
      "Strategy sits above the delivery layer — it decides where investment goes next based on where the system is actually leaking.",
    process: ["Diagnose", "Prioritise", "Sequence", "Measure", "Reallocate"],
    deliverables: [
      "Growth Systems Audit",
      "Prioritised roadmap",
      "Experiment plan",
      "Executive reporting",
    ],
    useCases: [
      "Businesses uncertain what to fund next",
      "Boards asking harder questions about marketing ROI",
      "Operators consolidating multiple providers",
    ],
    notForYou: [
      "You want a single tactical execution engagement",
      "You are not willing to change spend allocation",
    ],
    faqIds: [],
    seo: {
      title: "Growth Strategy | Stonehurst Lane",
      description:
        "Diagnose the real constraint on growth, then design the sequence of commercial experiments that unlocks it.",
    },
  },
];

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
