import { DbClient } from "..";
import { getUserAuth } from "@/lib/auth/utils";
import { AuthError } from "@/lib/errors";
import { CompleteWorker } from "prisma/zod/worker";


export const backGetWorkers = async (): Promise<Omit<CompleteWorker, 'user'>[] | undefined> => {
    try {
        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para obtener los trabajadores", 401);

        const workers = await DbClient.worker.findMany({
            where: {
                userId: session.user.id,
            },
            take: 15,
        });

        return workers
    } catch (error: unknown) {
        return undefined;
    };
}