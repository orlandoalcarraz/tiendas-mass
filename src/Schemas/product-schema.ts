import { z } from "zod";
import { CATEGORIES } from "@/data/categories";

const mapCategory = CATEGORIES.map((category) => category.slug)

const status = ["0", "1"] as const

export const ProductSchema = z.object({
    name: z
        .string()
        .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
        .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
    description: z
        .string()
        .min(3, { message: "La descripción debe tener mínimo 3 caracteres" })
        .max(50, { message: "La descripción debe tener como máximo 50 caracteres" }),
    status: z.enum(status, {
        errorMap: () => ({
            message: "El estado no es válido",
        }),
    }),
    price: z
        .string()
        .refine((price) => !isNaN(parseFloat(price)) && parseFloat(price) > 0, {
            message: "El precio debe ser un número mayor a 0",
        }),
    discount: z
        .string()
        .refine((discount) => !isNaN(parseFloat(discount)) && parseFloat(discount) >= 0, {
            message: "El descuento no debe ser negativo",
        }),
    category: z
        .string({required_error:"Selecciona una categoría"})
        .refine((category) => mapCategory.includes(category), {
            message: "La categoría no es válida",
        }),
    orderLimit: z
        .string()
        .refine((orderLimit) => !isNaN(parseInt(orderLimit)) && parseInt(orderLimit) > 0, {
            message: "El límite de compra debe ser un número entero positivo mayor a 0",
        }),
    img: z.any(),

}).strict().refine((data) => parseFloat(data.price) >= parseFloat(data.discount), {
    message: "El descuento no debe ser superior al precio",
    path: ["discount"], 
});
