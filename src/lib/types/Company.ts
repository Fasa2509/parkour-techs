import {z} from 'zod';
import { ZWorker } from './Worker';

const ZSession = z.object({
    id          : z.string(),
    sessionToken: z.string(),
    companyId   : z.string(),
    expires     : z.date(),
});

export type TSession = z.infer<typeof ZSession>;

const ZNewSession = z.object({
    id          : z.string(),
    sessionToken: z.string(),
    companyId   : z.string(),
    expires     : z.date(),
});

export type TNewSession = z.infer<typeof ZNewSession>;

export const ZCompany = z.object({
    id           : z.string({ required_error: 'El id de compañía es requerido', invalid_type_error: 'El id de compañía debe ser texto' }),
    email        : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name         : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
    direction    : z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    createdAt    : z.date({ required_error: 'La fecha de creación del usuario es requerida', invalid_type_error: 'La fecha de creación del usuario no es válida' }),
    emailVerified: z.date({invalid_type_error: 'La fecha de verificación no es válida'}).nullish(),
    password     : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/, 'La contraseña no tiene los caracteres solicitados').optional(),
    sessions     : z.array(ZSession),
    workers      : z.array(ZWorker),
});

export type TCompany = z.infer<typeof ZCompany>;

export const ZNewCompany = z.object({
    email    : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name     : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
    direction: z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[().,_!@#\$%\^&\*])(?=.{8,})/, 'La contraseña no tiene los caracteres solicitados'),
});

export type TNewCompany = z.infer<typeof ZNewCompany>;
