import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import type { FormPlacement } from "@/types/lead";
import type { LeadFunnelConfig } from "@/types/lead-funnel";
import { UniversalLeadFunnel } from "./UniversalLeadFunnel";
import { cn } from "@/lib/utils";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement: FormPlacement;
  campaignId?: string;
  industryId?: string;
  ctaLocation?: string;
  funnelConfig?: LeadFunnelConfig;
}

export function LeadFormDialog({
  open,
  onOpenChange,
  placement,
  campaignId,
  industryId,
  ctaLocation = "cta-modal",
  funnelConfig,
}: LeadFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-y-auto",
          funnelConfig
            ? "max-h-[calc(100dvh-1rem)] sm:max-w-3xl"
            : "max-h-[calc(100dvh-2rem)] sm:max-w-2xl",
        )}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {funnelConfig?.dialogTitle ?? "Book a Growth Systems Audit"}
          </DialogTitle>
          <DialogDescription>
            {funnelConfig?.dialogDescription ??
              "Tell us about the business and where growth is currently being lost."}
          </DialogDescription>
        </DialogHeader>
        {funnelConfig ? (
          <UniversalLeadFunnel
            config={funnelConfig}
            placement={placement}
            ctaLocation={ctaLocation}
          />
        ) : (
          <LeadForm
            placement={placement}
            variant="modal"
            campaignId={campaignId}
            industryId={industryId}
            onSuccess={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
