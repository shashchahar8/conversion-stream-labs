import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { capabilities } from "@/content/capabilities";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/capabilities/")({
  head: () =>
    buildSeo({
      title: "Capabilities — What Stonehurst Lane operates | Stonehurst Lane",
      description:
        "Websites, paid acquisition, SEO, CRM, AI automation and growth strategy — grouped as one connected system.",
      path: "/capabilities",
    }),
  component: CapabilitiesIndex,
});

function CapabilitiesIndex() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Capabilities</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              The full stack, run as one operation.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Every capability sits inside the growth system. We do not sell individual services in isolation.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <Link
                key={c.slug}
                to="/capabilities/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col justify-between bg-card p-6 md:p-8 hover:bg-mist transition-colors"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{c.eyebrow}</p>
                  <h2 className="mt-3 font-display text-2xl">{c.name}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{c.subheadline}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-sm">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand headline="Book the audit." ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
