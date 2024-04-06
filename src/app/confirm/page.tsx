import { NextPage } from "next";

import RootLayout from "../layout";
import { CompleteUser } from "prisma/zod/user";
import { redirect } from "next/navigation";
import { decodeToken } from "@/lib/JWT";
import { DbClient } from "@/lib/db";

export default async function ConfirmPage({ searchParams }: any) {
    const { token } = searchParams;

    if (!token) return redirect("/");

    const decodedInfo = await decodeToken<Pick<CompleteUser, 'id' | 'email' | 'name'>>(token);

    if (!decodedInfo || !decodedInfo.id) return redirect("/");

    const res = await DbClient.user.update({
        where: {
            email: decodedInfo.email,
        },
        data: {
            emailVerified: new Date()
        }
    })

    return (
        // <RootLayout>
        <section>
            <p>Hola Mundo</p>
            <div>
                {
                    JSON.stringify(decodedInfo)
                }
            </div>
            <div>
                {
                    JSON.stringify({ res })
                }
            </div>
        </section>
        // </RootLayout>
    );
};
