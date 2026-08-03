import { qualificationUpdateSchema } from "./lead-qualification-schema";
import {
  createLeadQualificationRepository,
  type LeadQualificationRepository,
} from "./lead-qualification.server";
import { refreshLeadTrelloCard } from "./trello-sync.server";
import type { QualifiedLead } from "./lead-qualification.server";

const MAX_BODY_BYTES = 16_384;

export async function handleLeadQualificationRequest(
  request: Request,
  leadId: string,
  dependencies: {
    createRepository?: () => LeadQualificationRepository;
    now?: () => Date;
    refreshTrello?: typeof refreshLeadTrelloCard;
  } = {},
): Promise<Response> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return response(415, { success: false, message: "Content-Type must be application/json." });
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES)
    return response(413, { success: false, message: "Request body is too large." });
  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return response(400, { success: false, message: "Invalid request body." });
  }
  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES)
    return response(413, { success: false, message: "Request body is too large." });
  let body: unknown;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return response(400, { success: false, message: "Invalid JSON body." });
  }
  const parsed = qualificationUpdateSchema.safeParse(body);
  if (!parsed.success || !/^[0-9a-f-]{36}$/i.test(leadId))
    return response(400, { success: false, message: "Please check the submitted details." });
  try {
    const repository = (dependencies.createRepository ?? createLeadQualificationRepository)();
    const existing = await repository.findOwned(leadId, parsed.data.sessionId);
    if (!existing) return response(404, { success: false, message: "Lead not found." });
    if (!canCompleteStep(existing, parsed.data.completedStep)) {
      return response(409, { success: false, message: "Complete the previous step first." });
    }
    const lead = await repository.updateOwned(
      leadId,
      parsed.data.sessionId,
      parsed.data,
      (dependencies.now ?? (() => new Date()))().toISOString(),
    );
    if (!lead) return response(404, { success: false, message: "Lead not found." });
    const trelloSync = await (dependencies.refreshTrello ?? refreshLeadTrelloCard)(lead);
    try {
      await repository.recordTrelloRefresh(
        lead.id,
        trelloSync,
        (dependencies.now ?? (() => new Date()))().toISOString(),
      );
    } catch {
      console.error("[lead-update] Trello status unavailable");
    }
    return response(200, {
      success: true,
      leadId: lead.id,
      completedStep: parsed.data.completedStep,
      trelloSync,
    });
  } catch {
    console.error("[lead-update] persistence unavailable");
    return response(503, {
      success: false,
      message: "We could not save your details right now. Please try again.",
    });
  }
}

function canCompleteStep(lead: QualifiedLead, step: number): boolean {
  if (step === 2) return true;
  if (step === 3)
    return Boolean(
      lead.practitionerRange && lead.locationRange && lead.capacityStatus && lead.acquisitionSource,
    );
  if (step === 4)
    return Boolean(
      lead.decisionAuthority &&
      lead.googleAdsStatus &&
      lead.plannedAdSpendRange &&
      lead.implementationTiming &&
      lead.websiteStatus,
    );
  return Boolean(lead.primaryGrowthProblem && lead.qualificationCompletedAt);
}

function response(status: number, body: unknown): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
