import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Non-regression guard for the la-bdi.fr outage (digest 1187565494, P2022).
 *
 * Root cause: production deploys ran the dashboard build command
 * `npx prisma generate && npm run build`, which never runs `prisma migrate
 * deploy`. New migrations therefore never reached the production DB, so the
 * deployed Prisma client selected columns (`Author.website`,
 * `InstagramPost.type`) that did not exist → "column does not exist".
 *
 * These tests lock in the wiring that makes Vercel apply migrations on every
 * production deploy:
 *   - `vercel.json` buildCommand must point at the `vercel-build` script
 *     (vercel.json overrides the dashboard Build Command), and
 *   - the `vercel-build` script must actually run `prisma migrate deploy`
 *     before `next build`.
 *
 * If either is reverted, the "client ahead of DB" crash can ship again — so
 * these assertions fail fast in CI.
 */

const root = process.cwd();

function readJson(relPath: string) {
  return JSON.parse(readFileSync(join(root, relPath), 'utf8'));
}

describe('deploy: migrations run on every production deploy', () => {
  const pkg = readJson('package.json');
  const vercel = readJson('vercel.json');

  it('vercel.json buildCommand runs the vercel-build script', () => {
    // vercel.json takes precedence over the dashboard Build Command, so the
    // migrate-enabled script can never be silently bypassed again.
    expect(vercel.buildCommand).toBe('npm run vercel-build');
  });

  it('vercel-build script exists', () => {
    expect(pkg.scripts).toBeDefined();
    expect(typeof pkg.scripts['vercel-build']).toBe('string');
  });

  it('vercel-build applies migrations before building', () => {
    const vercelBuild: string = pkg.scripts['vercel-build'];
    expect(vercelBuild).toContain('prisma migrate deploy');
    expect(vercelBuild).toContain('next build');
  });

  it('vercel-build gates migrate on the production environment', () => {
    // Preview deploys share the already-migrated prod DB and must NOT migrate.
    const vercelBuild: string = pkg.scripts['vercel-build'];
    expect(vercelBuild).toContain('VERCEL_ENV');
    expect(vercelBuild).toContain('production');
  });
});
