import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET

export const authOptions: any = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any, req :any) {
        // Add logic here to look up the user from the credentials supplied
        const token = await getToken({ req, secret });
        console.log("JSON Web Token", token);

        if (!credentials.email || !credentials.password) {
          return null;
        }

        // user in DB

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("user found", user);

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.palavrapasse
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.nomeuser,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }: any) {
      console.log("session token", token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
        },
      };
    },

    async jwt({ token, user }: any) {
      // after login jwt token and get the user data from here

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.nomeuser,
        };
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
