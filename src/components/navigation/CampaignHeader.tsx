import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/global/Wordmark";
import { LeadFormDialog } from "@/components/forms/LeadFormDialog";

interface CampaignHeaderProps {
  ctaLabel: string;
  campaignId?: string;
}

export function CampaignHeader({ ctaLabel, campaignId }: CampaignHeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Wordmark />
        <Button
          size="sm"
          className="rounded-full px-5"
          onClick={() => setOpen(true)}
        >
          {ctaLabel}
        </Button>
      </div>
      <LeadFormDialog open={open} onOpenChange={setOpen} placement="cta-modal" campaignId={campaignId} />
    </header>
  );
}
