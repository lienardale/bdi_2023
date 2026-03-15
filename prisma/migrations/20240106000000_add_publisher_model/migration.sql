-- CreateTable
CREATE TABLE "Publisher" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "parentId" UUID,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");

-- AddForeignKey
ALTER TABLE "Publisher" ADD CONSTRAINT "Publisher_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Bd" ADD COLUMN "publisherId" UUID;

-- AddForeignKey
ALTER TABLE "Bd" ADD CONSTRAINT "Bd_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
