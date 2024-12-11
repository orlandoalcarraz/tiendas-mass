import { z } from "zod";

const type = ["ENTRADA", "SALIDA"] as const

export const MovementSchema = z.object({
    productId: z
        .string()
        .refine((productId) => !isNaN(parseInt(productId)) && parseInt(productId) > 0, {
            message: "El id es inválido",
        }),
    type: z.enum(type, {
        errorMap: () => ({
            message: "El tipo de movimiento no es válido",
        }),
    }),
    quantity: z
        .string()
        .refine((quantity) => !isNaN(parseInt(quantity)) && parseInt(quantity) > 0, {
            message: "La cantidad debe ser un número entero positivo mayor a 0",
        }),
    description: z
        .string()
        .min(3, { message: "La descripción debe tener mínimo 3 caracteres" })
        .max(50, { message: "La descripción debe tener como máximo 50 caracteres" }),

}).strict()
