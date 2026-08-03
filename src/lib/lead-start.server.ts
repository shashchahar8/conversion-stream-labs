import { createServerSupabaseClient } from "./supabase.server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { LeadStartInput } from "./lead-start-schema";

export interface PersistedLead {
  id: string;
}

export interface LeadStartRepository {
  findBySessionId(sessionId: string): Promise<PersistedLead | null>;
  insert(input: LeadStartInput, consentAt: string): Promise<PersistedLead>;
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
  return {
    async findBySessionId(sessionId) {
      const { data, error } = await supabase
        .from("leads")
        .select("id")
        .eq("session_id", sessionId)
        .maybeSingle();

      if (error) throw new Error("Lead lookup failed.");
      return data ? { id: data.id as string } : null;
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
        .select("id")
        .single();

      if (error?.code === "23505") throw new LeadStartConflictError();
      if (error || !data) throw new Error("Lead persistence failed.");
      return { id: data.id as string };
    },
  };
}
