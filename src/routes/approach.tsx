import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { ProcessStages } from "@/components/sections/ProcessStages";
import { WhyFullStack } from "@/components/sections/WhyFullStack";
import { CtaBand } from "@/components/sections/CtaBand";
import { homepage } from "@/content/homepage";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/approach")({
  head: () =>
    buildSeo({
      title: "Approach — How we work | Stonehurst Lane",
      description:
        "A defined engagement process — diagnose, prioritise, design, build, launch, measure, improve. No agency theatre.",
      path: "/approach",
    }),
  component: Approach,
});

function Approach() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Approach</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              A defined engagement process, not an improvised one.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Every engagement follows the same seven stages. Scope, deliverables and measurement are agreed before work begins.
            </p>
          </div>
        </Container>
      </section>
      <ProcessStages eyebrow="Process" headline="Seven stages, one operating system." stages={homepage.process.stages} />
      <WhyFullStack {...homepage.whyFullStack} />
      <CtaBand headline="Book the audit." ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
