import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "./supabase.server";
import type { PersistedLead } from "./lead-start.server";
import type { QualificationUpdateInput } from "./lead-qualification-schema";

export interface QualifiedLead extends PersistedLead {
  practitionerRange?: string;
  locationRange?: string;
  capacityStatus?: string;
  acquisitionSource?: string;
  websiteUrl?: string;
  decisionAuthority?: string;
  googleAdsStatus?: string;
  plannedAdSpendRange?: string;
  implementationTiming?: string;
  websiteStatus?: string;
  primaryGrowthProblem?: string;
  additionalContext?: string;
  nextAction?: "booking" | "callback";
  callbackPreference?: string;
  callbackRequestedAt?: string;
  qualificationCompletedAt?: string;
  funnelCompletedAt?: string;
  calBookingStatus?: string;
  calBookingUid?: string;
  calBookingUrl?: string;
  calBookingStartAt?: string;
  calBookingTimezone?: string;
  calBookingCreatedAt?: string;
  calBookingCancelledAt?: string;
  calWebhookReceivedAt?: string;
}

export interface LeadQualificationRepository {
  findOwned(leadId: string, sessionId: string): Promise<QualifiedLead | null>;
  findById(leadId: string): Promise<QualifiedLead | null>;
  findByCalBookingUid(uid: string): Promise<QualifiedLead | null>;
  updateOwned(
    leadId: string,
    sessionId: string,
    input: QualificationUpdateInput,
    now: string,
  ): Promise<QualifiedLead | null>;
  updateCalBooking(leadId: string, patch: Record<string, unknown>): Promise<QualifiedLead>;
  recordTrelloRefresh(
    leadId: string,
    status: "synced" | "failed",
    attemptedAt: string,
  ): Promise<void>;
}

const SELECT = [
  "id",
  "status",
  "campaign_id",
  "industry_id",
  "first_name",
  "organisation_name",
  "email",
  "phone",
  "first_landing_page",
  "current_landing_page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "cta_location",
  "created_at",
  "trello_card_id",
  "trello_card_url",
  "trello_sync_status",
  "practitioner_range",
  "location_range",
  "capacity_status",
  "acquisition_source",
  "website_url",
  "decision_authority",
  "google_ads_status",
  "planned_ad_spend_range",
  "implementation_timing",
  "website_status",
  "primary_growth_problem",
  "additional_context",
  "next_action",
  "callback_preference",
  "callback_requested_at",
  "qualification_completed_at",
  "funnel_completed_at",
  "cal_booking_status",
  "cal_booking_uid",
  "cal_booking_url",
  "cal_booking_start_at",
  "cal_booking_timezone",
  "cal_booking_created_at",
  "cal_booking_cancelled_at",
  "cal_webhook_received_at",
].join(",");

export function createLeadQualificationRepository(
  supabase: SupabaseClient = createServerSupabaseClient(),
): LeadQualificationRepository {
  return {
    async findOwned(leadId, sessionId) {
      const { data, error } = await supabase
        .from("leads")
        .select(SELECT)
        .eq("id", leadId)
        .eq("session_id", sessionId)
        .maybeSingle();
      if (error) throw new Error("Lead lookup failed.");
      return data ? mapLead(data as unknown as Record<string, unknown>) : null;
    },
    async findById(leadId) {
      const { data, error } = await supabase
        .from("leads")
        .select(SELECT)
        .eq("id", leadId)
        .maybeSingle();
      if (error) throw new Error("Lead lookup failed.");
      return data ? mapLead(data as unknown as Record<string, unknown>) : null;
    },
    async findByCalBookingUid(uid) {
      const { data, error } = await supabase
        .from("leads")
        .select(SELECT)
        .eq("cal_booking_uid", uid)
        .maybeSingle();
      if (error) throw new Error("Booking lookup failed.");
      return data ? mapLead(data as unknown as Record<string, unknown>) : null;
    },
    async updateOwned(leadId, sessionId, input, now) {
      const patch = mapQualificationPatch(input, now);
      const { data, error } = await supabase
        .from("leads")
        .update(patch)
        .eq("id", leadId)
        .eq("session_id", sessionId)
        .select(SELECT)
        .maybeSingle();
      if (error) throw new Error("Lead update failed.");
      return data ? mapLead(data as unknown as Record<string, unknown>) : null;
    },
    async updateCalBooking(leadId, patch) {
      const { data, error } = await supabase
        .from("leads")
        .update(patch)
        .eq("id", leadId)
        .select(SELECT)
        .single();
      if (error || !data) throw new Error("Booking update failed.");
      return mapLead(data as unknown as Record<string, unknown>);
    },
    async recordTrelloRefresh(leadId, status, attemptedAt) {
      const { error } = await supabase
        .from("leads")
        .update({
          trello_sync_status: status,
          trello_sync_error_code: status === "failed" ? "trello_unavailable" : null,
          trello_sync_attempted_at: attemptedAt,
          ...(status === "synced" ? { trello_synced_at: attemptedAt } : {}),
        })
        .eq("id", leadId);
      if (error) throw new Error("Trello refresh status failed.");
    },
  };
}

function mapQualificationPatch(
  input: QualificationUpdateInput,
  now: string,
): Record<string, unknown> {
  const names: Record<string, string> = {
    practitionerRange: "practitioner_range",
    locationRange: "location_range",
    capacityStatus: "capacity_status",
    acquisitionSource: "acquisition_source",
    websiteUrl: "website_url",
    decisionAuthority: "decision_authority",
    googleAdsStatus: "google_ads_status",
    plannedAdSpendRange: "planned_ad_spend_range",
    implementationTiming: "implementation_timing",
    websiteStatus: "website_status",
    primaryGrowthProblem: "primary_growth_problem",
    additionalContext: "additional_context",
    nextAction: "next_action",
    callbackPreference: "callback_preference",
  };
  const patch: Record<string, unknown> = {};
  for (const [key, column] of Object.entries(names)) {
    const value = input[key as keyof QualificationUpdateInput];
    if (value !== undefined) patch[column] = value;
  }
  if (input.completedStep === 4) patch.qualification_completed_at = now;
  if (input.completedStep === 5 && input.nextAction === "callback") {
    patch.callback_requested_at = now;
    patch.funnel_completed_at = now;
  }
  if (input.completedStep === 5 && input.nextAction === "booking")
    patch.cal_booking_status = "opened";
  return patch;
}

function mapLead(data: Record<string, unknown>): QualifiedLead {
  const text = (key: string) =>
    typeof data[key] === "string" && data[key] ? String(data[key]) : undefined;
  return {
    id: String(data.id),
    status: "started",
    firstName: String(data.first_name),
    organisationName: String(data.organisation_name),
    email: String(data.email),
    phone: String(data.phone),
    campaignId: text("campaign_id"),
    industryId: text("industry_id"),
    firstLandingPage: text("first_landing_page"),
    currentLandingPage: text("current_landing_page"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmContent: text("utm_content"),
    utmTerm: text("utm_term"),
    fbclid: text("fbclid"),
    ctaLocation: text("cta_location"),
    createdAt: String(data.created_at),
    trelloCardId: text("trello_card_id"),
    trelloCardUrl: text("trello_card_url"),
    trelloSyncStatus:
      data.trello_sync_status === "synced" || data.trello_sync_status === "failed"
        ? data.trello_sync_status
        : "pending",
    practitionerRange: text("practitioner_range"),
    locationRange: text("location_range"),
    capacityStatus: text("capacity_status"),
    acquisitionSource: text("acquisition_source"),
    websiteUrl: text("website_url"),
    decisionAuthority: text("decision_authority"),
    googleAdsStatus: text("google_ads_status"),
    plannedAdSpendRange: text("planned_ad_spend_range"),
    implementationTiming: text("implementation_timing"),
    websiteStatus: text("website_status"),
    primaryGrowthProblem: text("primary_growth_problem"),
    additionalContext: text("additional_context"),
    nextAction:
      data.next_action === "booking" || data.next_action === "callback"
        ? data.next_action
        : undefined,
    callbackPreference: text("callback_preference"),
    callbackRequestedAt: text("callback_requested_at"),
    qualificationCompletedAt: text("qualification_completed_at"),
    funnelCompletedAt: text("funnel_completed_at"),
    calBookingStatus: text("cal_booking_status"),
    calBookingUid: text("cal_booking_uid"),
    calBookingUrl: text("cal_booking_url"),
    calBookingStartAt: text("cal_booking_start_at"),
    calBookingTimezone: text("cal_booking_timezone"),
    calBookingCreatedAt: text("cal_booking_created_at"),
    calBookingCancelledAt: text("cal_booking_cancelled_at"),
    calWebhookReceivedAt: text("cal_webhook_received_at"),
  };
}
