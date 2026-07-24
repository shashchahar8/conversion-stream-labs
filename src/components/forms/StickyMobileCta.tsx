import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadFormDialog } from "./LeadFormDialog";

/**
 * Restrained sticky mobile CTA. Only rendered on lg-and-below.
 */
export function StickyMobileCta({ label, campaignId }: { label: string; campaignId?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <Button className="w-full rounded-full" onClick={() => setOpen(true)}>
          {label}
        </Button>
      </div>
      <LeadFormDialog open={open} onOpenChange={setOpen} placement="sticky-mobile" campaignId={campaignId} />
    </>
  );
}
