import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const SKIP = !process.env.TEST_BASE_URL && process.env.CI === 'true';

async function fetchRoute(path: string) {
  return fetch(`${BASE_URL}${path}`, { redirect: 'manual' });
}

describe.skipIf(SKIP)('Public pages', () => {
  it('GET /fr returns 200', async () => {
    const res = await fetchRoute('/fr');
    expect(res.status).toBe(200);
  });

  it('GET /en returns 200', async () => {
    const res = await fetchRoute('/en');
    expect(res.status).toBe(200);
  });

  it('GET /fr/login returns 200', async () => {
    const res = await fetchRoute('/fr/login');
    expect(res.status).toBe(200);
  });

  it('GET /en/login returns 200', async () => {
    const res = await fetchRoute('/en/login');
    expect(res.status).toBe(200);
  });
});

describe.skipIf(SKIP)('Dashboard pages (public)', () => {
  it('GET /fr returns 200', async () => {
    const res = await fetchRoute('/fr');
    expect(res.status).toBe(200);
  });

  it('GET /en returns 200', async () => {
    const res = await fetchRoute('/en');
    expect(res.status).toBe(200);
  });

  it('GET /fr/events returns 200', async () => {
    const res = await fetchRoute('/fr/events');
    expect(res.status).toBe(200);
  });

  it('GET /fr/bds returns 200', async () => {
    const res = await fetchRoute('/fr/bds');
    expect(res.status).toBe(200);
  });

  it('GET /fr/authors returns 200', async () => {
    const res = await fetchRoute('/fr/authors');
    expect(res.status).toBe(200);
  });
});

describe.skipIf(SKIP)('Admin pages (unauthenticated → redirect)', () => {
  it('GET /fr/admin redirects to login', async () => {
    const res = await fetchRoute('/fr/admin');
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/fr/login');
  });

  it('GET /fr/admin/events redirects to login', async () => {
    const res = await fetchRoute('/fr/admin/events');
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/fr/login');
  });

  it('GET /fr/admin/bds redirects to login', async () => {
    const res = await fetchRoute('/fr/admin/bds');
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/fr/login');
  });

  it('GET /fr/admin/authors redirects to login', async () => {
    const res = await fetchRoute('/fr/admin/authors');
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/fr/login');
  });

  it('GET /fr/admin/import-export redirects to login', async () => {
    const res = await fetchRoute('/fr/admin/import-export');
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/fr/login');
  }, 15000);

});

describe.skipIf(SKIP)('API routes', () => {
  it('GET /api/auth/providers returns 200', async () => {
    const res = await fetchRoute('/api/auth/providers');
    expect(res.status).toBe(200);
  });

  it('GET /api/admin/export/events returns 403 when unauthenticated', async () => {
    const res = await fetchRoute('/api/admin/export/events');
    expect(res.status).toBe(403);
  });
});

describe.skipIf(SKIP)('Security headers', () => {
  it('includes X-Frame-Options: DENY', async () => {
    const res = await fetchRoute('/fr');
    expect(res.headers.get('x-frame-options')).toBe('DENY');
  });

  it('includes X-Content-Type-Options: nosniff', async () => {
    const res = await fetchRoute('/fr');
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  });

  it('includes Strict-Transport-Security', async () => {
    const res = await fetchRoute('/fr');
    const hsts = res.headers.get('strict-transport-security');
    expect(hsts).toBeTruthy();
    expect(hsts).toContain('max-age=');
  });

  it('includes Referrer-Policy', async () => {
    const res = await fetchRoute('/fr');
    expect(res.headers.get('referrer-policy')).toBeTruthy();
  });

  it('includes Permissions-Policy', async () => {
    const res = await fetchRoute('/fr');
    expect(res.headers.get('permissions-policy')).toBeTruthy();
  });
});
