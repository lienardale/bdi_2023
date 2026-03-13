-- CreateTable
CREATE TABLE "authors" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bd_ids" UUID[],
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bds" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "event_ids" UUID NOT NULL,
    "author_ids" UUID[],
    "title" VARCHAR(255) NOT NULL,
    "publisher" TEXT,
    "publishing_year" INTEGER,

    CONSTRAINT "bds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "bd_ids" UUID[],
    "fb_event" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue" (
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_key" ON "authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bds_title_key" ON "bds"("title");

-- CreateIndex
CREATE UNIQUE INDEX "events_name_key" ON "events"("name");

-- CreateIndex
CREATE UNIQUE INDEX "events_date_key" ON "events"("date");

-- CreateIndex
CREATE UNIQUE INDEX "revenue_month_key" ON "revenue"("month");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
