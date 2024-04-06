import bcrypt from "bcrypt";
import { z } from "zod";

import { DbClient } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { TCompany } from "../types/Company";
import CredentialsProvider from "next-auth/providers/credentials";
import { isValidPassword } from "../validations";

declare module "next-auth" {
  interface Session {
    user: TCompany;
  }
}

export type AuthSession = {
  session: {
    user: TCompany;
  } | null;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(DbClient) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      console.log({ session })
      console.log({ user })
      session.user.id = user.id
      // session.user.id = user.id;
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

        const company = await DbClient.company.findUnique({
          where: {
            email: credentials?.email.toLocaleLowerCase(),
          },
          include: {
            workers: {
              take: 5,
            }
          }
        });

        if (!company || !company.emailVerified) return null;
        // if (!company) return null;

        const checkPassword = await bcrypt.compare(credentials!.password, company.password);

        if (!checkPassword) return null;

        const { password, ...companyInfo } = company;

        return companyInfo;
      },
    }),
  ],
};


export const getUserAuth = async (): Promise<AuthSession> => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async (): Promise<AuthSession> => {
  const { session } = await getUserAuth();
  if (!session) return redirect("/sign-in");
  return { session };
};

