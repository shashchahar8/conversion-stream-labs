import { z } from "zod";

const serverEnvSchema = z.object({
  SL_SUPABASE_URL: z.string().url(),
  SL_SUPABASE_SECRET_KEY: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export class ServerConfigurationError extends Error {
  constructor() {
    super("Server configuration is unavailable.");
    this.name = "ServerConfigurationError";
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
