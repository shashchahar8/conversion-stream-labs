import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CalcomEmbed } from "./CalcomEmbed";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAttribution } from "@/hooks/useAttribution";
import { useLeadFormState, type LeadFormValues } from "@/hooks/useLeadFormState";
import { getLeadSessionId } from "@/lib/lead-session";
import { startLead, updateLead } from "@/services/lead-funnel-api";
import type { FormPlacement } from "@/types/lead";
import type { LeadFunnelConfig } from "@/types/lead-funnel";

const options = {
  practitionerRange: [
    ["solo", "Solo practitioner"],
    ["2-3", "2–3"],
    ["4-6", "4–6"],
    ["7-10", "7–10"],
    ["11+", "11+"],
  ],
  locationRange: [
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4+", "4+"],
  ],
  capacityStatus: [
    ["need-now", "We need more patients now"],
    ["some", "Some capacity"],
    ["near-capacity", "Near capacity"],
    ["unsure", "Unsure"],
  ],
  acquisitionSource: [
    ["referrals", "Referrals"],
    ["organic-google", "Organic Google"],
    ["google-ads", "Google Ads"],
    ["meta-ads", "Meta ads"],
    ["partnerships", "Partnerships"],
    ["other", "Other"],
  ],
  decisionAuthority: [
    ["owner", "Owner / final decision-maker"],
    ["part-decision", "Part of the decision"],
    ["researching", "Researching for someone else"],
  ],
  googleAdsStatus: [
    ["current", "Currently running"],
    ["previous", "Previously ran"],
    ["never", "Never run"],
    ["unsure", "Unsure"],
  ],
  plannedAdSpendRange: [
    ["under-1000", "Under $1,000"],
    ["1000-1500", "$1,000–$1,500"],
    ["1500-3000", "$1,500–$3,000"],
    ["3000+", "$3,000+"],
    ["unsure", "Unsure"],
  ],
  implementationTiming: [
    ["immediately", "Immediately"],
    ["30-days", "Within 30 days"],
    ["1-3-months", "Within 1–3 months"],
    ["later", "Researching for later"],
  ],
  websiteStatus: [
    ["performing", "Website is performing well"],
    ["needs-improvement", "Website needs improvement"],
    ["need-new", "Need a new website"],
    ["none", "No website"],
    ["unsure", "Unsure"],
  ],
  primaryGrowthProblem: [
    ["referral-reliance", "Too reliant on referrals"],
    ["inconsistent-enquiries", "Not enough consistent enquiries"],
    ["ads-underperforming", "Google Ads are underperforming"],
    ["website-not-converting", "Website is not converting"],
    ["poor-quality-leads", "Poor-quality leads"],
    ["limited-tracking", "Limited tracking or visibility"],
    ["other", "Other"],
  ],
} as const;

export function UniversalLeadFunnel({
  config,
  placement,
  ctaLocation,
}: {
  config: LeadFunnelConfig;
  placement: FormPlacement;
  ctaLocation: string;
}) {
  const { values, update, hydrated } = useLeadFormState(config.id);
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"form" | "cal" | "callback" | "booking-reported">("form");
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const attribution = useAttribution();
  const analytics = useAnalytics();

  useEffect(() => {
    const completed = Number(values.completedStep ?? 0);
    if (completed >= 1 && completed < 5) setStep(completed + 1);
    if (completed >= 5) {
      setStep(5);
      setMode(values.nextAction === "callback" ? "callback" : "cal");
    }
  }, [values.completedStep, values.nextAction]);

  useEffect(() => {
    if (!hydrated) return;
    analytics({
      name: "funnel_step_viewed",
      campaign: config.campaignId,
      industry: config.industryId,
      meta: { step },
    });
  }, [analytics, config.campaignId, config.industryId, hydrated, step]);

  const set = (name: string, value: string | boolean) => update({ [name]: value });
  const value = (name: string) =>
    typeof values[name] === "string" ? (values[name] as string) : "";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submittingRef.current || !formRef.current?.reportValidity()) return;
    submittingRef.current = true;
    setBusy(true);
    setError("");
    try {
      const sessionId = value("sessionId") || getLeadSessionId();
      if (!sessionId)
        throw new Error("This browser could not start a secure session. Please try again.");
      if (step === 1) {
        if (values.privacyConsent !== true)
          throw new Error("Please agree to the privacy consent before continuing.");
        const a = attribution.build("modal", placement, undefined, ctaLocation);
        const result = await startLead({
          sessionId,
          firstName: value("firstName"),
          organisationName: value("organisationName"),
          email: value("email"),
          phone: value("phone"),
          campaignId: config.campaignId,
          industryId: config.industryId,
          privacyConsent: true,
          firstLandingPage: a.originalLandingUrl,
          currentLandingPage: a.currentUrl,
          referrer: a.referrer,
          utmSource: a.utmSource,
          utmMedium: a.utmMedium,
          utmCampaign: a.utmCampaign,
          utmContent: a.utmContent,
          utmTerm: a.utmTerm,
          fbclid: a.fbclid,
          ctaLocation,
        });
        update({ sessionId, leadId: result.leadId, completedStep: "1" });
        analytics({
          name: "lead_started",
          campaign: config.campaignId,
          industry: config.industryId,
          ctaLocation,
        });
      } else {
        const leadId = value("leadId");
        if (!leadId)
          throw new Error("Your saved enquiry could not be restored. Please reopen the form.");
        const payload = buildStepPayload(step, values, sessionId);
        await updateLead(leadId, payload);
        update({ completedStep: String(step) });
        analytics({
          name:
            step === 5 && value("nextAction") === "callback"
              ? "callback_requested"
              : "qualification_saved",
          campaign: config.campaignId,
          industry: config.industryId,
          meta: { step },
        });
        if (step === 5) {
          analytics({
            name: "funnel_step_completed",
            campaign: config.campaignId,
            industry: config.industryId,
            meta: { step },
          });
          if (value("nextAction") === "callback") {
            setMode("callback");
            analytics({
              name: "funnel_completed",
              campaign: config.campaignId,
              industry: config.industryId,
              meta: { nextAction: "callback" },
            });
          } else {
            setMode("cal");
            analytics({
              name: "cal_embed_opened",
              campaign: config.campaignId,
              industry: config.industryId,
            });
          }
          return;
        }
      }
      analytics({
        name: "funnel_step_completed",
        campaign: config.campaignId,
        industry: config.industryId,
        meta: { step },
      });
      setStep((current) => current + 1);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "We could not save your details. Please try again.",
      );
      analytics({
        name: step === 1 ? "lead_start_failed" : "funnel_step_failed",
        campaign: config.campaignId,
        industry: config.industryId,
        meta: { step },
      });
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true'], input, select, textarea")
          ?.focus(),
      );
    } finally {
      submittingRef.current = false;
      setBusy(false);
    }
  }

  if (!hydrated)
    return (
      <div
        role="status"
        className="min-h-48 rounded-xl border border-border p-6 text-sm text-muted-foreground"
      >
        Restoring your enquiry…
      </div>
    );

  if (mode === "callback")
    return <Confirmation title="Callback requested">{config.callbackConfirmation}</Confirmation>;
  if (mode === "booking-reported")
    return (
      <Confirmation title="Booking received">
        Cal.com has reported your booking. We’ll treat the signed Cal.com webhook as the
        authoritative confirmation.
      </Confirmation>
    );
  if (mode === "cal")
    return (
      <CalcomEmbed
        config={config}
        leadId={value("leadId")}
        firstName={value("firstName")}
        email={value("email")}
        organisationName={value("organisationName")}
        onBookingReported={() => {
          setMode("booking-reported");
          analytics({
            name: "cal_booking_client_reported",
            campaign: config.campaignId,
            industry: config.industryId,
          });
        }}
      />
    );

  return (
    <form ref={formRef} onSubmit={submit} className="min-w-0" noValidate={false}>
      <div className="mb-5">
        <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>Step {step} of 5</span>
          <span>{step * 20}%</span>
        </div>
        <Progress value={step * 20} className="mt-2 h-1" />
      </div>
      <h3 className="font-display text-2xl">
        {
          [
            "",
            "Contact",
            "Clinic profile",
            "Commercial readiness",
            "Main growth problem",
            "Choose your next step",
          ][step]
        }
      </h3>
      <div className="mt-5 grid gap-4">
        {step === 1 && (
          <>
            <TextField
              name="firstName"
              label="First name"
              value={value("firstName")}
              onChange={set}
              autoComplete="given-name"
            />
            <TextField
              name="organisationName"
              label={config.organisationLabel}
              value={value("organisationName")}
              onChange={set}
              autoComplete="organization"
            />
            <TextField
              name="email"
              label="Work email"
              value={value("email")}
              onChange={set}
              type="email"
              autoComplete="email"
            />
            <TextField
              name="phone"
              label="Mobile phone"
              value={value("phone")}
              onChange={set}
              type="tel"
              autoComplete="tel"
            />
            <div className="flex items-start gap-3">
              <Checkbox
                id="privacyConsent"
                checked={values.privacyConsent === true}
                onCheckedChange={(checked) => set("privacyConsent", checked === true)}
              />
              <Label htmlFor="privacyConsent" className="text-sm font-normal leading-relaxed">
                I agree that Stonehurst Lane may store these details and contact me about my
                enquiry.{" "}
                <Link to="/privacy" target="_blank" className="gold-underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Choice
              name="practitionerRange"
              label="Number of practitioners"
              value={value("practitionerRange")}
              onChange={set}
              items={options.practitionerRange}
            />
            <Choice
              name="locationRange"
              label="Number of locations"
              value={value("locationRange")}
              onChange={set}
              items={options.locationRange}
            />
            <Choice
              name="capacityStatus"
              label="Capacity for additional patients"
              value={value("capacityStatus")}
              onChange={set}
              items={options.capacityStatus}
            />
            <Choice
              name="acquisitionSource"
              label="Primary patient-acquisition source"
              value={value("acquisitionSource")}
              onChange={set}
              items={options.acquisitionSource}
            />
            <TextField
              name="websiteUrl"
              label="Website URL (optional)"
              value={value("websiteUrl")}
              onChange={set}
              type="url"
              required={false}
            />
          </>
        )}
        {step === 3 && (
          <>
            <Choice
              name="decisionAuthority"
              label="Decision-making authority"
              value={value("decisionAuthority")}
              onChange={set}
              items={options.decisionAuthority}
            />
            <Choice
              name="googleAdsStatus"
              label="Current Google Ads status"
              value={value("googleAdsStatus")}
              onChange={set}
              items={options.googleAdsStatus}
            />
            <Choice
              name="plannedAdSpendRange"
              label="Planned monthly advertising spend"
              value={value("plannedAdSpendRange")}
              onChange={set}
              items={options.plannedAdSpendRange}
            />
            <Choice
              name="implementationTiming"
              label="Intended timing"
              value={value("implementationTiming")}
              onChange={set}
              items={options.implementationTiming}
            />
            <Choice
              name="websiteStatus"
              label="Current website status"
              value={value("websiteStatus")}
              onChange={set}
              items={options.websiteStatus}
            />
          </>
        )}
        {step === 4 && (
          <>
            <Choice
              name="primaryGrowthProblem"
              label="Primary growth problem"
              value={value("primaryGrowthProblem")}
              onChange={set}
              items={options.primaryGrowthProblem}
            />
            <div>
              <Label htmlFor="additionalContext">Additional context (optional)</Label>
              <Textarea
                id="additionalContext"
                maxLength={1000}
                value={value("additionalContext")}
                onChange={(event) => set("additionalContext", event.target.value)}
                placeholder="Business context only — please do not include patient or clinical information."
              />
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <Choice
              name="nextAction"
              label="What would you like to do next?"
              value={value("nextAction")}
              onChange={set}
              items={[
                ["booking", "Book my free growth strategy call"],
                ["callback", "Request a callback"],
              ]}
            />
            {value("nextAction") === "callback" && (
              <Choice
                name="callbackPreference"
                label="Preferred time"
                value={value("callbackPreference")}
                onChange={set}
                required={false}
                items={[
                  ["morning", "Morning"],
                  ["afternoon", "Afternoon"],
                  ["no-preference", "No preference"],
                ]}
              />
            )}
          </>
        )}
      </div>
      {error && (
        <div
          role="alert"
          className="mt-5 flex gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <AlertTriangle className="size-4 shrink-0" />
          {error}
        </div>
      )}
      <div className="mt-6 flex justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            disabled={busy}
            onClick={() => setStep((current) => current - 1)}
          >
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={busy} className="rounded-full px-6">
          {busy ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving
            </>
          ) : step === 5 ? (
            "Continue"
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </form>
  );
}

function buildStepPayload(
  step: number,
  values: LeadFormValues,
  sessionId: string,
): Record<string, unknown> {
  const fields: Record<number, string[]> = {
    2: ["practitionerRange", "locationRange", "capacityStatus", "acquisitionSource", "websiteUrl"],
    3: [
      "decisionAuthority",
      "googleAdsStatus",
      "plannedAdSpendRange",
      "implementationTiming",
      "websiteStatus",
    ],
    4: ["primaryGrowthProblem", "additionalContext"],
    5: ["nextAction", "callbackPreference"],
  };
  return Object.fromEntries([
    ["sessionId", sessionId],
    ["completedStep", step],
    ...(fields[step] ?? []).map((field) => [field, values[field]]),
  ]);
}

function TextField({
  name,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = true,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        required={required}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </div>
  );
}
function Choice({
  name,
  label,
  value,
  onChange,
  items,
  required = true,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  items: readonly (readonly [string, string])[];
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        required={required}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="">Select…</option>
        {items.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
function Confirmation({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="rounded-2xl border border-border bg-card p-6">
      <CheckCircle2 className="size-8 text-accent" />
      <h3 className="mt-4 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}
