import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { verify } from "argon2";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      name: "google",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          user: profile.given_name, // The user has to be an object but I dont know what does it needs
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const cred = await loginSchema.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email: cred.email },
        });

        if (!user) {
          return null;
        }

        if (user.password && user.id) {
          const isValidPassword = await verify(user.password, cred.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            user: user.id,
            name: user.name,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/",
  },
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
