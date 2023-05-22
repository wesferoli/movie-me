import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { id, email, image, name } = user;

      if (email) {
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
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
