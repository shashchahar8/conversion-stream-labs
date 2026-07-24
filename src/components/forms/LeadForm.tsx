import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import type { FormDefinition, FormFieldDef, FormPlacement, FormVariant, LeadSubmission } from "@/types/lead";
import { defaultLeadForm, formDefinitions } from "@/config/forms";
import { useLeadFormState } from "@/hooks/useLeadFormState";
import { useAttribution } from "@/hooks/useAttribution";
import { useAnalytics } from "@/hooks/useAnalytics";
import { submitLead } from "@/services/lead-api";
import { cn } from "@/lib/utils";

export interface LeadFormProps {
  formId?: string;
  placement: FormPlacement;
  variant?: FormVariant;
  campaignId?: string;
  industryId?: string;
  startAtStep?: number;
  initialValues?: Record<string, string | boolean | string[]>;
  compact?: boolean;
  onSuccess?: (leadId?: string) => void;
}

type FieldValue = string | boolean | string[] | undefined;

export function LeadForm({
  formId,
  placement,
  variant = "full",
  campaignId,
  industryId,
  startAtStep = 0,
  initialValues,
  compact = false,
  onSuccess,
}: LeadFormProps) {
  const definition: FormDefinition = formId ? (formDefinitions[formId] ?? defaultLeadForm) : defaultLeadForm;
  const { values, update } = useLeadFormState(definition.id);
  const [step, setStep] = useState(startAtStep);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const attribution = useAttribution();
  const analytics = useAnalytics();
  const navigate = useNavigate();

  // seed initial values once
  useMemo(() => {
    if (initialValues) update(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStep = definition.steps[step];
  const isLastStep = step === definition.steps.length - 1;
  const progress = Math.round(((step + 1) / definition.steps.length) * 100);

  function setField(name: string, value: FieldValue) {
    update({ [name]: value });
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  function validateStep(): boolean {
    const stepErrors: Record<string, string> = {};
    for (const field of currentStep.fields) {
      const value = values[field.name];
      if (field.required) {
        if (field.type === "checkbox") {
          if (!value) stepErrors[field.name] = "Required";
        } else if (!value || (Array.isArray(value) && value.length === 0)) {
          stepErrors[field.name] = "Required";
        }
      }
      if (field.type === "email" && typeof value === "string" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        stepErrors[field.name] = "Enter a valid email";
      }
    }
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      analytics({ name: "form_validation_error", formPlacement: placement, formVariant: variant, meta: { step: currentStep.id } });
    }
    return Object.keys(stepErrors).length === 0;
  }

  async function handleNext() {
    if (!validateStep()) return;
    analytics({ name: "form_step_complete", formPlacement: placement, formVariant: variant, meta: { step: currentStep.id } });
    if (isLastStep) {
      await handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  }

  async function handleSubmit() {
    setStatus("submitting");
    setSubmitError(null);
    analytics({ name: "form_submit", formPlacement: placement, formVariant: variant, campaign: campaignId, industry: industryId });

    const payload: LeadSubmission = {
      contact: {
        firstName: str(values.firstName),
        lastName: str(values.lastName),
        email: str(values.email),
        phone: str(values.phone),
        businessName: str(values.businessName),
        website: values.website ? str(values.website) : undefined,
        noWebsite: Boolean(values.noWebsite),
      },
      qualification: {
        industry: optStr(values.industry),
        role: optStr(values.role),
        teamSize: optStr(values.teamSize),
        locations: optStr(values.locations),
        revenueBand: optStr(values.revenueBand),
        primaryService: optStr(values.primaryService),
        customerValue: optStr(values.customerValue),
        currentChannels: Array.isArray(values.currentChannels) ? values.currentChannels : undefined,
        monthlySpend: optStr(values.monthlySpend),
        capacity: optStr(values.capacity),
        bottleneck: optStr(values.bottleneck),
        launchTiming: optStr(values.launchTiming),
        authority: optStr(values.authority),
        adSpendWillingness: optStr(values.adSpendWillingness),
        crm: optStr(values.crm),
        challenge: optStr(values.challenge),
        referralSource: optStr(values.referralSource),
      },
      consent: {
        privacyConsent: Boolean(values.privacyConsent),
        marketingConsent: Boolean(values.marketingConsent),
      },
      attribution: attribution.build(variant, placement, optStr(values.bottleneck)),
      formDefinitionId: definition.id,
      campaignId,
      industryId,
    };

    try {
      const res = await submitLead(payload);
      if (res.success) {
        analytics({ name: "form_submit_success", formPlacement: placement, formVariant: variant, campaign: campaignId, industry: industryId });
        setStatus("success");
        onSuccess?.(res.leadId);
        if (res.nextAction === "redirect" && res.redirectUrl) {
          setTimeout(() => navigate({ to: res.redirectUrl! }), 800);
        }
      } else {
        setStatus("error");
        setErrors(res.errors ?? {});
        setSubmitError(res.message ?? "Please correct the highlighted fields.");
        analytics({ name: "form_submit_failure", formPlacement: placement, formVariant: variant });
      }
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      analytics({ name: "form_submit_failure", formPlacement: placement, formVariant: variant });
    }
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-border bg-card p-8", compact && "p-6")}>
        <CheckCircle2 className="size-8 text-accent" />
        <h3 className="mt-4 font-display text-2xl">Application received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting you now. If nothing happens, we've still got it — expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleNext();
      }}
      className={cn("rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm", compact && "p-5 md:p-6")}
      noValidate
    >
      {definition.steps.length > 1 ? (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span>Step {step + 1} of {definition.steps.length} · {currentStep.title}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="mt-2 h-1" />
        </div>
      ) : null}

      {currentStep.description ? (
        <p className="mb-5 text-sm text-muted-foreground">{currentStep.description}</p>
      ) : null}

      <div className="grid gap-4">
        {currentStep.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(v) => setField(field.name, v)}
          />
        ))}
      </div>

      {submitError ? (
        <div className="mt-5 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4" />
          <span>{submitError}</span>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : <span />}
        <Button type="submit" disabled={status === "submitting"} className="rounded-full px-6">
          {status === "submitting" ? (
            <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting</>
          ) : isLastStep ? (
            definition.submitLabel
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: FormFieldDef;
  value: FieldValue;
  error?: string;
  onChange: (v: FieldValue) => void;
}) {
  const id = `f-${field.name}`;
  const invalid = Boolean(error);

  if (field.type === "checkbox") {
    return (
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={Boolean(value)}
          onCheckedChange={(v) => onChange(Boolean(v))}
          aria-invalid={invalid}
        />
        <div>
          <Label htmlFor={id} className="text-sm font-normal leading-relaxed">
            {field.label}
            {field.required ? <span className="text-destructive"> *</span> : null}
          </Label>
          {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <Label htmlFor={id} className="mb-1.5 block text-sm">
          {field.label}{field.required ? <span className="text-destructive"> *</span> : null}
        </Label>
        <Select value={typeof value === "string" ? value : ""} onValueChange={(v) => onChange(v)}>
          <SelectTrigger id={id} aria-invalid={invalid}>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
      </div>
    );
  }

  if (field.type === "multiselect") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div>
        <Label className="mb-1.5 block text-sm">{field.label}</Label>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const active = arr.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(active ? arr.filter((x) => x !== opt) : [...arr, opt])}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <Label htmlFor={id} className="mb-1.5 block text-sm">
          {field.label}{field.required ? <span className="text-destructive"> *</span> : null}
        </Label>
        <Textarea
          id={id}
          rows={4}
          maxLength={field.maxLength}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          placeholder={field.placeholder}
        />
        {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm">
        {field.label}{field.required ? <span className="text-destructive"> *</span> : null}
      </Label>
      <Input
        id={id}
        type={field.type}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function str(v: FieldValue): string {
  return typeof v === "string" ? v : "";
}
function optStr(v: FieldValue): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}
