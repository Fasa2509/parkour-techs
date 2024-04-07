import { DbClient } from "@/lib/db";
import { ApiResponse, CustomResponse } from "@/lib/api/Api";
import { AuthError, EndpointErrorHandler } from "@/lib/errors";
import { getUserAuth } from "@/lib/auth/utils";
import { WorkerSeed } from "@/lib/types/Worker";


export const GET = async (req: Request) => {
    try {
        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para cargar los trabajadores", 401);

        // cargadmos trabajadores de ejemplo
        await DbClient.worker.createMany({
            data: WorkerSeed.map((worker) => ({
                ...worker,
                userId: session.user.id,
            }))
        });

        return CustomResponse<ApiResponse>({
            error: false,
            message: ['Los trabajadores fueron cargados']
        }, 201);
    } catch (error: unknown) {
        return EndpointErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error cargando los trabajadores' });
    };
};
