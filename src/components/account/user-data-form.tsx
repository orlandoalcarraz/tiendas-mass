
'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ClientSchema } from "@/Schemas/client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { changeUserData, getUserData } from "../server_actions/user-actions";

type UserDataInput = {
    dni: string;
    email: string;
    number: string;
}

type UserData = {
    dni: string,
    name: string,
    lastName: string,
    email: string,
    number: string
}

type Props = {
    id: number
}

export default function UserDataForm({ id }: Props) {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserDataInput>({
        resolver: zodResolver(ClientSchema),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData(id);
                setUser(userData);
                if (userData) {
                    reset(userData);
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
            }
        }

        fetchData();
    }, [reset, refreshData,id])

    const onSubmit: SubmitHandler<UserDataInput> = async (data) => {
        setLoading(true);
        try {
            const formData = {
                id: id,
                dni: data.dni,
                email: data.email,
                number: data.number,
            };
            const res = await changeUserData(formData);

            if (!res?.ok) {
                throw new Error(res?.message || "Error en la solicitud")
            }

            toast.success("Cambios guardados con éxito.")
            setRefreshData((prev) => !prev)
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Hubo un problema al guardar los cambios.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>Maneja tu información en general</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <label htmlFor="name">Nombre Completo:</label>
                    <p className="text-base sm:text-lg md:text-xl font-semibold">
                        {user?.name + " " + user?.lastName}
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <label htmlFor="dni">DNI:</label>
                        <Input id="dni" {...register("dni")} placeholder="77777777" />
                        {errors.dni && <p className="text-red-600 text-xs">{errors.dni.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <Input id="email" {...register("email")} placeholder="john@example.com" />
                        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="number">Número Telefónico:</label>
                        <Input id="number" {...register("number")} placeholder="999999999" />
                        {errors.number && <p className="text-red-600 text-xs">{errors.number.message}</p>}
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}