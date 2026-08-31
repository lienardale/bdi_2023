-- CreateTable
CREATE TABLE "LegalPage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" VARCHAR(50) NOT NULL DEFAULT 'legal',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "contentFr" TEXT,
    "contentEn" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSection" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kind" VARCHAR(10) NOT NULL,
    "icon" VARCHAR(20),
    "titleFr" VARCHAR(120) NOT NULL,
    "titleEn" VARCHAR(120),
    "textFr" VARCHAR(200) NOT NULL,
    "textEn" VARCHAR(200),
    "value" VARCHAR(500) NOT NULL,
    "position" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ContactSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LegalPage_key_key" ON "LegalPage"("key");

-- CreateIndex
CREATE INDEX "ContactSection_position_idx" ON "ContactSection"("position");

-- Seed the singleton legal page row (hidden until an admin activates it).
-- Brand-neutral and empty, so it is safe to run against either brand's database.
-- `updatedAt` has no DB default, so it must be given explicitly here.
INSERT INTO "LegalPage" ("key", "active", "updatedAt")
VALUES ('legal', false, CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;

-- No ContactSection rows are seeded: this SQL cannot read config/brand, and a
-- hardcoded seed would write one brand's contact details into the other brand's
-- database. The public page falls back to the brand defaults while empty.
