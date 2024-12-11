"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Product } from "@/types"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai"

type Props = {
    product: Product | undefined
    open: boolean,
    handleOpenChange: (open: boolean) => void
    handlRefresh: () => void
}

export function DeleteProductDialog({ open, product, handleOpenChange, handlRefresh }: Props) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            console.log(product)
            setLoading(true)

            const response = await fetch(`/api/products/${product?.id}`, {
                method: 'DELETE',

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

            toast("Eliminado Correctamente", {
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
            setLoading(false)
            const errorMessage = error.message || "Error desconocido"
            const errorDetails = error.details ? `El campo ${error.details} es inválido` : ""

            toast.error(errorMessage, { description: errorDetails })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar {product?.name}</DialogTitle>
                    <DialogDescription>
                        ¿Seguro que deseas eliminar este producto permanentemente?
                    </DialogDescription>
                    <div className="w-full flex justify-between items-center pt-6">
                        <Button variant={"destructive"} onClick={handleDelete} disabled={loading}>
                            {loading ? (
                                <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                            ) : (
                                <>Confirmar</>
                            )}
                        </Button>

                        <Button variant={"secondary"} onClick={() => handleOpenChange(false)}>
                            Cancelar
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}