import { leadStartSchema } from "./lead-start-schema";
import {
  createLeadStartRepository,
  LeadStartConflictError,
  type LeadStartRepository,
} from "./lead-start.server";
import { syncLeadToTrello } from "./trello-sync.server";
import { createTrelloClient, type TrelloClient } from "./trello.server";

const MAX_BODY_BYTES = 16_384;

interface LeadStartHandlerDependencies {
  createRepository?: () => LeadStartRepository;
  createTrelloClient?: () => TrelloClient;
  now?: () => Date;
}

export async function handleLeadStartRequest(
  request: Request,
  dependencies: LeadStartHandlerDependencies = {},
): Promise<Response> {
  if (!isJsonRequest(request)) {
    return jsonResponse(415, { success: false, message: "Content-Type must be application/json." });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { success: false, message: "Request body is too large." });
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return jsonResponse(400, { success: false, message: "Invalid request body." });
  }

  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { success: false, message: "Request body is too large." });
  }

  let body: unknown;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return jsonResponse(400, { success: false, message: "Invalid JSON body." });
  }

  const parsed = leadStartSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "request");
      errors[field] ??= issue.message;
    }
    return jsonResponse(400, {
      success: false,
      message: "Please check the submitted details.",
      errors,
    });
  }

  try {
    const repository = (dependencies.createRepository ?? createLeadStartRepository)();
    const existing = await repository.findBySessionId(parsed.data.sessionId);
    if (existing) {
      return jsonResponse(200, {
        success: true,
        leadId: existing.id,
        trelloSync: existing.trelloSyncStatus,
      });
    }

    try {
      const created = await repository.insert(
        parsed.data,
        (dependencies.now ?? (() => new Date()))().toISOString(),
      );
      const trelloSync = await syncLeadToTrello(created, repository, {
        createClient: dependencies.createTrelloClient ?? createTrelloClient,
        now: dependencies.now,
      });
      return jsonResponse(201, { success: true, leadId: created.id, trelloSync });
    } catch (error) {
      if (!(error instanceof LeadStartConflictError)) throw error;
      const racedLead = await repository.findBySessionId(parsed.data.sessionId);
      if (!racedLead) throw error;
      return jsonResponse(200, {
        success: true,
        leadId: racedLead.id,
        trelloSync: racedLead.trelloSyncStatus,
      });
    }
  } catch {
    console.error("[lead-start] persistence unavailable");
    return jsonResponse(503, {
      success: false,
      message: "We could not save your details right now. Please try again.",
    });
  }
}

function isJsonRequest(request: Request): boolean {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  return contentType === "application/json" || contentType.startsWith("application/json;");
}

function jsonResponse(status: number, body: unknown): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
