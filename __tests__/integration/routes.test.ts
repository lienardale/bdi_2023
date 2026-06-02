import { describe, it, expect } from 'vitest';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const SKIP = !process.env.TEST_BASE_URL && process.env.CI === 'true';

const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

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

// Regression guard for the la-bdi.fr outage (P2022 "column does not exist").
// A column present in the Prisma client but missing from the DB (i.e. a
// migration that never reached the DB) makes DB-backed pages throw. The list
// AND detail pages for authors select the affected column, so both 500 — we
// assert the list is 200 *first* so the test fails loudly instead of skipping
// when there's nothing to scrape. The homepage streams its shell before the
// failing query, so it returns 200 even on error; we still assert it isn't the
// Next.js production server-error page (the exact symptom seen on prod).
describe.skipIf(SKIP)('Detail pages (DB-backed) render without server errors', () => {
  async function firstId(listPath: string, segment: string, ctx: { skip: () => void }) {
    const list = await fetchRoute(listPath);
    expect(list.status).toBe(200); // a missing DB column 500s the list page — fail, don't skip
    const id = (await list.text()).match(new RegExp(`/${segment}/(${UUID})`, 'i'))?.[1];
    if (!id) ctx.skip(); // list is healthy but the DB is empty — nothing to open
    return id as string;
  }

  it('GET /fr/authors/[id] returns 200', async (ctx) => {
    const id = await firstId('/fr/authors', 'authors', ctx);
    const res = await fetchRoute(`/fr/authors/${id}`);
    expect(res.status).toBe(200);
  }, 20000); // DB-backed list + detail can be slow against a dev server with full seed data

  it('GET /fr/bds/[id] returns 200', async (ctx) => {
    const id = await firstId('/fr/bds', 'bds', ctx);
    const res = await fetchRoute(`/fr/bds/${id}`);
    expect(res.status).toBe(200);
  }, 20000);

  it('GET /fr homepage does not render the server-error page', async () => {
    const res = await fetchRoute('/fr');
    const html = await res.text();
    // Next.js prints this when a Server Component render throws in production.
    expect(html).not.toContain('Application error');
    expect(html).not.toContain('server-side exception');
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
