import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { buildSeo } from "@/lib/seo";
import { site } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildSeo({
      title: "Privacy Policy | Stonehurst Lane",
      description: "How Stonehurst Lane collects, uses and protects information supplied through this website and audit process.",
      path: "/privacy",
    }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell>
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl prose prose-neutral">
            <span className="eyebrow">Privacy</span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02]">Privacy Policy</h1>
            <p className="mt-6 text-muted-foreground">Last updated: pending final legal review.</p>
            <p className="mt-6">Stonehurst Lane ({site.legalName}) treats information supplied through this website as confidential commercial information. This document describes what we collect, why, and the rights you retain.</p>
            <h2 className="mt-10 font-display text-2xl">Information we collect</h2>
            <p>Details submitted through audit and contact forms — company, role, revenue band, current marketing and stated growth bottleneck. Technical telemetry: page views, referrer, UTM parameters, and coarse device information.</p>
            <h2 className="mt-10 font-display text-2xl">How we use it</h2>
            <p>To qualify enquiries, prepare for the audit conversation, and improve the site. We do not sell or share submitted data with third parties outside supporting processors (email, CRM, analytics) engaged under confidentiality.</p>
            <h2 className="mt-10 font-display text-2xl">Contact</h2>
            <p>Requests to access, correct or delete personal information: <a href={`mailto:${site.contactEmail}`} className="gold-underline">{site.contactEmail}</a>.</p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
