import { CompleteWorker } from "prisma/zod/worker";
import { PAGINATION_LIMIT } from "@/lib/api/Api";
import { DbClient } from "..";
import { getUserAuth } from "@/lib/auth/utils";
import { AuthError } from "@/lib/errors";


export const backGetWorkers = async (): Promise<Omit<CompleteWorker, 'user' | 'userInfo'>[] | undefined> => {
    try {
        const session = await getUserAuth();

        if (!session) throw new AuthError("Debe iniciar sesión para obtener los trabajadores", 401);

        const workers = await DbClient.worker.findMany({
            where: {
                userId: session.user.id,
            },
            take: 20,
            orderBy: {
                createdAt: "desc"
            }
        });

        return workers
    } catch (error: unknown) {
        return undefined;
    };
}