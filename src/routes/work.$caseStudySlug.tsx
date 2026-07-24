import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { caseStudies } from "@/content/library";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/work/$caseStudySlug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.caseStudySlug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }] };
    return buildSeo({
      title: `${loaderData.study.title} | Stonehurst Lane`,
      description: loaderData.study.summary,
      path: `/work/${loaderData.study.slug}`,
      ogType: "article",
    });
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <span className="eyebrow">{study.industry}</span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{study.summary}</p>
        </Container>
      </section>
    </PageShell>
  );
}
