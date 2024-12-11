"use client"
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { ProviderSchema } from "@/Schemas";
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
import { ProviderFormData } from "@/types";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FetchRucDialog } from "@/components/providers/fetch-ruc-dialog";
import { RucQueryForm } from "@/components/providers/ruc-query-form";


export default function Page() {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const { register, reset, control, setValue, watch, handleSubmit, formState: { errors } } = useForm<ProviderFormData>({
		resolver: zodResolver(ProviderSchema)
	})

	const handleOpenChange = (newState: boolean) => {
		setOpen(newState)

	}
	const handleFetchReniec = (ruc: string, name: string, legal: string) => {
		setValue("ruc", ruc)
		setValue("name", name)
		setValue("legal", legal)
	}

	const onSubmit: SubmitHandler<ProviderFormData> = async (data) => {
		setLoading(true)
		try {
			const response = await fetch("/api/providers", {
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


			toast("Proveedor Creado Correctamente", {
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

			router.push('/admin/providers')

		} catch (error: any) {
			setLoading(false);

			const errorMessage = error.message || "Error desconocido"
			const errorDetails = error.details ? `El campo ${error.details} es inválido` : ""

			console.log(errorMessage)
			toast.error(errorMessage, { description: errorDetails })
		}
	}
	
	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">

				<Button asChild variant={"outline"} size={"icon"}>
					<Link href={"/admin/providers"}><MdOutlineChevronLeft size={25} /></Link>
				</Button>

				<h1 className="text-3xl">Nuevo Proveedor</h1>
			</section>

			<form onSubmit={handleSubmit(onSubmit)} className="flex max-w-screen-xl w-full max-lg:flex-col mx-auto gap-5">

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
								<span className="text-sm">RUC</span>
								<Input id="ruc" {...register("ruc")} />
								{
									errors.ruc && <p className="text-red-600 text-xs">{errors.ruc.message}</p>
								}
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-sm">Nombre</span>
								<Input id="name" {...register("name")} />
								{
									errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2">
								<span className="text-sm">Razón Social</span>
								<Input id="legal" {...register("legal")} />
								{
									errors.legal && <p className="text-red-600 text-xs">{errors.legal.message}</p>
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
							<CardTitle className="text-xl font-normal">Página web</CardTitle>
						</CardHeader>
						<CardContent>
							<Input id="web" {...register("web")} />
							{
								errors.web && <p className="text-red-600 text-xs">{errors.web.message}</p>
							}
						</CardContent>
					</Card>

					<Button variant={"secondary"} disabled={loading}>
						{loading ? (
							<AiOutlineLoading size={18} className="animate-spin ease-in-out" />
						) : (
							<>
								Guardar Proveedor
							</>
						)}
					</Button>

				</div>

			</form>
			<FetchRucDialog open={open} handleOpenChange={handleOpenChange}>
				<RucQueryForm handleOpenChange={handleOpenChange} handleFetchReniec={handleFetchReniec} />
			</FetchRucDialog>
		</>
	);
}