-- Add optional author personal website and Instagram post type (post/reel/tv)
ALTER TABLE "Author" ADD COLUMN IF NOT EXISTS "website" TEXT;
ALTER TABLE "InstagramPost" ADD COLUMN IF NOT EXISTS "type" VARCHAR(10) DEFAULT 'post';
