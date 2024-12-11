"use client"
import { ProductsDatalist } from "@/components/purchases/products-datalist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import ProvidersDatalist from "@/components/purchases/providers-datalist";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PurchaseFormData } from "@/types";
import { PurchaseSchema } from "@/Schemas/purchase-schema";
import PurchaseItemsStoreTbl from "@/components/purchases/purchaseItemsStore-tbl";
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai";
import { usePurchaseStore } from "@/store/purchase-store";

export default function Page() {
    const [loading, setLoading] = useState(false)
    const purchaseItems = usePurchaseStore(state => state.purchaseItems)
    const resetItems = usePurchaseStore(state => state.resetItems)

    const router = useRouter()
    const { register, reset, control, setValue, watch, handleSubmit, formState: { errors } } = useForm<PurchaseFormData>({
        resolver: zodResolver(PurchaseSchema),
        defaultValues: {
            purchaseItems: []
        }
    })

    useEffect(() => {
        setValue("purchaseItems", purchaseItems)
    }, [purchaseItems, setValue])



    const onSubmit: SubmitHandler<PurchaseFormData> = async (data) => {
        setLoading(true)


        try {

            if (purchaseItems.length === 0) throw { message: "No hay productos seleccionados en la compra" }

            if (purchaseItems.length > 0) {

                const item = purchaseItems.some(item => item.price === 0)

                if (item) throw { message: "Hay productos sin un precio de compra asignado" }
            }

            if (purchaseItems.length > 0) {

                const item = purchaseItems.some(item => item.quantity === 0)

                if (item) throw { message: "Hay productos sin una cantidad asignada" }
            }


            const response = await fetch("/api/purchases", {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })


            if (!response.ok) {
                const errorResponse = await response.json();
                throw {
                    message: errorResponse.message || "Error en la solicitud",
                    details: errorResponse.error
                }
            }

            resetItems()

            toast("Compra Registrada Correctamente", {
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

            router.push('/admin/purchases')

        } catch (error: any) {

            const errorMessage = error.message || "Error desconocido"
            const errorDetails = error.details ? `El campo ${error.details} es inválido` : ""
            toast.error(errorMessage, { description: errorDetails })

        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            <section className=" w-full flex gap-5">

                <Button asChild variant={"outline"} size={"icon"}>
                    <Link href={"/admin/purchases"} ><MdOutlineChevronLeft size={25} /></Link>
                </Button>

                <h1 className="text-3xl">Nueva Compra</h1>

            </section>
            <section className="w-full flex gap-10 max-2xl:flex-col">
                <Card className="2xl:max-w-lg w-full relative h-fit">
                    <CardHeader>
                        <CardTitle>
                            Proveedor
                        </CardTitle>
                        <CardDescription>
                            Información de la compra
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full h-auto flex flex-col gap-7">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                            <div className="gap-7 text-sm flex max-lg:flex-col 2xl:flex-col w-full h-auto">
                                <div className="flex flex-col max-2xl:w-full gap-7">
                                    <label className="flex flex-col gap-2 w-full">
                                        <span>Nombre Proveedor:</span>
                                        <Controller
                                            name="providerId"
                                            control={control}

                                            render={({ field }) => (
                                                <ProvidersDatalist
                                                    value={field.value}
                                                    onChange={(value) => field.onChange(value)}
                                                />
                                            )}
                                        />
                                        {
                                            errors.providerId && <p className="text-red-600 text-xs">{errors.providerId.message}</p>
                                        }
                                    </label>
                                    <label className="flex flex-col gap-2 w-full">
                                        <span>Tipo Comprobante:</span>
                                        <Controller
                                            name="type"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="hover:bg-secondary">
                                                        <SelectValue placeholder="Seleccionar" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper" hideWhenDetached>
                                                        <SelectItem value="BOLETA">Boleta</SelectItem>
                                                        <SelectItem value="FACTURA">Factura</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {
                                            errors.type && <p className="text-red-600 text-xs">{errors.type.message}</p>
                                        }
                                    </label>
                                </div>
                                <div className="flex flex-col max-2xl:w-full gap-7">
                                    <label className="flex flex-col gap-2 w-full">
                                        <span>No. Comprobante:</span>
                                        <Input id="number" {...register("number")} />
                                        {
                                            errors.number && <p className="text-red-600 text-xs">{errors.number.message}</p>
                                        }
                                    </label>

                                    <label htmlFor="" className="flex flex-col gap-2 w-full ">
                                        <span>Fecha Comprobante:</span>
                                        <Controller
                                            name="date"
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker onChange={field.onChange} date={field.value} />
                                            )}
                                        />
                                        {
                                            errors.date && <p className="text-red-600 text-xs">{errors.date.message}</p>
                                        }
                                    </label>

                                </div      >
                            </div>
                            <Button variant={"secondary"} disabled={loading} className="max-w-lg w-full">
                                {loading ? (
                                    <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                                ) : (
                                    <>
                                        Guardar Compra
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="w-full h-full">
                    <CardHeader>
                        <CardTitle>
                            Detalles de la Compra
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-7 py-5 h-full">

                        <ProductsDatalist />
                        <div className="overflow-y-scroll h-[560px] w-full scrollbar-thin scrollbar-track-background scrollbar-thumb-primary relative">
                            <PurchaseItemsStoreTbl />
                        </div>

                    </CardContent>
                </Card>

            </section>
        </>
    );
}