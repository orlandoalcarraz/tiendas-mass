
import { z } from "zod";


const status = ["0", "1"] as const

const role = ["0", "1"] as const

export const UserSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Los nombres deben tener minimo 3 carácteres" })
        .max(50,{message:"Los nombres deben tener como máximo 50 carácteres"}),
    lastName: z
        .string()
        .min(3, { message: "Los apellidos deben tener minimo 3 carácteres" })
        .max(50,{message:"El nombre debe tener como máximo 50 carácteres"}),
    status: z.enum(status, { errorMap: () => ({ 
        message: "El estado no es válido" 
        }) 
    }),
    dni: z
        .string()
        .length(8, { message: "El DNI debe tener 8 caracteres númericos" })
        .regex(/^\d+$/, { message: "El DNI debe contener solo números" }),
    email:z.string().email({message:"Correo electronico inválido"}),
    number: z
        .string()
        .length(9, { message: "El número de telefono debe tener 9 caracteres" })
        .regex(/^\d+$/, { message: "El número de telefono debe contener solo números" }),
    role: z.enum(role, { errorMap: () => ({ 
         message: "El rol no es válido" 
        }) 
    }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
    
}).strict().refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
});


export const UserEditSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Los nombres deben tener minimo 3 carácteres" })
        .max(50,{message:"Los nombres deben tener como máximo 50 carácteres"}),
    lastName: z
        .string()
        .min(3, { message: "Los apellidos deben tener minimo 3 carácteres" })
        .max(50,{message:"El nombre debe tener como máximo 50 carácteres"}),
    status: z.enum(status, { errorMap: () => ({ 
        message: "El estado no es válido" 
        }) 
    }),
    dni: z
        .string()
        .length(8, { message: "El DNI debe tener 8 caracteres númericos" })
        .regex(/^\d+$/, { message: "El DNI debe contener solo números" }),
    email:z.string().email({message:"Correo electronico inválido"}),
    number: z
        .string()
        .length(9, { message: "El número de telefono debe tener 9 caracteres" })
        .regex(/^\d+$/, { message: "El número de telefono debe contener solo números" }),
    role: z.enum(role, { errorMap: () => ({ 
         message: "El rol no es válido" 
        }) 
    }),
 
})
