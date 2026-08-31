import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  isMissingSchemaError,
  withMissingSchemaFallback,
} from '@/app/lib/prisma-errors';

function prismaError(code: string) {
  return Object.assign(new Error(`Prisma error ${code}`), { code });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('isMissingSchemaError', () => {
  it('recognises a missing table (P2021) and a missing column (P2022)', () => {
    expect(isMissingSchemaError(prismaError('P2021'))).toBe(true);
    expect(isMissingSchemaError(prismaError('P2022'))).toBe(true);
  });

  it('does not swallow other Prisma errors', () => {
    // A unique-constraint violation or a connection failure is a real problem.
    expect(isMissingSchemaError(prismaError('P2002'))).toBe(false);
    expect(isMissingSchemaError(prismaError('P1001'))).toBe(false);
  });

  it('is false for anything that is not a coded Prisma error', () => {
    expect(isMissingSchemaError(new Error('boom'))).toBe(false);
    expect(isMissingSchemaError({ code: 2021 })).toBe(false);
    expect(isMissingSchemaError(null)).toBe(false);
    expect(isMissingSchemaError(undefined)).toBe(false);
    expect(isMissingSchemaError('P2021')).toBe(false);
  });
});

describe('withMissingSchemaFallback', () => {
  it('returns the read result when the schema is present', async () => {
    const result = await withMissingSchemaFallback(async () => 'ok', 'fallback', 'ctx');
    expect(result).toBe('ok');
  });

  it('falls back when the table does not exist yet', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await withMissingSchemaFallback(
      async () => {
        throw prismaError('P2021');
      },
      'fallback',
      'ctx',
    );
    expect(result).toBe('fallback');
  });

  it('warns rather than failing silently', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await withMissingSchemaFallback(
      async () => {
        throw prismaError('P2021');
      },
      null,
      'fetchLegalPage',
    );
    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][0]).toContain('fetchLegalPage');
    expect(warn.mock.calls[0][0]).toContain('P2021');
  });

  it('rethrows a genuine database failure instead of masking it as empty data', async () => {
    await expect(
      withMissingSchemaFallback(
        async () => {
          throw prismaError('P1001'); // cannot reach the database
        },
        'fallback',
        'ctx',
      ),
    ).rejects.toThrow();
  });

  it('rethrows non-Prisma errors', async () => {
    await expect(
      withMissingSchemaFallback(
        async () => {
          throw new Error('bug in the query');
        },
        'fallback',
        'ctx',
      ),
    ).rejects.toThrow('bug in the query');
  });
});
