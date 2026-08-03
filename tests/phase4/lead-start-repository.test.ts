import { describe, expect, test } from "bun:test";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createLeadStartRepository } from "../../src/lib/lead-start.server";

describe("createLeadStartRepository", () => {
  test("finds an existing lead through a mocked Supabase client", async () => {
    const leadId = "67e55044-10b1-426f-9247-bb680e5fe0c8";
    let selectedTable = "";
    let matchedSession = "";

    const query = {
      select() {
        return this;
      },
      eq(_column: string, value: string) {
        matchedSession = value;
        return this;
      },
      async maybeSingle() {
        return { data: { id: leadId }, error: null };
      },
    };
    const supabase = {
      from(table: string) {
        selectedTable = table;
        return query;
      },
    } as unknown as SupabaseClient;

    const repository = createLeadStartRepository(supabase);
    const existing = await repository.findBySessionId("d9428888-122b-4c5f-a5a8-f34421d07c92");

    expect(selectedTable).toBe("leads");
    expect(matchedSession).toBe("d9428888-122b-4c5f-a5a8-f34421d07c92");
    expect(existing).toEqual({ id: leadId });
  });
});
