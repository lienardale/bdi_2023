import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Strip locale prefix for route checking
      const pathname = nextUrl.pathname.replace(/^\/(fr|en)/, '');

      const isOnDashboard = pathname.startsWith('/home');
      const isOnAdmin = pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (!isLoggedIn) return false;
        const role = (auth?.user as any)?.role;
        if (role !== 'admin') {
          return Response.redirect(new URL('/home', nextUrl));
        }
        return true;
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/home', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
