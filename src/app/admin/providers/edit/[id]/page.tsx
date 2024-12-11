"use client"
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { ProviderSchema } from "@/Schemas";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import _ from 'lodash';
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


export default function Page({ params }: { params: { id: string } }) {
	const [loading, setLoading] = useState(false)
	const [provider, setProvider] = useState<ProviderFormData>()
	const router = useRouter()
	const { register, reset, control, watch, handleSubmit, formState: { errors } } = useForm<ProviderFormData>({
		resolver: zodResolver(ProviderSchema)
	})

	useEffect(() => {
		const fetchProvider = async () => {

			try {
				const response = await fetch(`/api/providers/${params.id}`)
				const { provider,message,error } = await response.json()
				
				if (provider) {
					setProvider(provider)
					reset(provider)
					return
				}

				toast.error(message, { description: error })

			} catch (error) {
				console.error("Error:", error)
			}
		}

		fetchProvider()
	}, [params.id,reset])



	const onSubmit: SubmitHandler<ProviderFormData> = async (data) => {
		setLoading(true)

		if ( _.isEqual(provider, data)) {

			setLoading(false)
			toast.warning("No se está actualizando nada en los datos del proveedor");
			return
			
		}

		try {
			const response = await fetch(`/api/providers/${params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorResponse = await response.json()
				throw {
					message: errorResponse.message || "Error en la solicitud",
					details: errorResponse.error
				}
			}


			toast("Actualizado Correctamente", {
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
	
			toast.error(errorMessage, { description: errorDetails })
		}
	}
	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">

				<Button asChild variant={"outline"} size={"icon"}>
					<Link href={"/admin/providers"}><MdOutlineChevronLeft size={25} /></Link>
				</Button>

				<h1 className="text-3xl">Editar Proveedor ID : {params.id}</h1>
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
						<CardHeader>
							<CardTitle className="text-xl font-normal">Detalles</CardTitle>
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
		</>
	);
}