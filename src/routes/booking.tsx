import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/booking")({
  head: () =>
    buildSeo({
      title: "Book a Growth Systems Audit | Stonehurst Lane",
      description: "Book time with the Stonehurst Lane team after your application is qualified.",
      path: "/booking",
      noindex: true,
    }),
  component: Booking,
});

function Booking() {
  return (
    <PageShell>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Booking</span>
              <h1 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05]">
                Confirm your audit conversation.
              </h1>
              <p className="mt-6 text-muted-foreground">
                The calendar embed is added by Codex once the scheduling integration is configured.
              </p>
              <div className="mt-10 aspect-video rounded-2xl border border-dashed border-border bg-mist/50 flex items-center justify-center text-sm text-muted-foreground">
                Calendar embed placeholder
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
