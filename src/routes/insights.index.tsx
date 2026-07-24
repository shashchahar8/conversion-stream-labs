import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { insights } from "@/content/library";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () =>
    buildSeo({
      title: "Insights — Commercial thinking on growth systems | Stonehurst Lane",
      description:
        "Practical writing on acquisition, conversion, pipeline design and follow-up for high-value service businesses.",
      path: "/insights",
    }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">Insights</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
              Commercial thinking, no thought-leadership theatre.
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
              Articles appear once they meet the editorial bar. Until then, this page stays deliberately quiet.
            </p>
          </div>
          {insights.length === 0 ? (
            <div className="mt-14 rounded-2xl border border-dashed border-border bg-mist/50 p-10 text-center text-muted-foreground">
              First articles are in the editorial queue.
            </div>
          ) : (
            <ul className="mt-14 grid gap-6 md:grid-cols-2">
              {insights.map((a) => (
                <li key={a.slug} className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{a.category}</p>
                  <h2 className="mt-2 font-display text-2xl">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
