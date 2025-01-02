import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CustomerAdapter from "./adapter";

export const NextAuthOptions: AuthOptions = {
  session: {
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  adapter: CustomerAdapter(),
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
};

export const handler = NextAuth(NextAuthOptions);
export const getNextServerSession = () => {
  return getServerSession(NextAuthOptions);
};
