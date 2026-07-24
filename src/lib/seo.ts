interface SeoInput {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  ogImage?: string | null;
  noindex?: boolean;
}

/**
 * Build the meta+links payload returned from a route's `head()`.
 * Canonical + og:url are relative — resolved against the live host.
 */
export function buildSeo(input: SeoInput) {
  const meta: Array<Record<string, string>> = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.ogType ?? "website" },
    { property: "og:url", content: input.path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
  ];
  if (input.ogImage) {
    meta.push({ property: "og:image", content: input.ogImage });
    meta.push({ name: "twitter:image", content: input.ogImage });
  }
  if (input.noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: input.path }],
  };
}
