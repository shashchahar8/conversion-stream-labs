import { useState } from "react";
import { useLeadFormState } from "@/hooks/useLeadFormState";
import { useAnalytics } from "@/hooks/useAnalytics";
import { LeadFormDialog } from "./LeadFormDialog";
import { cn } from "@/lib/utils";

const OPTIONS = [
  "We need better leads",
  "Our website is not converting",
  "Follow-up is too slow",
  "We cannot track pipeline properly",
  "We need a connected growth system",
  "Not sure yet",
];

/**
 * Variant B — inline diagnostic form. Records the selected bottleneck
 * (persisted for later submission) and opens the full form.
 */
export function DiagnosticForm({ campaignId, industryId }: { campaignId?: string; industryId?: string }) {
  const { update, values } = useLeadFormState("default-lead-form");
  const analytics = useAnalytics();
  const [open, setOpen] = useState(false);
  const active = typeof values.bottleneck === "string" ? values.bottleneck : "";

  function pick(v: string) {
    update({ bottleneck: v });
    analytics({ name: "diagnostic_selection", bottleneck: v });
    setOpen(true);
  }

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Diagnostic
        </p>
        <h3 className="mt-2 font-display text-2xl md:text-3xl">
          Where is growth currently being lost?
        </h3>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              className={cn(
                "group flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                active === opt
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40 hover:bg-muted",
              )}
            >
              <span>{opt}</span>
              <span className="ml-3 text-xs opacity-60 group-hover:opacity-100">→</span>
            </button>
          ))}
        </div>
      </div>
      <LeadFormDialog
        open={open}
        onOpenChange={setOpen}
        placement="mid-page"
        campaignId={campaignId}
        industryId={industryId}
      />
    </>
  );
}
