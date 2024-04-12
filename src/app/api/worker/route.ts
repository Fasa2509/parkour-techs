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

        const worker = await DbClient.worker.create({
            data: {
                ...body,
                user: {
                    connect: { id: session.user.id }
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


export const PATCH = async (req: Request) => {
    try {
        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para crear un trabajador", 401);

        const body = await req.json() as { email?: string; name?: string; ci?: string; direction?: string; };

        if (!Object.keys(body)) throw new ValidationError("No se especificaron campos de búsqueda", 400);

        const search: any = {};

        if (body.email) search.email = { contains: body.email };
        if (body.name) search.name = { contains: body.name };
        if (body.ci) search.ci = { equals: body.ci };
        if (body.direction) search.direction = { contains: body.direction };

        const workers = await DbClient.worker.findMany({
            where: {
                ...search,
                userId: session.user.id,
            }
        });

        return CustomResponse<ApiResponsePayload<{ workers: Omit<CompleteWorker, 'user' | 'userId'>[] }>>({
            error: false,
            message: [workers.length ? 'Información obtenida' : 'No se encontraron trabajadores'],
            payload: {
                workers,
            }
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error buscando la información' });
    };
};
