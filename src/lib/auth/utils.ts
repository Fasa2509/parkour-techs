import { DbClient } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { TCompany } from "../types/Company";
import CredentialsProvider from "next-auth/providers/credentials";

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
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    // CredentialsProvider({
    //   async authorize(credentials, req) {

    //     return {

    //     }
    //   },
    // }),
  ],
};


export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/api/auth/signin");
};

