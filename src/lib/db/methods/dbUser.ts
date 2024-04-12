import { ApiResponse, baseApi } from "@/lib/api/Api";
import { ApiErrorHandler, ValidationError } from "@/lib/errors";
import { TNewUser, ZNewUser } from "@/lib/types/User";


export const crearCuenta = async (info: TNewUser): Promise<ApiResponse> => {
    try {
        const body = ZNewUser.parse(info);

        if (body.password !== body.confirmPassword) throw new ValidationError("Las claves deben ser iguales entre sí", 400);

        const { data } = await baseApi.post<ApiResponse>("/user", body);

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error creando el usuario' });
    };
};


export const checkSignIn = async ({ email, password }: { email: string; password: string; }): Promise<ApiResponse> => {
    try {
        const { data } = await baseApi.post<ApiResponse>("/login", { email, password });

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error iniciando sesión' });
    };
};


export const closeSession = async (): Promise<ApiResponse> => {
    try {
        const { data } = await baseApi.delete<ApiResponse>("/login");

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error cerrando sesión' });
    };
};
