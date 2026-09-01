-- The legal page's heading and URL used to be hardcoded (an i18n message and the
-- app/[locale]/(dashboard)/legal route folder). Both move into the row so an
-- admin can rename the page — "Chartes" at /chartes, say — without a deploy.

-- Existing deployments keep the URL they already publish: the default matches
-- the route the page has always been served from.
ALTER TABLE "LegalPage"
  ADD COLUMN "slug"    VARCHAR(60) NOT NULL DEFAULT 'legal',
  ADD COLUMN "titleFr" VARCHAR(120),
  ADD COLUMN "titleEn" VARCHAR(120);

-- One row per key today, but the slug is the public URL: keep the database the
-- authority on its uniqueness rather than the application.
CREATE UNIQUE INDEX "LegalPage_slug_key" ON "LegalPage"("slug");
