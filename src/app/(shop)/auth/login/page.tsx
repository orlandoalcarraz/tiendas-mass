"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { LoginSchema } from "@/Schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { getUserRole } from "@/components/server_actions/user-actions";



type LoginInput = {
    email: string,
    password: string
}

export default function Page() {
    const [loading, setLoading] = useState(false)
    const { register, reset, control, watch, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema)
    })
    const { push } = useRouter()

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        setLoading(true)
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })


            if (response?.error) {
                throw {
                    message: response.error || "Error en la solicitud"
                }
            }

            const role = await getUserRole(data.email)

            if (role === null) {
                throw {
                    message:"Usuario no identificado"
                }
            } else if (role === 0) {
                push("/")
            } else if (role === 1) {
                push("/admin/dashboard")
            }


        } catch (error: any) {
            setLoading(false)
            const errorMessage = error.message

            toast.error(errorMessage, {
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
                    <CardTitle className="text-center text-2xl sm:text-3xl">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-10">

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

                            <div className="w-full flex-center flex-col gap-2 relative">
                                <Button asChild variant={"outline"} className="text-xl w-full">
                                    <Link href={"/auth/register"}>Registrarse</Link>
                                </Button>
                                o
                                <Button disabled={loading} className="text-xl w-full">
                                    {loading ? (
                                        <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                                    ) : (
                                        <>
                                            Iniciar Sesión
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