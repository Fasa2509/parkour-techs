import {z} from 'zod';

const STATUS_ENUM = z.enum(["active", "vacations", "inactive"], { required_error: "El estado del trabajador es requerido", invalid_type_error: "El estado del trabajador no es válido" });

export const ZWorker = z.object({
    id       : z.number({ required_error: 'El id de usuario es requerido' }),
    email    : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name     : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
    ci       : z.number({ required_error: 'La ci es obligatoria', invalid_type_error: 'La ci debe ser un número' }).gt(1_000_000, 'La ci debe ser mayor a 1.000.000'),
    phone    : z.union([z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0412"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0414"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0416"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0424"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0426")]),
    direction: z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    salary   : z.number({required_error: 'El salario es requerido', invalid_type_error: 'El salario debe ser un número'}).nonnegative('El salario no puede ser negativo').int(),
    hours    : z.number({required_error: 'Las horas de trabajo son requeridas', invalid_type_error: 'Las horas de trabajo deben ser un número'}).positive('Las horas de trabajo deben ser positivas').int(),
    status   : STATUS_ENUM,
    createdAt: z.date({ required_error: 'La fecha de creación del usuario es requerida', invalid_type_error: 'La fecha de creación del usuario no es válida' }),
});

export type TWorker = z.infer<typeof ZWorker>;

export const ZNewWorker = z.object({
    email    : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name     : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
    ci       : z.number({ required_error: 'La ci es obligatoria', invalid_type_error: 'La ci debe ser un número' }).gt(1_000_000, 'La ci debe ser mayor a 1.000.000'),
    phone    : z.union([z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0412"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0414"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0416"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0424"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0426")]),
    direction: z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    salary   : z.number({required_error: 'El salario es requerido', invalid_type_error: 'El salario debe ser un número'}).nonnegative('El salario no puede ser negativo'),
    hours    : z.number({required_error: 'Las horas de trabajo son requeridas', invalid_type_error: 'Las horas de trabajo deben ser un número'}).positive('Las horas de trabajo deben ser positivas').int(),
    status   : STATUS_ENUM.optional().default('active'),
});

export type TNewWorker = z.infer<typeof ZNewWorker>;
