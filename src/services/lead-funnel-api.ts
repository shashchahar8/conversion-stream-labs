import type { LeadStartPayload } from "@/types/lead-funnel";

export function omitAbsentStrings<T extends object>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  ) as T;
}

export async function startLead(payload: LeadStartPayload): Promise<{ leadId: string }> {
  const response = await fetch("/api/leads/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(omitAbsentStrings(payload)),
  });
  return readResponse(response);
}

export async function updateLead(
  leadId: string,
  payload: Record<string, unknown>,
): Promise<{ leadId: string; completedStep: number }> {
  const response = await fetch(`/api/leads/${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(omitAbsentStrings(payload)),
  });
  return readResponse(response);
}

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!response.ok || !body.success)
    throw new Error(body.message ?? "We could not save your details. Please try again.");
  return body as T;
}
