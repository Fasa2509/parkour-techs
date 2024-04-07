import { ApiPagination, ApiResponse, ApiResponsePayload, ZApiPagination, baseApi } from "@/lib/api/Api";
import { ApiErrorHandler, ValidationError } from "@/lib/errors";
import { TNewWorker, TUpdateWorker, ZNewWorker, ZUpdateWorker } from "@/lib/types/Worker";
import { CompleteWorker } from "prisma/zod/worker";


export const getPaginatedWorkers = async (paginationInfo: ApiPagination): Promise<ApiResponsePayload<Omit<CompleteWorker, 'user'>[]>> => {
    try {
        const pagination = ZApiPagination.parse(paginationInfo);

        const { data } = await baseApi.get<ApiResponsePayload<Omit<CompleteWorker, 'user'>[]>>(`/worker?take=${pagination.take}&skip=${pagination.skip}`);

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error obteniendo los trabajadores' });
    };
};


export const createWorker = async (workerInfo: TNewWorker): Promise<ApiResponsePayload<Omit<CompleteWorker, 'user'>>> => {
    try {
        const body = ZNewWorker.parse(workerInfo);

        const { data } = await baseApi.post<ApiResponsePayload<Omit<CompleteWorker, 'user'>>>("/worker", body);

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error creando el trabajador' });
    };
};


export const updateWorker = async (workerId: string, workerInfo: TUpdateWorker): Promise<ApiResponsePayload<Omit<CompleteWorker, 'user'>>> => {
    try {
        const body = ZUpdateWorker.parse(workerInfo);

        if (!Object.keys(body).length) throw new ValidationError("No se especificó campo a actualizar", 400);

        const { data } = await baseApi.put<ApiResponsePayload<Omit<CompleteWorker, 'user'>>>("/worker/" + workerId, body);

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error actualizando la información el trabajador' });
    };
};


export const deleteWorker = async (workerId: string): Promise<ApiResponse> => {
    try {
        const { data } = await baseApi.delete<ApiResponse>("/worker/" + workerId);

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error eliminando la información el trabajador' });
    };
};
