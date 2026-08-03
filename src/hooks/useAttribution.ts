import { useEffect, useMemo, useState } from "react";
import type { LeadAttribution, FormVariant, FormPlacement } from "@/types/lead";

const STORAGE_KEY = "shl.attribution.v1";

interface StoredAttribution {
  originalLandingUrl: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  campaignId?: string;
  creativeId?: string;
  adClickId?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  firstVisitTimestamp: string;
}

function readParams(url: URL) {
  const q = url.searchParams;
  return {
    utmSource: q.get("utm_source") ?? undefined,
    utmMedium: q.get("utm_medium") ?? undefined,
    utmCampaign: q.get("utm_campaign") ?? undefined,
    utmContent: q.get("utm_content") ?? undefined,
    utmTerm: q.get("utm_term") ?? undefined,
    campaignId: q.get("cid") ?? undefined,
    creativeId: q.get("creative") ?? undefined,
    adClickId: q.get("gclid") ?? undefined,
    gclid: q.get("gclid") ?? undefined,
    fbclid: q.get("fbclid") ?? undefined,
    msclkid: q.get("msclkid") ?? undefined,
  };
}

export function useAttribution() {
  const [stored, setStored] = useState<StoredAttribution | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const existing = sessionStorage.getItem(STORAGE_KEY);
      if (existing) {
        setStored(JSON.parse(existing) as StoredAttribution);
        return;
      }
      const url = new URL(window.location.href);
      const first: StoredAttribution = {
        originalLandingUrl: url.toString(),
        referrer: document.referrer,
        firstVisitTimestamp: new Date().toISOString(),
        ...readParams(url),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(first));
      setStored(first);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);

  const build = useMemo(
    () =>
      (
        variant: FormVariant,
        placement: FormPlacement,
        bottleneck?: string,
        ctaLocation?: string,
      ): LeadAttribution => {
        const currentUrl = typeof window !== "undefined" ? window.location.href : "";
        const pageSlug = typeof window !== "undefined" ? window.location.pathname : "";
        return {
          currentUrl,
          originalLandingUrl: stored?.originalLandingUrl ?? currentUrl,
          pageSlug,
          referrer: stored?.referrer ?? "",
          utmSource: stored?.utmSource,
          utmMedium: stored?.utmMedium,
          utmCampaign: stored?.utmCampaign,
          utmContent: stored?.utmContent,
          utmTerm: stored?.utmTerm,
          campaignId: stored?.campaignId,
          creativeId: stored?.creativeId,
          adClickId: stored?.adClickId,
          gclid: stored?.gclid,
          fbclid: stored?.fbclid,
          msclkid: stored?.msclkid,
          firstVisitTimestamp: stored?.firstVisitTimestamp ?? new Date().toISOString(),
          submissionTimestamp: new Date().toISOString(),
          formVariant: variant,
          formPlacement: placement,
          ctaLocation,
          bottleneck,
        };
      },
    [stored],
  );

  return { build };
}
