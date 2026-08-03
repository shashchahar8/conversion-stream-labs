import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/global/Wordmark";
import { site } from "@/config/site";
import { Phone } from "lucide-react";

interface CampaignAdsHeaderProps {
  ctaLabel: string;
  onCtaClick: () => void;
  onPhoneClick?: () => void;
}

/**
 * Reduced header for paid-traffic landing pages: wordmark, phone, single CTA.
 * No site navigation — nothing competes with the conversion action.
 */
export function CampaignAdsHeader({ ctaLabel, onCtaClick, onPhoneClick }: CampaignAdsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Wordmark className="text-lg sm:text-xl" />
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={site.phone.href}
            onClick={onPhoneClick}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            <Phone className="size-4" aria-hidden />
            <span className="hidden sm:inline">{site.phone.display}</span>
            <span className="sr-only sm:hidden">Call {site.phone.display}</span>
          </a>
          <Button
            size="sm"
            className="hidden rounded-full px-5 md:inline-flex"
            onClick={onCtaClick}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
