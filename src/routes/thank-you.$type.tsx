import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { buildSeo } from "@/lib/seo";

const messages: Record<string, { headline: string; body: string }> = {
  "growth-audit": {
    headline: "Application received.",
    body: "A partner will review your submission and reply within one business day. If we're not the right fit we'll say so.",
  },
  "founding-partner": {
    headline: "Founding partner application received.",
    body: "Because founding-partner arrangements are selective, expect a longer qualification call than a normal enquiry.",
  },
  "shared-upside": {
    headline: "Shared-upside assessment application received.",
    body: "Assessments are handled directly by Stonehurst Lane. Expect a compliance-first initial call.",
  },
};

export const Route = createFileRoute("/thank-you/$type")({
  loader: ({ params }) => {
    const message = messages[params.type];
    if (!message) throw notFound();
    return { message };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Thanks" }, { name: "robots", content: "noindex" }] };
    return buildSeo({
      title: `${loaderData.message.headline} | Stonehurst Lane`,
      description: loaderData.message.body,
      path: `/thank-you`,
      noindex: true,
    });
  },
  component: ThankYou,
});

function ThankYou() {
  const { message } = Route.useLoaderData();
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-2xl">
            <span className="eyebrow">Received</span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">{message.headline}</h1>
            <p className="mt-6 text-xl text-muted-foreground">{message.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Return home</Link>
              <Link to="/insights" className="rounded-full border border-input px-5 py-2.5 text-sm">Read insights</Link>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
