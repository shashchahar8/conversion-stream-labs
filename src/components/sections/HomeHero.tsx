import { Container } from "@/components/global/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroForm } from "@/components/forms/HeroForm";
import { homepage } from "@/content/homepage";
import { site } from "@/config/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden>
        <div className="absolute inset-y-0 left-1/2 w-px bg-foreground" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-foreground" />
      </div>
      <Container>
        <div className="grid gap-16 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <div className="eyebrow">{homepage.hero.eyebrow}</div>
            <h1 className="mt-6 font-display text-[2.75rem] leading-[1.02] tracking-tight md:text-6xl lg:text-[4.75rem]">
              Make revenue growth <em className="not-italic text-accent">more predictable.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {homepage.hero.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to={site.primaryCta.href}>
                  {site.primaryCta.label} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
                <Link to={site.secondaryCta.href}>{site.secondaryCta.label}</Link>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-muted-foreground">Focus</dt>
                <dd className="mt-1 font-medium">High-value verticals</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Model</dt>
                <dd className="mt-1 font-medium">Full-stack systems</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Measurement</dt>
                <dd className="mt-1 font-medium">Pipeline & revenue</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-5 lg:pt-4">
            <HeroForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
