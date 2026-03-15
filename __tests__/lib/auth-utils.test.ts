import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import { getAdminEmails, isAdminEmail, requireAdmin, requireAdminApi } from '@/app/lib/auth-utils';
import { auth } from '@/auth';

const mockAuth = vi.mocked(auth);

describe('getAdminEmails', () => {
  it('parses ADMIN_EMAILS env var', () => {
    process.env.ADMIN_EMAILS = 'a@b.com, c@d.com';
    expect(getAdminEmails()).toEqual(['a@b.com', 'c@d.com']);
  });

  it('returns empty array when not set', () => {
    delete process.env.ADMIN_EMAILS;
    expect(getAdminEmails()).toEqual([]);
  });
});

describe('isAdminEmail', () => {
  beforeEach(() => {
    process.env.ADMIN_EMAILS = 'admin@test.com,other@test.com';
  });

  it('returns true for admin email', () => {
    expect(isAdminEmail('admin@test.com')).toBe(true);
  });

  it('returns false for non-admin email', () => {
    expect(isAdminEmail('user@test.com')).toBe(false);
  });
});

describe('requireAdmin', () => {
  it('does not throw for admin user', async () => {
    mockAuth.mockResolvedValue({
      user: { role: 'admin', email: 'a@b.com' },
      expires: '',
    });
    await expect(requireAdmin()).resolves.toBeUndefined();
  });

  it('throws for non-admin user', async () => {
    mockAuth.mockResolvedValue({
      user: { role: 'user', email: 'a@b.com' },
      expires: '',
    });
    await expect(requireAdmin()).rejects.toThrow('Unauthorized');
  });

  it('throws when no session', async () => {
    mockAuth.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toThrow('Unauthorized');
  });
});

describe('requireAdminApi', () => {
  it('returns null for admin user', async () => {
    mockAuth.mockResolvedValue({
      user: { role: 'admin', email: 'a@b.com' },
      expires: '',
    });
    const result = await requireAdminApi();
    expect(result).toBeNull();
  });

  it('returns 403 Response for non-admin', async () => {
    mockAuth.mockResolvedValue({
      user: { role: 'user', email: 'a@b.com' },
      expires: '',
    });
    const result = await requireAdminApi();
    expect(result).toBeInstanceOf(Response);
    expect(result!.status).toBe(403);
  });

  it('returns 403 Response when no session', async () => {
    mockAuth.mockResolvedValue(null);
    const result = await requireAdminApi();
    expect(result).toBeInstanceOf(Response);
    expect(result!.status).toBe(403);
  });
});
