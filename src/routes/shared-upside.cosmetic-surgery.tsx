import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { CampaignShell } from "@/layouts/CampaignShell";
import { getCampaign } from "@/content/campaigns";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/shared-upside/cosmetic-surgery")({
  head: () =>
    buildSeo({
      title: "Cosmetic Surgery — Shared-Upside Growth Arrangement | Stonehurst Lane",
      description:
        "A shared-upside growth arrangement for a small number of established cosmetic surgery clinics. Attribution, compliance and operations included.",
      path: "/shared-upside/cosmetic-surgery",
    }),
  component: SharedUpside,
});

function SharedUpside() {
  const campaign = getCampaign("cosmetic-surgery");
  if (!campaign) {
    return (
      <PageShell>
        <Container>
          <p className="py-24 text-muted-foreground">Configuration missing.</p>
        </Container>
      </PageShell>
    );
  }

  return (
    <CampaignShell ctaLabel={campaign.ctaLabel} campaignId={campaign.slug}>
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{campaign.eyebrow}</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02]">
              {campaign.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{campaign.subheadline}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Proposition" headline="Aligned incentives, defined attribution." body={campaign.commercialProblem} />
              <p className="mt-6 text-muted-foreground">{campaign.mechanism}</p>
            </div>
            <div>
              <p className="eyebrow">What is included</p>
              <ul className="mt-4 space-y-3 border-t border-border">
                {campaign.offerStack.map((o) => (
                  <li key={o.title} className="border-b border-border py-3">
                    <div className="font-medium">{o.title}</div>
                    <div className="text-sm text-muted-foreground">{o.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ink py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">What Stonehurst Lane controls</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>— Campaign strategy, creative and iteration</li>
                <li>— Attribution infrastructure design</li>
                <li>— Compliance-first content review</li>
                <li>— Reporting and revenue reconciliation cadence</li>
              </ul>
            </div>
            <div>
              <p className="eyebrow">What the clinic controls</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>— Clinical and consultation delivery</li>
                <li>— Media spend</li>
                <li>— Compliance sign-off</li>
                <li>— Intake and booking operations</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <div>
              <p className="eyebrow">Qualification</p>
              <ul className="mt-4 space-y-2 text-sm">{campaign.qualification.map((q) => <li key={q}>— {q}</li>)}</ul>
            </div>
            <div>
              <p className="eyebrow">Not a fit</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">{campaign.exclusions.map((q) => <li key={q}>— {q}</li>)}</ul>
            </div>
            <div>
              <p className="eyebrow">What we do not guarantee</p>
              <p className="mt-4 text-sm text-muted-foreground">No guarantee of procedures, patient outcomes or revenue. No patient-facing medical claims. What we commit to is a defined system, defined measurement and defined operational cadence.</p>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection ids={campaign.faqIds} />

      <section className="py-20 md:py-28 border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Assessment</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">Apply for the Shared-Upside Growth Assessment.</h2>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Arrangements are selective. Stonehurst Lane declines arrangements that cannot be operated safely or compliantly.
              </p>
            </div>
            <LeadForm placement="bottom" variant="full" campaignId={campaign.slug} industryId={campaign.industryId} />
          </div>
        </Container>
      </section>
    </CampaignShell>
  );
}
