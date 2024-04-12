
import { DbClient } from "@/lib/db";
import { getUserAuth } from "@/lib/auth/utils";
import { AuthError, EndpointErrorHandler, ValidationError } from "@/lib/errors";
import { TValidPhones, ValidPhones, ZUpdateWorker } from "@/lib/types/Worker";
import { ApiResponse, ApiResponsePayload, CustomResponse } from "@/lib/api/Api";
import { CompleteWorker } from "prisma/zod/worker";


export const PUT = async (req: Request) => {
    try {
        let workerId = req.url.split('/').at(-1)!;

        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para actualizar un trabajador", 401);

        const body = ZUpdateWorker.parse(await req.json());

        let workerExists = await DbClient.worker.findUnique({
            where: {
                id: workerId,
            },
            select: {
                id: true,
                userId: true,
            }
        });

        if (!workerExists) throw new ValidationError("No se encontró trabajador por ese id", 404);

        if (workerExists.userId !== session.user.id) throw new ValidationError("No tiene permiso para modificar esta entrada", 401);

        let phoneInit = (body.phone) && body.phone.slice(0, 4);

        if (phoneInit && !ValidPhones[phoneInit as TValidPhones]) throw new ValidationError("El número de teléfono no parece ser válido", 400);

        const worker = await DbClient.worker.update({
            where: {
                id: workerId,
            },
            data: body
        });

        return CustomResponse<ApiResponsePayload<{ worker: Omit<CompleteWorker, 'user'> }>>({
            error: false,
            message: ['Los datos del trabajador fueron actualizados'],
            payload: {
                worker,
            }
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error actualizando el trabajador' });
    };
};


export const DELETE = async (req: Request) => {
    try {
        let workerId = req.url.split('/').at(-1)!;

        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para crear un trabajador", 401);

        let workerExists = await DbClient.worker.findUnique({
            where: {
                id: workerId,
            },
            select: {
                id: true,
                userId: true,
            }
        });

        if (!workerExists) throw new ValidationError("No se encontró trabajador por ese id", 404);

        if (workerExists.userId !== session.user.id) throw new ValidationError("No tiene permiso para eliminar esta entrada", 401);

        await DbClient.worker.delete({
            where: {
                id: workerId,
            }
        });

        return CustomResponse<ApiResponse>({
            error: false,
            message: ['Los datos del trabajador fueron eliminados']
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error eliminando el trabajador' });
    };
};
