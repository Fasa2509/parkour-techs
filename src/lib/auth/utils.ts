import { getServerSession, NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { z } from "zod";
import bcrypt from "bcrypt";

import { CompleteUser } from "prisma/zod/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DbClient } from "@/lib/db/index";
import { redirect } from "next/navigation";
import { isValidPassword } from "../validations";

declare module "next-auth" {
  interface Session {
    user: CompleteUser;
  }
}

export type AuthSession = {
  session: {
    user: CompleteUser;
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(DbClient) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      // @ts-ignore
      session.user.direction = user.direction
      // @ts-ignore
      session.user.createdAt = user.createdAt
      session.user.emailVerified = user.emailVerified

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials) {
        if (!z.string().email().safeParse(credentials?.email || '').success || !isValidPassword(credentials?.password || '')) return null;

        const user = await DbClient.user.findUnique({
          where: {
            email: credentials?.email.toLocaleLowerCase(),
          },
          include: {
            accounts: true,
            sessions: true,
            workers: true,
          }
        });

        if (!user || !user.emailVerified) return null;

        const checkPassword = await bcrypt.compare(credentials!.password, user.password);

        if (!checkPassword) return null;

        const { password, ...userInfo } = user;

        console.log(userInfo)

        return userInfo;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};


export const getUserAuth = async (): Promise<Session | null> => {
  const session = await getServerSession(authOptions);
  return session;
};

export const checkAuth = async (): Promise<Session | null> => {
  const session = await getUserAuth();
  if (!session) return redirect("/sign-in");
  return session;
};
