# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 app for **Bande des Idées** (BDI), a French comic book association. Public-facing site with admin back-office. Tracks events, comic books (BDs), and authors with many-to-many relationships.

**Stack:** Next.js 16 (App Router), React 19, Prisma 5 + PostgreSQL, NextAuth v5 beta (Google OAuth), next-intl, TailwindCSS 3, Zod, Vitest

## Commands

```bash
npm run dev          # Start dev server (webpack mode — required by next-intl)
npm run build        # Production build (webpack mode)
npm run lint         # ESLint 9 flat config
npm run test         # Vitest (81 tests)
npm run test:watch   # Vitest in watch mode
npm run seed         # Seed database (scripts/seedv2.js)
npm run enrich       # Run enrichment pipeline
```

`postinstall` runs `prisma generate` automatically.

## Testing

Vitest with jsdom environment. Tests live in `__tests__/`:

- `lib/actions.test.ts` — Server Action validation and DB mutations
- `lib/csv.test.ts` — CSV import/export parsing
- `lib/ics.test.ts` — iCalendar file generation
- `lib/enrichment/author-lookup.test.ts` — Wikipedia/Wikidata lookups
- `lib/enrichment/ean-lookup.test.ts` — OpenLibrary EAN lookups
- `i18n/messages.test.ts` — validates fr.json and en.json key parity
- `integration/routes.test.ts` — route rendering smoke tests

All tests mock Next.js server functions (`redirect`, `revalidatePath`, `auth`). Run `npm test` before pushing.

## Database

Prisma schema at `prisma/schema.prisma`. Connection string via `LOCAL_POSTGRES_URL` env var.

**Core models:**
- **Event** — name, date (unique), hour, place, fb_event, cover_url
- **Bd** — title (unique), publisher, publishing_year, eventId (FK to Event); enrichment fields: ean, summary, cover_url, publisher_url, leslibraires_url, publication_date, page_count, price
- **Author** — name (unique); enrichment fields: bio, bio_source, photo_url, wikipedia_url

**Junction tables** for many-to-many:
- **BdAuthor** — Bd ↔ Author (composite PK: `[authorId, bdId]`)
- **AuthorEvent** — Author ↔ Event (composite PK: `[authorId, eventId]`)

Legacy `users` table exists for credentials auth (unused since Google OAuth migration).

Prisma client singleton in `app/lib/prisma.ts` prevents hot-reload connection leaks.

## Architecture

### Route structure (`app/[locale]/`)

All routes are i18n-aware under `[locale]` (fr/en, default: fr).

**Public pages** — `(dashboard)/` layout group with `SideNav`:
- `(overview)` — landing page: hero banner, next event card, stats, Ulule CTA, Instagram embeds
- `events/`, `events/[id]` — event list and detail
- `bds/`, `bds/[id]` — BD list and detail
- `authors/`, `authors/[id]` — author list and detail
- `contact` — contact page

**Admin pages** — `/admin/` (protected, requires Google OAuth + whitelisted email):
- `admin/` — admin dashboard
- `admin/events/`, `admin/bds/`, `admin/authors/` — CRUD with create/edit forms
- `admin/enrichment` — auto-fill missing data via Wikipedia and OpenLibrary APIs
- `admin/import-export` — CSV import/export

**API routes** — `app/api/`:
- `auth/[...nextauth]` — NextAuth handlers
- `event/[id]/ics` — iCalendar download for an event
- `admin/enrich` — enrichment endpoint
- `admin/export/{events,bds,authors}` — CSV export
- `admin/import` — CSV import

### Key lib files (`app/lib/`)

- **data.ts** — Prisma queries: `fetchCardData`, `fetchFiltered*`, `fetchPaginated*`, `fetch*ById`
- **actions.ts** — Server Actions for form CRUD (Zod-validated)
- **actions-enrichment.ts** — Server Actions for enrichment pipeline
- **definitions.ts** — TypeScript types (`EventsTable`, `BdsTable`, `AuthorsTable`)
- **ics.ts** — iCalendar (.ics) file generation
- **csv.ts** — CSV parsing/export helpers
- **enrichment/** — `author-lookup.ts` (Wikipedia/Wikidata), `ean-lookup.ts` (OpenLibrary), `og-image.ts` (OG image scraping)
- **prisma.ts** — Prisma client singleton

### UI components (`app/ui/`)

Organized by domain: `events/`, `bds/`, `authors/`, `home/`, `admin/`. Shared components (`search.tsx`, `button.tsx`, `skeletons.tsx`, `filter-select.tsx`, `toast.tsx`) at root.

- **home/** — `sidenav.tsx`, `nav-links.tsx`, `cards.tsx`, `instagram-feed.tsx`, `stats-chart.tsx`, `recent-events.tsx`, `top-authors.tsx`
- **admin/** — `sidebar.tsx`, `breadcrumbs.tsx`, `pagination.tsx`, `confirm-delete-button.tsx`, domain form components

### Auth

NextAuth v5 beta with **Google OAuth** provider. Admin access restricted to whitelisted emails (configured in `auth.config.ts`). No middleware file — route protection handled via the `authorized()` callback in auth config and admin layout guards.

### i18n

**next-intl** with `[locale]` routing. Supported locales: `fr` (default), `en`. Translation files in `messages/{fr,en}.json`. Config in `i18n/routing.ts` and `i18n/request.ts`. The i18n messages test ensures key parity between locale files.

## Conventions

- UI text uses i18n keys (French primary, English secondary)
- `@/*` path alias mapped to project root
- Fonts: Inter (body), Lusitana (headings), Bangers (hero title) via `next/font/google`
- Server Components for data fetching; Client Components (`'use client'`) for interactivity
- ESLint 9 flat config (`eslint.config.mjs`), extends `next/core-web-vitals`
- Webpack mode required (next-intl plugin does not support Turbopack)
- Docker Compose available for local PostgreSQL (`docker-compose.yml`)

## Security

- Google OAuth with email whitelist for admin access
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, HSTS, strict Referrer-Policy (configured in `next.config.js` headers)
- Permissions-Policy disables camera, microphone, geolocation
- Zod validation on all Server Action form inputs
- Prisma parameterized queries (no raw SQL, no injection risk)
- No secrets in client code; env vars via `.env` (see `.env.example`)
