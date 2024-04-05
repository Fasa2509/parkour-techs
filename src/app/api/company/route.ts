import { ConfirmationEmail } from "@/components/emails/ConfirmationEmail";
import { signToken } from "@/lib/JWT";
import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { resend } from "@/lib/email";
import { CustomError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { TCompany, ZNewCompany } from "@/lib/types/Company";
import { DbClient } from "@/lib/db";


export const POST = async (req: Request) => {
    try {
        const body = ZNewCompany.parse(await req.json());

        const companyExists = await DbClient.company.findUnique({
            where: {
                email: body.email,
            },
            select: {
                id: true,
            }
        });

        if (companyExists) throw new ValidationError("Ya existe una compañía con ese correo", 400);

        const company = await DbClient.company.create({
            data: body,
        });

        const token = signToken<Pick<TCompany, 'id' | 'email' | 'name'>>({ id: company.id, email: company.email, name: company.name });

        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [body.email],
            subject: "Confirmación de Correo Electrónico",
            react: ConfirmationEmail({ companyName: body.name, token }),
        });

        if (data.error) throw new CustomError("No se pudo enviar el correo de confirmación", 400);

        return CustomResponse<ApiResponse>({ error: false, message: ['Enviamos un correo de confirmación', 'La compañía fue creada'] }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: "Ocurrió un error creando la compañía" });
    };
};
