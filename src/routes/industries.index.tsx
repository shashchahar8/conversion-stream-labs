import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { industries } from "@/content/industries";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/industries/")({
  head: () =>
    buildSeo({
      title: "Industries — Growth systems for regulated, high-value verticals | Stonehurst Lane",
      description:
        "Growth systems for allied health, dental, beauty, legal, accounting, brokers, NDIS and cosmetic surgery.",
      path: "/industries",
    }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Industries</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              Built for regulated, high-value service businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Each vertical has its own commercial and compliance shape. The system adapts to it.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                to="/industries/$slug"
                params={{ slug: ind.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{ind.audienceLabel.split(",")[0]}</p>
                <h2 className="mt-3 font-display text-2xl">{ind.name}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{ind.commercialProblem}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm">
                  {ind.primaryCta.label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand headline="Not sure which fits? Start with the audit." ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
