import type { LeadSubmission, LeadSubmissionResponse } from "@/types/lead";
import { submitLeadMock } from "./mock-lead-api";

/**
 * Typed lead API client. Production always uses the real API. The mock is
 * available only when explicitly enabled during local development.
 */
const baseUrl = import.meta.env.VITE_LEAD_API_BASE_URL as string | undefined;
const mockEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_LEAD_API_MOCK === "true";

export async function submitLead(payload: LeadSubmission): Promise<LeadSubmissionResponse> {
  if (mockEnabled) {
    return submitLeadMock(payload);
  }

  const endpoint = baseUrl ? `${baseUrl.replace(/\/$/, "")}/api/leads` : "/api/leads";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Lead submission failed [${res.status}]: ${errorBody}`);
  }

  return (await res.json()) as LeadSubmissionResponse;
}
