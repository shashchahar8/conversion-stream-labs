import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { SectionSystemDiagram } from "@/components/sections/SystemDiagram";
import { WhyFullStack } from "@/components/sections/WhyFullStack";
import { ProcessStages } from "@/components/sections/ProcessStages";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/forms/LeadForm";
import { homepage } from "@/content/homepage";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/growth-systems")({
  head: () =>
    buildSeo({
      title: "Growth Systems — How the full stack works together | Stonehurst Lane",
      description:
        "The connected growth system that turns attention into predictable revenue. Websites, ads, SEO, CRM and follow-up engineered as one operation.",
      path: "/growth-systems",
    }),
  component: GrowthSystems,
});

function GrowthSystems() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">The growth system</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              The whole path from attention to revenue — engineered as one system.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Isolated channel work underperforms. Every layer we operate — website, ads, SEO, CRM, automation, reporting — is built to hand off cleanly to the next.
            </p>
          </div>
        </Container>
      </section>
      <SectionSystemDiagram
        eyebrow={homepage.system.eyebrow}
        headline="Every stage measured, every hand-off owned."
        body={homepage.system.body}
        stages={homepage.system.stages}
      />
      <WhyFullStack {...homepage.whyFullStack} />
      <ProcessStages eyebrow="Implementation" headline="How we implement it." stages={homepage.process.stages} />
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Measurement"
            headline="Measured against pipeline, not sessions."
            body="Reporting is designed for operators and boards, not for dashboards. Every layer of the system is measured against the layer it feeds."
          />
        </Container>
      </section>
      <section className="py-24 md:py-32 border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Application</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                Start with the Growth Systems Audit.
              </h2>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Tell us about the business and where growth is currently being lost. We'll identify the most useful place to begin.
              </p>
            </div>
            <LeadForm placement="bottom" variant="full" />
          </div>
        </Container>
      </section>
      <FaqSection ids={["global-what", "global-who", "global-how-measured", "is-ad-spend-included"]} />
      <CtaBand
        headline="Book the audit."
        ctaLabel={site.primaryCta.label}
        ctaHref={site.primaryCta.href}
      />
    </PageShell>
  );
}
