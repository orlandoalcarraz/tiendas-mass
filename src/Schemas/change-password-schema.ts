
import { z } from "zod";


export const ChangePasswordSchema = z.object({

    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
      newPassword:z
        .string()
        .min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres" }),
 
}).strict().refine((data) => (data.password) !== (data.newPassword), {
    message: "La nueva contraseña no debe ser igual a la antigua",
    path: ["newPassword"], 
});