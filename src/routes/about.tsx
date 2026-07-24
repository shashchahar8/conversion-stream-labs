import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About Stonehurst Lane | Growth systems for ambitious service businesses",
      description:
        "Stonehurst Lane operates connected growth systems for high-value service businesses across regulated industries.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">About</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              A full-stack growth operator for serious businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Stonehurst Lane exists to make revenue growth more predictable for ambitious service
              businesses. We run the full stack because we've seen what happens when it's
              fragmented.
            </p>
          </div>
        </Container>
      </section>
      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Principles</span>
              <h2 className="mt-5 font-display text-3xl md:text-4xl leading-[1.05]">
                What we hold ourselves to.
              </h2>
              <ul className="mt-8 border-t border-border">
                {[
                  "Diagnose the constraint, don't sell the service.",
                  "Measure against pipeline and revenue.",
                  "Own the handoff between every layer.",
                  "Never publish fabricated proof.",
                  "Decline arrangements we can't operate well.",
                ].map((p) => (
                  <li key={p} className="border-b border-border py-4 text-base">
                    <span className="mr-3 text-accent">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Team</span>
              <h2 className="mt-5 font-display text-3xl md:text-4xl leading-[1.05]">
                Small, senior, hands on.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Strategy and execution stay close together. Engagements are led by senior operators,
                with specialist support brought in where the system requires it.
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {[
                  [
                    "Senior ownership",
                    "The people shaping the strategy stay accountable for its execution.",
                  ],
                  [
                    "Specialist depth",
                    "Channel and systems specialists are added around the commercial constraint.",
                  ],
                  [
                    "Clear accountability",
                    "One connected operating view replaces fragmented supplier handoffs.",
                  ],
                  [
                    "Measured decisions",
                    "Work is prioritised against pipeline quality and revenue impact.",
                  ],
                ].map(([title, body]) => (
                  <div key={title} className="bg-card p-5">
                    <h3 className="font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand
        headline="Ready to talk?"
        ctaLabel={site.primaryCta.label}
        ctaHref={site.primaryCta.href}
      />
    </PageShell>
  );
}
