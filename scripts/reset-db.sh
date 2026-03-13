#!/usr/bin/env bash
# Reset the local test Postgres: wipe data, re-apply schema, re-seed.
set -e

echo "Resetting database..."

# Drop and recreate via Prisma
npx prisma db push --force-reset --accept-data-loss

echo "Schema applied. Seeding..."

node scripts/seedv2.js

echo "Done — database reset and seeded."
