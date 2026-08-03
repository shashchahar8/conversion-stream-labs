import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/layouts/PageShell";
import { Container } from "@/components/global/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/config/site";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "Contact | Stonehurst Lane",
      description:
        "Enquire about a Growth Systems Audit or an existing engagement. Replies within one business day.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Contact</span>
              <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.02]">
                Speak to a partner.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                For new engagements, use the audit form. For existing partners, email the account
                team directly.
              </p>
              <dl className="mt-10 space-y-6 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.contactEmail}`} className="gold-underline">
                      {site.contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Phone</dt>
                  <dd className="mt-1">
                    <a
                      href={site.phone.href}
                      aria-label={`Call Stonehurst Lane on ${site.phone.display}`}
                      className="gold-underline"
                    >
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Hours</dt>
                  <dd className="mt-1">Monday – Friday, business hours (AEST/AEDT)</dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-7">
              <LeadForm placement="standalone" variant="full" />
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
