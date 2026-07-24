import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/global/Container";
import { industries } from "@/content/industries";

export function IndustryPathways() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Industries</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
              Built for regulated, high-value service businesses.
            </h2>
          </div>
          <Link to="/industries" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex">
            All industries →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/40"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {ind.audienceLabel.split(",")[0]}
              </p>
              <h3 className="mt-3 font-display text-xl">{ind.name}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{ind.commercialProblem}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground">
                {ind.primaryCta.label} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
