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

**Status:** to review

### Todo

- [x] Admin layout with dedicated sidebar
- [x] Admin dashboard with stats cards (next event, total BDs, total authors)
- [x] Events CRUD — list, create, edit, delete (admin-only)
- [x] BDs CRUD — list, create, edit, delete with all enriched fields
- [x] Authors CRUD — list, create, edit, delete with bio/photo/wikipedia fields
- [x] Role-based access: admin routes protected via NextAuth `authorized` callback
- [x] Server Actions protected with `requireAdmin()` check
- [x] Remove create button from public events page (public pages are read-only)
- [ ] Delete confirmation dialog (currently fires immediately)
- [ ] Admin pages i18n (labels are hard-coded French)
- [ ] Admin sidebar links use locale prefix
- [ ] Pagination on admin list pages

### Done

- Full CRUD for Events, BDs, Authors under `app/[locale]/admin/`
- Admin sidebar with links to all sections
- Admin dashboard with 3 stat cards
- Zod validation on all forms with `useFormState`
- `requireAdmin()` defense-in-depth on every Server Action
- Public events page has no create button (read-only)

### Tests

- [ ] Create/edit/delete an event, BD, and author as admin
- [ ] Verify non-admin users are redirected away from `/admin`
- [ ] Verify unauthenticated users cannot access admin routes

---

## 3. CSV Import / Export

**Status:** to review

### Todo

- [x] Export routes for events, BDs, authors (CSV via PapaParse)
- [x] Import route with upsert logic (keyed on name/title)
- [x] Admin UI page with export links and import form
- [x] Admin-only access on all API routes
- [ ] BD import: update branch should sync author relationships (currently only creates them)
- [ ] Import validation feedback in UI (beyond raw message string)
- [ ] Import/export page i18n

### Done

- Export API routes at `app/api/admin/export/{events,bds,authors}/`
- Import API route at `app/api/admin/import/` with entity type selector
- Admin UI at `app/[locale]/admin/import-export/`
- PapaParse-based CSV generation (`app/lib/csv.ts`)

### Tests

- [ ] Export each entity type and verify CSV content
- [ ] Import a CSV and verify upsert behavior
- [ ] Verify 401 for non-admin users on import/export routes

---

## 4. French / English Internationalization (i18n)

**Status:** to review

### Todo

- [x] `next-intl` setup with `fr` (default) and `en` locales
- [x] Route structure under `app/[locale]/`
- [x] Message files (`messages/fr.json`, `messages/en.json`) with parallel key sets
- [x] Language switcher component in sidenav
- [x] Middleware for locale detection
- [x] Events, BDs, Authors list pages use `getTranslations()`
- [ ] Home page components (cards, recent events, top authors, stats chart) — labels hard-coded
- [ ] Nav links ("Home", "Events", "Bds", "Authors") — hard-coded English
- [ ] Sidenav ("Admin", "Sign Out") — hard-coded English
- [ ] Admin pages — all labels hard-coded French
- [ ] Home page metadata title — static `'Home'` instead of translated

### Done

- Full i18n infrastructure: routing, messages, middleware, switcher
- List pages (events, bds, authors) properly use `getTranslations()`
- Translation keys exist in message files for home page but are not wired up yet

### Tests

- [ ] Switch locale via language switcher and verify all translated pages update
- [ ] Verify URL changes between `/fr/home` and `/en/home`
- [ ] Check that untranslated components still render without errors

---

## 5. Enrichment Pipeline (Summaries, Bios, Covers, Photos)

**Status:** to review

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
- [ ] Per-BD / per-author enrichment buttons in admin edit forms
- [ ] `publisher_url` — field exists but enrichment never populates it
- [ ] Progress indication during bulk enrichment (streaming feedback)
- [ ] Deduplicate logic between `scripts/enrich.ts` and `app/lib/enrichment/`

### Done

- Full enrichment pipeline: Open Library for BDs, Wikipedia for authors
- Bulk enrichment via admin UI and CLI script
- Rate limiting (1 req/s) on bulk operations
- Only fills null fields (doesn't overwrite existing data)
- All enrichment fields in Prisma schema with migrations

### Tests

- [ ] Enrich a single BD and verify EAN, cover, summary, leslibraires URL populated
- [ ] Enrich a single author and verify bio, photo, wikipedia URL populated
- [ ] Bulk enrich and verify rate limiting works
- [ ] Verify enrichment skips already-populated fields

---

## 6. Home Page Enhancements

**Status:** to review

### Todo

- [x] Stat cards (next event date/name, total BDs, total authors)
- [x] Recent events widget (5 most recent with BD count)
- [x] Top authors widget (5 authors with most BDs)
- [x] Stats chart (BDs per publishing year)
- [ ] Fix "next event" logic — currently returns most recent past event, not the next future one
- [ ] Wire up i18n keys (translation keys exist in message files but aren't used)
- [ ] Home page metadata: use `t('home.title')` instead of static `'Home'`

### Done

- 4 stat cards, recent events, top authors, and stats chart widgets all rendering
- Dashboard layout is responsive

### Tests

- [ ] Verify "next event" shows the upcoming event, not the most recent past one
- [ ] Verify all 4 sections render with data
- [ ] Check responsive layout on mobile

---

## 7. Auth & User Management

**Status:** to review

### Todo

- [x] NextAuth v5 with Credentials provider and bcrypt
- [x] Role field on users (`admin` / `user`)
- [x] JWT + session callbacks expose role
- [x] Admin route protection via `authorized` callback
- [x] Server Action protection via `requireAdmin()`
- [x] API route protection (401 for non-admin)
- [x] Conditional admin link in sidenav
- [ ] User management UI (create users, change roles)
- [ ] Compose auth + intl middleware properly (currently separate mechanisms)

### Done

- Full auth flow: login, role-based access, defense-in-depth on actions and API routes
- Admin-only sections fully protected

### Tests

- [ ] Login as admin — verify access to all admin pages
- [ ] Login as regular user — verify redirect from `/admin` to `/home`
- [ ] Verify unauthenticated access is blocked on `/home` and `/admin`

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

### Tests

- [ ] Verify leslibraires.fr link works on BD detail page
- [ ] Verify publisher URL renders as clickable link
- [ ] Enrich a BD and verify leslibraires URL is generated from EAN

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

### Tests

- [ ] Verify cover images load on BD detail page
- [ ] Verify author photos load on author detail page
- [ ] Check fallback behavior when URL is null (no broken images)
