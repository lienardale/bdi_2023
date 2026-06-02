#!/usr/bin/env bash
set -euo pipefail

# Reusable LOCAL test/dev database for bd-platform.
#
#   scripts/test-db.sh           # start compose Postgres + apply migrations
#   scripts/test-db.sh --seed    # + seed BDI placeholder data
#
# ALWAYS targets the docker compose Postgres on localhost. The repo's
# .env / .env.local point POSTGRES_URL at the REMOTE production database, and
# seed-bdi.js clears every table first — so this script hard-codes the local
# URL and refuses to run against anything that is not localhost.

LOCAL_DB="postgresql://admin:admin@localhost:5432/bd_platform"
export POSTGRES_URL="$LOCAL_DB"
export POSTGRES_URL_NON_POOLING="$LOCAL_DB"

# Safety guard: never touch a non-local database from this script.
case "$POSTGRES_URL" in
  *localhost*|*127.0.0.1*) : ;;
  *) echo "ABORT: refusing to run against non-local DB: $POSTGRES_URL" >&2; exit 1 ;;
esac

cd "$(dirname "$0")/.."

echo "▸ Starting Postgres (docker compose, waiting for healthy)…"
docker compose up -d --wait

echo "▸ Applying migrations (prisma migrate deploy)…"
npx prisma migrate deploy

if [ "${1:-}" = "--seed" ]; then
  echo "▸ Seeding BDI placeholder data…"
  # Run WITHOUT dotenv so the remote .env URL is never loaded; the exported
  # localhost URL above is what PrismaClient picks up.
  BRAND=bdi NEXT_PUBLIC_BRAND=bdi node ./scripts/seed-bdi.js
fi

echo "✓ Local DB ready at $LOCAL_DB"
