"use server"
import db from "@/lib/db"
import { CartProduct } from "@/types"


export type SaleDTO = {
    transaction: string,
    userId: number
    totalAmount: number,
    totalDiscount: number,
    totalPayment:number
    paymentMethod: string,
    status: string
}

export const createSale = async (sale: SaleDTO) => {

    const { transaction, userId, totalAmount, totalDiscount,totalPayment, paymentMethod, status } = sale


    try {

        const sale = await db.sale.create({
            data: {
                transaction,
                userId,
                totalAmount,
                totalDiscount,
                totalPayment,
                paymentMethod,
                status

            }
        })

        if (sale === null) return { ok: false, sale: sale }

        return { ok: true, sale: sale }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }

}

export const createSaleItems = async (saleId: number, items: CartProduct[]) => {
    try {

        const createdItems = await Promise.all(
            items.map((item) =>
                db.saleItem.create({
                    data: {
                        saleId: saleId,
                        quantity: item.quantity,
                        price: item.price,
                        discount: item.discount,
                        productId: item.id
                    }
                })
            )
        );

        if (!createdItems.length) return { ok: false, items: null }


        return { ok: true, items: createdItems }


    } catch (error: any) {
        return {
            ok: false,
            error: error
        }
    }
}

export type CaptureSaleProps = {
    sale: SaleDTO,
    items: CartProduct[]

}

export const captureSale = async ({ sale, items }: CaptureSaleProps) => {
    try {
        const result = await db.$transaction(async (transaction) => {

            const createdSale = await transaction.sale.create({
                data: {
                    transaction: sale.transaction,
                    userId: sale.userId,
                    totalAmount: sale.totalAmount,
                    totalDiscount: sale.totalDiscount,
                    totalPayment: sale.totalPayment,
                    paymentMethod: sale.paymentMethod,
                    status: sale.status,
                },
            });


            const createdItems = await Promise.all(
                items.map((item) =>
                    transaction.saleItem.create({
                        data: {
                            saleId: createdSale.id,
                            quantity: item.quantity,
                            price: item.price,
                            discount: item.discount,
                            productId: item.id,
                        },
                    })
                )
            );

            await Promise.all(
                items.map((item) =>
                    transaction.product.update({
                        where: { id: item.id },
                        data: { stock: { decrement: item.quantity } },
                    })
                )
            );

            return {
                sale: createdSale,
                items: createdItems,
            };
        });

        return { ok: true, ...result };
    } catch (error: any) {
        console.error("Error capturing sale:", error);
        return { ok: false, error: error.message || "Error al capturar la venta" };
    }
};



export const getClientSales = async (userId: number) => {
    try {

        const sales = await db.sale.findMany({
            where: { userId },

        })

        if (!sales || sales.length === 0) {
            return { ok: false, sales: null, message: "No se encontraron ventas para este cliente" }
        }

        return { ok: true, sales }

    } catch (error: any) {
        console.error("Error al obtener ventas del cliente:", error)
        return { ok: false, error: error.message || "Error desconocido" }
    }
}

export const getSales = async () =>{

}