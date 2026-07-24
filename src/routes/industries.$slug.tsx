import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { DiagnosticForm } from "@/components/forms/DiagnosticForm";
import { SystemDiagram } from "@/components/sections/SystemDiagram";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/button";
import { getIndustry } from "@/content/industries";
import { capabilities } from "@/content/capabilities";
import { buildSeo } from "@/lib/seo";
import { industrySlugs } from "@/config/routes";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    if (!industrySlugs.includes(params.slug as (typeof industrySlugs)[number])) throw notFound();
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Industry not found" }, { name: "robots", content: "noindex" }] };
    return buildSeo({
      title: loaderData.industry.seo.title,
      description: loaderData.industry.seo.description,
      path: `/industries/${loaderData.industry.slug}`,
    });
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const relatedCaps = capabilities.filter((c) => industry.capabilityIds.includes(c.slug));
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="eyebrow">{industry.eyebrow}</span>
              <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.02]">
                {industry.headline}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-muted-foreground">{industry.subheadline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to={industry.primaryCta.href}>{industry.primaryCta.label}</Link>
                </Button>
                {industry.secondaryCta ? (
                  <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
                    <Link to={industry.secondaryCta.href}>{industry.secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">{industry.audienceLabel}</p>
            </div>
            <div className="lg:col-span-5">
              <LeadForm placement="hero" variant="hero" industryId={industry.slug} compact />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="The commercial problem"
                headline="Where growth quietly leaks."
                body={industry.commercialProblem}
              />
              <ul className="mt-8 space-y-3 border-t border-border">
                {industry.painPoints.map((p: string) => (
                  <li key={p} className="border-b border-border py-3">
                    <span className="mr-3 text-accent">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Consequences" headline="What it costs the business." />
              <ul className="mt-8 space-y-3 border-t border-border">
                {industry.consequences.map((p: string) => (
                  <li key={p} className="border-b border-border py-3">
                    <span className="mr-3 text-accent">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ink py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Growth system"
            headline={`The ${industry.shortName.toLowerCase()} pipeline, engineered end to end.`}
          />
          <div className="mt-12">
            <SystemDiagram stages={industry.systemStages.map((s: string) => ({ name: s }))} />
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Relevant capabilities"
            headline="What gets built and operated."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedCaps.map((c) => (
              <Link
                key={c.slug}
                to="/capabilities/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-foreground/40 transition-colors"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {c.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-xl">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.subheadline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="eyebrow">Qualification</p>
              <ul className="mt-4 space-y-2 text-sm">
                {industry.qualification.map((q: string) => (
                  <li key={q}>— {q}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Not a fit</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {industry.exclusions.map((q: string) => (
                  <li key={q}>— {q}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Compliance</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {industry.complianceNote ??
                  "All marketing complies with the relevant regulator's guidance."}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <DiagnosticForm industryId={industry.slug} campaignId={industry.campaignId} />
        </Container>
      </section>

      <FaqSection ids={industry.faqIds} />

      <section className="py-24 md:py-32 border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Application</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                Apply for the {industry.shortName.toLowerCase()} growth audit.
              </h2>
            </div>
            <LeadForm
              placement="bottom"
              variant="full"
              industryId={industry.slug}
              campaignId={industry.campaignId}
            />
          </div>
        </Container>
      </section>

      <CtaBand
        headline={industry.primaryCta.label + "."}
        ctaLabel={industry.primaryCta.label}
        ctaHref={industry.primaryCta.href}
      />
    </PageShell>
  );
}
