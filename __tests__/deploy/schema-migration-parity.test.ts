import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';

/**
 * Non-regression guard for the *other* way a "column does not exist" crash
 * ships: a column added to `prisma/schema.prisma` (and used by the generated
 * client) that no committed migration creates. Even with migrations running on
 * deploy (see migrate-on-deploy.test.ts), prod would still be missing that
 * column.
 *
 * `prisma migrate diff` replays `prisma/migrations` into a SHADOW database and
 * compares the result to `schema.prisma`. `--exit-code` returns:
 *   0 → schemas match (every schema column is covered by a migration)  ✅
 *   2 → drift: schema.prisma has changes not represented in migrations  ❌
 *
 * Replaying migrations RESETS the shadow database, so this test is opt-in:
 * it only runs when SHADOW_DATABASE_URL is set to a DEDICATED throwaway DB.
 * Set it up locally with:
 *   docker compose exec -T postgres psql -U admin -d bd_platform \
 *     -c 'CREATE DATABASE bd_platform_shadow;'
 *   SHADOW_DATABASE_URL=postgresql://admin:admin@localhost:5432/bd_platform_shadow \
 *     npx vitest run __tests__/deploy/schema-migration-parity.test.ts
 */

const SHADOW = process.env.SHADOW_DATABASE_URL;

// Safety: never let this run against a non-shadow database — migrate diff
// resets it. The URL must name itself a shadow DB.
const SAFE = !!SHADOW && /shadow/i.test(SHADOW);

describe.skipIf(!SAFE)('schema is fully covered by migrations (no drift)', () => {
  it('prisma migrate diff (migrations → schema) reports no changes', () => {
    let status = 0;
    let output = '';
    try {
      output = execFileSync(
        'npx',
        [
          'prisma',
          'migrate',
          'diff',
          '--from-migrations',
          'prisma/migrations',
          '--to-schema-datamodel',
          'prisma/schema.prisma',
          '--shadow-database-url',
          SHADOW as string,
          '--exit-code',
        ],
        { cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
      );
    } catch (err: any) {
      status = err?.status ?? 1;
      output = `${err?.stdout ?? ''}${err?.stderr ?? ''}`;
    }
    // status 2 means there IS a diff (drift) — fail and show what's missing.
    expect(status, `Schema/migration drift detected:\n${output}`).toBe(0);
  });
});
