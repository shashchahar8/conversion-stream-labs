import type { LeadSubmission, LeadSubmissionResponse } from "@/types/lead";
import { submitLeadMock } from "./mock-lead-api";

/**
 * Typed lead API client. Base URL configured via VITE_LEAD_API_BASE_URL.
 * Falls back to the mock adapter when no base URL is configured, so the
 * front end works locally without Codex having wired the backend yet.
 */
const baseUrl = import.meta.env.VITE_LEAD_API_BASE_URL as string | undefined;

export async function submitLead(payload: LeadSubmission): Promise<LeadSubmissionResponse> {
  if (!baseUrl) {
    return submitLeadMock(payload);
  }

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/leads`, {
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
