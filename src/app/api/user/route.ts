import bcrypt from "bcrypt";
import { CompleteUser } from "prisma/zod/user";

import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";
import { signToken } from "@/lib/JWT";
import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { resend } from "@/lib/email";
import { CustomError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { ZNewUser } from "@/lib/types/User";
import { DbClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/utils";


export const GET = async (req: Request) => {
    try {
        const session = await getServerSession(authOptions);

        return CustomResponse<ApiResponse>({ error: false, message: ['Enviamos un correo de confirmación', 'El usuario fue creado'] }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando el usuario" });
    };
};


export const POST = async (req: Request) => {
    try {
        const safeToken = signToken<Pick<CompleteUser, 'id' | 'email' | 'name'>>({ id: "cluob8dmh0000yxwwpurbibhm", email: "miguellfasanellap@gmail.com", name: "Miguel Company" });
        console.log({ safeToken })

        const body = ZNewUser.parse(await req.json());

        const userExists = await DbClient.user.findUnique({
            where: {
                email: body.email,
            },
            select: {
                id: true,
            }
        });

        if (userExists) throw new ValidationError("Ya existe un usuario con ese correo", 400);

        const salt = await bcrypt.genSalt(10);
        const userPassword = await bcrypt.hash(body.password, salt);

        const user = await DbClient.user.create({
            data: {
                ...body,
                password: userPassword
            }
        });

        // const token = signToken<Pick<CompleteUser, 'id' | 'email' | 'name'>>({ id: user.id, email: user.email, name: user.name });

        // const data = await resend.emails.send({
        //     from: "onboarding@resend.dev",
        //     to: [body.email],
        //     subject: "Confirmación de Correo Electrónico",
        //     react: ConfirmationEmail({ userName: body.name, token }),
        // });

        // if (data.error) throw new CustomError("No se pudo enviar el correo de confirmación", 400);

        return CustomResponse<ApiResponse>({ error: false, message: ['Enviamos un correo de confirmación', 'El usuario fue creado'] }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando el usuario" });
    };
};
