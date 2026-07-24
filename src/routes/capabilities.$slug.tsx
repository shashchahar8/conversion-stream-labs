import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { SectionHeading } from "@/components/global/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { getCapability } from "@/content/capabilities";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";
import { capabilitySlugs } from "@/config/routes";

export const Route = createFileRoute("/capabilities/$slug")({
  loader: ({ params }) => {
    if (!capabilitySlugs.includes(params.slug as (typeof capabilitySlugs)[number])) throw notFound();
    const capability = getCapability(params.slug);
    if (!capability) throw notFound();
    return { capability };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Capability not found" }, { name: "robots", content: "noindex" }] };
    }
    return buildSeo({
      title: loaderData.capability.seo.title,
      description: loaderData.capability.seo.description,
      path: `/capabilities/${loaderData.capability.slug}`,
    });
  },
  component: CapabilityPage,
});

function CapabilityPage() {
  const { capability } = Route.useLoaderData();
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{capability.eyebrow}</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              {capability.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{capability.subheadline}</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The problem" headline="Why this capability matters." body={capability.problem} />
              <ul className="mt-8 space-y-3 border-t border-border">
                {capability.consequences.map((c) => (
                  <li key={c} className="border-b border-border py-3 text-base"><span className="mr-3 text-accent">—</span>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="What we implement" headline="What Stonehurst Lane operates." />
              <ul className="mt-8 space-y-3 border-t border-border">
                {capability.implements.map((c) => (
                  <li key={c} className="border-b border-border py-3 text-base"><span className="mr-3 text-accent">—</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-ink py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow="Inside the system" headline="How this capability connects." body={capability.systemInteraction} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-7">
            {capability.process.map((p, i) => (
              <div key={p} className="bg-ink p-5">
                <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-lg">{p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <div>
              <p className="eyebrow">Deliverables</p>
              <ul className="mt-4 space-y-2 text-sm">
                {capability.deliverables.map((d) => <li key={d}>— {d}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow">When it's the right fit</p>
              <ul className="mt-4 space-y-2 text-sm">
                {capability.useCases.map((d) => <li key={d}>— {d}</li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow">When it isn't</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {capability.notForYou.map((d) => <li key={d}>— {d}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Application</span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">Book the audit.</h2>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Tell us where growth is being lost. We'll tell you honestly whether this capability is where to start.
              </p>
            </div>
            <LeadForm placement="bottom" variant="full" />
          </div>
        </Container>
      </section>

      <FaqSection ids={capability.faqIds.length ? capability.faqIds : ["global-what", "is-ad-spend-included"]} />
      <CtaBand headline={`Add ${capability.name.toLowerCase()} to your growth system.`} ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
