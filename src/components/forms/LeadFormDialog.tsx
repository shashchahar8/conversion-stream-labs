import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import type { FormPlacement } from "@/types/lead";

interface LeadFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement: FormPlacement;
  campaignId?: string;
  industryId?: string;
}

export function LeadFormDialog({ open, onOpenChange, placement, campaignId, industryId }: LeadFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book a Growth Systems Audit</DialogTitle>
          <DialogDescription>
            Tell us about the business and where growth is currently being lost.
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          placement={placement}
          variant="modal"
          campaignId={campaignId}
          industryId={industryId}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
