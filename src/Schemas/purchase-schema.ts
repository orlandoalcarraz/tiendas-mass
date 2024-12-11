import {  map, z } from "zod";


const type = ["BOLETA", "FACTURA"] as const

export const PurchaseSchema = z.object({
    providerId: z
        .string({required_error:"No se selecciono un proveedor"})
        .refine((providerId) => !isNaN(parseInt(providerId)) && parseInt(providerId) > 0, {
            message: "El id es inválido",
        }),
    type: z.enum(type, {
        errorMap: () => ({
            message: "El tipo de compra no es válida",
        }),
    }),
    number: z
        .string()
        .refine((number) => !isNaN(parseInt(number)) && parseInt(number) > 0, {
            message: "N. de Comprobante inválido",
        }),
    date: z.date({message:"Fecha Inválida"}),
    purchaseItems:z.array(
        z.object({
            id:z.number(),
            name:z.string(),
            quantity:z.number(),
            price:z.number(),
        }).strict()
    )

}).strict()