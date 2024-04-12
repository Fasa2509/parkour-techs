import {z} from 'zod';

export const ZNewUser = z.object({
    email          : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name           : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
    direction      : z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    password       : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/, 'La contraseña no tiene los caracteres solicitados'),
    confirmPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/, 'La contraseña no tiene los caracteres solicitados'),
});

export type TNewUser = z.infer<typeof ZNewUser>;
