import Link from "next/link";

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
    });

    return (
        <section className="min-h-screen flex justify-center content-center bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <article
                className="rounded-md p-4 min-h-[520px] mt-6 bg-white max-w-[350px] flex flex-col gap-4 content-center">
                <div className="bg-green-500 mx-auto rounded-[10rem] w-24 h-24 grid place-items-center">
                    <svg className="svg-icon confirm-icon" viewBox="0 0 20 20">
                        <path fill="none" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-center">¡Bienvenidos a nuestro equipo, {decodedInfo.name}!</h3>
                <span className="text-sm text-black text-center">{decodedInfo.email}</span>
                <p
                    className="text-center text-neutral-500 md:text-xl lg:text-base">
                    Has confirmado de manera exitosa tu correo electrónico. Ahora podrás gestionar tu equipo desde cualquier parte. ¡A trabajar!
                </p>
                <div>
                    <Link href="/sign-in" className="w-full flex text-center content-center bg-black h-10 items-center justify-center rounded-md text-neutral-50 shadow transition-colors"
                    >Iniciar sesión</Link>
                </div>
            </article>
        </section>
    );
};
