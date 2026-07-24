import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { insights } from "@/content/library";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/insights/$articleSlug")({
  loader: ({ params }) => {
    const article = insights.find((a) => a.slug === params.articleSlug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    return buildSeo({
      title: `${loaderData.article.title} | Stonehurst Lane`,
      description: loaderData.article.excerpt,
      path: `/insights/${loaderData.article.slug}`,
      ogType: "article",
    });
  },
  component: Article,
});

function Article() {
  const { article } = Route.useLoaderData();
  return (
    <PageShell>
      <article className="py-24 md:py-32">
        <Container>
          <p className="eyebrow">{article.category}</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl md:text-6xl leading-[1.05]">{article.title}</h1>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground">{article.excerpt}</p>
        </Container>
      </article>
    </PageShell>
  );
}
