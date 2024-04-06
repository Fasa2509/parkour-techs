import bcrypt from "bcrypt";
import { z } from "zod";

import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { DbClient } from "@/lib/db/index";
import { isValidPassword } from "@/lib/validations";


export const POST = async (req: Request) => {
    try {
        const body = await req.json() as { email: string; password: string; };

        if (!z.string().email().safeParse(body.email || '').success || !isValidPassword(body.password || '')) throw new ValidationError("La información suministrada no es válida", 400);

        const company = await DbClient.company.findUnique({
            where: {
                email: body.email.toLocaleLowerCase(),
            },
            select: {
                password: true,
            }
        });

        if (!company) throw new ValidationError("No se encontró usuario por ese correo", 404);

        const checkPassword = await bcrypt.compare(body.password, company.password);

        if (!checkPassword) throw new ValidationError("La clave es incorrecta", 401);

        return CustomResponse<ApiResponse>({ error: false, message: [''] }, 200);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando la compañía" });
    };
};