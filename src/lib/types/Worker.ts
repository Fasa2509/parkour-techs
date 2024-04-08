import {z} from 'zod';

const STATUS_ENUM = z.enum(["active", "vacations", "inactive"], { required_error: "El estado del trabajador es requerido", invalid_type_error: "El estado del trabajador no es válido" });

export type WorkerStatus = z.infer<typeof STATUS_ENUM>;

export const ValidStatus = STATUS_ENUM.options;

// export const ZWorker = z.object({
//     id       : z.number({ required_error: 'El id de usuario es requerido' }),
//     email    : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
//     name     : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/[a-zA-ZáéíóúÁÉÍÓÚ ]/, 'El nombre tiene caracteres inválidos'),
//     ci       : z.number({ required_error: 'La ci es obligatoria', invalid_type_error: 'La ci debe ser un número' }).gt(1_000_000, 'La ci debe ser mayor a 1.000.000'),
//     phone    : z.union([z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0412"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0414"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0416"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0424"), z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').startsWith("0426")]),
//     direction: z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
//     salary   : z.number({required_error: 'El salario es requerido', invalid_type_error: 'El salario debe ser un número'}).nonnegative('El salario no puede ser negativo').int(),
//     hours    : z.number({required_error: 'Las horas de trabajo son requeridas', invalid_type_error: 'Las horas de trabajo deben ser un número'}).positive('Las horas de trabajo deben ser positivas').int(),
//     status   : STATUS_ENUM,
//     createdAt: z.date({ required_error: 'La fecha de creación del usuario es requerida', invalid_type_error: 'La fecha de creación del usuario no es válida' }),
// });

// export type TWorker = z.infer<typeof ZWorker>;

export const ValidPhones = {
    "0412": "0412",
    "0414": "0414",
    "0416": "0416",
    "0424": "0424",
    "0426": "0426",
} as const;

export type TValidPhones = keyof typeof ValidPhones;

export const ZNewWorker = z.object({
    email    : z.string({ required_error: 'El correo es requerido', invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido'),
    name     : z.string({ required_error: 'El nombre es requerido', invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/, 'El nombre tiene caracteres inválidos'),
    ci       : z.number({ required_error: 'La ci es obligatoria', invalid_type_error: 'La ci debe ser un número' }).gt(1_000_000, 'La ci debe ser mayor a 1.000.000'),
    phone    : z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido'),
    direction: z.string({ required_error: 'La dirección es obligatoria', invalid_type_error: 'La dirección debe ser un texto' }),
    salary   : z.number({required_error: 'El salario es requerido', invalid_type_error: 'El salario debe ser un número'}).nonnegative('El salario no puede ser negativo'),
    hours    : z.number({required_error: 'Las horas de trabajo son requeridas', invalid_type_error: 'Las horas de trabajo deben ser un número'}).positive('Las horas de trabajo deben ser positivas').int(),
    status   : STATUS_ENUM.optional().default('active'),
});

export type TNewWorker = z.infer<typeof ZNewWorker>;

export const ZUpdateWorker = z.object({
    email    : z.string({ invalid_type_error: 'El correo debe ser texto' }).trim().toLowerCase().email('El correo no es válido').optional(),
    name     : z.string({ invalid_type_error: 'El nombre debe ser texto' }).trim().min(2, 'El nombre es muy corto').max(64, 'El nombre es muy largo').regex(/^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/, 'El nombre tiene caracteres inválidos').optional(),
    ci       : z.number({ invalid_type_error: 'La ci debe ser un número' }).gt(1_000_000, 'La ci debe ser mayor a 1.000.000').optional(),
    phone    : z.string({ required_error: "El número de teléfono es requerido", invalid_type_error: 'El número de teléfono debe ser un texto'}).length(11, 'El número de teléfono no parece ser válido').optional(),
    direction: z.string({ invalid_type_error: 'La dirección debe ser un texto' }).optional(),
    salary   : z.number({ invalid_type_error: 'El salario debe ser un número'}).nonnegative('El salario no puede ser negativo').optional(),
    hours    : z.number({ invalid_type_error: 'Las horas de trabajo deben ser un número'}).positive('Las horas de trabajo deben ser positivas').int().optional(),
    status   : STATUS_ENUM.optional().default('active').optional(),
});

export type TUpdateWorker = z.infer<typeof ZUpdateWorker>;

export const WorkerSeed: Array<TNewWorker & {createdAt: Date}> = [
    {
        email: "tunankam@jovipu.ve",
        name: "Robert Barton",
        ci: 10285583,
        phone: "04129048670",
        direction: "Guinea-Bissau",
        salary: 5823,
        hours: 60,
        status: "active",
        createdAt: new Date("09/07/2024")
    },
    {
        email: "pudo@sagego.ax",
        name: "Vernon Gordon",
        ci: 22255218,
        phone: "04127846666",
        direction: "St. Barthélemy",
        salary: 3762,
        hours: 172,
        status: "inactive",
        createdAt: new Date("04/27/2021")
    },
    {
        email: "wopmus@otfehzur.ao",
        name: "Bryan Mendez",
        ci: 10729785,
        phone: "04125990703",
        direction: "Switzerland",
        salary: 4583,
        hours: 16,
        status: "active",
        createdAt: new Date("10/11/2020")
    },
    {
        email: "so@um.jo",
        name: "Ora Daniels",
        ci: 22680736,
        phone: "04129021348",
        direction: "Mongolia",
        salary: 6997,
        hours: 70,
        status: "inactive",
        createdAt: new Date("09/13/2023")
    },
    {
        email: "vezi@zivustu.tl",
        name: "Ivan Dixon",
        ci: 19951080,
        phone: "04121951381",
        direction: "Belarus",
        salary: 2127,
        hours: 81,
        status: "active",
        createdAt: new Date("09/30/2022")
    },
    {
        email: "pedac@niip.gg",
        name: "Blanche Floyd",
        ci: 22864619,
        phone: "04122725386",
        direction: "Guinea",
        salary: 762,
        hours: 64,
        status: "active",
        createdAt: new Date("07/19/2019")
    },
    {
        email: "fet@nifhiski.tr",
        name: "Isaiah Cox",
        ci: 25645126,
        phone: "04124328954",
        direction: "Kazakhstan",
        salary: 619,
        hours: 126,
        status: "active",
        createdAt: new Date("10/24/2022")
    },
    {
        email: "pizjih@wusokvob.gs",
        name: "Harvey Floyd",
        ci: 20897972,
        phone: "04126828002",
        direction: "Romania",
        salary: 6434,
        hours: 15,
        status: "vacations",
        createdAt: new Date("06/07/2021")
    },
    {
        email: "lavegnup@coz.gi",
        name: "Betty Patrick",
        ci: 3571695,
        phone: "04125774497",
        direction: "Ceuta & Melilla",
        salary: 2770,
        hours: 133,
        status: "inactive",
        createdAt: new Date("04/27/2022")
    },
    {
        email: "wuwigo@namur.nz",
        name: "Jimmy Walsh",
        ci: 19268979,
        phone: "04123588216",
        direction: "Algeria",
        salary: 2405,
        hours: 58,
        status: "active",
        createdAt: new Date("01/25/2023")
    },
    {
        email: "zevfek@namtav.ua",
        name: "Ernest Bell",
        ci: 13199578,
        phone: "04126329900",
        direction: "Liechtenstein",
        salary: 6280,
        hours: 29,
        status: "active",
        createdAt: new Date("05/05/2023")
    },
    {
        email: "wavujwew@devcaz.ss",
        name: "Adele Estrada",
        ci: 15363891,
        phone: "04125363728",
        direction: "France",
        salary: 5249,
        hours: 177,
        status: "active",
        createdAt: new Date("08/30/2022")
    },
    {
        email: "uku@od.tw",
        name: "Mayme Alvarado",
        ci: 27323592,
        phone: "04126673758",
        direction: "Guam",
        salary: 9650,
        hours: 71,
        status: "vacations",
        createdAt: new Date("06/23/2023")
    },
    {
        email: "lef@raok.gt",
        name: "Marguerite Spencer",
        ci: 14506045,
        phone: "04128480719",
        direction: "Norway",
        salary: 4289,
        hours: 36,
        status: "inactive",
        createdAt: new Date("05/14/2023")
    },
    {
        email: "leinilo@wiskuso.co",
        name: "Lizzie Price",
        ci: 19197018,
        phone: "04125188913",
        direction: "Wallis & Futuna",
        salary: 5856,
        hours: 40,
        status: "active",
        createdAt: new Date("09/24/2023")
    },
    {
        email: "zomle@fawto.tc",
        name: "Dean Stanley",
        ci: 18592466,
        phone: "04125532684",
        direction: "Liechtenstein",
        salary: 1162,
        hours: 172,
        status: "active",
        createdAt: new Date("07/18/2023")
    },
    {
        email: "surog@nag.bb",
        name: "Maurice Wallace",
        ci: 4202101,
        phone: "04125995358",
        direction: "Tokelau",
        salary: 4201,
        hours: 62,
        status: "vacations",
        createdAt: new Date("04/19/2021")
    },
]
