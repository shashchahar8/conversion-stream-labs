import { createFileRoute } from "@tanstack/react-router";
import { AlliedHealthAdsLanding } from "@/components/campaign/AlliedHealthAdsLanding";
import { physiotherapyAdsLanding } from "@/content/allied-health-ads";
import { buildSeo } from "@/lib/seo";

/**
 * Dedicated paid-traffic landing route for physiotherapy clinics.
 *
 * A static segment, so TanStack Router matches it ahead of the generic
 * `/growth-partners/$slug` template — every other campaign keeps that template.
 */
export const Route = createFileRoute("/growth-partners/physiotherapy-clinics")({
  head: () =>
    buildSeo({
      title: "Physiotherapy Clinic Google Ads — $100 First Month | Stonehurst Lane",
      description:
        "A founding offer for established physiotherapy clinics: $100 first month of Google Ads management, plus a website for the first five qualifying clinics. No lock-in contract.",
      path: "/growth-partners/physiotherapy-clinics",
    }),
  component: PhysiotherapyLandingPage,
});

function PhysiotherapyLandingPage() {
  return <AlliedHealthAdsLanding content={physiotherapyAdsLanding} />;
}
