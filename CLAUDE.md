# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 14 dashboard app for managing "Bande des Idées" (BDI), a French comic book event series. Tracks events, comic books (BDs), and authors with many-to-many relationships.

**Stack:** Next.js 14 (App Router), Prisma 5 + PostgreSQL, NextAuth v5 beta, TailwindCSS, Zod

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint (extends next/core-web-vitals)
npm run seed       # Seed database (scripts/seed_bdi.js)
```

`postinstall` runs `prisma generate` automatically.

## Database

Prisma schema at `prisma/schema.prisma`. Connection string via `LOCAL_POSTGRES_URL` env var.

**Core models:**
- **Event** — name, date, fb_event link
- **Bd** — title, publisher, publishing_year; belongs to one Event (via `event_ids` FK)
- **Author** — name

**Junction tables** for many-to-many:
- **BdAuthor** — links Bd ↔ Author (composite PK: `[authorId, bdId]`)
- **AuthorEvent** — links Author ↔ Event (composite PK: `[authorId, eventId]`)

Legacy models from the Next.js course (customers, invoices, revenue) still exist but are unused.

Prisma client singleton is in `app/lib/prisma.ts` to prevent hot-reload re-instantiation.

## Architecture

### Route structure (`app/`)

All domain pages live under `/home` which uses a dashboard layout with `SideNav`:

- `/home/(overview)` — dashboard cards (counts, next event)
- `/home/events` — list, search, create
- `/home/events/[id]` — event detail with associated BDs
- `/home/bds` — list and search
- `/home/bds/[id]` — BD detail
- `/home/authors` — list and search
- `/home/authors/[id]` — author detail with BDs

### Key lib files (`app/lib/`)

- **data.ts** — all data-fetching functions using Prisma (`fetchFiltered*`, `fetch*ById`, `create*`)
- **actions.ts** — Next.js Server Actions for form submissions (Zod-validated)
- **definitions.ts** — TypeScript types (`EventsTable`, `BdsTable`, `AuthorsTable`, etc.)
- **crud.ts** — basic Author CRUD operations
- **prisma.ts** — Prisma client singleton
- **placeholder-bdi-data.js** — seed data (50+ events, 100+ BDs, 100+ authors)

### UI components (`app/ui/`)

Organized by domain: `events/`, `bds/`, `authors/`, `home/`. Each domain folder contains table components and optionally forms/buttons. Shared components (search, button, skeletons) live at the `ui/` root.

### Auth

NextAuth v5 beta with Credentials provider. Auth config in `auth.ts` + `auth.config.ts`. Middleware in `middleware.ts` protects `/home/*` routes. Password verification is currently commented out.

## Conventions

- UI text is in French
- Uses `@/*` path alias (mapped to project root)
- Fonts: Inter (body) and Lusitana (headings) via `next/font/google`
- Server Components for data fetching, Client Components (`'use client'`) for interactivity (search, forms, nav links)
- Docker Compose available for local PostgreSQL (`docker-compose.yml`)
