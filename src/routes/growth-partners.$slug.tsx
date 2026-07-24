import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { LeadForm } from "@/components/forms/LeadForm";
import { SystemDiagram } from "@/components/sections/SystemDiagram";
import { OfferSection } from "@/components/sections/OfferSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CampaignShell } from "@/layouts/CampaignShell";
import { Button } from "@/components/ui/button";
import { getCampaign } from "@/content/campaigns";
import { getIndustry } from "@/content/industries";
import { buildSeo } from "@/lib/seo";
import { campaignSlugs } from "@/config/routes";

export const Route = createFileRoute("/growth-partners/$slug")({
  loader: ({ params }) => {
    if (!campaignSlugs.includes(params.slug as (typeof campaignSlugs)[number])) throw notFound();
    const campaign = getCampaign(params.slug);
    if (!campaign) throw notFound();
    return { campaign, industry: getIndustry(campaign.industryId) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Campaign not found" }, { name: "robots", content: "noindex" }] };
    return buildSeo({
      title: loaderData.campaign.seo.title,
      description: loaderData.campaign.seo.description,
      path: `/growth-partners/${loaderData.campaign.slug}`,
    });
  },
  component: CampaignPage,
});

function CampaignPage() {
  const { campaign, industry } = Route.useLoaderData();
  const systemStages = industry?.systemStages ?? ["Attention", "Consideration", "Enquiry", "Qualification", "Follow-up", "Opportunity", "Revenue"];

  return (
    <CampaignShell ctaLabel={campaign.ctaLabel} campaignId={campaign.slug}>
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{campaign.eyebrow}</span>
            <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
              For: {campaign.icpCallout}
            </p>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02]">
              {campaign.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{campaign.subheadline}</p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/apply">{campaign.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The problem" headline="Why the current approach underperforms." body={campaign.commercialProblem} />
            </div>
            <div>
              <SectionHeading eyebrow="Our mechanism" headline="How Stonehurst Lane fixes it." body={campaign.mechanism} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ink py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="The system" headline="From attention to revenue as one operation." />
          <div className="mt-12"><SystemDiagram stages={systemStages.map((s) => ({ name: s }))} /></div>
        </Container>
      </section>

      <OfferSection
        eyebrow="Founding partner offer"
        headline="The complete arrangement."
        body="Reduced initial risk in exchange for real commitment."
        items={campaign.offerStack.map((o) => o.title)}
        clarifications={campaign.scopeNotes}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <div>
              <p className="eyebrow">Who this is for</p>
              <ul className="mt-4 space-y-2 text-sm">
                {campaign.qualification.map((q) => <li key={q}>— {q}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Who should not apply</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {campaign.exclusions.map((q) => <li key={q}>— {q}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Why the offer exists</p>
              <p className="mt-4 text-sm">{campaign.riskReversal}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 border-t border-border">
        <Container>
          <DiagnosticForm campaignId={campaign.slug} industryId={campaign.industryId} />
        </Container>
      </section>

      <FaqSection ids={campaign.faqIds} />

      <section className="py-20 md:py-28 border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Application</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">{campaign.ctaLabel}.</h2>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                {campaign.riskReversal}
              </p>
            </div>
            <LeadForm placement="bottom" variant="full" campaignId={campaign.slug} industryId={campaign.industryId} />
          </div>
        </Container>
      </section>
    </CampaignShell>
  );
}
