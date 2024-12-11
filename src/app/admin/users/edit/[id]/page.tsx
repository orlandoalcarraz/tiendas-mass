"use client"
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { UserEditSchema, UserSchema } from "@/Schemas";
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
import { useEffect, useState } from "react";
import { UserEditFormData, UserFormData } from "@/types";
import { AiOutlineLoading } from "react-icons/ai";
import { FetchDniDialog } from "@/components/users/fetch-dni-dialog";
import { DniQueryForm } from "@/components/users/dni-query-form";
import UserChangePasswordDialog from "@/components/users/change-pasword-dialog";



export default function Page({ params }: { params: { id: string } }) {

	const [user, setUser] = useState<UserEditFormData>()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)


	const { register, reset, control, setValue, watch, handleSubmit, formState: { errors } } = useForm<UserEditFormData>({
		resolver: zodResolver(UserEditSchema)
	})

	const handleOpenChange = (newState: boolean) => {
		setOpen(newState)

	}

	const handleFetchReniec = (dni: string, name: string, lastName: string) => {
		setValue("dni", dni)
		setValue("name", name)
		setValue("lastName", lastName)
	}

	useEffect(() => {
		const fetchUser = async () => {

			try {
				const response = await fetch(`/api/users/${params.id}`)
				const { user, message, error } = await response.json()

				if (user) {
					setUser(user)
					reset(user)
					return
				}

				toast.error(message, { description: error })

			} catch (error) {
				console.error("Error:", error)
			}
		}

		fetchUser()
	}, [params.id, reset])

	const onSubmit: SubmitHandler<UserEditFormData> = async (data) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/users/${params.id}`, {
				method: 'PUT',
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


			toast("Usuario Actualizado Correctamente", {
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
				<span className="flex-center gap-2 max-md:flex-col">
					<h1 className="text-3xl">Editar Usuario ID : {params.id}</h1>
					<UserChangePasswordDialog id={parseInt(params.id)} />

				</span>
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
							<Button variant={"outline"} type="button" onClick={() => handleOpenChange(true)}>Consultar RENIEC</Button>
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
				<DniQueryForm handleOpenChange={handleOpenChange} handleFetchReniec={handleFetchReniec} />
			</FetchDniDialog>
		</>
	);
}

