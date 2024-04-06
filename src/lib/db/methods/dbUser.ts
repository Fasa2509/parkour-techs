import { ApiResponse, baseApi } from "@/lib/api/Api";
import { ApiErrorHandler } from "@/lib/errors";


export const checkSignIn = async ({ email, password }: { email: string; password: string; }): Promise<ApiResponse> => {
    try {
        const { data } = await baseApi.post<ApiResponse>("/login", { email, password });

        return data;
    } catch (error: unknown) {
        return ApiErrorHandler({ error, defaultErrorMessage: 'Ocurrió un error iniciando sesión' });
    };
};
