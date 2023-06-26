import type { NextAuthOptions, Session } from "next-auth";
import prisma from "@/lib/prisma";
import GitHubProvider from "next-auth/providers/github";
import { signInSchema } from "./schema";

export interface IUser {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { id, email, image, name } = signInSchema.parse(user);

      const dbUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!dbUser) {
        await prisma.user.create({
          data: {
            email: email,
            avatarUrl: image || "",
            name: name || "",
            login: id,
          },
        });
      }

      return true;
    },

    async session({ session }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email || "" },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }

      return session;
    },
  },
};
