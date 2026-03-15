import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Skip intl middleware for server action requests — they don't need locale negotiation
  if (req.headers.get('Next-Action')) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|svg|gif|ico|webp)$).*)'],
};
