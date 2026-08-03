import { useEffect, useId, useState } from "react";
import {
  CALCOM_BOOKING_EVENT,
  CALCOM_ORIGIN,
  CALCOM_SCRIPT_URL,
  parseCalBookingEvent,
} from "@/lib/calcom-embed";
import type { LeadFunnelConfig } from "@/types/lead-funnel";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[][];
  config?: { forwardQueryParams?: boolean };
};
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

let scriptPromise: Promise<void> | undefined;
const initialised = new Set<string>();
const eventInitialised = new Set<string>();
const bookingCallbacks = new Map<string, Set<() => void>>();

export function CalcomEmbed({
  config,
  leadId,
  firstName,
  email,
  organisationName,
  onBookingReported,
}: {
  config: LeadFunnelConfig;
  leadId: string;
  firstName: string;
  email: string;
  organisationName: string;
  onBookingReported: () => void;
}) {
  const reactId = useId().replace(/:/g, "");
  const id = `cal-inline-${reactId}`;
  const [failed, setFailed] = useState(false);
  const bookingUrl = `${CALCOM_ORIGIN}/${config.calLink}`;

  useEffect(() => {
    let active = true;
    const callbacks = bookingCallbacks.get(config.calNamespace) ?? new Set<() => void>();
    callbacks.add(onBookingReported);
    bookingCallbacks.set(config.calNamespace, callbacks);
    void loadCalScript()
      .then(() => {
        if (!active || !window.Cal) return;
        window.Cal.config ??= {};
        window.Cal.config.forwardQueryParams = true;
        if (!initialised.has(config.calNamespace)) {
          window.Cal("init", config.calNamespace, { origin: CALCOM_ORIGIN });
          initialised.add(config.calNamespace);
        }
        const api = window.Cal.ns?.[config.calNamespace] ?? window.Cal;
        api("inline", {
          elementOrSelector: `#${id}`,
          config: {
            layout: "week_view",
            useSlotsViewOnSmallScreen: "true",
            theme: "dark",
            name: firstName,
            email,
            metadata: { leadId, organisationName },
          },
          calLink: config.calLink,
        });
        api("ui", {
          theme: "dark",
          cssVarsPerTheme: { light: { "cal-brand": "#000000" }, dark: { "cal-brand": "#f7f3ea" } },
          hideEventTypeDetails: false,
          layout: "week_view",
        });
        if (!eventInitialised.has(config.calNamespace)) {
          api("on", {
            action: CALCOM_BOOKING_EVENT,
            callback: (event: unknown) => {
              if (!parseCalBookingEvent(event)) return;
              for (const callback of bookingCallbacks.get(config.calNamespace) ?? []) callback();
            },
          });
          eventInitialised.add(config.calNamespace);
        }
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
      callbacks.delete(onBookingReported);
    };
  }, [config, email, firstName, id, leadId, onBookingReported, organisationName]);

  if (failed)
    return (
      <p role="alert" className="rounded-xl border border-border p-4 text-sm">
        The booking calendar could not load.{" "}
        <a className="gold-underline" href={bookingUrl} target="_blank" rel="noreferrer">
          Open Cal.com in a new tab
        </a>
        .
      </p>
    );
  return (
    <div
      id={id}
      aria-label="Book a free growth strategy call"
      className="min-h-[680px] w-full overflow-hidden rounded-xl border border-border"
    >
      <p className="p-4 text-sm text-muted-foreground">Loading available times…</p>
    </div>
  );
}

function loadCalScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Cal) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALCOM_SCRIPT_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const queue = ((...args: unknown[]) => {
      if (args[0] === "init" && typeof args[1] === "string") {
        const namespace = args[1];
        queue.ns ??= {};
        const api =
          queue.ns[namespace] ??
          Object.assign((...namespaceArgs: unknown[]) => api.q?.push(namespaceArgs), {
            q: [] as unknown[][],
          });
        queue.ns[namespace] = api;
        api.q?.push(args);
        queue.q?.push(["initNamespace", namespace]);
        return;
      }
      queue.q?.push(args);
    }) as CalFn;
    queue.q = [];
    queue.ns = {};
    queue.loaded = true;
    window.Cal = queue;
    const script = document.createElement("script");
    script.src = CALCOM_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return scriptPromise;
}
