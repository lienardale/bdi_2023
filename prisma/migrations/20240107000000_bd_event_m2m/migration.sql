-- CreateTable
CREATE TABLE "BdEvent" (
    "bdId" UUID NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "BdEvent_pkey" PRIMARY KEY ("bdId","eventId")
);

-- AddForeignKey
ALTER TABLE "BdEvent" ADD CONSTRAINT "BdEvent_bdId_fkey" FOREIGN KEY ("bdId") REFERENCES "Bd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BdEvent" ADD CONSTRAINT "BdEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- MigrateData: copy existing Bd.eventId into BdEvent junction table
INSERT INTO "BdEvent" ("bdId", "eventId")
SELECT "id", "eventId" FROM "Bd" WHERE "eventId" IS NOT NULL;

-- DropForeignKey
ALTER TABLE "Bd" DROP CONSTRAINT "Bd_eventId_fkey";

-- DropColumn
ALTER TABLE "Bd" DROP COLUMN "eventId";
