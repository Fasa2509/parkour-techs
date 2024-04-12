import { getServerSession, NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { z } from "zod";
import bcrypt from "bcrypt";

import { CompleteUser } from "prisma/zod/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DbClient } from "@/lib/db/index";
import { redirect } from "next/navigation";
import { isValidPassword } from "../validations";
import { decodeToken, signToken } from "../JWT";

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
  // session: {
  //   strategy: 'jwt',
  // },
  pages: {
    signIn: "/sign-in"
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      // @ts-ignore
      session.user.direction = user.direction
      // @ts-ignore
      session.user.createdAt = user.createdAt
      session.user.emailVerified = user.emailVerified

      console.log(session)

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      type: "credentials",
      id: "credentials",
      credentials: {
        email: { label: 'Correo', type: 'email', placeholder: 'correo@google.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' },
      },
      async authorize(credentials, req) {
        console.log(req)
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

        console.log({ userInfo })

        // if (req.headers) 

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

  if (session) return session;

  const token = cookies().get("auth-token")?.value;

  if (token) {
    const user = await decodeToken<CompleteUser>(token);
    if (user) return { user, expires: new Date(new Date().getTime() + 24 * 3600 * 7 * 1000).toLocaleString() }
  }

  return null;
};

export const checkAuth = async (): Promise<Session | null> => {
  const session = await getUserAuth();
  if (!session) return redirect("/sign-in");
  return session;
};
