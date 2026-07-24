import { Container } from "@/components/global/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function CtaBand({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  headline: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="section-ink py-20 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05]">{headline}</h2>
            {body ? <p className="mt-4 text-muted-foreground">{body}</p> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-bone text-ink hover:bg-bone/90">
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button asChild size="lg" variant="ghost" className="rounded-full text-bone hover:bg-white/10">
                <Link to={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
