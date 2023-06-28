import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        console.log(credentials);

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
