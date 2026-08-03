import { describe, expect, test } from "bun:test";
import { getLeadSessionId } from "../../src/lib/lead-session";

describe("getLeadSessionId", () => {
  test("returns a stable UUID from session storage", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    };
    let generated = 0;
    const randomUUID = () => {
      generated += 1;
      return "d9428888-122b-4c5f-a5a8-f34421d07c92";
    };

    const first = getLeadSessionId({ storage, randomUUID });
    const second = getLeadSessionId({ storage, randomUUID });

    expect(first).toBe("d9428888-122b-4c5f-a5a8-f34421d07c92");
    expect(second).toBe(first);
    expect(generated).toBe(1);
  });

  test("returns undefined during SSR", () => {
    expect(getLeadSessionId()).toBeUndefined();
  });
});
