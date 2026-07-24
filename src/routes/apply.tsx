import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/apply")({
  head: () =>
    buildSeo({
      title: "Apply for the Growth Systems Audit | Stonehurst Lane",
      description:
        "Tell us about the business, current marketing and primary growth constraint. We'll identify the most useful place to begin.",
      path: "/apply",
    }),
  component: Apply,
});

function Apply() {
  return (
    <PageShell>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Application</span>
              <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
                Find where your growth system is losing opportunity.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                Applications are read by a partner, not a bot. You'll hear back within one business day.
              </p>
              <div className="mt-10 space-y-3 text-sm text-muted-foreground">
                <p>— No pitch deck.</p>
                <p>— No obligation to proceed.</p>
                <p>— Honest reply on whether we're a fit.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <LeadForm placement="standalone" variant="full" />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
