import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { capabilities } from "@/content/capabilities";
import { industries } from "@/content/industries";
import { campaigns } from "@/content/campaigns";
import { caseStudies, insights } from "@/content/library";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/growth-systems", changefreq: "monthly", priority: "0.9" },
          { path: "/approach", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/work", changefreq: "monthly", priority: "0.7" },
          { path: "/insights", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/apply", changefreq: "monthly", priority: "0.8" },
          { path: "/privacy", changefreq: "yearly", priority: "0.2" },
          { path: "/terms", changefreq: "yearly", priority: "0.2" },
        ];

        const dynamic: SitemapEntry[] = [
          ...capabilities.map((c) => ({ path: `/capabilities/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...industries.map((i) => ({ path: `/industries/${i.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...campaigns.filter((c) => c.campaignType === "founding-growth-partner").map((c) => ({ path: `/growth-partners/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...caseStudies.map((c) => ({ path: `/work/${c.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
          ...insights.map((a) => ({ path: `/insights/${a.slug}`, changefreq: "monthly" as const, priority: "0.5" })),
        ];

        const entries = [...staticPaths, ...dynamic];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
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
