import { z } from "zod";

const serverEnvSchema = z.object({
  SL_SUPABASE_URL: z.string().url(),
  SL_SUPABASE_SECRET_KEY: z.string().min(1),
});

const trelloEnvSchema = z.object({
  SL_TRELLO_API_KEY: z.string().min(1),
  SL_TRELLO_API_TOKEN: z.string().min(1),
  SL_TRELLO_BOARD_ID: z.string().min(1),
  SL_TRELLO_NEW_LEAD_LIST_ID: z.string().min(1),
});

const calcomEnvSchema = z.object({
  SL_CALCOM_WEBHOOK_SECRET: z.string().min(16),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type TrelloEnv = z.infer<typeof trelloEnvSchema>;
export type CalcomEnv = z.infer<typeof calcomEnvSchema>;

export class ServerConfigurationError extends Error {
  constructor() {
    super("Server configuration is unavailable.");
    this.name = "ServerConfigurationError";
  }
}

export class TrelloConfigurationError extends Error {
  constructor() {
    super("Trello configuration is unavailable.");
    this.name = "TrelloConfigurationError";
  }
}

export class CalcomConfigurationError extends Error {
  constructor() {
    super("Cal.com configuration is unavailable.");
    this.name = "CalcomConfigurationError";
  }
}

export function readServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const parsed = serverEnvSchema.safeParse(source);
  if (!parsed.success) {
    throw new ServerConfigurationError();
  }
  return parsed.data;
}

export function getServerEnv(): ServerEnv {
  return readServerEnv(process.env);
}

export function readTrelloEnv(source: Record<string, string | undefined>): TrelloEnv {
  const parsed = trelloEnvSchema.safeParse(source);
  if (!parsed.success) {
    throw new TrelloConfigurationError();
  }
  return parsed.data;
}

export function getTrelloEnv(): TrelloEnv {
  return readTrelloEnv(process.env);
}

export function readCalcomEnv(source: Record<string, string | undefined>): CalcomEnv {
  const parsed = calcomEnvSchema.safeParse(source);
  if (!parsed.success) throw new CalcomConfigurationError();
  return parsed.data;
}

export function getCalcomEnv(): CalcomEnv {
  return readCalcomEnv(process.env);
}
