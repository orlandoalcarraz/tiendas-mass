import db from "@/lib/db"
import { MovementDTO } from "@/types/movement-types"

export const createMovement = async (movement: MovementDTO) => {
    const { productId, type, quantity, description } = movement

    try {

        const newMovement = await db.movement.create({
            data: {
                productId,
                type,
                quantity,
                description,
            },
        })

        if (newMovement) {

            const product = await db.product.findUnique({
                select:{
                    stock:true
                },
                where: {
                    id: productId,
                },
            })

            if (!product) {
                throw new Error("Producto no encontrado")
            }

            let newStock

            if (newMovement.type === "ENTRADA") {
                newStock = product.stock + newMovement.quantity
            }
            
            if (newMovement.type === "SALIDA") {
                newStock = Math.max(0, product.stock - newMovement.quantity)
            }

            await db.product.update({
                where: {
                    id: productId,
                },
                data: {
                    stock: newStock,
                    lastStockEntry: new Date(),
                },
            });
        }

        return { success: true, movement: newMovement }

    } catch (error: any) {
        console.error("Error en el registro del movimiento en la BD:", error.meta?.target[0]);

        return {
            success: false,
            error: {
                msg: "Error en el registro del movimiento en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            },
        }
    }
}