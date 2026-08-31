import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from 'next-auth/providers/google';
import { isAdminEmail } from '@/app/lib/admin-emails';
import { resolveRedirectProxyUrl } from '@/app/lib/auth-redirect-proxy';

// Undefined outside preview deployments, so production and local development
// keep resolving their own callback URL exactly as before.
const redirectProxyUrl = resolveRedirectProxyUrl(process.env);

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  // Spread conditionally: passing the key as undefined would stop Auth.js
  // falling back to its own AUTH_REDIRECT_PROXY_URL default.
  ...(redirectProxyUrl ? { redirectProxyUrl } : {}),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return !!profile?.email && isAdminEmail(profile.email);
      }
      return false;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
