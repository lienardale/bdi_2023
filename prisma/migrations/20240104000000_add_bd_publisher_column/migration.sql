-- Add denormalized publisher name column to Bd (may already exist in dev DBs)
ALTER TABLE "Bd" ADD COLUMN IF NOT EXISTS "publisher" TEXT;
