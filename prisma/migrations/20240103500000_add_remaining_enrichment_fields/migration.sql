-- Add remaining enrichment fields to Bd
ALTER TABLE "Bd" ADD COLUMN IF NOT EXISTS "publication_date" DATE;
ALTER TABLE "Bd" ADD COLUMN IF NOT EXISTS "page_count" INTEGER;
ALTER TABLE "Bd" ADD COLUMN IF NOT EXISTS "price" DECIMAL(10,2);
ALTER TABLE "Bd" ADD COLUMN IF NOT EXISTS "enrichment_source" VARCHAR(50);

-- Add bio_source to Author
ALTER TABLE "Author" ADD COLUMN IF NOT EXISTS "bio_source" VARCHAR(50);
