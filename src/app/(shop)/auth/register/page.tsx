"use client"
import { Input } from "@/components/ui/input";
import { ToogleTheme } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterSchema } from "@/Schemas/register-schema";
import { toast } from "sonner";
import { createClient } from "@/components/server_actions/register_action";
import { AiOutlineLoading } from "react-icons/ai";


type RegisterInput = {
    dni:string,
    email: string,
    password: string
}

export default function Page() {
    const [loading, setLoading] = useState(false)
    const { register, reset, control, watch, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema)
    })
    const { push } = useRouter()

    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        setLoading(true)
        try {

            const res = await createClient(data)


            if (!res?.ok) {
				throw {
					message: res.message || "Error en la solicitud"
				}
            }
            toast.success("Registro exitoso")
            push('/auth/login')

        } catch (error: any) {
            setLoading(false)
            const errorMessage = error.message 

            toast.error(errorMessage,{
				description: `${new Date().toLocaleDateString('es-ES', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}`,
				duration: 5000,
				
			})
        }
    }
    return (
        <>
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center text-2xl sm:text-3xl">Registrarse</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center max-sm:gap-5 sm:gap-7">

                            <label htmlFor="name" className="flex flex-col gap-2">
                                <span>DNI:</span>
                                <Input id="dni" {...register("dni")} />
								{
									errors.dni && <p className="text-red-600 text-xs">{errors.dni.message}</p>
								}
                            </label>

                            <label htmlFor="name" className="flex flex-col gap-2">
                                <span>Correo Electrónico</span>
                                <Input id="email" {...register("email")} />
								{
									errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>
								}
                            </label>

                            <label htmlFor="password" className="flex flex-col gap-2">
                                <span>Contraseña</span>
                                <Input id="password" type="password" {...register("password")} />
								{
									errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>
								}
                            </label>



                            <div className="relative w-full flex-center flex-col gap-2">
                                <Button asChild variant={"outline"} className="text-xl w-full">
                                    <Link href={"/auth/login"}>Iniciar Sesión</Link>
                                </Button>
                                o
                                <Button disabled={loading} className="text-xl w-full">
                                    {loading ? (
                                        <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                                    ) : (
                                        <>
                                           Registrarse
                                        </>
                                    )}
                                </Button>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    );
}