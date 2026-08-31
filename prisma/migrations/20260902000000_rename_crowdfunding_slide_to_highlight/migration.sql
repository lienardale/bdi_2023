-- Rename in place. The table already exists in production and its rows are the
-- admin's live home page content, so this must preserve data: a drop/create
-- would wipe the published slides.
ALTER TABLE "CrowdfundingSlide" RENAME TO "Highlight";

-- Postgres does NOT rename a table's constraints or indexes along with it, and
-- Prisma derives their expected names from the model name. Without these two,
-- the schema/migration parity guard (__tests__/deploy/schema-migration-parity.test.ts)
-- reports drift even though every column already matches.
ALTER TABLE "Highlight" RENAME CONSTRAINT "CrowdfundingSlide_pkey" TO "Highlight_pkey";
ALTER INDEX "CrowdfundingSlide_position_idx" RENAME TO "Highlight_position_idx";
