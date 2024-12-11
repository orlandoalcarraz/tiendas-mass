'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/Schemas/change-password-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { changeUserPassword } from "../server_actions/user-actions";
import { toast } from "sonner";

type Props = {
    id: number;
    onSuccess: () => void;
};

type Input = {
    password: string;
    newPassword: string;
};

export default function ChangePasswordForm({ id, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Input>({
        resolver: zodResolver(ChangePasswordSchema),
    });

    const onSubmit: SubmitHandler<Input> = async (data) => {
        setLoading(true);
        try {
            const res = await changeUserPassword(id, data.password, data.newPassword);

            if (!res?.ok) {
                throw new Error(res?.message || "Error en la solicitud");
            }

            toast.success("Contraseña cambiada con éxito");
            reset();
            onSuccess();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Hubo un problema al guardar los cambios.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <label htmlFor="current-password">Contraseña Actual</label>
                <Input
                    id="current-password"
                    type="password"
                    {...register("password")}
                    placeholder="********"
                />
                {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
            </div>
            <div className="grid gap-2">
                <label htmlFor="new-password">Nueva Contraseña</label>
                <Input
                    id="new-password"
                    type="password"
                    {...register("newPassword")}
                    placeholder="********"
                />
                {errors.newPassword && <p className="text-red-600 text-xs">{errors.newPassword.message}</p>}
            </div>
            <Button disabled={loading}>
                {loading ? "Cambiando..." : "Cambiar Contraseña"}
            </Button>
        </form>
    );
}