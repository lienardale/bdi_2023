-- DropIndex
DROP INDEX IF EXISTS "WizardDraft_email_key";

-- AddColumn
ALTER TABLE "WizardDraft" ADD COLUMN "name" VARCHAR(255) NOT NULL DEFAULT 'Brouillon';

-- CreateIndex
CREATE INDEX "WizardDraft_email_idx" ON "WizardDraft"("email");
