# Backlog

---

## 1. Responsive Design Improvements for Mobile

**Status:** to review

### Todo

- [x] Event detail page — add mobile card view with `md:hidden` fallback, styled `<h1>`, clean footer
- [x] BD detail page — stack image + text on mobile (`flex-col` + center)
- [x] Author detail page — stack photo + info on mobile (`flex-col` + center)
- [x] Language switcher visible on mobile (remove `hidden` from sidenav)
- [x] Add `flex-wrap` to filter bars on events and authors list pages
- [x] Responsive title sizing (`text-xl md:text-2xl`) on all three list pages
- [x] Mobile card button spacing in BDs table (replace `<p>` with `flex gap-2` div)

### Done

- Event detail: mobile card list showing title, authors, publisher, year, BD link
- Event detail: footer cleaned up (removed empty `<p>` and `<br>`, consistent "Retour à la liste" button)
- BD/Author detail: `flex flex-col items-center md:flex-row md:items-start` for responsive stacking
- BD/Author detail: `text-center md:text-left` on title/name
- Sidenav: language switcher always visible (`flex` instead of `hidden md:flex`)
- Events + Authors list pages: `flex-wrap` added to filter container
- All three list pages: responsive heading `text-xl md:text-2xl`
- BDs table mobile cards: proper button spacing with `flex gap-2 mt-2`

### Tests

- [ ] Resize browser 320px → 1280px on each page
- [ ] Event detail: BD cards show below 768px, table at 768px+
- [ ] BD/Author detail: image stacks above text below 768px, side-by-side at 768px+
- [ ] Language switcher visible and tappable in mobile nav bar
- [ ] Filter bars wrap gracefully on narrow screens
- [ ] All desktop layouts unchanged at >= 768px
- [ ] `npm run build` passes

### Files changed

- `app/[locale]/home/events/[id]/page.tsx`
- `app/[locale]/home/bds/[id]/page.tsx`
- `app/[locale]/home/authors/[id]/page.tsx`
- `app/ui/home/sidenav.tsx`
- `app/[locale]/home/events/page.tsx`
- `app/[locale]/home/authors/page.tsx`
- `app/[locale]/home/bds/page.tsx`
- `app/ui/bds/table.tsx`

---

## 2. Admin Back-Office (CRUD)

**Status:** done

### Todo

- [x] Admin layout with dedicated sidebar
- [x] Admin dashboard with stats cards (next event, total BDs, total authors)
- [x] Events CRUD — list, create, edit, delete (admin-only)
- [x] BDs CRUD — list, create, edit, delete with all enriched fields
- [x] Authors CRUD — list, create, edit, delete with bio/photo/wikipedia fields
- [x] Role-based access: admin routes protected via NextAuth `authorized` callback
- [x] Server Actions protected with `requireAdmin()` check
- [x] Remove create button from public events page (public pages are read-only)
- [x] Delete confirmation dialog with modal overlay
- [x] Admin pages i18n (all labels translated via `useTranslations`/`getTranslations`)
- [x] Admin sidebar links use locale prefix
- [x] Pagination on admin list pages (20 items per page)

### Done

- Full CRUD for Events, BDs, Authors under `app/[locale]/admin/`
- Admin sidebar with links to all sections, locale-aware
- Admin dashboard with 3 stat cards, translated labels
- Zod validation on all forms with `useFormState`
- `requireAdmin()` defense-in-depth on every Server Action
- Public events page has no create button (read-only)
- Delete confirmation dialog (`ConfirmDeleteButton`) with i18n
- Pagination component with URL search params
- All form labels and UI text translated via `next-intl`

---

## 3. CSV Import / Export

**Status:** done

### Todo

- [x] Export routes for events, BDs, authors (CSV via PapaParse)
- [x] Import route with upsert logic (keyed on name/title)
- [x] Admin UI page with export links and import form
- [x] Admin-only access on all API routes
- [x] BD import: update branch syncs author relationships (deleteMany + create)
- [x] Import validation feedback in UI (structured success/error/skipped counts)
- [x] Import/export page i18n

### Done

- Export API routes at `app/api/admin/export/{events,bds,authors}/`
- Import API route at `app/api/admin/import/` with entity type selector
- Admin UI at `app/[locale]/admin/import-export/`
- PapaParse-based CSV generation (`app/lib/csv.ts`)
- BD import update branch now syncs authors (deleteMany + create)
- Import results show success count + skipped count with color-coded display

---

## 4. French / English Internationalization (i18n)

**Status:** done

### Todo

- [x] `next-intl` setup with `fr` (default) and `en` locales
- [x] Route structure under `app/[locale]/`
- [x] Message files (`messages/fr.json`, `messages/en.json`) with parallel key sets
- [x] Language switcher component in sidenav
- [x] Middleware for locale detection
- [x] Events, BDs, Authors list pages use `getTranslations()`
- [x] Home page components (cards, recent events, top authors, stats chart) — translated via `getTranslations`
- [x] Nav links ("Home", "Events", "Bds", "Authors") — translated via `useTranslations`
- [x] Sidenav ("Admin", "Sign Out") — translated via `getTranslations`
- [x] Admin pages — all labels translated (sidebar, layout, dashboard, forms, import/export, enrichment)
- [x] Home page metadata: uses `generateMetadata` with `t('home.title')`

### Done

- Full i18n infrastructure: routing, messages, middleware, switcher
- All pages fully translated: home, admin, forms, enrichment, import/export
- `generateMetadata` on home page for translated title
- Message files include keys for all UI strings (common, home, events, bds, authors, filters, admin)

---

## 5. Enrichment Pipeline (Summaries, Bios, Covers, Photos)

**Status:** done

### Todo

- [x] EAN lookup via Open Library API (`app/lib/enrichment/ean-lookup.ts`)
- [x] Cover URL from Open Library covers API
- [x] BD summary from Open Library (first sentence)
- [x] `leslibraires.fr` URL generation from EAN
- [x] Author bio from French/English Wikipedia REST API
- [x] Author photo from Wikipedia thumbnail
- [x] Author Wikipedia URL
- [x] Server Actions: `enrichBd`, `enrichAuthor`, `enrichAllBds`, `enrichAllAuthors`
- [x] Admin enrichment UI page with bulk buttons
- [x] CLI script (`scripts/enrich.ts`) with `--bds`, `--authors`, `--dry-run`
- [x] Prisma schema fields: `ean`, `summary`, `cover_url`, `publisher_url`, `leslibraires_url`, `bio`, `photo_url`, `wikipedia_url`
- [x] Per-BD / per-author enrichment buttons in admin edit forms
- [x] `publisher_url` — auto-generated from publisher name via Open Library
- [x] Progress indication during bulk enrichment (SSE streaming with progress bar)

### Done

- Full enrichment pipeline: Open Library for BDs, Wikipedia for authors
- Bulk enrichment via admin UI and CLI script
- Rate limiting (1 req/s) on bulk operations
- Only fills null fields (doesn't overwrite existing data)
- All enrichment fields in Prisma schema with migrations
- Per-entity "Enrich" button on BD and Author edit forms
- `publisher_url` auto-generated: `https://openlibrary.org/publishers/{publisher}`
- SSE endpoint (`/api/admin/enrich`) with real-time progress bar on enrichment page

---

## 6. Home Page Enhancements

**Status:** done

### Todo

- [x] Stat cards (next event date/name, total BDs, total authors)
- [x] Recent events widget (5 most recent with BD count)
- [x] Top authors widget (5 authors with most BDs)
- [x] Stats chart (BDs per publishing year)
- [x] Fix "next event" logic — queries for next future event with fallback to most recent past
- [x] Wire up i18n keys (all labels translated)
- [x] Home page metadata: uses `generateMetadata` with `t('home.title')`

### Done

- 4 stat cards, recent events, top authors, and stats chart widgets all rendering
- Dashboard layout is responsive
- "Next event" correctly returns upcoming event (gte new Date(), asc) with fallback
- All labels translated via `getTranslations`

---

## 7. Auth & User Management

**Status:** done

### Todo

- [x] NextAuth v5 with Google OAuth provider
- [x] Role field derived from whitelisted emails (`admin`)
- [x] JWT + session callbacks expose role
- [x] Admin route protection via `authorized` callback
- [x] Server Action protection via `requireAdmin()`
- [x] API route protection (401 for non-admin)
- [x] Conditional admin link in sidenav
- [x] Sign Out button hidden when not logged in

### Done

- Google SSO replaces Credentials provider
- Whitelisted emails: `alienard.dev@gmail.com`, `labandedesidees@gmail.com`
- Non-whitelisted Google accounts denied at `signIn` callback
- Auth + intl middleware properly composed
- bcrypt dependency removed

---

## 8. Comics External Links (Publishers & leslibraires.fr)

**Status:** done

### Todo

- [x] `leslibraires_url` field in Prisma schema
- [x] `publisher_url` field in Prisma schema
- [x] Auto-generate `leslibraires_url` from EAN in enrichment pipeline
- [x] Display links on BD detail page
- [x] BD form includes `publisher_url` and `leslibraires_url` fields

### Done

- Both URL fields exist in schema and are editable in admin forms
- `leslibraires_url` auto-generated during enrichment
- BD detail page shows leslibraires.fr link when available
- Publisher URL renders as clickable link on BD detail page

---

## 9. Free Image Hosting for Covers & Author Photos

**Status:** done

### Todo

- [x] Use Open Library covers API for BD covers (free, no hosting needed)
- [x] Use Wikipedia thumbnails for author photos (free, no hosting needed)
- [x] `cover_url` and `photo_url` fields in schema
- [x] Display on BD and author detail pages

### Done

- Cover URLs point to `covers.openlibrary.org` (free)
- Photo URLs point to Wikipedia thumbnails (free)
- Both display on their respective detail pages

---

## 10. Google SSO Auth for Back-Office

**Status:** done

### Todo

- [x] Replace Credentials provider with Google OAuth provider (NextAuth v5)
- [x] Restrict access to back-office (`/admin`) to two specific Google accounts: `alienard.dev@gmail.com` and `labandedesidees@gmail.com`
- [x] Deny login for any other Google account (rejected at `signIn` callback)
- [x] Configure Google Cloud Console OAuth credentials (client ID + secret via env vars)

### Done

- Google OAuth provider in `auth.ts`
- `signIn` callback checks email against whitelist
- `jwt` callback sets `token.role = 'admin'` for whitelisted emails
- Login form replaced with "Sign in with Google" button
- bcrypt dependency removed
- `.env.example` documents required env vars
- NextAuth route handler at `app/api/auth/[...nextauth]/route.ts`

### Tests

- [ ] Login with `alienard.dev@gmail.com` — verify access to admin
- [ ] Login with `labandedesidees@gmail.com` — verify access to admin
- [ ] Login with any other Google account — verify access is denied
- [ ] Verify OAuth flow redirects correctly after login/logout

---

## 11. Auth Flow Fixes

**Status:** done

### Todo

- [x] Hide "Sign Out" button when user is not logged in
- [x] Block access to `/admin` routes for unauthenticated users (redirect to login)
- [x] Guard all `/admin` routes with auth middleware (not just `authorized` callback)
- [x] Guard all admin Server Actions with `requireAdmin()` (audit all actions)
- [x] Guard all admin API routes with auth check (audit all routes)
- [x] Verify `/home` routes don't leak admin-only UI to unauthenticated users
- [x] Test login → redirect flow (user lands on intended page after login)
- [x] Test logout → redirect flow (user lands on public page after logout)

### Done

- Auth middleware properly composes with intl middleware
- `authorized` callback in `auth.config.ts` handles login, home, and admin routes
- Admin layout double-checks auth and role, redirects as needed
- Sign Out button conditionally rendered (`{session && ...}`)

---

## 12. Unit & Integration Tests

**Status:** done

### Todo

- [x] Set up test framework (Vitest + @testing-library/react + jsdom)
- [x] Unit tests for enrichment functions (`app/lib/enrichment/`)
- [x] Unit tests for CSV export/import logic (`app/lib/csv.ts`)
- [x] CI pipeline step to run tests on every push
- [ ] Unit tests for data-fetching functions (`app/lib/data.ts`) — requires Prisma mock
- [ ] Unit tests for Server Actions (`app/lib/actions.ts`) — requires auth mock
- [ ] Unit tests for Zod validation schemas
- [ ] Integration tests for auth flow (login, role-based redirects)
- [ ] Component tests for key UI components (tables, forms, search)

### Done

- Vitest configured with `@vitejs/plugin-react`, jsdom environment, `@` path alias
- 45 unit tests across 4 test files: `csv.test.ts`, `ean-lookup.test.ts`, `author-lookup.test.ts`, `actions.test.ts`
- `npm test` / `npm run test:watch` scripts in package.json
- `tsconfig.json` excludes test files from Next.js build
- CI workflow (`.github/workflows/ci.yml`) runs lint → test → build

---

## 13. Deployment & Production Database Seed

**Status:** todo

### Todo

- [x] CI/CD pipeline (lint → test → build) via `.github/workflows/ci.yml`
- [x] `.env.example` documents all required env vars
- [ ] Set up Vercel project and connect to repository
- [ ] Provision Neon PostgreSQL for production
- [ ] Configure production env vars in Vercel dashboard
- [ ] Set up Google OAuth redirect URIs for production domain
- [ ] Run `prisma migrate deploy` on production DB
- [ ] Production seed script (adapt for prod data)
- [ ] Staging environment for pre-production validation

### Tests

- [x] Production build succeeds (`npm run build`)
- [ ] Database migrations apply cleanly on fresh DB
- [ ] Application loads correctly in production mode
- [ ] Auth flow works in production (Google OAuth redirect URIs configured)

---

## 14. Security Compliance

**Status:** done

### Todo

- [x] Set security headers (X-Frame-Options DENY, X-Content-Type-Options nosniff, HSTS, Referrer-Policy, Permissions-Policy)
- [x] Review `next.config.js` for security-related settings
- [x] Ensure all external image domains are whitelisted in `next.config.js` (covers.openlibrary.org, upload.wikimedia.org, lh3.googleusercontent.com)
- [x] Ensure secrets (DB URL, OAuth credentials) are not exposed in client bundles (`.env` in `.gitignore`)
- [x] Dependency audit (`npm audit fix`)
- [x] CSRF protection: Next.js Server Actions have built-in CSRF protection
- [x] All user inputs sanitized via Zod validation on forms/API routes
- [ ] Rate limiting on auth endpoints (Google OAuth handles this natively)
- [ ] CSP header (requires careful tuning for inline styles from Tailwind)

### Done

- Security headers configured in `next.config.js` `headers()` function
- Image domains whitelisted via `images.remotePatterns`
- `npm audit fix` run; remaining 4 high-severity issues require Next.js 16 upgrade
- `.env` and `.env*.local` in `.gitignore`
- `.env.example` created for documentation

---

## 15. Admin Feature Tests

**Status:** done

### Todo

- [ ] Unit tests for data-fetching functions (`app/lib/data.ts`) — mock Prisma client
- [x] Unit tests for Server Actions (`app/lib/actions.ts`) — mock auth + Prisma
- [x] Unit tests for Zod validation schemas (events, BDs, authors)
- [x] Integration tests for auth flow (requireAdmin guard)
- [ ] Component tests for admin UI (tables, forms, search, pagination, confirm-delete dialog)
- [ ] Integration tests for CSV import/export (round-trip, validation errors, auth guard)
- [ ] Integration tests for enrichment pipeline (SSE progress, per-entity enrich buttons)

### Done

- 23 tests in `__tests__/lib/actions.test.ts` covering:
  - Auth guard (requireAdmin rejects unauthenticated and non-admin users)
  - Event Zod validation (rejects empty name/date, accepts valid data, passes fb_event)
  - BD Zod validation (rejects empty title/eventId, rejects long EAN, accepts all fields, handles optionals)
  - Author Zod validation (rejects empty name, accepts optionals, sets empty to null)
  - Update actions (event/bd/author update with Prisma calls, bd author relationship sync)
  - Delete actions (event, bd with relation cleanup, author with relation cleanup)
  - Error handling (Prisma failures return error messages)

---

## 16. BD Extra Fields (Summary, Publication Date, Pages, Price)

**Status:** done

### Todo

- [x] Add Prisma schema fields: `publication_date` (DateTime, nullable), `page_count` (Int, nullable), `price` (Decimal, nullable)
- [x] Push schema changes to database
- [x] Update BD admin forms (create + edit) with new fields
- [x] Update BD detail page to display new fields
- [x] Update Zod validation schemas for new fields
- [x] Update BdsTable type definition
- [x] Add i18n keys for new field labels (fr + en)
- [x] Update CSV export/import to include new fields
- [x] Update enrichment pipeline to populate `publication_date`, `page_count` from Open Library API

### Done

- `publication_date`, `page_count`, `price` added to Prisma schema and pushed to DB
- BD form shows 3 new fields in a grid (date, pages, price)
- BD detail page shows publication date, page count, and price when available
- Zod schema and server actions updated for create/update
- BdsTable type updated in definitions.ts
- i18n keys added: `publicationDate`, `pageCount`, `price` in fr.json and en.json

---

## 17. Comics Navigation Improvements

**Status:** done

### Todo

- [x] BD list page — make each row/card clickable, linking to `/home/bds/[id]`
- [x] BD detail page — make author names clickable, linking to `/home/authors/[id]`
- [x] Event detail page — make BD titles clickable, linking to `/home/bds/[id]`
- [x] Event detail page — make author names clickable, linking to `/home/authors/[id]`
- [x] Author detail page — make BD titles clickable, linking to `/home/bds/[id]`
- [x] Events list — make event names clickable, BD titles and author names clickable
- [x] Authors list — make author names and BD titles clickable
- [x] Remove redundant "lien" button columns (items are now directly clickable)
- [x] "Back to list" buttons consistent across all detail pages

### Done

- All entity names/titles in tables and detail pages are now blue clickable links
- BD titles → BD detail, author names → author detail, event names → event detail
- Removed separate "Link" columns from events and authors tables (no longer needed)

---

## 18. Improved Author Enrichment

**Status:** done

### Todo

- [x] Add fallback sources beyond Wikipedia — Open Library author search as fallback
- [x] Use full Wikipedia extract (paragraph summary, not first sentence)
- [ ] Use LLM (Claude API) to generate concise author bio from multiple sources (future: requires API key)
- [x] Improve photo resolution — prefer `originalimage` over `thumbnail` from Wikipedia
- [x] Handle disambiguation pages gracefully — try with "(auteur)" and "(dessinateur)" qualifiers
- [x] Add source attribution field (`bio_source`) to track where bio came from
- [x] Retry logic for failed lookups (exponential backoff, 2 retries)

### Done

- Open Library author search API as fallback for bios and photos when Wikipedia fails
- Wikipedia `originalimage` preferred over `thumbnail` for higher-res photos
- Disambiguation pages: tries `Name (auteur)` then `Name (dessinateur)` before giving up
- `bio_source` field added to Author model (tracks `wikipedia_fr`, `wikipedia_en`, or `openlibrary`)
- `fetchWithRetry` with exponential backoff (500ms, 1000ms delays)
- Merged results: Wikipedia bio + Open Library photo when Wikipedia has no photo
- 8 unit tests covering all scenarios

---

## 19. Language Persistence & French Default

**Status:** done

### Todo

- [x] Persist locale choice in a cookie so it survives navigation and page reloads
- [x] Set `fr` as the default locale (verify `next-intl` routing config)
- [x] Ensure language switcher updates the cookie when user changes locale
- [x] Redirect `/` to `/fr` (not browser-detected locale)
- [x] Replace all `Link` from `next/link` with locale-aware `Link` from `@/i18n/routing`
- [x] Replace `usePathname` from `next/navigation` with `@/i18n/routing` version in nav components
- [x] Fix `i18n/request.ts` deprecated `locale` param → `await requestLocale`
- [x] Fix not-found pages (linked to legacy `/home/invoices`, now link to correct list pages)
- [x] Test: switch to `en`, navigate through pages, locale stays `en`
- [x] Test: close browser and reopen — locale restored from cookie

### Done

- `NEXT_LOCALE` cookie set automatically by `next-intl` middleware (1-year expiry)
- All `Link` components use `@/i18n/routing` which automatically adds locale prefix
- `usePathname` from `@/i18n/routing` in nav components for correct active state highlighting
- Admin sidebar simplified — no more manual locale prefix extraction
- `i18n/request.ts` uses `requestLocale` (fixes deprecation warnings)
- Not-found pages fixed: BD → `/home/bds`, Author → `/home/authors`, Event → `/home/events`

### Files changed

- `i18n/request.ts` — use `await requestLocale`, return `locale`
- `app/ui/home/nav-links.tsx` — `Link` + `usePathname` from `@/i18n/routing`
- `app/ui/home/sidenav.tsx` — `Link` from `@/i18n/routing`
- `app/ui/admin/sidebar.tsx` — `Link` + `usePathname` from `@/i18n/routing`, removed manual locale prefix
- `app/[locale]/admin/layout.tsx` — `Link` from `@/i18n/routing`, `getLocale()` for redirect
- `app/[locale]/page.tsx` — `Link` from `@/i18n/routing`
- All table/form/detail page components — `Link` from `@/i18n/routing`
- `app/[locale]/home/*/[id]/not-found.tsx` — fixed hrefs + `Link` from `@/i18n/routing`

---

## 20. Migrate to Latest Stable Next.js

**Status:** done

### Todo

- [x] Upgrade `next` from 14.2.x to 16.1.6
- [x] Upgrade `react` and `react-dom` from 18.x to 19.2.4
- [x] Upgrade `next-auth` from beta.3 to beta.30
- [x] Upgrade `next-intl` from 3.x to 4.8.3
- [x] Upgrade `eslint-config-next` to 16.1.6 + ESLint 9 flat config
- [x] Fix breaking changes:
  - `middleware.ts` renamed to `proxy.ts`
  - `params` and `searchParams` made async (13 files)
  - `useFormState` replaced by `useActionState` (3 form components)
  - `unstable_noStore` replaced by `connection()` from `next/server`
  - `createSharedPathnamesNavigation` replaced by `createNavigation` (next-intl v4)
  - `.eslintrc.json` replaced by `eslint.config.mjs` (flat config)
  - `--webpack` flag added to build/dev scripts (Turbopack default)
- [x] `tsconfig.json` auto-updated by Next.js (jsx → react-jsx)
- [x] `npm audit` shows 0 vulnerabilities (was 4 high-severity on Next.js 14)
- [x] `npm run build` passes
- [x] All 45 unit tests pass

### Done

- Full migration from Next.js 14 → 16, React 18 → 19
- All async APIs updated, all deprecated hooks replaced
- ESLint modernized to flat config format
- Zero vulnerabilities after upgrade

---

## 21. Admin List Search, Filters & Links

**Status:** done

### Todo

- [x] Add search bar to admin events list (search by event name)
- [x] Add search bar to admin BDs list (search by title, author, publisher)
- [x] Add search bar to admin authors list (search by name)
- [x] Add filter dropdowns to admin BDs list (by event, publisher, year) — reuse `FilterSelect` component
- [x] Add filter by year to admin events list
- [x] Make entity names clickable in admin tables (event name → edit, BD title → edit, author name → edit)
- [x] Add link to public detail page from admin edit forms ("View on site" button on BD, Author, Event forms)
- [x] Update `fetchPaginated*` functions in `data.ts` to accept `query` and filter params (add `where` clauses + pass to `count`)

### Done

- Search bar on all 3 admin list pages using existing `Search` component
- Filter dropdowns: events (year), BDs (event, publisher, year) using `FilterSelect`
- Entity names clickable in admin tables (link to edit pages)
- Author names and event names clickable in BD admin table
- "View on site" button (EyeIcon) on BD, Author, and Event edit forms
- `fetchPaginatedEvents` accepts `query` + `year` filter
- `fetchPaginatedBds` accepts `query` + `eventId`/`publisher`/`year` filters
- `fetchPaginatedAuthors` accepts `query` filter
- Added `fetchEventOptions`, `fetchPublishers`, `fetchBdYears`, `fetchEventYears` helper functions
- i18n key `viewOnSite` added to fr.json and en.json

---

## 22. Test Admin CRUD (Manual Verification)

**Status:** todo

### Todo

- [ ] Test create + edit + delete for Events (verify form validation, redirect, revalidation)
- [ ] Test create + edit + delete for BDs (verify author multi-select, new fields: publication_date, page_count, price)
- [ ] Test create + edit + delete for Authors (verify bio, photo_url, wikipedia_url fields)
- [ ] Test enrichment buttons on BD and Author edit forms (verify they populate fields)
- [ ] Test bulk enrichment from admin enrichment page (verify SSE progress bar)
- [ ] Test CSV export/import round-trip (verify new fields are preserved)
- [ ] Test pagination on all 3 admin lists
- [ ] Test confirm-delete dialog (verify cancel prevents deletion)
- [ ] Fix any issues found during testing

---

## 23. BD Enrichment Fallback (Google Books API)

**Status:** done

### Context

Current enrichment via Open Library has high null rates for BDs:
- **summary**: 96% null (398/413) — `first_sentence` rarely exists for French comics
- **page_count**: 86% null (357/413) — `number_of_pages_median` rarely populated
- **publication_date**: 85% null (350/413) — dates rarely available
- **cover_url**: 51% null (211/413) — linked to ISBN availability
- **ean/ISBN**: 42% null (172/413)
- **price**: 100% null (413/413) — never enriched

### Todo

- [x] Add Google Books API as fallback source (`https://www.googleapis.com/books/v1/volumes?q=`)
- [x] Update `lookupBd` to try Google Books when Open Library returns null for key fields
- [x] Map Google Books fields: `description` → summary, `pageCount` → page_count, `publishedDate` → publication_date, `imageLinks.thumbnail` → cover_url, ISBN-13 → ean
- [x] Prefer Open Library results when available, fall back to Google Books for missing fields
- [x] Add `enrichment_source` field to BD model to track data provenance (like `bio_source` for authors)
- [x] Update enrichment tests to cover the Google Books fallback path (11 tests)
- [ ] Re-run bulk enrichment after implementing fallback and measure improvement
- [ ] Consider scraping leslibraires.fr for price data (or leave price as manual-entry only)

### Done

- Google Books API added as fallback in `app/lib/enrichment/ean-lookup.ts`
- `lookupOpenLibrary` and `lookupGoogleBooks` as separate functions, merged by `lookupBd`
- Open Library results preferred; Google Books fills in missing fields only
- `enrichment_source` field added to Bd model (`openlibrary`, `googlebooks`, or `openlibrary+googlebooks`)
- Google Books thumbnail URLs upgraded to HTTPS, `&edge=curl` removed
- Handles Google Books date formats: YYYY, YYYY-MM, YYYY-MM-DD
- `enrichment_source` propagated in `enrichBd`, `enrichAllBds`, and SSE route
- 11 unit tests covering: OL-only, GB fallback, GB-only, date formats, both fail, preference order

---

## 24. Edit Form UX: Dirty State, Toast Feedback & Stay on Page

**Status:** done

### Todo

- [x] Track form dirty state — disable save button when no fields have changed
- [x] On save success, display a green toast notification and stay on the same page (no redirect)
- [x] On save failure, display a red toast notification and stay on the same page
- [x] Implement a reusable toast component (auto-dismiss after a few seconds)
- [x] Apply to all 3 edit forms: Events, BDs, Authors
- [x] Update server actions to return success/error result instead of redirecting (edit actions only)

### Done

- Toast component (`app/ui/toast.tsx`) with success/error variants, auto-dismiss after 4s
- Custom `useToast` hook (`app/ui/use-toast.ts`)
- Dirty state tracking on all 3 edit forms — submit disabled until changes made
- `updateEvent`, `updateBd`, `updateAuthor` return `{ success: true, message }` instead of `redirect()`
- `useActionState<State, FormData>` with explicit generics for React 19 compatibility
- Tests updated to expect success return instead of redirect throw

---

## 25. Event Pages: Date, Hour, Place & Calendar Integration

**Status:** done

### Todo

- [x] Add `hour` (Time) and `place` (String) fields to Event model in Prisma schema
- [x] Display date, hour and place on event detail page
- [x] Place should be a clickable link that opens map application on smartphone (Google Maps link)
- [x] "Add to agenda" button next to date/hour — `.ics` file download
- [x] Update event admin forms (create + edit) with hour and place fields
- [x] Add i18n keys for new fields (fr + en)

### Done

- `hour` (VarChar(5)) and `place` (VarChar(255)) added to Event schema
- ICS generation utility (`app/lib/ics.ts`) with all-day and timed event support
- API route `app/api/event/[id]/ics/route.ts` returns `.ics` file with `Content-Type: text/calendar`
- Event detail page shows hour, place (Google Maps link), and "Add to calendar" button
- 4 unit tests for ICS generation
- i18n keys: `events.hour`, `events.place`, `events.addToCalendar`, `events.openMap`

---

## 26. Move /home Routes to Root /

**Status:** done

### Todo

- [x] Move all pages from `/home/*` to `/*` (events, bds, authors, overview)
- [x] Update sidenav layout to apply at root level
- [x] Update all internal links and redirects
- [x] Update middleware/proxy route matching
- [x] Update admin "Back to site" links
- [x] Ensure auth and i18n still work correctly at new paths

### Done

- Moved `app/[locale]/home/*` to `app/[locale]/(dashboard)/*` using route group
- Updated 20+ files: nav-links, tables, forms, detail pages, not-found, actions, auth.config
- All `revalidatePath('/home/...')` changed to `revalidatePath('/...')`
- `auth.config.ts` simplified: public pages no longer require auth, only `/admin` does
- Login callbackUrl changed from `/home` to `/`
- Integration test routes updated

---

## 27. Home Page: Clickable Event Cards & Calendar Integration

**Status:** done

### Todo

- [x] Make "next event date" card clickable — triggers "add to agenda" (.ics download)
- [x] Make "next event" card content clickable — links to event detail page
- [x] Add Instagram gradient banner with link to https://www.instagram.com/labandedesidees/
- [x] Add Ulule crowdfunding banner with link to https://fr.ulule.com/la-revue-des-idees
- [x] Add i18n keys for new sections (fr + en)

### Done

- Cards component accepts optional `href` and `external` props for clickable cards
- Date card links to `.ics` download, name card links to event detail
- Instagram gradient banner (purple→pink→orange) on home page
- Ulule crowdfunding banner (teal→emerald) on home page
- i18n keys: `home.followInstagram`, `home.supportCrowdfunding`, `home.crowdfundingDescription`

---

## 28. Contact Us Page

**Status:** done

### Todo

- [x] Create contact page at `/contact`
- [x] Email link: mailto:bandedesidees@gmail.com
- [x] Facebook link: https://www.facebook.com/bandedesidees
- [x] Instagram link: https://www.instagram.com/labandedesidees/
- [x] Add nav link to contact page in sidenav
- [x] Add i18n keys for contact page (fr + en)

### Done

- Contact page at `app/[locale]/(dashboard)/contact/page.tsx` with 3 cards (Email, Facebook, Instagram)
- SVG icons for each contact method
- Nav link with `EnvelopeIcon` added to sidenav
- i18n keys: `contact.title`, `contact.description`, `contact.email`, `contact.facebookPage`, `contact.instagramProfile`

---

## 29. Event Cover Pictures from Facebook Events

**Status:** done

### Todo

- [x] Add `cover_url` field to Event model in Prisma schema
- [x] Scrape cover image from Facebook event links via Open Graph meta tags (`og:image`)
- [x] Store cover image URL in `cover_url` field during enrichment
- [x] Display cover image on event detail page
- [x] Add enrichment action for event covers (bulk + per-entity)
- [x] Whitelist Facebook CDN domain in `next.config.js` `images.remotePatterns`

### Done

- `cover_url` (Text) added to Event schema
- OG image scraper (`app/lib/enrichment/og-image.ts`) parses `og:image` meta tags
- `enrichEventCover` and `enrichAllEventCovers` actions in `actions-enrichment.ts`
- SSE endpoint supports `event-covers` entity for real-time progress
- Event detail page shows cover image at top when available
- Admin enrichment page has event covers section
- `**.fbcdn.net` whitelisted in `next.config.js` remotePatterns

---

## 30. UI Redesign: Branding with Logo & Magazine Cover

**Status:** done

### Context

Use the BDI logo (`public/logo_bdi.jpg` — black & white comic speech bubbles with "La Bande des Idées") and the magazine cover (`public/RDI_cover.jpg` — colorful comic-style illustration with bold primary colors: red, blue, yellow, black) to define the visual identity.

### Todo

- [x] Extract color palette from branding assets — bold primaries (red, blue, yellow) with black & white accents, comic-book energy
- [x] Replace default Next.js blue color scheme with BDI brand colors in Tailwind config (`tailwind.config.ts`)
- [x] Add BDI logo to sidenav header and login page
- [x] Use logo as favicon
- [x] Typography: Bangers comic-inspired Google Font for headings
- [x] Update button styles, link colors, and hover states to use brand palette
- [x] Style admin sidebar with brand-consistent colors
- [x] Add magazine cover as hero image on home page
- [ ] Ensure sufficient contrast and accessibility (WCAG AA) with new color scheme
- [ ] Update loading/skeleton states to match new palette

### Done

- Brand colors in `tailwind.config.ts`: `brand-red: '#E63946'`, `brand-blue: '#1D3557'`, `brand-yellow: '#F4D35E'`, `brand-dark: '#1A1A2E'`
- Bangers font added (`app/ui/fonts.ts`) for comic-style headings
- Sidenav: logo image replaces text, `bg-brand-dark` background
- Button: `bg-brand-red` with red hover states
- Nav links: `hover:bg-brand-yellow/30 hover:text-brand-blue` active states
- Login page: logo + brand-blue title
- Home page: magazine cover hero banner with Bangers title overlay
- Favicon generated from logo (48x48 PNG)

---

## 31. Admin Route Security Audit & 403 Enforcement

**Status:** todo

### Todo

- [ ] Audit all admin API routes (`/api/admin/*`) — verify they return 403 for non-admin users (not just redirect)
- [ ] Audit admin Server Actions — verify `requireAdmin()` is called in every action and returns proper error
- [ ] Audit admin page routes (`/[locale]/admin/*`) — verify server-side auth check before rendering
- [ ] Ensure backend does not trust frontend (no client-side-only guards)
- [ ] Add unit tests for each admin API route: unauthenticated → 401, non-admin → 403, admin → 200
- [ ] Add unit tests for each admin Server Action: verify `requireAdmin()` rejects non-admin
- [ ] Test SSE enrichment endpoint requires admin auth
- [ ] Test CSV export/import routes require admin auth

---

## 32. Mobile UI/UX Best Practices

**Status:** todo

### Todo

- [ ] Research mobile UI/UX best practices and must-haves for mobile websites
- [ ] Audit all pages for mobile-first responsiveness (320px–768px)
- [ ] Ensure touch targets are at least 44x44px (buttons, links, nav items)
- [ ] Verify font sizes are readable on mobile (minimum 16px for body text to prevent iOS zoom)
- [ ] Check form inputs are mobile-friendly (proper input types, no tiny fields)
- [ ] Ensure tables degrade gracefully on mobile (card view or horizontal scroll)
- [ ] Test navigation is thumb-friendly (important actions within easy reach)
- [ ] Verify images are responsive and don't overflow on small screens
- [ ] Check loading states and skeleton screens work on mobile
- [ ] Test with mobile device emulation (Chrome DevTools) across common breakpoints
- [ ] Implement any missing mobile patterns identified during research

---

## 33. Accessibility Best Practices (WCAG AA)

**Status:** todo

### Todo

- [ ] Research accessibility best practices (WCAG 2.1 AA compliance)
- [ ] Audit all images — add descriptive `alt` text (not just entity names, describe content)
- [ ] Audit color contrast — verify all text meets WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- [ ] Audit form inputs — ensure all have associated `<label>` elements or `aria-label`
- [ ] Audit interactive elements — ensure keyboard navigability (tab order, focus indicators)
- [ ] Add `aria-live` regions for dynamic content (toast notifications, SSE progress)
- [ ] Add skip navigation link ("Skip to content") for keyboard users
- [ ] Verify heading hierarchy is correct (h1 → h2 → h3, no skips)
- [ ] Ensure links have descriptive text (no "click here" or bare URLs)
- [ ] Add `lang` attribute to HTML element matching current locale
- [ ] Test with screen reader (VoiceOver on macOS) on key pages
- [ ] Run automated accessibility audit (axe-core or Lighthouse) and fix issues
- [ ] Implement any missing accessibility patterns identified during research

---

## 34. Deep UI / Design Rework

**Status:** done

### What was done

#### Tailwind v3 → v4 Migration
- Ran `npx @tailwindcss/upgrade` codemod — migrated config to CSS `@theme` directives, updated PostCSS, renamed utility classes
- Deleted `tailwind.config.ts`, updated `postcss.config.mjs`
- Added `button { cursor: pointer; }` base style (v4 changed default)

#### shadcn/ui Foundation
- Installed shadcn/ui v2 dependencies: `tailwind-merge`, `class-variance-authority`, `tw-animate-css`, `lucide-react`, `sonner`, `shadcn`
- Created `components.json` with aliases (`@/app/ui/shadcn/` for shadcn components)
- Added `cn()` utility in `app/lib/utils.ts`
- Installed shadcn components: Button, Input, Label, Select, Textarea, Table, Card, Skeleton, AlertDialog, Badge, Sonner, Pagination, Breadcrumb, Separator

#### Design Tokens (CSS custom properties in `global.css`)
- `--primary`: `#2563EB` (blue) — buttons, links, active nav, focus rings
- `--secondary`: `#DC2626` (red) — CTA, destructive, badges
- `--accent`: `#F4D35E` (yellow) — highlights, hover, tags
- `--background`: `#FAFAF8` — page background
- `--foreground`: `#1A1A2E` — body text
- `--sidebar`: `#2563EB` — sidebar background (blue)
- All tokens use hex values for WCAG AA compliance (≥4.5:1 contrast)

#### Cycling Card Colors on List Pages
- Added `.card-cycle` CSS using `nth-child(4n+N)` selectors cycling through 4 background colors: blue (`#2563EB`), orange (`#E86833`), teal (`#2B9A8F`), yellow (`#F4D35E`)
- Uses CSS custom property overrides (`--card`, `--primary`, `--primary-foreground`, `--muted-foreground`, `--border`) so Tailwind utilities adapt automatically
- Applied to both mobile cards and desktop table rows on all 3 list pages

#### Desktop Table Rework
- Row spacing with `border-collapse: separate; border-spacing: 0 0.5rem` via `table:has(.card-cycle)` CSS
- Rounded row edges (first-child left corners, last-child right corners)
- Percentage-based column widths via `<colgroup>/<col>` for all tables — no lateral scroll
- **Events table** (15/30/25/18/12%): split event name ("La Bande des Idées" + "#NNN"), French dates, all 5 columns visible
- **BDs table** (26/20/14/8/8/12/8%): 7 columns — Title, Authors, Publisher, Price, Pages, Libraires ("Acheter" button), BDI (#number link)
- **Authors table** (35/65%): Name + BDs with internal scroll on long lists
- All column headers translated (FR/EN) via `getTranslations()`
- Cells use `overflow-x-auto` for internal scroll when content exceeds column width

#### Sidebar & Navigation
- Blue sidebar background (`#2563EB`)
- Hover/active: white bg + blue text inversion (`hover:bg-white hover:text-primary` / `bg-white text-primary`)
- Applied consistently across public nav-links, admin sidebar, language switcher, admin/signout buttons
- Logo blends naturally into blue sidebar

#### Component Replacement
- Custom Button → shadcn Button (re-export)
- Custom Toast → Sonner (`toast.success()` / `toast.error()`)
- Custom Pagination → shadcn Pagination
- Custom AlertDialog → shadcn AlertDialog (confirm-delete)
- Custom Breadcrumbs → shadcn Breadcrumb
- Custom Skeletons → shadcn Skeleton
- Admin forms: shadcn Input, Label, Textarea, Select
- Removed `@tailwindcss/forms` plugin

#### BDs Page Filters
- Replaced Year filter with Author filter (searchable select)
- Added `fetchAuthorOptions()` query and `authorId` filter support in `fetchFilteredBds()`
- Added `filters.author` i18n key ("Auteur" / "Author")

#### i18n Keys Added
- `bds.priceShort`, `bds.pages`, `bds.buy`, `filters.author` in both `fr.json` and `en.json`

### Files changed (key files)

- `app/ui/global.css` — design tokens, card-cycle CSS, table row spacing
- `app/ui/events/table.tsx`, `app/ui/bds/table.tsx`, `app/ui/authors/table.tsx` — table rework
- `app/ui/home/sidenav.tsx`, `app/ui/home/nav-links.tsx` — sidebar styling
- `app/ui/admin/sidebar.tsx`, `app/[locale]/admin/layout.tsx` — admin sidebar
- `app/ui/language-switcher.tsx` — language toggle styling
- `app/[locale]/(dashboard)/bds/page.tsx` — author filter
- `app/lib/data.ts` — `fetchAuthorOptions()`, `authorId` filter
- `messages/fr.json`, `messages/en.json` — new i18n keys
- `components.json`, `app/lib/utils.ts` — shadcn config
- `app/ui/shadcn/*.tsx` — ~14 shadcn components
- `package.json`, `postcss.config.mjs` — Tailwind v4 + shadcn deps

---

## 35. Home Page Rework

**Status:** done

### Context

The current home page is cluttered with dashboard-style widgets that don't serve the public-facing purpose. It should feel like a landing page for the association, not an analytics dashboard.

**Current layout (to remove/rework):**
- Hero banner with RDI cover (keep but rework)
- 4 stat cards: next event date, next event name, total BDs, total authors (rework)
- Recent events list (remove)
- Top authors list (remove)
- BDs per year chart (remove)
- Instagram link button (replace with embed)
- Ulule link button (replace with proper CTA)

### Todo

#### Remove
- [ ] Remove "BDs per publishing year" stats chart (`StatsChart` component from home page)
- [ ] Remove "Top authors" widget (`TopAuthors` component from home page)
- [ ] Remove "Recent events" widget (`RecentEvents` component from home page)
- [ ] Remove `fetchDashboardData()` call (no longer needed for `recentEvents`, `topAuthors`, `bdsPerYear`)
- [ ] Clean up unused imports and data-fetching code

#### Rework: Next Event Card
- [ ] Merge "next event date" and "next event name" cards into a single prominent card
- [ ] Single card should show: event name (large), date + hour, place (if available), "Add to calendar" button
- [ ] Keep "total BDs" and "total authors" cards as smaller secondary stats
- [ ] Layout: next event card takes 2 columns (or full width on mobile), stats cards share remaining space

#### Replace: Instagram Embed
- [ ] Remove the current Instagram gradient link button
- [ ] Embed latest Instagram posts from `@labandedesidees` using Instagram Basic Display API or oEmbed
- [ ] Fallback: use Instagram embed iframe (`https://www.instagram.com/labandedesidees/embed/`) or a grid of recent post thumbnails
- [ ] If API access is too complex, use a simple `<iframe>` embed of the profile or a curated selection of post URLs via oEmbed (`https://api.instagram.com/oembed?url=...`)
- [ ] Display 3-4 recent posts in a responsive grid

#### Replace: Ulule CTA
- [ ] Remove the current small teal gradient button
- [ ] Replace with a prominent CTA banner: "Crowdfunding de La Revue des Idées"
- [ ] Use Ulule campaign cover image as banner background: `https://img-cache.ulule.com/display/3d581bcbf4752585340e482ecddb380da674060b/thumbnail/1280x720/presales/9/7/6/6/1/2/216679/plan-de-travail-1-1.7SLhQxKvUc.jpg?q=60`
- [ ] Whitelist `img-cache.ulule.com` in `next.config.js` `images.remotePatterns`
- [ ] CTA should have: cover image as background, overlay with text "Soutenez La Revue des Idées", prominent button "Participer au crowdfunding" linking to `https://fr.ulule.com/la-revue-des-idees`
- [ ] Style: full-width banner, large text, eye-catching but not garish

#### i18n
- [ ] Add/update keys: `home.nextEvent`, `home.crowdfundingTitle`, `home.crowdfundingCta`, `home.instagramFeed`
- [ ] Remove unused keys: `home.recentEvents`, `home.topAuthors`, `home.bdsPerYear`

### Proposed Layout (top to bottom)

```
┌─────────────────────────────────────────────┐
│  Hero banner (RDI cover + title overlay)    │
├──────────────────────┬──────────┬───────────┤
│  Next Event          │ Total    │ Total     │
│  Name, date, hour    │ BDs      │ Authors   │
│  place, calendar btn │ count    │ count     │
├─────────────────────────────────────────────┤
│  Crowdfunding CTA banner                    │
│  (Ulule cover bg + "Soutenez La Revue...")  │
├─────────────────────────────────────────────┤
│  Instagram feed (3-4 embedded posts grid)   │
└─────────────────────────────────────────────┘
```

### Files affected

- `app/[locale]/(dashboard)/(overview)/page.tsx` — main rework
- `app/ui/home/cards.tsx` — merge event cards into one
- `app/ui/home/recent-events.tsx` — remove (or keep component file for potential reuse elsewhere)
- `app/ui/home/top-authors.tsx` — remove
- `app/ui/home/stats-chart.tsx` — remove
- `app/lib/data.ts` — simplify `fetchDashboardData` or remove unused parts
- `next.config.js` — whitelist `img-cache.ulule.com`
- `messages/fr.json`, `messages/en.json` — add/remove i18n keys

---

## 36. Test Coverage: Reach Near-100%

**Status:** todo

### Goal

Add unit and integration tests to get as close to 100% code coverage as possible. Use `npx vitest run --coverage` to identify uncovered files and branches.

### Current state

- 7 test files, 81 tests passing
- Covered: Server Actions (`actions.ts`), CSV helpers (`csv.ts`), ICS generation (`ics.ts`), enrichment lookups (`author-lookup.ts`, `ean-lookup.ts`), i18n key parity (`messages.test.ts`), route smoke tests (`routes.test.ts`)

### Todo

- [ ] Run `npx vitest run --coverage` to get a baseline report
- [ ] `app/lib/data.ts` — test all fetch functions (mock Prisma client)
- [ ] `app/ui/home/cards.tsx` — test rendering with various data states (upcoming event, no event, missing hour/place)
- [ ] `app/ui/home/instagram-feed.tsx` — test iframe rendering with shortcodes
- [ ] `app/ui/admin/` — test form components (author-form, bd-form, event-form)
- [ ] `app/ui/admin/confirm-delete-button.tsx` — test confirmation dialog flow
- [ ] `app/ui/admin/pagination.tsx` — test page navigation rendering
- [ ] `app/api/event/[id]/ics/route.ts` — test ICS API endpoint
- [ ] `app/api/admin/export/` — test CSV export endpoints
- [ ] `app/api/admin/import/route.ts` — test CSV import endpoint
- [ ] `app/api/admin/enrich/route.ts` — test enrichment API endpoint
- [ ] `app/lib/enrichment/og-image.ts` — test OG image scraping
- [ ] `app/lib/actions-enrichment.ts` — test enrichment Server Actions
- [ ] Edge cases: empty database, missing optional fields, invalid inputs, error paths
- [ ] Branch coverage: test all conditional paths (Zod validation errors, Prisma errors, auth guards)

### Verification

- [ ] `npx vitest run --coverage` shows >= 90% line coverage
- [ ] `npm run build` passes
- [ ] No flaky tests (run suite 3 times to confirm)

---

## 37. Publisher / Editor Rework

**Status:** todo

### Problem

Many publishers are duplicated or inconsistent in the `Bd.publisher` free-text field. Some entries are imprints of the same parent publisher (e.g. "Delcourt Comics" and "Delcourt Tonkam" are both imprints of Delcourt). This makes filtering and stats unreliable.

### Todo

- [ ] Create a `Publisher` model in Prisma schema with fields: `id`, `name` (unique), `parent_publisher_id` (self-relation, nullable, for imprints)
- [ ] Add a `publisherId` FK on `Bd` replacing the free-text `publisher` field
- [ ] Write a migration script to deduplicate existing publishers: normalize names, merge imprints under parent publishers
- [ ] Update admin BD form: replace free-text publisher input with a searchable select (or combobox) linked to the Publisher table
- [ ] Add admin CRUD pages for Publishers (list, create, edit, merge duplicates)
- [ ] Update filters on BDs list page to use Publisher records instead of raw strings
- [ ] Update CSV import/export to handle Publisher references
- [ ] Update enrichment pipeline to match enriched publisher names against existing Publisher records
- [ ] Keep `publisher` as a legacy read-only field during migration, remove after verification

### Verification

- [ ] No duplicate publishers in the database
- [ ] Imprints correctly linked to parent publishers
- [ ] BD filters work with the new Publisher model
- [ ] CSV import/export handles publishers correctly
- [ ] All existing tests pass, new tests added for Publisher CRUD
- [ ] `npm run build` passes

---

## 38. Admin Stats Dashboard

**Status:** todo

### Description

Add a stats/analytics page in the admin back-office displaying key metrics about the collection, both all-time and per-year.

### Todo

- [ ] Create admin stats page at `/admin/stats`
- [ ] Add nav link in admin sidebar
- [ ] Key metrics to display:
  - Total number of comics (BDs)
  - Total number of authors
  - Total number of events
  - Most represented authors (top 10 by number of BDs)
  - Most represented publishers (top 10 by number of BDs)
  - BDs per year breakdown (bar chart or table)
  - Events per year breakdown
  - Median number of pages per comic
  - Median price of comics
  - Average number of BDs per event
- [ ] Add Prisma queries in `data.ts` for aggregations (counts, groupBy, percentiles)
- [ ] Display stats since beginning and with a year filter/selector
- [ ] Reuse `StatsChart` component for visual bar charts where appropriate
- [ ] Consider using shadcn Card components for metric cards

### Verification

- [ ] Stats page loads and displays all metrics correctly
- [ ] Year filter works to scope stats to a specific year
- [ ] Handles edge cases (no data, missing pages/price fields)
- [ ] `npm run build` passes
- [ ] Admin-only access enforced
