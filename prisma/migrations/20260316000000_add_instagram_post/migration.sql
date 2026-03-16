-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "shortcode" VARCHAR(50) NOT NULL,
    "position" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_shortcode_key" ON "InstagramPost"("shortcode");

-- Seed existing Instagram shortcodes
INSERT INTO "InstagramPost" ("id", "shortcode", "position", "active") VALUES
  (gen_random_uuid(), 'DVvnJlaDKNN', 1, true),
  (gen_random_uuid(), 'DVqbhv9DGUr', 2, true),
  (gen_random_uuid(), 'DVbiRVLjD3E', 3, true),
  (gen_random_uuid(), 'DUoAk1HDNnu', 4, true),
  (gen_random_uuid(), 'DTf5__QjLU1', 5, true),
  (gen_random_uuid(), 'DSKYK80DG0z', 6, true);
