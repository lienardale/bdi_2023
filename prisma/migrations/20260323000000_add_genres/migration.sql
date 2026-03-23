-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BdGenre" (
    "bdId" UUID NOT NULL,
    "genreId" UUID NOT NULL,

    CONSTRAINT "BdGenre_pkey" PRIMARY KEY ("bdId","genreId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "BdGenre" ADD CONSTRAINT "BdGenre_bdId_fkey" FOREIGN KEY ("bdId") REFERENCES "Bd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BdGenre" ADD CONSTRAINT "BdGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
