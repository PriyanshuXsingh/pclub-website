import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/lib/generated/prisma";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, 

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: typeof credentials?.email === "string" ? credentials.email : undefined },
        });

        if (!user) throw new Error("No user found");
        if (!user.password) throw new Error("No password set for this user");
        if (!credentials?.password) throw new Error("No password provided");

        const passwordMatch = await bcryptjs.compare(
            credentials.password as string,
            user.password
        );

        if (!passwordMatch) throw new Error("Incorrect password");

        if (!user.approved) throw new Error("User not approved");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          approved: user.approved,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser && !dbUser.approved) {
          return false;
        }

        if (!dbUser) {
          await prisma.user.update({
            where: { email: user.email! },
            data: {
              role: "USER",
              approved: false,
            },
          });
        }
      }
      return true;
    },

    async session({ session, user }) {
      // now `user` comes from DB session since strategy is "database"
      session.user.role = user.role;
      session.user.approved = user.approved;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};
