import type { NextAuthConfig } from 'next-auth';

const WHITELISTED_EMAILS = [
  'alienard.dev@gmail.com',
  'labandedesidees@gmail.com',
];

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile?.email) {
        token.role = WHITELISTED_EMAILS.includes(profile.email) ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
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
        const role = (auth?.user as any)?.role;
        if (role !== 'admin') {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      // All other pages are public
      return true;
    },
  },
} satisfies NextAuthConfig;
