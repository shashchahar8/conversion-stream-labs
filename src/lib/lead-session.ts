const SESSION_STORAGE_KEY = "shl.lead.session.v1";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

let memorySessionId: string | undefined;

interface SessionDependencies {
  storage: Pick<Storage, "getItem" | "setItem">;
  randomUUID: () => string;
}

export function getLeadSessionId(dependencies?: SessionDependencies): string | undefined {
  if (!dependencies && typeof window === "undefined") return undefined;

  const storage = dependencies?.storage ?? window.sessionStorage;
  const randomUUID = dependencies?.randomUUID ?? (() => globalThis.crypto.randomUUID());

  try {
    const stored = storage.getItem(SESSION_STORAGE_KEY);
    if (stored && UUID_PATTERN.test(stored)) return stored;

    const sessionId = randomUUID();
    storage.setItem(SESSION_STORAGE_KEY, sessionId);
    memorySessionId = sessionId;
    return sessionId;
  } catch {
    memorySessionId ??= randomUUID();
    return memorySessionId;
  }
}
