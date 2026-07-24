import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/global/Container";
import { caseStudies } from "@/content/library";

export function ProofSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <span className="eyebrow">Proof</span>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.25rem]">
            Outcomes from real service businesses.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Anonymised performance snapshots from client engagements. Results vary by market, offer,
            capacity and execution.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              to="/work/$caseStudySlug"
              params={{ caseStudySlug: study.slug }}
              className="group flex min-h-72 flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/40"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {study.industry}
              </span>
              <div>
                <p className="font-display text-3xl text-accent">{study.result}</p>
                <p className="mt-2 text-sm text-muted-foreground">{study.investment}</p>
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
  );
}
