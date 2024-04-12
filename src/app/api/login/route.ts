import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { z } from "zod";

import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { AuthError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { DbClient } from "@/lib/db/index";
import { isValidPassword } from "@/lib/validations";
import { decodeToken, signToken } from "@/lib/JWT";
import { CompleteUser } from "prisma/zod/user";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json() as { email: string; password: string; };

        if (!z.string().email().safeParse(body.email || '').success || !isValidPassword(body.password || '')) throw new ValidationError("La información suministrada no es válida", 400);

        const user = await DbClient.user.findUnique({
            where: {
                email: body.email.toLocaleLowerCase(),
            },
        });

        if (!user) throw new ValidationError("No se encontró usuario por ese correo", 404);

        const checkPassword = await bcrypt.compare(body.password, user.password);

        if (!checkPassword) throw new AuthError("La clave es incorrecta", 401);

        if (!user.emailVerified) throw new AuthError("Confirma tu dirección de correo electrónico antes de iniciar sesión", 401);

        const { password, ...userInfo } = user;

        const token = signToken<Pick<CompleteUser, 'id' | 'email' | 'name' | 'direction' | 'createdAt' | 'emailVerified' | 'image'>>(userInfo);

        const res = new Response(JSON.stringify({ error: false, message: ['Inicio de sesión exitoso'] }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });

        cookies().set("auth-token", token, { path: "/", httpOnly: true, maxAge: 24 * 3600 * 7 });

        return res;
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando la compañía" });
    };
};


export const DELETE = async (req: NextRequest) => {
    try {
        let cookieStore = cookies();

        cookieStore.delete("auth-token");

        return new Response(JSON.stringify({ error: false, message: ['Cerrando sesión'] }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error cerrando sesión" });
    };
};


export const PATCH = async (req: NextRequest) => {
    try {
        let cookieStore = cookies();

        const tokenInfo = cookieStore.get("auth-token")?.value;

        if (!tokenInfo) throw new AuthError("No hay token de sesión", 401);

        const userInfo = await decodeToken<Pick<CompleteUser, 'id' | 'email' | 'name' | 'direction' | 'createdAt' | 'emailVerified' | 'image'>>(tokenInfo);

        const token = signToken<Pick<CompleteUser, 'id' | 'email' | 'name' | 'direction' | 'createdAt' | 'emailVerified' | 'image'>>(userInfo);

        const res = new Response(JSON.stringify({ error: false, message: ['Inicio de sesión exitoso'] }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });

        cookieStore.set("auth-token", token, { path: "/", httpOnly: true, maxAge: 24 * 3600 * 7 });

        return res;
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error iniciando sesión" });
    };
};
