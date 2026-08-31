/**
 * Prisma error codes meaning "the database is behind the code":
 *   P2021 — the table does not exist
 *   P2022 — the column does not exist
 *
 * This app deploys in a way that guarantees a window where those are expected.
 * `vercel-build` runs `prisma migrate deploy` only when VERCEL_ENV=production,
 * while preview deployments share the production database — so a preview built
 * from a branch that adds a migration runs code whose tables do not exist yet.
 */
const MISSING_SCHEMA_CODES = new Set(['P2021', 'P2022']);

export function isMissingSchemaError(error: unknown): boolean {
  if (!error || typeof error !== 'object' || !('code' in error)) return false;
  const code = (error as { code?: unknown }).code;
  return typeof code === 'string' && MISSING_SCHEMA_CODES.has(code);
}

/**
 * Run a read that depends on a table added by a not-yet-applied migration,
 * falling back when the schema is behind instead of taking the page down.
 *
 * Deliberately narrow: only the two "schema is behind" codes are swallowed, so
 * a genuine database failure still surfaces as a 500 rather than being masked
 * as empty data.
 */
export async function withMissingSchemaFallback<T>(
  read: () => Promise<T>,
  fallback: T,
  context: string,
): Promise<T> {
  try {
    return await read();
  } catch (error) {
    if (isMissingSchemaError(error)) {
      console.warn(
        `[${context}] schema not migrated yet (${(error as { code?: string }).code}); ` +
          'serving the fallback. This is expected on a preview deploy and should ' +
          'resolve once the migration reaches this database.',
      );
      return fallback;
    }
    throw error;
  }
}
