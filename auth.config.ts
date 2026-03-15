import type { NextAuthConfig } from 'next-auth';
import { isAdminEmail } from '@/app/lib/admin-emails';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile?.email) {
        token.role = isAdminEmail(profile.email) ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Strip locale prefix for route checking
      const pathname = nextUrl.pathname.replace(/^\/(fr|en)/, '');

      const isOnLogin = pathname.startsWith('/login');
      const isOnAdmin = pathname.startsWith('/admin');

      // Allow login page always
      if (isOnLogin) {
        // If already logged in, redirect to home
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        if (auth?.user?.role !== 'admin') {
          return Response.redirect(new URL('/forbidden', nextUrl));
        }
        return true;
      }

      // All other pages are public
      return true;
    },
  },
} satisfies NextAuthConfig;
