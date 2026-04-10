# bd-platform

Multi-brand Next.js 16 platform hosting two French comic-book event sites from a single codebase:

- **La Bande des Idées** (BDI) — [bdi.fr](https://bdi.fr)
- **C'est Marseille BD** (CMBD) — [cmarseillebd.fr](https://cmarseillebd.fr) *(not yet deployed)*

The active brand is selected at build time via the `BRAND` env var. See `config/brand/` for the brand module and `CLAUDE.md` for architecture.

## Stack

Next.js 16 (App Router) · React 19 · Prisma 5 + PostgreSQL · NextAuth v5 beta (Google OAuth) · next-intl · TailwindCSS 4 · Zod · Vitest.

## Quick start

```bash
# 1. Copy and fill in secrets
cp .env.example .env.local
# edit .env.local: AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ADMIN_EMAILS
# leave BRAND=bdi (or switch to BRAND=cmbd — must match NEXT_PUBLIC_BRAND)

# 2. Start local Postgres
docker compose up -d

# 3. Install deps (postinstall runs prisma generate)
npm install

# 4. Apply schema
npx prisma migrate deploy

# 5. Run dev server for the brand you want to preview
npm run dev:bdi     # or: npm run dev:cmbd
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev:bdi        # dev server with BRAND=bdi
npm run dev:cmbd       # dev server with BRAND=cmbd
npm run build:bdi      # production build for BDI
npm run build:cmbd     # production build for CMBD
npm run lint           # ESLint
npm run test           # Vitest
npm run seed:bdi       # BDI-only — refuses if BRAND != 'bdi'
```

See `CLAUDE.md` for the full architecture and conventions.
