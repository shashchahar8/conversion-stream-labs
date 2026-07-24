# AGENTS.md — Stonehurst Lane

Instructions for Lovable, Codex and any other agents working on this codebase.

## Product

Stonehurst Lane is a full-stack growth partner for high-value service businesses. This site is the primary acquisition surface and lead-qualification engine.

## Architecture

- **Framework**: TanStack Start (Vite 7, React 19). Server functions in `src/**/*.functions.ts`, server routes in `src/routes/api/`.
- **Styling**: Tailwind v4 via `src/styles.css`. Design tokens only — never hardcode hex or `text-white` in components.
- **Routing**: File-based under `src/routes/`. Every content route defines its own `head()` via `src/lib/seo.ts` → `buildSeo(...)`.
- **Content**: Config-driven. Copy lives in `src/content/{capabilities,industries,campaigns,homepage,faqs,library}.ts`. To add a new capability/industry/campaign, add a config object — do not create a bespoke route.
- **Forms**: One engine — `src/components/forms/LeadForm.tsx`. Placements (`HeroForm`, `DiagnosticForm`, `LeadFormDialog`, `StickyMobileCta`) all mount the same engine with a variant. State persists via `useLeadFormState` (sessionStorage). Attribution captured in `useAttribution`.
- **Lead API**: `src/services/lead-api.ts` posts to `POST /api/leads`. Codex should wire the real endpoint and CRM sync; a mock fallback logs to console in dev.
- **Analytics**: Vendor-agnostic events via `useAnalytics`. Event names defined in `src/config/analytics.ts`.

## Design system

Ink & Bone palette (final):

- Ink `#0B0B0C`, Bone `#F5F1EA`, Gold `#C9A96A`, Mist `#6B6B6B`.
- Display: Fraunces (loaded in `__root.tsx` head). Body: Inter.
- Utility classes: `.eyebrow`, `.gold-underline`. Prefer semantic tokens (`bg-background`, `text-foreground`, `border-border`, `text-accent`) over raw palette.

## Content rules

- **No fabricated proof.** Case studies and testimonials only publish once reconciled and approved. `src/content/library.ts` ships empty by design — do not seed placeholder wins.
- **Compliance-sensitive verticals** (cosmetic surgery, allied health, dental): the shared-upside/regulated campaigns must carry the compliance clarifications set in their config. Do not remove them.

## Routes to touch when adding content

| To add… | Edit… |
| --- | --- |
| Capability page | `src/content/capabilities.ts` |
| Industry page | `src/content/industries.ts` |
| Founding-partner offer | `src/content/campaigns.ts` (type `founding-partner`) |
| Case study | `src/content/library.ts` (`caseStudies`) |
| Insight article | `src/content/library.ts` (`insights`) |
| Navigation entry | `src/config/navigation.ts` |

## What NOT to do

- Do not introduce `src/pages/`, React Router DOM, or a Next.js layout convention.
- Do not `@import` remote URLs from `src/styles.css` — load web fonts via `<link>` in `__root.tsx`.
- Do not put page-specific `og:image` on `__root.tsx` — leaf routes only.
- Do not fabricate metrics in copy. Ever.
- Do not add ad-hoc buttons/styles — extend the design system in `src/styles.css` first.

## GitHub / handoff

The project is intended to be connected to GitHub via Lovable's two-way sync (workspace Plus menu → GitHub → Connect project). Once connected, Codex can operate on the default branch and Lovable will sync incoming commits back into the editor. Keep this file up to date so both agents share the same context.
