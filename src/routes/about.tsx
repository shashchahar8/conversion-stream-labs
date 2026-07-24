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
              Stonehurst Lane exists to make revenue growth more predictable for ambitious service businesses. We run the full stack because we've seen what happens when it's fragmented.
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
                    <span className="mr-3 text-accent">—</span>{p}
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
                Founder photos, team photos and full team bios appear once approved brand assets are supplied. See <a href="/about#assets" className="gold-underline">brand asset status</a>.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/5] rounded-2xl border border-dashed border-border bg-mist/50 p-4 text-xs text-muted-foreground">
                    Approved team photo required
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand headline="Ready to talk?" ctaLabel={site.primaryCta.label} ctaHref={site.primaryCta.href} />
    </PageShell>
  );
}
