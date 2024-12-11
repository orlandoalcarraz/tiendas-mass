
import { z } from "zod";



export const RegisterSchema = z.object({
    dni: z
        .string()
        .length(8, { message: "El DNI debe tener 8 caracteres númericos" })
        .regex(/^\d+$/, { message: "El DNI debe contener solo números" }),
    email:z.string().email({ message: "Correo Electrónico inválido" }), 
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
 
})