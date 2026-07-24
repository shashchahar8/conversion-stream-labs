# Codex Handoff — Stonehurst Lane

## Scope of Lovable's initial build

- Full site scaffold: routes, layouts, sections, content configs.
- Design system (Ink & Bone) in `src/styles.css`.
- Multi-step lead form engine with attribution and session persistence.
- Sitemap (`/sitemap.xml`) and `robots.txt`.
- All copy is placeholder-safe: no fabricated proof, no fake testimonials, no invented metrics.

## What Codex should own next

1. **Lead API endpoint** — implement `POST /api/leads` under `src/routes/api/leads.ts` as a TanStack server route. Validate with Zod, forward to CRM (HubSpot / Attio / etc.), send transactional email. Contract lives in `src/services/lead-api.ts`.
2. **CRM + analytics wiring** — replace mock in `useAnalytics` with GA4 / Segment / PostHog. Event names in `src/config/analytics.ts`.
3. **Brand assets** — replace `Wordmark` text mark once approved SVG lands. Add favicons and OG images (leaf routes only).
4. **Case study + insight content** — write to `src/content/library.ts` once approvals are in place. Do not seed placeholders.
5. **Calendar integration** — embed on `/booking`.
6. **Legal review** — finalise `/privacy` and `/terms` with counsel.

## Guardrails

- No fabricated proof anywhere.
- Every content route needs unique `head()` metadata (use `buildSeo`).
- Follow the design system — no ad-hoc colour classes.
- Follow AGENTS.md.
