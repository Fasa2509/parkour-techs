import bcrypt from "bcrypt";
import { CompleteUser } from "prisma/zod/user";
import nodemailer from "nodemailer";
import { render } from '@react-email/render';

// import { resend } from "@/lib/email";
import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";
import { signToken } from "@/lib/JWT";
import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { CustomError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { ZNewUser } from "@/lib/types/User";
import { DbClient } from "@/lib/db";


export const POST = async (req: Request) => {
    try {
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

        if (body.password !== body.confirmPassword) throw new ValidationError("Las claves deben ser iguales entre sí", 400);

        const salt = await bcrypt.genSalt(10);
        const userPassword = await bcrypt.hash(body.password, salt);

        const { confirmPassword, password, ...info } = body;

        const user = await DbClient.user.create({
            data: {
                ...info,
                password: userPassword
            }
        });

        const token = signToken<Pick<CompleteUser, 'id' | 'email' | 'name'>>({ id: user.id, email: user.email, name: user.name });

        if (process.env.NODE_ENV === "production") {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAILER__USER,
                    pass: process.env.MAILER__PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                }
            });

            const emailHtml = render(ConfirmationEmail({ userName: body.name, token }));

            const options = {
                from: 'miguellfasanellap@gmail.com',
                to: body.email.toLocaleLowerCase(),
                subject: "Confirmación de Correo Electrónico",
                html: emailHtml,
            };

            await transporter.sendMail(options);
        } else {
            console.log({ token });
        }

        // if (process.env.NODE_ENV === "production") {
        // const data = await resend.emails.send({
        //     from: "onboarding@resend.dev",
        //     to: [body.email],
        //     subject: "Confirmación de Correo Electrónico",
        //     react: ConfirmationEmail({ userName: body.name, token }),
        // });

        // if (data.error) {
        //     console.log(data.error);
        //     throw new CustomError("No se pudo enviar el correo de confirmación", 400);
        // };
        // } else {
        //     console.log({ token });
        // }

        return CustomResponse<ApiResponse>({ error: false, message: ['Enviamos un correo de confirmación', 'El usuario fue creado'] }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando el usuario" });
    };
};
