"use client"
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { UserSchema } from "@/Schemas";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription
} from "@/components/ui/card"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserFormData } from "@/types";
import { AiOutlineLoading } from "react-icons/ai";
import { FetchDniDialog } from "@/components/users/fetch-dni-dialog";
import { DniQueryForm } from "@/components/users/dni-query-form";



export default function Page() {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const { register, reset, control,setValue, watch, handleSubmit, formState: { errors } } = useForm<UserFormData>({
		resolver: zodResolver(UserSchema)
	})
	
	const handleOpenChange = (newState: boolean) => {
		setOpen(newState)
	
	}

	const handleFetchReniec = (dni:string,name:string,lastName:string) =>{
		setValue("dni",dni)
		setValue("name",name)
		setValue("lastName",lastName)
	}

	const onSubmit: SubmitHandler<UserFormData> = async (data) => {
		setLoading(true)
		try {
			const response = await fetch("/api/users", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorResponse = await response.json()
				throw {
					message: errorResponse.message || "Error en la solicitud",
					details: errorResponse.error
				}
			}


			toast("Usuario Creado Correctamente", {
				description: `${new Date().toLocaleDateString('es-ES', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}`,
				duration: 5000,
				action: {
					label: "Entendido",
					onClick: () => console.log("Entendido"),
				},
			})

			router.push('/admin/users')

		} catch (error: any) {
			setLoading(false);

			const errorMessage = error.message || "Error desconocido"
			const errorDetails = error.details ? `El campo ${error.details} es inválido` : ""

			toast.error(errorMessage, { description: errorDetails })
		}
	}

	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">
				<Button asChild variant={"outline"} size={"icon"}>
					<Link href={"/admin/users"}><MdOutlineChevronLeft size={25} /></Link>
				</Button>

				<h1 className="text-3xl">Nuevo Usuario</h1>
			</section>

			<form onSubmit={handleSubmit(onSubmit)} className="flex max-w-screen-xl w-full mx-auto max-lg:flex-col gap-5">

				<div className="flex flex-col gap-5 w-full lg:w-[60%]">
					<Card className="max-w-72">
						<CardHeader>
							<CardTitle className="text-xl font-normal">
								Estado
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Controller
								name="status"
								control={control}
								defaultValue="1"
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="hover:bg-secondary">
											<SelectValue placeholder="Seleccionar" />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={5} hideWhenDetached>
											<SelectItem value="1">Activo</SelectItem>
											<SelectItem value="0">Inactivo</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{
								errors.status && <p className="text-red-600 text-xs">{errors.status.message}</p>
							}
						</CardContent>
					</Card>

					<Card className="max-w-screen-md">
						<CardHeader className="flex flex-row justify-between items-center">
							<CardTitle className="text-xl font-normal">Detalles</CardTitle>
							<Button variant={"outline"} type="button" onClick={()=>handleOpenChange(true)}>Consultar RENIEC</Button>
						</CardHeader>
						<CardContent className="space-y-3">
							<label className="flex flex-col gap-2">
								<span className="text-sm">DNI</span>
								<Input id="dni" {...register("dni")} />
								{
									errors.dni && <p className="text-red-600 text-xs">{errors.dni.message}</p>
								}
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-sm">Nombres</span>
								<Input id="name" {...register("name")} />
								{
									errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2">
								<span className="text-sm">Apellidos</span>
								<Input id="lastName" {...register("lastName")} />
								{
									errors.lastName && <p className="text-red-600 text-xs">{errors.lastName.message}</p>
								}
							</label>
						</CardContent>
					</Card>

					<Card className="max-w-screen-md">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Contacto</CardTitle>
						</CardHeader>
						<CardContent className="flex gap-5 max-md:flex-col">
							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Correo Electrónico</span>
								<Input id="email" {...register("email")} />
								{
									errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Número</span>
								<Input id="number" {...register("number")} />
								{
									errors.number && <p className="text-red-600 text-xs">{errors.number.message}</p>
								}
							</label>
						</CardContent>
					</Card>
				</div>

				<div className="w-full lg:w-[40%] relative flex flex-col gap-5">
					<Card className="w-full">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Rol asignado</CardTitle>
						</CardHeader>
						<CardContent>
							<Controller
								name="role"
								control={control}
								defaultValue="1"
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger className="hover:bg-secondary">
											<SelectValue placeholder="Seleccionar" />
										</SelectTrigger>
										<SelectContent position="popper" sideOffset={5} hideWhenDetached>
											<SelectItem value="1">Administrador</SelectItem>
											<SelectItem value="0">Cliente</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{
								errors.role && <p className="text-red-600 text-xs">{errors.role.message}</p>
							}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-xl font-normal">Contraseña</CardTitle>
							<CardDescription>
								Minimo 8 carácteres
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-5">
							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Contraseña</span>
								<Input id="password" {...register("password")} />
								{
									errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Confirmar Contraseña</span>
								<Input id="confirmPassword" {...register("confirmPassword")} />
								{
									errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
								}
							</label>
						</CardContent>
					</Card>

					<Button variant={"secondary"} type="submit" disabled={loading}>
						{loading ? (
							<AiOutlineLoading size={18} className="animate-spin ease-in-out" />
						) : (
							<>
								Guardar Usuario
							</>
						)}
					</Button>
				</div>
			</form>
			<FetchDniDialog open={open} handleOpenChange={handleOpenChange}>
                <DniQueryForm handleOpenChange={handleOpenChange} handleFetchReniec={handleFetchReniec}/>
            </FetchDniDialog>
		</>
	);
}

