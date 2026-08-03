import type { LeadStartRepository, PersistedLead } from "./lead-start.server";
import { buildTrelloCard } from "./trello-card";
import {
  createTrelloClient,
  TrelloIntegrationError,
  type TrelloClient,
  type TrelloFailureCode,
} from "./trello.server";

export type TrelloSyncResult = "synced" | "failed";

interface TrelloSyncDependencies {
  createClient?: () => TrelloClient;
  now?: () => Date;
}

export async function syncLeadToTrello(
  lead: PersistedLead,
  repository: LeadStartRepository,
  dependencies: TrelloSyncDependencies = {},
): Promise<TrelloSyncResult> {
  if (lead.trelloCardId) return "synced";

  const attemptedAt = (dependencies.now ?? (() => new Date()))().toISOString();
  try {
    await repository.markTrelloAttempt(lead.id, attemptedAt);
  } catch {
    logSyncFailure("database_update_failed");
    return "failed";
  }

  let card: { id: string; url: string };
  try {
    const client = (dependencies.createClient ?? createTrelloClient)();
    card = await client.createCard(buildTrelloCard(lead));
  } catch (error) {
    const code =
      error instanceof TrelloIntegrationError ? error.code : ("trello_unavailable" as const);
    await recordFailure(repository, lead.id, code, attemptedAt);
    return "failed";
  }

  try {
    await repository.markTrelloSynced(lead.id, card.id, card.url, attemptedAt);
    return "synced";
  } catch {
    await recordFailure(repository, lead.id, "database_update_failed", attemptedAt);
    return "failed";
  }
}

async function recordFailure(
  repository: LeadStartRepository,
  leadId: string,
  code: TrelloFailureCode,
  attemptedAt: string,
): Promise<void> {
  logSyncFailure(code);
  try {
    await repository.markTrelloFailed(leadId, code, attemptedAt);
  } catch {
    logSyncFailure("database_update_failed");
  }
}

function logSyncFailure(code: TrelloFailureCode): void {
  console.error("[trello-sync] failed", code);
}
