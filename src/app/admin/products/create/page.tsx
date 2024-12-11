"use client"
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { ProductSchema } from "@/Schemas";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CATEGORIES } from "@/data/categories";

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
import ImageUploader from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { ProductFormData } from "@/types";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { convertToBase64 } from "@/lib/utils";


export default function Page() {
	const [loading, setLoading] = useState(false)
	const { register, reset, control, watch, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
		resolver: zodResolver(ProductSchema)
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
		setLoading(true)

		let image ="PENDIENTE"

		if (data.img) image = await convertToBase64(data.img)
		

		const formData = {
			status:data.status,
			name: data.name,
			description: data.description,
			price: data.price,
			category: data.category,
			discount: data.discount,
			orderLimit: data.orderLimit,
			img: image,
		}

		try {
			const response = await fetch("/api/products", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorResponse = await response.json()
				throw {
					message: errorResponse.message || "Error en la solicitud",
					details: errorResponse.error
				}
			}


			toast("Product Creado Correctamente", {
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

			router.push('/admin/products')

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
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start  gap-5">
				<Button asChild variant={"outline"} size={"icon"}>
					<Link href={"/admin/products"} ><MdOutlineChevronLeft size={25} /></Link>
				</Button>

				<h1 className="text-3xl">Nuevo Producto</h1>

			</section>

			<form onSubmit={handleSubmit(onSubmit)} className="flex max-w-screen-xl max-lg:flex-col w-full mx-auto gap-5">

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
										<SelectContent position="popper" hideWhenDetached>
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
						<CardContent className="space-y-2">
							<label className="flex flex-col gap-2">
								<span>Nombre</span>
								<Input id="name" {...register("name")} />
								{
									errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2">
								<span>Descripción</span>
								<Textarea id="description" {...register("description")} />
								{
									errors.description && <p className="text-red-600 text-xs ">{errors.description.message}</p>
								}
							</label>
						</CardContent>
					</Card>
					<div className="flex max-md:flex-col w-full gap-5">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Precio</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<label className="flex flex-col gap-2">
									<Input type="number" defaultValue={0} min={0} step={0.01} id="price" {...register("price")} />
								</label>
								{
									errors.price && <p className="text-red-600 text-xs">{errors.price.message}</p>
								}
							</CardContent>
						</Card>
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Categoria</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<Controller
									name="category"
									control={control}
									render={({ field }) => (
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="hover:bg-secondary">
												<SelectValue placeholder="Seleccionar" />
											</SelectTrigger>
											<SelectContent position="popper" hideWhenDetached>
												{CATEGORIES.map((category, index) => (
													<SelectItem key={index} value={`${category.slug}`}>{category.name}</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{
									errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>
								}
							</CardContent>
						</Card>
					</div>
					<div className="flex gap-5 max-md:flex-col w-full">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Descuento</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<label className="flex flex-col gap-2">
									<Input type="number" defaultValue={0} min={0} step={0.01} id="discount" {...register("discount")} />
								</label>
								{
									errors.discount && <p className="text-red-600 text-xs">{errors.discount.message}</p>
								}
							</CardContent>
						</Card>
					</div>

				</div>
				<div className="w-full lg:w-[40%] relative flex flex-col gap-5">
					<Card className="w-full">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Compra Limite</CardTitle>
							<CardDescription>
								Cantidad máxima que el cliente podra adquirir por compra.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<label className="flex flex-col gap-2">
								<Input type="number" defaultValue={0} min={0} id="orderLimit" {...register("orderLimit")} />
							</label>
							{
								errors.orderLimit && <p className="text-red-600 text-xs">{errors.orderLimit.message}</p>
							}
						</CardContent>
					</Card>


					<Card className="w-full h-auto relative">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Imagen</CardTitle>
							<CardDescription>
								Arrastra las imágenes en el contenedor o haz clic para seleccionar
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Controller
								name="img"
								control={control}
								render={({ field }) => (
									<ImageUploader
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>

						</CardContent>
					</Card>

					<Button variant={"secondary"} disabled={loading}>
						{loading ? (
							<AiOutlineLoading size={18} className="animate-spin ease-in-out" />
						) : (
							<>
								Guardar Producto
							</>
						)}
					</Button>

				</div>

			</form>


		</>
	);
}