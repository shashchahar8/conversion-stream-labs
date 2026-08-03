import { z } from "zod";
import { getTrelloEnv, TrelloConfigurationError, type TrelloEnv } from "./server-env.server";
import type { TrelloCardDraft } from "./trello-card";

const TRELLO_API_ORIGIN = "https://api.trello.com";
const REQUEST_TIMEOUT_MS = 8_000;
const destinationValidationCache = new Map<string, Promise<void>>();

const listResponseSchema = z.object({ idBoard: z.string().min(1) });
const cardResponseSchema = z.object({
  id: z.string().min(1).max(100),
  url: z.string().url().max(2048),
});

export type TrelloFailureCode =
  | "missing_configuration"
  | "authentication_failed"
  | "permission_denied"
  | "list_not_found"
  | "rate_limited"
  | "trello_unavailable"
  | "invalid_response"
  | "database_update_failed";

export interface TrelloCardResult {
  id: string;
  url: string;
}

export interface TrelloClient {
  createCard(card: TrelloCardDraft): Promise<TrelloCardResult>;
}

export class TrelloIntegrationError extends Error {
  constructor(readonly code: TrelloFailureCode) {
    super("Trello integration failed.");
    this.name = "TrelloIntegrationError";
  }
}

interface TrelloClientOptions {
  env?: TrelloEnv;
  fetch?: typeof fetch;
  validationCache?: Map<string, Promise<void>>;
}

export function createTrelloClient(options: TrelloClientOptions = {}): TrelloClient {
  let env: TrelloEnv;
  try {
    env = options.env ?? getTrelloEnv();
  } catch (error) {
    if (error instanceof TrelloConfigurationError) {
      throw new TrelloIntegrationError("missing_configuration");
    }
    throw error;
  }

  const fetchImpl = options.fetch ?? fetch;
  const cache = options.validationCache ?? destinationValidationCache;

  return {
    async createCard(card) {
      await validateDestination(env, fetchImpl, cache);

      const response = await trelloFetch(
        `${TRELLO_API_ORIGIN}/1/cards`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: buildAuthorizationHeader(env),
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams({
            idList: env.SL_TRELLO_NEW_LEAD_LIST_ID,
            name: card.name,
            desc: card.desc,
          }),
        },
        fetchImpl,
      );
      assertSuccessfulStatus(response);

      const parsed = cardResponseSchema.safeParse(await safeJson(response));
      if (!parsed.success || !isTrelloCardUrl(parsed.data.url)) {
        throw new TrelloIntegrationError("invalid_response");
      }
      return parsed.data;
    },
  };
}

async function validateDestination(
  env: TrelloEnv,
  fetchImpl: typeof fetch,
  cache: Map<string, Promise<void>>,
): Promise<void> {
  const cacheKey = `${env.SL_TRELLO_BOARD_ID}:${env.SL_TRELLO_NEW_LEAD_LIST_ID}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const validation = (async () => {
    const listId = encodeURIComponent(env.SL_TRELLO_NEW_LEAD_LIST_ID);
    const response = await trelloFetch(
      `${TRELLO_API_ORIGIN}/1/lists/${listId}?fields=idBoard`,
      {
        headers: {
          Accept: "application/json",
          Authorization: buildAuthorizationHeader(env),
        },
      },
      fetchImpl,
    );
    assertSuccessfulStatus(response);

    const parsed = listResponseSchema.safeParse(await safeJson(response));
    if (!parsed.success) throw new TrelloIntegrationError("invalid_response");
    if (parsed.data.idBoard !== env.SL_TRELLO_BOARD_ID) {
      throw new TrelloIntegrationError("list_not_found");
    }
  })();

  cache.set(cacheKey, validation);
  try {
    await validation;
  } catch (error) {
    cache.delete(cacheKey);
    throw error;
  }
}

async function trelloFetch(
  url: string,
  init: RequestInit,
  fetchImpl: typeof fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetchImpl(url, { ...init, signal: controller.signal });
  } catch {
    throw new TrelloIntegrationError("trello_unavailable");
  } finally {
    clearTimeout(timeout);
  }
}

function assertSuccessfulStatus(response: Response): void {
  if (response.ok) return;
  if (response.status === 401) throw new TrelloIntegrationError("authentication_failed");
  if (response.status === 403) throw new TrelloIntegrationError("permission_denied");
  if (response.status === 404) throw new TrelloIntegrationError("list_not_found");
  if (response.status === 429) throw new TrelloIntegrationError("rate_limited");
  if (response.status >= 500) throw new TrelloIntegrationError("trello_unavailable");
  throw new TrelloIntegrationError("invalid_response");
}

async function safeJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new TrelloIntegrationError("invalid_response");
  }
}

function buildAuthorizationHeader(env: TrelloEnv): string {
  return `OAuth oauth_consumer_key="${oauthEncode(env.SL_TRELLO_API_KEY)}", oauth_token="${oauthEncode(env.SL_TRELLO_API_TOKEN)}"`;
}

function oauthEncode(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function isTrelloCardUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "trello.com" || url.hostname.endsWith(".trello.com"))
    );
  } catch {
    return false;
  }
}
