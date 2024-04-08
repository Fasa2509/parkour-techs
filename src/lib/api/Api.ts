import * as z from 'zod';
import axios from 'axios';


export const DOMAIN_NAME = "http://localhost:3000";


export const baseApi = axios.create({
    baseURL: DOMAIN_NAME + '/api'
});


export const CustomResponse = <T>(body: T, status: number): Response => {
    return new Response(JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json",
        },
        status,
    });
};


export interface ApiResponse {
    error: boolean;
    message: string[];
};

export interface ApiResponseWithPayload<T> extends ApiResponse {
    error: false;
    payload: T;
};

export interface ApiResponseError extends ApiResponse {
    error: true;
};

export type ApiResponsePayload<T> = ApiResponseWithPayload<T> | ApiResponseError;

export const ZApiPagination = z.object({
    take: z.string().pipe(z.coerce.number({ required_error: 'El límite de la petición es obligatorio', invalid_type_error: 'El límite de la query debe ser un número' }).positive('El límite de entradas no es válido').lte(100, 'El límite de la query es muy grande'),),
    skip: z.string().pipe(z.coerce.number({ required_error: 'El número de partida es obligatorio', invalid_type_error: 'El inicio de la query debe ser un número' }).nonnegative('El límite de entradas no es válido'),),
});

export type ApiPagination = z.infer<typeof ZApiPagination>;

export const PAGINATION_LIMIT = 10;
