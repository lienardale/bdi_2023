import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from 'next-auth/providers/google';

const WHITELISTED_EMAILS = [
  'alienard.dev@gmail.com',
  'labandedesidees@gmail.com',
];

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return !!profile?.email && WHITELISTED_EMAILS.includes(profile.email);
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
