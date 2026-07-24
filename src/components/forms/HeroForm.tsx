import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useLeadFormState } from "@/hooks/useLeadFormState";
import { LeadFormDialog } from "./LeadFormDialog";

/**
 * Variant A — Hero quick-start form. Captures first-touch details and
 * launches the full multi-step form in a modal, seeded with the entered
 * data so the visitor never re-types.
 */
export function HeroForm({ campaignId, industryId }: { campaignId?: string; industryId?: string }) {
  const { values, update } = useLeadFormState("default-lead-form");
  const [open, setOpen] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Start the audit
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <Label htmlFor="hf-first" className="sr-only">First name</Label>
            <Input
              id="hf-first"
              required
              placeholder="First name"
              autoComplete="given-name"
              value={typeof values.firstName === "string" ? values.firstName : ""}
              onChange={(e) => update({ firstName: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="hf-email" className="sr-only">Work email</Label>
            <Input
              id="hf-email"
              required
              type="email"
              placeholder="Work email"
              autoComplete="email"
              value={typeof values.email === "string" ? values.email : ""}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="hf-phone" className="sr-only">Telephone</Label>
            <Input
              id="hf-phone"
              required
              type="tel"
              placeholder="Telephone"
              autoComplete="tel"
              value={typeof values.phone === "string" ? values.phone : ""}
              onChange={(e) => update({ phone: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="hf-biz" className="sr-only">Business name</Label>
            <Input
              id="hf-biz"
              required
              placeholder="Business name"
              value={typeof values.businessName === "string" ? values.businessName : ""}
              onChange={(e) => update({ businessName: e.target.value })}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 w-full rounded-full">
          Get my growth plan <ArrowRight className="ml-2 size-4" />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Continues into a short qualification — you won't re-enter this.
        </p>
      </form>
      <LeadFormDialog
        open={open}
        onOpenChange={setOpen}
        placement="hero"
        campaignId={campaignId}
        industryId={industryId}
      />
    </>
  );
}
