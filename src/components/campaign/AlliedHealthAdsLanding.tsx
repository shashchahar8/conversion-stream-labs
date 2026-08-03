import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/global/Container";
import { Wordmark } from "@/components/global/Wordmark";
import { CampaignAdsHeader } from "@/components/navigation/CampaignAdsHeader";
import { CampaignFlow } from "@/components/sections/CampaignFlow";
import { StickyCampaignCta } from "@/components/forms/StickyCampaignCta";
import { LeadFormDialog } from "@/components/forms/LeadFormDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { site } from "@/config/site";
import type { AdsLandingContent } from "@/types/campaign-landing";
import type { FormPlacement } from "@/types/lead";

/**
 * Reusable allied-health paid-traffic landing template.
 *
 * Renders entirely from an `AdsLandingContent` object so a second discipline
 * (podiatry, Phase 3) can mount the same layout with different copy. Every
 * primary CTA opens the existing shared lead-form dialog — no page navigation
 * away from the campaign, and no bespoke form.
 */
export function AlliedHealthAdsLanding({ content }: { content: AdsLandingContent }) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<FormPlacement>("cta-modal");
  const analytics = useAnalytics();

  const openForm = useCallback(
    (nextPlacement: FormPlacement, ctaLocation: string) => {
      setPlacement(nextPlacement);
      setOpen(true);
      analytics({
        name: "primary_cta_click",
        campaign: content.campaignId,
        industry: content.industryId,
        ctaLocation,
      });
      analytics({
        name: "form_open",
        campaign: content.campaignId,
        industry: content.industryId,
        formPlacement: nextPlacement,
      });
    },
    [analytics, content.campaignId, content.industryId],
  );

  const trackPhone = useCallback(
    (ctaLocation: string) => {
      analytics({
        name: "phone_click",
        campaign: content.campaignId,
        industry: content.industryId,
        ctaLocation,
      });
    },
    [analytics, content.campaignId, content.industryId],
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <CampaignAdsHeader
        ctaLabel={content.hero.primaryCta}
        onCtaClick={() => openForm("cta-modal", "header")}
        onPhoneClick={() => trackPhone("header")}
      />

      <main id="main" className="flex-1 pb-28 lg:pb-0">
        {/* 2 — Offer-led hero */}
        <section className="py-14 md:py-20">
          <Container>
            <div className="max-w-3xl">
              <span className="eyebrow">{content.hero.eyebrow}</span>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.75rem]">
                {content.hero.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {content.hero.supporting}
              </p>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
                {content.hero.qualification}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-12 rounded-full px-7"
                  onClick={() => openForm("hero", "hero")}
                >
                  {content.hero.primaryCta}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full px-7"
                  onClick={() => trackPhone("hero")}
                >
                  <a href={site.phone.href}>
                    <Phone className="mr-2 size-4" aria-hidden />
                    Call {site.phone.display}
                  </a>
                </Button>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground">
                {content.hero.microcopy}
              </p>
            </div>
          </Container>
        </section>

        {/* 3 — Immediate proof strip */}
        <section className="section-ink py-12 md:py-16">
          <Container>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <span className="eyebrow">{content.proof.eyebrow}</span>
                <p className="mt-4 font-display text-3xl leading-[1.05] text-accent md:text-4xl lg:text-[2.75rem]">
                  {content.proof.result}
                </p>
              </div>
              <div className="lg:col-span-7 lg:border-l lg:border-border lg:pl-10">
                <p className="text-lg text-bone">{content.proof.supporting}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {content.proof.qualification}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 4 — Referral dependence and website leakage */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="eyebrow">{content.problem.eyebrow}</span>
                <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[2.75rem]">
                  {content.problem.headline}
                </h2>
                <ul className="mt-8 space-y-4">
                  {content.problem.points.map((point) => (
                    <li key={point} className="flex gap-3 text-base text-muted-foreground">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Self-diagnosis
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">
                    {content.problem.selfCheck.title}
                  </h3>
                  <ol className="mt-6 divide-y divide-border border-y border-border">
                    {content.problem.selfCheck.prompts.map((prompt, i) => (
                      <li key={prompt} className="flex gap-4 py-3.5 text-sm">
                        <span className="font-mono text-xs text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{prompt}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="mt-6 font-display text-xl leading-snug md:text-2xl">
                  {content.problem.closing}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 5 — Compact connected acquisition system */}
        <section className="border-y border-border bg-muted/40 py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <span className="eyebrow">{content.system.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[2.75rem]">
                {content.system.headline}
              </h2>
            </div>
            <div className="mt-10">
              <CampaignFlow stages={content.system.stages} />
            </div>
            <p className="mt-10 max-w-2xl text-base text-muted-foreground md:text-lg">
              {content.system.supporting}
            </p>
          </Container>
        </section>

        {/* 6 — Founding physiotherapy offer */}
        <section className="section-ink py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow">{content.offer.eyebrow}</span>
                <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[2.75rem]">
                  {content.offer.headline}
                </h2>
                <div className="mt-8 space-y-2.5 text-sm text-muted-foreground">
                  {content.offer.clarifications.map((c) => (
                    <p key={c}>— {c}</p>
                  ))}
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-8 h-12 rounded-full px-7"
                  onClick={() => openForm("mid-page", "offer")}
                >
                  {content.hero.primaryCta}
                </Button>
              </div>
              <ul className="grid gap-3 lg:col-span-7">
                {content.offer.items.map((item, i) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 md:p-6"
                  >
                    <span className="mt-1 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-xl text-bone md:text-2xl">{item.title}</p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* 7 — Anonymous case study */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow">{content.caseStudy.eyebrow}</span>
                <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[2.75rem]">
                  {content.caseStudy.headline}
                </h2>
                <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                  {content.caseStudy.label}
                </p>
                <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                  <p className="font-display text-4xl text-accent">{content.caseStudy.result}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {content.caseStudy.resultDetail}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-10">
                <div className="border-t border-border pt-6">
                  <p className="eyebrow">Challenge</p>
                  <p className="mt-3 text-base text-muted-foreground md:text-lg">
                    {content.caseStudy.challenge}
                  </p>
                </div>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="eyebrow">Approach</p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {content.caseStudy.approach.map((step) => (
                      <li key={step} className="flex gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                  {content.caseStudy.qualification}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 8 — Qualification and next-step process */}
        <section className="border-y border-border bg-muted/40 py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <span className="eyebrow">{content.qualification.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[2.75rem]">
                {content.qualification.headline}
              </h2>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Good fit
                </p>
                <ul className="mt-4 space-y-2.5">
                  {content.qualification.goodFit.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Not suitable where
                </p>
                <ul className="mt-4 space-y-2.5">
                  {content.qualification.notSuitable.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 opacity-60" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-border pt-10">
              <p className="eyebrow">{content.qualification.processTitle}</p>
              <ol className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
                {content.qualification.process.map((step, i) => (
                  <li key={step}>
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1.5 text-sm leading-snug">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        {/* 9 — Campaign FAQs */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <span className="eyebrow">FAQs</span>
                <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl">
                  Questions clinic owners ask.
                </h2>
              </div>
              <div className="lg:col-span-2">
                <Accordion type="single" collapsible className="border-t border-border">
                  {content.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </section>

        {/* 10 — Final CTA */}
        <section className="section-ink py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <span className="eyebrow">{content.finalCta.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl leading-[1.06] md:text-4xl lg:text-[3rem]">
                {content.finalCta.headline}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                {content.finalCta.supporting}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 rounded-full px-7"
                  onClick={() => openForm("bottom", "final-cta")}
                >
                  {content.finalCta.primaryCta}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/25 px-7 text-bone hover:bg-white/10"
                  onClick={() => trackPhone("final-cta")}
                >
                  <a href={site.phone.href}>
                    <Phone className="mr-2 size-4" aria-hidden />
                    Call {site.phone.display}
                  </a>
                </Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">{content.finalCta.microcopy}</p>
            </div>
          </Container>
        </section>
      </main>

      {/* 11 — Campaign footer */}
      <footer className="border-t border-border py-10">
        <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Wordmark />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a href={site.phone.href} onClick={() => trackPhone("footer")}>
              {site.phone.display}
            </a>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
        </Container>
      </footer>

      <StickyCampaignCta
        label={content.stickyCtaLabel}
        onClick={() => openForm("sticky-mobile", "sticky-mobile")}
      />

      <LeadFormDialog
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        campaignId={content.campaignId}
        industryId={content.industryId}
      />
    </div>
  );
}
