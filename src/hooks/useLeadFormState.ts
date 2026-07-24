import { useCallback, useEffect, useState } from "react";

const STORAGE_PREFIX = "shl.form.v1.";

export type LeadFormValues = Record<string, string | boolean | string[] | undefined>;

/**
 * Session-persisted partial form state so a visitor never re-types after
 * bouncing between hero / diagnostic / full-application placements.
 */
export function useLeadFormState(formId: string) {
  const key = STORAGE_PREFIX + formId;
  const [values, setValues] = useState<LeadFormValues>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) setValues(JSON.parse(raw) as LeadFormValues);
    } catch {
      /* ignore */
    }
  }, [key]);

  const update = useCallback(
    (patch: LeadFormValues) => {
      setValues((prev) => {
        const next = { ...prev, ...patch };
        try {
          sessionStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [key],
  );

  const reset = useCallback(() => {
    setValues({});
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [key]);

  return { values, update, reset };
}
