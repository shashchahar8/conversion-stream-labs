import type { ReactNode } from "react";
import { CampaignHeader } from "@/components/navigation/CampaignHeader";
import { StickyMobileCta } from "@/components/forms/StickyMobileCta";
import { Wordmark } from "@/components/global/Wordmark";
import { site } from "@/config/site";

interface CampaignShellProps {
  children: ReactNode;
  ctaLabel: string;
  campaignId?: string;
}

export function CampaignShell({ children, ctaLabel, campaignId }: CampaignShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <CampaignHeader ctaLabel={ctaLabel} campaignId={campaignId} />
      <main id="main" className="flex-1 pb-24 lg:pb-0">
        {children}
      </main>
      <footer className="section-ink py-10">
        <div className="container-x flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Wordmark inverse />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. Growth systems for ambitious service businesses.
          </p>
        </div>
      </footer>
      <StickyMobileCta label={ctaLabel} campaignId={campaignId} />
    </div>
  );
}
