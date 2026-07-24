# Stonehurst Lane

Full-stack growth partner site. TanStack Start + Tailwind v4 + Lovable Cloud (when enabled).

## Run

```
bun install
bun run dev
```

## Structure

- `src/routes/` — file-based routes (see `src/routes/README.md`)
- `src/content/` — all copy (capabilities, industries, campaigns, homepage, FAQs)
- `src/components/` — `global`, `navigation`, `sections`, `forms`, `ui` (shadcn)
- `src/layouts/` — `PageShell`, `CampaignShell`
- `src/config/` — `site`, `navigation`, `forms`, `analytics`, `routes`
- `src/services/lead-api.ts` — POST `/api/leads`
- `src/hooks/` — `useAttribution`, `useAnalytics`, `useLeadFormState`

See [AGENTS.md](./AGENTS.md) for the full working contract for Lovable and Codex, including content rules, compliance notes, and design system conventions.

## GitHub sync

This project is designed to be connected to GitHub via Lovable's two-way sync. From the Lovable editor: **+ menu → GitHub → Connect project**. Once linked, commits pushed from Codex or a local clone flow back into Lovable automatically, and Lovable edits push to GitHub on save.

## Handoff docs

Additional handoff notes for Codex live in [`docs/CODEX-HANDOFF.md`](./docs/CODEX-HANDOFF.md).
