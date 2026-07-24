import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { HomeHero } from "@/components/sections/HomeHero";
import { RecognitionSection } from "@/components/sections/RecognitionSection";
import { SectionSystemDiagram } from "@/components/sections/SystemDiagram";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { IndustryPathways } from "@/components/sections/IndustryPathways";
import { ProofSection } from "@/components/sections/ProofSection";
import { WhyFullStack } from "@/components/sections/WhyFullStack";
import { ProcessStages } from "@/components/sections/ProcessStages";
import { OfferSection } from "@/components/sections/OfferSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Container } from "@/components/global/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { homepage } from "@/content/homepage";
import { homepageFaqIds } from "@/content/faqs";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: `${site.name} — Growth systems that make revenue more predictable`,
      description: site.description,
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <HomeHero />
      <RecognitionSection />
      <SectionSystemDiagram
        eyebrow={homepage.system.eyebrow}
        headline={homepage.system.headline}
        body={homepage.system.body}
        stages={homepage.system.stages}
      />
      <CapabilitiesSection />
      <IndustryPathways />
      <ProofSection />
      <WhyFullStack {...homepage.whyFullStack} />
      <ProcessStages eyebrow={homepage.process.eyebrow} headline={homepage.process.headline} stages={homepage.process.stages} />
      <OfferSection
        eyebrow={homepage.offer.eyebrow}
        headline={homepage.offer.headline}
        body={homepage.offer.body}
        items={homepage.offer.items}
        clarifications={homepage.offer.clarifications}
      />
      <FaqSection ids={homepageFaqIds} />
      <section className="py-24 md:py-32 border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">{homepage.application.eyebrow}</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05]">
                {homepage.application.headline}
              </h2>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">{homepage.application.body}</p>
            </div>
            <LeadForm placement="bottom" variant="full" />
          </div>
        </Container>
      </section>
      <CtaBand
        eyebrow="Next step"
        headline="Start with the audit."
        body="A structured diagnostic across acquisition, conversion, pipeline and follow-up."
        ctaLabel={site.primaryCta.label}
        ctaHref={site.primaryCta.href}
        secondaryLabel="See the system"
        secondaryHref="/growth-systems"
      />
    </PageShell>
  );
}
