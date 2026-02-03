export interface User {
  name: string;
  email: string;
  image: string;
  userId: string;
  accessToken: string;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User | undefined;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string;
    email: string;
    image: string;
    userId: string;
    accessToken: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
