import { describe, expect, test } from "bun:test";
import { buildCardDescription, buildCardTitle } from "../../src/lib/trello-card";
import { persistedLead } from "./fixtures";

describe("Trello card formatting", () => {
  test("formats physiotherapy titles", () => {
    expect(buildCardTitle({ ...persistedLead, campaignId: "physiotherapy-clinics" })).toBe(
      "[PHYSIO] Jordan — Harbour Podiatry",
    );
  });

  test("formats podiatry titles", () => {
    expect(buildCardTitle(persistedLead)).toBe("[PODIATRY] Jordan — Harbour Podiatry");
  });

  test("uses the fallback lead title", () => {
    expect(buildCardTitle({ ...persistedLead, campaignId: undefined })).toBe(
      "[LEAD] Jordan — Harbour Podiatry",
    );
  });

  test("formats the approved description without internal fields", () => {
    const description = buildCardDescription(persistedLead);

    expect(description).toContain("CONTACT\n\nName: Jordan");
    expect(description).toContain("Campaign: podiatry-clinics");
    expect(description).toContain("UTM source: google");
    expect(description).toContain(`Lead ID: ${persistedLead.id}`);
    expect(description).toContain("Status: started");
    expect(description).not.toContain("session");
    expect(description).not.toContain("referrer");
  });
});
