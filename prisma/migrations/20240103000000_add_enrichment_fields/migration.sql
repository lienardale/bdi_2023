-- Add enrichment fields to Bd
ALTER TABLE "Bd" ADD COLUMN "ean" VARCHAR(13);
ALTER TABLE "Bd" ADD COLUMN "summary" TEXT;
ALTER TABLE "Bd" ADD COLUMN "cover_url" TEXT;
ALTER TABLE "Bd" ADD COLUMN "publisher_url" TEXT;
ALTER TABLE "Bd" ADD COLUMN "leslibraires_url" TEXT;

-- Add enrichment fields to Author
ALTER TABLE "Author" ADD COLUMN "bio" TEXT;
ALTER TABLE "Author" ADD COLUMN "photo_url" TEXT;
ALTER TABLE "Author" ADD COLUMN "wikipedia_url" TEXT;
