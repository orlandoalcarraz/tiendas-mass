import {  map, z } from "zod";

const status = ["0", "1"] as const;

export const ProviderSchema = z.object({
    name: z
        .string()
        .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
        .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
    legal: z
        .string()
        .min(6, { message: "La razón social debe tener mínimo 6 caracteres" })
        .max(50, { message: "La razón social debe tener como máximo 50 caracteres" }),
    status: z.enum(status, { errorMap: () => ({ 
        message: "El estado no es válido" 
    })}),
    ruc: z
        .string()
        .length(11, { message: "El RUC debe tener 11 caracteres numéricos" })
        .regex(/^\d+$/, { message: "El RUC debe contener solo números" }),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    number: z
        .string()
        .length(9, { message: "El número de teléfono debe tener 9 caracteres" })
        .regex(/^\d+$/, { message: "El número de teléfono debe contener solo números" }),
    web: z
        .string()
        .min(3, { message: "El nombre del sitio web debe tener mínimo 3 caracteres" })
        .max(50, { message: "El nombre del sitio web debe tener como máximo 50 caracteres" })
        .regex(/^https?:\/\/[^\s$.?#].[^\s]*$/, { message: "El nombre del sitio web debe ser una URL válida" }),
}).strict();