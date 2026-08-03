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
  | "email_click"
  | "funnel_opened"
  | "funnel_step_viewed"
  | "funnel_step_completed"
  | "funnel_step_failed"
  | "lead_started"
  | "lead_start_failed"
  | "qualification_saved"
  | "callback_requested"
  | "cal_embed_opened"
  | "cal_booking_client_reported"
  | "funnel_completed";

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
