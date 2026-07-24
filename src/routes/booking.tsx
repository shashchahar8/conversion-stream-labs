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
                Complete the short qualification form. If the engagement looks aligned, we will
                reply with available audit times.
              </p>
              <div className="mt-10 rounded-2xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  What happens next
                </p>
                <ol className="mt-5 space-y-4 text-sm">
                  <li>
                    <span className="mr-3 text-accent">01</span>We review your current growth
                    constraint.
                  </li>
                  <li>
                    <span className="mr-3 text-accent">02</span>Qualified applicants receive
                    available times.
                  </li>
                  <li>
                    <span className="mr-3 text-accent">03</span>The audit focuses on the
                    highest-impact system gaps.
                  </li>
                </ol>
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
