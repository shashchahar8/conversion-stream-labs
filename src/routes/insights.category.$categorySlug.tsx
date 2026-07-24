import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { insights } from "@/content/library";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/insights/category/$categorySlug")({
  loader: ({ params }) => {
    const items = insights.filter((a) => a.category.toLowerCase().replace(/\s+/g, "-") === params.categorySlug);
    return { items, categorySlug: params.categorySlug };
  },
  head: ({ params }) =>
    buildSeo({
      title: `Insights — ${params.categorySlug} | Stonehurst Lane`,
      description: "Articles filed under this category.",
      path: `/insights/category/${params.categorySlug}`,
    }),
  component: CategoryPage,
});

function CategoryPage() {
  const { items, categorySlug } = Route.useLoaderData();
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <span className="eyebrow">Category</span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] capitalize">{categorySlug.replace(/-/g, " ")}</h1>
          {items.length === 0 ? (
            <p className="mt-8 text-muted-foreground">No articles filed here yet.</p>
          ) : null}
        </Container>
      </section>
    </PageShell>
  );
}
