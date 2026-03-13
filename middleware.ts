import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  // Run next-intl middleware first for locale detection
  const intlResponse = intlMiddleware(request);

  // For API routes, skip locale handling
  if (request.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
