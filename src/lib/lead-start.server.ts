import { createServerSupabaseClient } from "./supabase.server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { LeadStartInput } from "./lead-start-schema";
import type { TrelloFailureCode } from "./trello.server";

export type TrelloSyncStatus = "pending" | "synced" | "failed";

export interface PersistedLead {
  id: string;
  status: "started";
  campaignId?: string;
  industryId?: string;
  firstName: string;
  organisationName: string;
  email: string;
  phone: string;
  firstLandingPage?: string;
  currentLandingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  ctaLocation?: string;
  createdAt: string;
  trelloCardId?: string;
  trelloCardUrl?: string;
  trelloSyncStatus: TrelloSyncStatus;
}

export interface LeadStartRepository {
  findBySessionId(sessionId: string): Promise<PersistedLead | null>;
  insert(input: LeadStartInput, consentAt: string): Promise<PersistedLead>;
  markTrelloAttempt(leadId: string, attemptedAt: string): Promise<void>;
  markTrelloSynced(
    leadId: string,
    cardId: string,
    cardUrl: string,
    syncedAt: string,
  ): Promise<void>;
  markTrelloFailed(
    leadId: string,
    errorCode: TrelloFailureCode,
    attemptedAt: string,
  ): Promise<void>;
}

export class LeadStartConflictError extends Error {
  constructor() {
    super("Lead session already exists.");
    this.name = "LeadStartConflictError";
  }
}

export function createLeadStartRepository(
  supabase: SupabaseClient = createServerSupabaseClient(),
): LeadStartRepository {
  const leadSelect = [
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
  ].join(",");

  return {
    async findBySessionId(sessionId) {
      const { data, error } = await supabase
        .from("leads")
        .select(leadSelect)
        .eq("session_id", sessionId)
        .maybeSingle();

      if (error) throw new Error("Lead lookup failed.");
      return data ? mapPersistedLead(data as unknown as Record<string, unknown>) : null;
    },

    async insert(input, consentAt) {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          status: "started",
          campaign_id: input.campaignId,
          industry_id: input.industryId,
          session_id: input.sessionId,
          first_name: input.firstName,
          organisation_name: input.organisationName,
          email: input.email,
          phone: input.phone,
          first_landing_page: input.firstLandingPage,
          current_landing_page: input.currentLandingPage,
          referrer: input.referrer,
          utm_source: input.utmSource,
          utm_medium: input.utmMedium,
          utm_campaign: input.utmCampaign,
          utm_content: input.utmContent,
          utm_term: input.utmTerm,
          fbclid: input.fbclid,
          cta_location: input.ctaLocation,
          privacy_consent: true,
          privacy_consent_at: consentAt,
        })
        .select(leadSelect)
        .single();

      if (error?.code === "23505") throw new LeadStartConflictError();
      if (error || !data) throw new Error("Lead persistence failed.");
      return mapPersistedLead(data as unknown as Record<string, unknown>);
    },

    async markTrelloAttempt(leadId, attemptedAt) {
      const { error } = await supabase
        .from("leads")
        .update({
          trello_sync_status: "pending",
          trello_sync_error_code: null,
          trello_sync_attempted_at: attemptedAt,
        })
        .eq("id", leadId);
      if (error) throw new Error("Trello attempt update failed.");
    },

    async markTrelloSynced(leadId, cardId, cardUrl, syncedAt) {
      const { error } = await supabase
        .from("leads")
        .update({
          trello_card_id: cardId,
          trello_card_url: cardUrl,
          trello_sync_status: "synced",
          trello_sync_error_code: null,
          trello_synced_at: syncedAt,
        })
        .eq("id", leadId);
      if (error) throw new Error("Trello sync update failed.");
    },

    async markTrelloFailed(leadId, errorCode, attemptedAt) {
      const { error } = await supabase
        .from("leads")
        .update({
          trello_sync_status: "failed",
          trello_sync_error_code: errorCode,
          trello_sync_attempted_at: attemptedAt,
        })
        .eq("id", leadId);
      if (error) throw new Error("Trello failure update failed.");
    },
  };
}

function mapPersistedLead(data: Record<string, unknown>): PersistedLead {
  return {
    id: String(data.id),
    status: "started",
    campaignId: optionalString(data.campaign_id),
    industryId: optionalString(data.industry_id),
    firstName: String(data.first_name),
    organisationName: String(data.organisation_name),
    email: String(data.email),
    phone: String(data.phone),
    firstLandingPage: optionalString(data.first_landing_page),
    currentLandingPage: optionalString(data.current_landing_page),
    utmSource: optionalString(data.utm_source),
    utmMedium: optionalString(data.utm_medium),
    utmCampaign: optionalString(data.utm_campaign),
    utmContent: optionalString(data.utm_content),
    utmTerm: optionalString(data.utm_term),
    fbclid: optionalString(data.fbclid),
    ctaLocation: optionalString(data.cta_location),
    createdAt: String(data.created_at),
    trelloCardId: optionalString(data.trello_card_id),
    trelloCardUrl: optionalString(data.trello_card_url),
    trelloSyncStatus:
      data.trello_sync_status === "synced" || data.trello_sync_status === "failed"
        ? data.trello_sync_status
        : "pending",
  };
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
