import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { caseStudies } from "@/content/library";
import { routeRegistry } from "@/config/routes";
import { site } from "@/config/site";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const registered: SitemapEntry[] = routeRegistry
          .filter((route) => route.indexable)
          .map((route) => ({
            path: route.path,
            changefreq: route.changefreq ?? "monthly",
            priority: route.priority,
          }));
        const publishedCaseStudies: SitemapEntry[] = caseStudies
          .filter((caseStudy) => caseStudy.status === "verified")
          .map((caseStudy) => ({
            path: `/work/${caseStudy.slug}`,
            changefreq: "monthly",
            priority: "0.6",
          }));
        const entries = [...registered, ...publishedCaseStudies];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${site.url}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
