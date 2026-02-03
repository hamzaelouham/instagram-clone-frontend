import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Login } from '../../../utils/';
import { JWT } from 'next-auth/jwt';
import { User } from '../../../utils/types/next-auth';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { data } = await Login(
          process.env.NEXT_PUBLIC_GRAPHQL_URI!,
          credentials
        );

        if (!data) return null;

        if (data.login) {
          return data.login;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/',
  },
  callbacks: {
    //@ts-ignore
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user?.userId) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;
        token.userId = user.userId;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      session!.user!.accessToken = token.accessToken;
      session!.user!.userId = token.userId;
      session!.user!.email = token.email;
      session!.user!.name = token.name;
      session!.user!.image = token.image;

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
});
