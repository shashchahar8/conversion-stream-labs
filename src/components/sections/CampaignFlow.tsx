/**
 * Compact campaign flow — a condensed alternative to the seven-stage
 * SystemDiagram used on the generic campaign template.
 *
 * Desktop: a single horizontal run of stages.
 * Mobile: a tight two-column grid with connector rules, so six stages cost
 * roughly a third of the vertical space the full diagram would.
 */
export function CampaignFlow({ stages }: { stages: string[] }) {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-2">
      {stages.map((stage, i) => (
        <li key={stage} className="relative min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <p className="mt-2 font-display text-base leading-snug lg:text-lg">{stage}</p>
        </li>
      ))}
    </ol>
  );
}
