
import { z } from "zod";



export const LoginSchema = z.object({
    email:z.string().email({ message: "Correo Electrónico inválido" }), 
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
 
})
