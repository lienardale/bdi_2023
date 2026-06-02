# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 **multi-brand platform** hosting two French comic-book event sites from a single codebase:

- **La Bande des Idées** (BDI) — long-running association, production Vercel deployment
- **C'est Marseille BD** (CMBD) — brand-new event, not yet deployed

The active brand is selected at build time via the `BRAND` env var (mirrored in `NEXT_PUBLIC_BRAND` for client-side code). Each brand is a separate Vercel deployment with its own Postgres, its own Google OAuth client, its own domain, but the same shared codebase.

**Stack:** Next.js 16 (App Router), React 19, Prisma 5 + PostgreSQL, NextAuth v5 beta (Google OAuth), next-intl, TailwindCSS 4, Zod, Vitest.

## Brand architecture

The brand module lives at `config/brand/`:

- **`types.ts`** — `Brand`, `ThemeColors`, `CrowdfundingFeature` shapes.
- **`bdi.ts`** — BDI brand config: names, palette, contact info, social URLs, iCal PRODID, assets paths, `features.crowdfunding` populated.
- **`cmbd.ts`** — CMBD brand config: same shape, Mediterranean palette, CMBD contact info, no crowdfunding.
- **`registry.ts`** — `Record<BrandId, Brand>` mapping.
- **`index.ts`** — reads `NEXT_PUBLIC_BRAND` (or falls back to `BRAND`), validates, exports the resolved `brand` object.

Everything else imports `brand` as:

```ts
import { brand } from '@/config/brand';
```

Because `NEXT_PUBLIC_BRAND` is inlined into the client bundle at build time, `brand` works in both server and client components — the resolved object is bundled directly, no runtime `process.env` lookup in the browser.

### Adding a new brand

1. Create `config/brand/<id>.ts` exporting a `Brand` object.
2. Add it to the `brands` record in `config/brand/registry.ts` and update `BrandId` in `config/brand/types.ts`.
3. Add the brand CSS palette block to `app/ui/global.css` under a new `.brand-<id>` selector, plus four `.brand-<id> .card-cycle > *:nth-child(4n+N)` rules for the list page rotation.
4. Add placeholder assets under `public/brands/<id>/` (`logo`, `hero`, `icon.png`, `apple-icon.png`, `favicon.png`) and reference them in the brand's `assets` field.
5. Set `BRAND=<id>` + `NEXT_PUBLIC_BRAND=<id>` in the deployment's env vars.
6. Point the deployment at a fresh Postgres and set `POSTGRES_URL` + `POSTGRES_URL_NON_POOLING` — the `vercel-build` script applies migrations on first deploy.

No other file changes needed — every brand-driven string, colour, asset, and feature flag comes from the brand module.

## Commands

```bash
npm run dev:bdi        # Start dev server with BRAND=bdi
npm run dev:cmbd       # Start dev server with BRAND=cmbd
npm run build:bdi      # Production build for BDI
npm run build:cmbd     # Production build for CMBD
npm run lint           # ESLint 9 flat config
npm run test           # Vitest
npm run test:watch     # Vitest watch mode
npm run seed:bdi       # Seed BDI data (refuses unless BRAND=bdi)
```

`postinstall` runs `prisma generate` automatically.

Webpack mode is required — next-intl's plugin does not support Turbopack. All `dev` / `build` scripts already pass `--webpack`.

### Tests (unit + integration)

The Vitest 4 / Vite 7 / rolldown toolchain needs **Node ≥ 20.19**. The shell default (20.11) fails (`styleText` export missing / `@rolldown/binding-darwin-arm64` not found). Prefix every `npm`/`npx` command — test, lint, build — with a newer Node:

```bash
export PATH="/Users/alienard/.nvm/versions/node/v22.14.0/bin:$PATH"
```

If `node_modules` looks gutted (e.g. `picomatch` missing its `index.js`), run `npm ci` under that Node to restore it.

- **Unit tests** need no server: `npm run test` (or target files with `npx vitest run <path>`).
- **Integration tests** (`__tests__/integration/routes.test.ts`) hit a live dev server over HTTP. They default to `http://localhost:3000` and honor the `TEST_BASE_URL` env var (no file edit needed to retarget a port). The DB-backed list pages only need the schema applied — an empty DB still returns 200 — not seed data.

> ⚠️ **`.env` / `.env.local` point at the remote production Postgres (Vercel).**
> Never run `prisma migrate deploy` or `seed:bdi` with those loaded — `seed:bdi`
> clears every table first. Local/test work must point `POSTGRES_URL` at the
> docker compose DB. The `db:*` and `dev:local` scripts below hard-code
> `localhost`, so use them rather than the raw commands.

Reusable local DB (docker compose Postgres — `admin/admin`, db `bd_platform`, persistent volume), then run the app + integration suite against it:

```bash
npm run db:up           # start Postgres, wait until healthy
npm run db:setup        # up + migrate + seed BDI placeholder data (all vs localhost)
npm run db:reset        # wipe the volume and recreate a fresh DB
npm run db:down         # stop

npm run dev:local       # next dev on :3000 with POSTGRES_URL forced to localhost
npm run test:integration   # vitest integration suite (honors TEST_BASE_URL, default :3000)
```

`scripts/test-db.sh [--seed]` is the underlying helper — it always targets `localhost`, never the remote DB.

## Database

Prisma schema at `prisma/schema.prisma`. Connection string via `POSTGRES_URL` (migrations use the direct `POSTGRES_URL_NON_POOLING` via `directUrl`). Each brand deployment targets its own Postgres instance; the schema is identical.

**Migrations on deploy:** the `vercel-build` script runs `prisma migrate deploy && next build`, so every Vercel deployment migrates *its own* database (BDI → Vercel Postgres, CMBD → Neon) using that project's env vars — no manual step, no secrets in git. CI (`npm run build`) does not run migrate, so it never touches a real DB.

**Core models:** `Event`, `Bd`, `Author`, `Publisher`, `Genre`, `InstagramPost`, `WizardDraft`. Junction tables: `BdAuthor`, `AuthorEvent`, `BdEvent`, `BdGenre`. Prisma client singleton in `app/lib/prisma.ts`.

Local Postgres via `docker compose up -d` (see `docker-compose.yml`) — exposes a single `bd_platform` database (`admin/admin`). Because `.env`/`.env.local` point at the remote production DB, target the local one by overriding `POSTGRES_URL` — the `npm run db:*` / `dev:local` helpers do this (see **Tests** above).

### Per-brand seed scripts

`scripts/seed-bdi.js` seeds ~92 past BDI events, ~110 authors, ~400 comics from `app/lib/placeholder-bdi-data.js`. It refuses to run if `BRAND != 'bdi'` so it can't accidentally pollute a CMBD database.

CMBD has no seed script — the DB starts empty. Populate via the admin UI or the `/admin/import-export` CSV route.

## Architecture

### Route structure (`app/[locale]/`)

All routes are i18n-aware under `[locale]` (fr/en, default: fr).

**Public pages** — `(dashboard)/` layout group with `SideNav`:
- `(overview)` — hero banner (brand-driven), next event card, **conditional** crowdfunding banner (only when `brand.features.crowdfunding` is set), Instagram embeds.
- `events/`, `events/[id]`
- `bds/`, `bds/[id]`
- `authors/`, `authors/[id]`
- `publishers/`, `publishers/[id]`
- `contact` — brand-driven email, Facebook, Instagram cards.

**Admin pages** — `/admin/` (protected, Google OAuth + email whitelist):
- CRUD for events, BDs, authors, publishers, genres
- `admin/import-export` — CSV import/export
- `admin/instagram` — Instagram post management
- `admin/wizard` — multi-step new-event wizard

**API routes** — `app/api/`: NextAuth handlers, event ICS, admin CSV export/import.

### Key lib files (`app/lib/`)

- **`data.ts`** — Prisma read queries (`fetchCardData`, `fetchFiltered*`, `fetchPaginated*`)
- **`actions.ts`** — Server Actions, Zod-validated
- **`definitions.ts`** — TypeScript types
- **`ics.ts`** — iCalendar generator; PRODID + UID suffix come from `brand.icsPRODID` and `brand.icsUidSuffix`
- **`csv.ts`** — CSV parse/emit helpers
- **`prisma.ts`** — Prisma client singleton

### UI components (`app/ui/`)

Organized by domain: `events/`, `bds/`, `authors/`, `home/`, `admin/`, `publishers/`, `genres/`, `wizard/`, `shadcn/`. Shared components at the root of `app/ui/`.

### Auth

NextAuth v5 beta with **Google OAuth** provider. Admin access restricted to whitelisted emails (`ADMIN_EMAILS` env var, read in `auth.config.ts`). No middleware file — route protection handled via the `authorized()` callback and admin layout guards.

### i18n

**next-intl** with `[locale]` routing. Supported locales: `fr` (default), `en`. Translation files in `messages/{fr,en}.json`. The `__tests__/i18n/messages.test.ts` test enforces key parity between locales.

Brand-specific strings (long name, short name, Instagram handle, email, Facebook URL) are **not** in the i18n files — they come from the brand module. The one templated exception is `contact.facebookPage`, which interpolates `brand.longName` via the ICU `{brand}` placeholder.

## Theming

`app/ui/global.css` ships both brand palettes under `.brand-bdi` and `.brand-cmbd` class selectors. The root layout (`app/layout.tsx`) applies `className={brand-${brand.id}}` to `<html>`. The `@theme inline` block hoists the CSS variables into Tailwind utilities (`bg-primary`, `text-accent`, etc.) without change.

The four `.card-cycle > *:nth-child(4n+N)` rules for list-page card rotations are also scoped per brand (`.brand-bdi .card-cycle > …`, `.brand-cmbd .card-cycle > …`).

Fonts are brand-neutral: Inter (body), Lusitana (headings), Bangers (hero) via `next/font/google`.

## Conventions

- UI text uses i18n keys (French primary, English secondary)
- Brand-specific values come from `@/config/brand`, not i18n
- `@/*` path alias mapped to project root
- Server Components for data fetching; Client Components (`'use client'`) for interactivity
- ESLint 9 flat config (`eslint.config.mjs`), extends `next/core-web-vitals`
- Webpack mode required (next-intl plugin does not support Turbopack)
- Docker Compose available for local PostgreSQL (`docker-compose.yml`)

## Security

- Google OAuth with email whitelist for admin access
- HSTS, X-Frame-Options: DENY, Permissions-Policy disables camera/mic/geolocation, strict Referrer-Policy (configured in `next.config.js` headers)
- Zod validation on all Server Action form inputs
- Prisma parameterized queries (no raw SQL)
- No secrets in client code; env vars via `.env` (see `.env.example`)
