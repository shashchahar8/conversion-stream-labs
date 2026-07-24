/**
 * Typed analytics event names. Codex will wire these to a production
 * analytics vendor. Do not import vendor SDKs into components — dispatch
 * events through the useAnalytics hook.
 */
export type AnalyticsEventName =
  | "page_view"
  | "industry_page_view"
  | "campaign_landing_view"
  | "primary_cta_click"
  | "secondary_cta_click"
  | "diagnostic_selection"
  | "form_open"
  | "form_start"
  | "form_step_complete"
  | "form_validation_error"
  | "form_submit"
  | "form_submit_success"
  | "form_submit_failure"
  | "calendar_view"
  | "phone_click"
  | "email_click";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  pageSlug?: string;
  industry?: string;
  campaign?: string;
  ctaLocation?: string;
  formPlacement?: string;
  formVariant?: string;
  bottleneck?: string;
  meta?: Record<string, string | number | boolean | undefined>;
}
