-- Remove denormalized array columns
ALTER TABLE "Author" DROP COLUMN IF EXISTS "bd_ids";
ALTER TABLE "Bd" DROP COLUMN IF EXISTS "author_ids";
ALTER TABLE "Event" DROP COLUMN IF EXISTS "bd_ids";

-- Rename event_ids to eventId on Bd table
ALTER TABLE "Bd" RENAME COLUMN "event_ids" TO "eventId";

-- Rename FK constraint to match new column name
ALTER TABLE "Bd" RENAME CONSTRAINT "Bd_event_ids_fkey" TO "Bd_eventId_fkey";
