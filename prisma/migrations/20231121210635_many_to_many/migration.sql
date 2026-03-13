/*
  Warnings:

  - You are about to drop the `authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `revenue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "authors";

-- DropTable
DROP TABLE "bds";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "revenue";

-- CreateTable
CREATE TABLE "Author" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bd_ids" UUID[],
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bd" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_ids" UUID NOT NULL,
    "author_ids" UUID[],
    "title" VARCHAR(255) NOT NULL,
    "publisher" TEXT,
    "publishing_year" INTEGER,

    CONSTRAINT "Bd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "bd_ids" UUID[],
    "fb_event" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BdAuthor" (
    "bdId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "BdAuthor_pkey" PRIMARY KEY ("authorId","bdId")
);

-- CreateTable
CREATE TABLE "AuthorEvent" (
    "authorId" UUID NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "AuthorEvent_pkey" PRIMARY KEY ("authorId","eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bd_title_key" ON "Bd"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Event_date_key" ON "Event"("date");

-- AddForeignKey
ALTER TABLE "Bd" ADD CONSTRAINT "Bd_event_ids_fkey" FOREIGN KEY ("event_ids") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BdAuthor" ADD CONSTRAINT "BdAuthor_bdId_fkey" FOREIGN KEY ("bdId") REFERENCES "Bd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BdAuthor" ADD CONSTRAINT "BdAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorEvent" ADD CONSTRAINT "AuthorEvent_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorEvent" ADD CONSTRAINT "AuthorEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
