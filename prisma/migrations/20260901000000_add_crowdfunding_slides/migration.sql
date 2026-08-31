-- CreateTable
CREATE TABLE "CrowdfundingSlide" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titleFr" VARCHAR(160) NOT NULL,
    "titleEn" VARCHAR(160),
    "ctaFr" VARCHAR(80) NOT NULL,
    "ctaEn" VARCHAR(80),
    "url" VARCHAR(500) NOT NULL,
    "imageUrl" VARCHAR(500) NOT NULL,
    "position" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CrowdfundingSlide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CrowdfundingSlide_position_idx" ON "CrowdfundingSlide"("position");

-- No rows are seeded. This SQL cannot read config/brand, so a hardcoded seed
-- would write BDI's Ulule campaign into CMBD's database as well. The table
-- starting empty is also the intended behaviour: with no slide the section is
-- simply absent from the home page. The admin can materialise the brand's
-- default slide, when it has one, with one click on /admin/crowdfunding.
