import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Temporary text wordmark. Replace with the approved logo once brand
 * assets are supplied — see docs/BRAND-ASSETS-REQUIRED.md.
 */
export function Wordmark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-baseline gap-2 font-display text-xl font-medium tracking-tight",
        inverse ? "text-bone" : "text-foreground",
        className,
      )}
      aria-label="Stonehurst Lane — home"
    >
      <span>Stonehurst</span>
      <span className="text-accent">·</span>
      <span>Lane</span>
    </Link>
  );
}
