import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const isUser = null;
        if (isUser) {
          return isUser;
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
