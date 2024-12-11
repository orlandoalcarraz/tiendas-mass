"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { MovementFormData } from "@/types/movement-types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { MovementSchema } from "@/Schemas/movement-schema"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { AiOutlineLoading } from "react-icons/ai"
import { ProductInventory } from "@/types"

type MovementFormProps = {
    product: ProductInventory | undefined
    handleOpenChange: (open: boolean) => void
    handlRefresh:()=>void
}

export function MovementForm({ product, handleOpenChange,handlRefresh }: MovementFormProps) {
    const [loading, setLoading] = useState(false)
    const { register, reset, control,setValue, handleSubmit, formState: { errors } } = useForm<MovementFormData>({
        resolver: zodResolver(MovementSchema)
    })

    const { refresh } = useRouter()

    useEffect(() => {
        if (product?.id) {
            setValue("productId", product.id.toString())
        }
    }, [product,setValue]);

    const onSubmit: SubmitHandler<MovementFormData> = async (data) => {
        if (!product?.id) {
            toast.error("El ID del producto no está definido");
            return
        }

        setLoading(true)
        const movementData = {
            ...data,
            productId: product.id.toString()
        }

        try {
            const response = await fetch("/api/inventory/movements", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movementData),
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                throw {
                    message: errorResponse.message || "Error en la solicitud",
                    details: errorResponse.error
                }
            }

            handleOpenChange(false)
            handlRefresh()
            reset()
            refresh()

            toast("Movimiento Registrado", {
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

        } catch (error: any) {
            const errorMessage = error.message || "Error desconocido"
            const errorDetails = error.details ? `El campo ${error.details} es inválido` : ""

            toast.error(errorMessage, { description: errorDetails })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 pt-6 text-left">
            <label className="flex flex-col gap-2 w-full">
                <span>Tipo:</span>
                <Controller
                    name="type"
                    control={control}
                    defaultValue="ENTRADA"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="hover:bg-secondary">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent position="popper" hideWhenDetached>
                                <SelectItem value="ENTRADA">ENTRADA</SelectItem>
                                <SelectItem value="SALIDA">SALIDA</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.type && <p className="text-red-600 text-xs">{errors.type.message}</p>}
            </label>

            <label className="flex flex-col gap-2">
                <span>Cantidad:</span>
                <Input id="quantity" type="number" {...register("quantity")} />
                {errors.quantity && <p className="text-red-600 text-xs">{errors.quantity.message}</p>}
            </label>

            <label className="flex flex-col gap-2">
                <span>Descripción:</span>
                <Textarea id="description" {...register("description")} />
                {errors.description && <p className="text-red-600 text-xs">{errors.description.message}</p>}
            </label>

            <Button variant={"secondary"} disabled={loading || !product?.id} className="text-lg">
                {loading ? (
                    <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                ) : (
                    <>Registrar Movimiento</>
                )}
            </Button>
        </form>
    )
}

