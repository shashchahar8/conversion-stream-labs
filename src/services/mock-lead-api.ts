import type { LeadSubmission, LeadSubmissionResponse } from "@/types/lead";

/**
 * Mock lead API used during Lovable development. Codex will replace this
 * with a real HTTP call in `src/services/lead-api.ts` without touching
 * any form component.
 */
export async function submitLeadMock(payload: LeadSubmission): Promise<LeadSubmissionResponse> {
  await new Promise((r) => setTimeout(r, 900));

  // Deterministic simulated failures for QA — trigger by email address.
  if (payload.contact.email.includes("+validation@")) {
    return {
      success: false,
      errors: { email: "This email cannot be used for testing." },
      message: "Please correct the highlighted fields.",
    };
  }
  if (payload.contact.email.includes("+network@")) {
    throw new Error("Network unavailable");
  }

  return {
    success: true,
    leadId: `lead_${Date.now()}`,
    nextAction: "redirect",
    redirectUrl:
      payload.campaignId === "cosmetic-surgery"
        ? "/thank-you/shared-upside"
        : payload.campaignId
          ? "/thank-you/founding-partner"
          : "/thank-you/growth-audit",
    message: "Application received.",
  };
}
