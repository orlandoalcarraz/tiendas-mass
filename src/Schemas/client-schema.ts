import { z } from "zod";

export const ClientSchema = z.object({
    dni: z
        .string()
        .length(8, { message: "El DNI debe tener 8 caracteres numéricos" })
        .regex(/^\d+$/, { message: "El DNI debe contener solo numéros" }),
    email:z.string().email({ message: "Correo Electrónico inválido" }), 
    number: z.string().length(9,{message:"El número debe tener 9 catacteres numéricos"})

})