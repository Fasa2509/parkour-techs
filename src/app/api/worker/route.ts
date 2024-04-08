import { CompleteWorker } from "prisma/zod/worker";

import { ApiResponsePayload, CustomResponse, ZApiPagination } from "@/lib/api/Api";
import { getUserAuth } from "@/lib/auth/utils";
import { AuthError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { TValidPhones, ValidPhones, ZNewWorker } from "@/lib/types/Worker";
import { DbClient } from "@/lib/db";


export const GET = async (req: Request) => {
    try {
        let params = new URLSearchParams(req.url.split("/worker").at(-1));

        const pagination = ZApiPagination.parse({ skip: params.get('skip'), take: params.get('take') });

        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para obtener los trabajadores", 401);

        const workers = await DbClient.worker.findMany({
            where: {
                userId: session.user.id,
            },
            skip: pagination.skip,
            take: pagination.take,
        });

        return CustomResponse<ApiResponsePayload<{ workers: Omit<CompleteWorker, 'user'>[] }>>({
            error: false,
            message: ['Los trabajadores fueron obtenidos'],
            payload: {
                workers,
            }
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error obteniendo los trabajadores' });
    };
};


export const POST = async (req: Request) => {
    try {
        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para crear un trabajador", 401);

        const body = ZNewWorker.parse(await req.json());

        let phoneInit = body.phone.slice(0, 4);

        if (!ValidPhones[phoneInit as TValidPhones]) throw new ValidationError("El número de teléfono no parece ser válido", 400);

        const workerExists = await DbClient.worker.findUnique({
            where: {
                email: body.email,
            },
            select: {
                id: true,
            }
        });

        if (!workerExists) throw new ValidationError("Ya existe un trabajador con ese correo", 400);

        const worker = await DbClient.worker.create({
            data: {
                ...body,
                user: {
                    connect: { id: session.user.id }
                    // connect: { id: 'cluob8dmh0000yxwwpurbibhm' }
                }
            }
        });

        return CustomResponse<ApiResponsePayload<{ worker: Omit<CompleteWorker, 'user'> }>>({
            error: false,
            message: ['El trabajador fue creado'],
            payload: {
                worker,
            }
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error creando el trabajador' });
    };
};
