import { Button } from "@/components/ui/button";

/**
 * Sticky mobile CTA for paid-traffic landing pages.
 *
 * Separate from `StickyMobileCta` so the generic `/growth-partners/$slug`
 * campaign pages keep their current behaviour untouched. Adds safe-area
 * padding so the button clears the iOS home indicator.
 */
export function StickyCampaignCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 backdrop-blur lg:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <Button className="h-12 w-full rounded-full text-base" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}
