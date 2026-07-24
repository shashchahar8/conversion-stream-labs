import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { caseStudies } from "@/content/library";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    buildSeo({
      title: "Work — Client outcomes | Stonehurst Lane",
      description: "Anonymised performance snapshots from Stonehurst Lane client engagements.",
      path: "/work",
    }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <PageShell>
      <section className="py-20 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Work</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-6xl">
              Client outcomes, clearly stated.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Anonymised performance snapshots from service businesses we have worked with. Results
              vary by market, offer, capacity and execution.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                to="/work/$caseStudySlug"
                params={{ caseStudySlug: study.slug }}
                className="group flex min-h-80 flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/40"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {study.industry}
                </span>
                <div>
                  <p className="font-display text-3xl text-accent">{study.result}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.investment}</p>
                  <p className="mt-4 text-sm">{study.channel}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm">
                    View result{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        headline="Start the conversation."
        ctaLabel={site.primaryCta.label}
        ctaHref={site.primaryCta.href}
      />
    </PageShell>
  );
}
