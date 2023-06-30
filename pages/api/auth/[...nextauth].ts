import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "../../../utils/";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await Login(
          process.env.NEXT_PUBLIC_GRAPHQL_URI!,
          credentials
        );

        if (!response.data) return null;

        if (response.data.login) {
          return response.data.login;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/",
  },
  session: {
    strategy: "jwt",
  },
});
