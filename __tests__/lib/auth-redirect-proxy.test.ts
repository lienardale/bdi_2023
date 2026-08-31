import { describe, it, expect } from 'vitest';
import { resolveRedirectProxyUrl } from '@/app/lib/auth-redirect-proxy';

describe('resolveRedirectProxyUrl', () => {
  it('proxies a preview deployment through the production domain', () => {
    expect(
      resolveRedirectProxyUrl({
        VERCEL_ENV: 'preview',
        VERCEL_PROJECT_PRODUCTION_URL: 'la-bdi.fr',
      }),
    ).toBe('https://la-bdi.fr/api/auth');
  });

  it('leaves production alone — it is the proxy, pointing it at itself would loop', () => {
    expect(
      resolveRedirectProxyUrl({
        VERCEL_ENV: 'production',
        VERCEL_PROJECT_PRODUCTION_URL: 'la-bdi.fr',
      }),
    ).toBeUndefined();
  });

  it('leaves local development alone so localhost keeps working', () => {
    expect(resolveRedirectProxyUrl({})).toBeUndefined();
    expect(
      resolveRedirectProxyUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'la-bdi.fr' }),
    ).toBeUndefined();
  });

  it('lets an explicit AUTH_REDIRECT_PROXY_URL win', () => {
    expect(
      resolveRedirectProxyUrl({
        VERCEL_ENV: 'preview',
        AUTH_REDIRECT_PROXY_URL: 'https://bdi-2023.vercel.app/api/auth',
        VERCEL_PROJECT_PRODUCTION_URL: 'la-bdi.fr',
      }),
    ).toBe('https://bdi-2023.vercel.app/api/auth');
  });

  it('falls back to the production domain when the override is blank', () => {
    expect(
      resolveRedirectProxyUrl({
        VERCEL_ENV: 'preview',
        AUTH_REDIRECT_PROXY_URL: '   ',
        VERCEL_PROJECT_PRODUCTION_URL: 'la-bdi.fr',
      }),
    ).toBe('https://la-bdi.fr/api/auth');
  });

  it('returns undefined on a preview with no production domain to proxy through', () => {
    expect(resolveRedirectProxyUrl({ VERCEL_ENV: 'preview' })).toBeUndefined();
    expect(
      resolveRedirectProxyUrl({ VERCEL_ENV: 'preview', VERCEL_PROJECT_PRODUCTION_URL: '  ' }),
    ).toBeUndefined();
  });

  it('resolves per brand, so CMBD proxies through its own domain', () => {
    expect(
      resolveRedirectProxyUrl({
        VERCEL_ENV: 'preview',
        VERCEL_PROJECT_PRODUCTION_URL: 'cmarseillebd.fr',
      }),
    ).toBe('https://cmarseillebd.fr/api/auth');
  });
});
