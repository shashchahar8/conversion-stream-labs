import { createFileRoute } from "@tanstack/react-router";
import { AlliedHealthAdsLanding } from "@/components/campaign/AlliedHealthAdsLanding";
import { podiatryAdsLanding } from "@/content/allied-health-ads";
import { buildSeo } from "@/lib/seo";

/**
 * Dedicated paid-traffic landing route for podiatry clinics.
 *
 * A static segment, so TanStack Router matches it ahead of the generic
 * `/growth-partners/$slug` template. Reuses the approved
 * `AlliedHealthAdsLanding` component with no component changes.
 */
export const Route = createFileRoute("/growth-partners/podiatry-clinics")({
  head: () =>
    buildSeo({
      title: "Podiatry Clinic Google Ads — $100 First Month | Stonehurst Lane",
      description:
        "A founding offer for established podiatry clinics: $100 first month of Google Ads management, plus a website for the first five qualifying clinics. No lock-in contract.",
      path: "/growth-partners/podiatry-clinics",
    }),
  component: PodiatryLandingPage,
});

function PodiatryLandingPage() {
  return <AlliedHealthAdsLanding content={podiatryAdsLanding} />;
}
