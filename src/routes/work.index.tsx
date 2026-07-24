import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/work/")({
  head: () =>
    buildSeo({
      title: "Work — Verified client outcomes | Stonehurst Lane",
      description:
        "Verified case studies from Stonehurst Lane engagements. Only published with reconciled data and client approval.",
      path: "/work",
    }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Work</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              Verified outcomes. Nothing fabricated.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Case studies are published once client approval and reconciled data are in place. Until then, this page stays honestly empty.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl border border-dashed border-border bg-mist/50 p-6 flex flex-col justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Placeholder</span>
                <div>
                  <p className="font-display text-xl">Approved case study required</p>
                  <p className="mt-1 text-sm text-muted-foreground">Awaiting client approval and reconciled data.</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand headline="Start the conversation." ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
