import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildSeo({
      title: "Terms of Use | Stonehurst Lane",
      description: "Terms governing use of the Stonehurst Lane website and audit process.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl prose prose-neutral">
            <span className="eyebrow">Terms</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02]">Terms of Use</h1>
            <p className="mt-6 text-muted-foreground">Last updated: pending final legal review.</p>
            <p className="mt-6">This site is operated by {site.name}. Content is provided for informational purposes and does not constitute a commercial offer. Engagement terms are captured in a separate signed agreement.</p>
            <h2 className="mt-10 font-display text-2xl">No implied claims</h2>
            <p>Any figures, case studies or performance references are examples of prior work and are not projections of future results.</p>
            <h2 className="mt-10 font-display text-2xl">Contact</h2>
            <p><a href={`mailto:${site.contactEmail}`} className="gold-underline">{site.contactEmail}</a></p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
