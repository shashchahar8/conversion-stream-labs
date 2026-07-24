import { useCallback } from "react";
import type { AnalyticsEvent } from "@/config/analytics";

/**
 * Vendor-agnostic analytics dispatcher. Emits a CustomEvent that Codex
 * can wire into GA4, Segment, PostHog or a server-side collector.
 */
export function useAnalytics() {
  return useCallback((event: AnalyticsEvent) => {
    if (typeof window === "undefined") return;
    try {
      window.dispatchEvent(new CustomEvent("shl:analytics", { detail: event }));
      if (import.meta.env.DEV) {
        // Lightweight dev-mode signal so wiring is visible during build.
        console.debug("[analytics]", event.name, event);
      }
    } catch {
      /* no-op */
    }
  }, []);
}
