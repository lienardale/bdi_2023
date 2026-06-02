const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// BRAND is resolved at build time; rewrites are brand-scoped below.
const BRAND = process.env.BRAND ?? 'bdi';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'covers.openlibrary.org' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'img-cache.ulule.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  async rewrites() {
    // BDI legacy cover paths: the production BDI database stores cover_url
    // values like "/covers/<uuid>.jpg". Those files now live under
    // public/brands/bdi/covers/. Rewrite transparently so the DB stays valid
    // without a data migration. CMBD builds don't include this rewrite —
    // /covers/* correctly 404s there.
    if (BRAND === 'bdi') {
      return [
        { source: '/covers/:path*', destination: '/brands/bdi/covers/:path*' },
      ];
    }
    return [];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
