import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/global/Container";
import { capabilities } from "@/content/capabilities";

const GROUPS: { title: string; slug: string; caps: string[] }[] = [
  { title: "Demand generation", slug: "paid-acquisition", caps: ["Meta Ads", "Google Ads", "Creative direction", "Search strategy"] },
  { title: "Conversion infrastructure", slug: "websites", caps: ["Websites", "Landing pages", "Offer architecture", "CRO"] },
  { title: "Pipeline infrastructure", slug: "crm-and-pipeline", caps: ["CRM", "Trello workflows", "Lead scoring & routing", "Sales-stage design"] },
  { title: "Automation", slug: "ai-automation", caps: ["Acknowledgement", "Nurturing", "Internal alerts", "AI-assisted admin"] },
  { title: "Organic acquisition", slug: "seo", caps: ["Technical SEO", "Local SEO", "Service pages", "Search content"] },
  { title: "Commercial optimisation", slug: "growth-strategy", caps: ["Funnel analysis", "Reporting", "Experiment design", "Growth strategy"] },
];

export function CapabilitiesSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">Capabilities</span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
            The full stack, run as one operation.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Grouped by commercial function, not by product line. Every capability sits inside the same growth system.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g) => {
            const cap = capabilities.find((c) => c.slug === g.slug);
            return (
              <Link
                key={g.slug}
                to="/capabilities/$slug"
                params={{ slug: g.slug }}
                className="group flex flex-col justify-between bg-card p-6 md:p-8 transition-colors hover:bg-mist"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {g.title}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">{cap?.name}</h3>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    {g.caps.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm text-foreground">
                  Explore capability <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
