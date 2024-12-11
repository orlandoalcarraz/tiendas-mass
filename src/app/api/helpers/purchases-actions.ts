import db from "@/lib/db";
import {formatDate} from "@/lib/utils";
import { PurchaseDTO, PurchaseItemFormData } from "@/types";
import { Prisma } from '@prisma/client';

type GetPurchasesProps = {
    query: string,
    limit: number,
    page: number,
}

export const getPurchases = async ({ query, limit, page }: GetPurchasesProps) => {
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        const purchases = await db.purchase.findMany({

            where: {
                AND: [
                    query ? { receiptNumber: { contains: query,mode:Prisma.QueryMode.insensitive } } : {},
                ]
            },
            include:{
                Provider:{
                    select:{
                        name:true
                    }
                }
            },
            
            skip: skip,
            take: limit,
        })

        const formattedPurchases = purchases.map((purchase) => ({
            ...purchase,
            created: formatDate(new Date(purchase.created))
        }))

        return formattedPurchases

    } catch (error) {

        return []

    }
}


export const getPurchasePages = async ({ query, limit }: GetPurchasesProps) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                AND: [
                    query ? { receiptNumber: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                ]
            },
        })

        const totalPages = Math.ceil(purchases.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}


export const getPurchaseById = async (id: number) => {
    try {

        const purchase = await db.purchase.findUnique({ 
            where: { id },
            include:{
                Provider:{
                    select:{
                        name:true
                    }
                },
                User:{
                    select:{
                        name:true,
                        lastName:true
                    }
                },
                PurchaseItem:{
                    include:{
                        Product:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
            
        })

        if (purchase === null) return { ok: false, purchase: purchase }

        return { ok: true, purchase: purchase }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }
}

export const createPurchase = async (purchase:PurchaseDTO) =>{

    const {providerId,type,number,date,purchaseItems} = purchase

    const price = purchaseItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity)
    }, 0)
        

    try {

        const purchase = await db.purchase.create({
            data:{
                providerId:providerId,
                receiptNumber:number,
                receiptDate:date,
                receiptType:type,
                userId:1,
                totalPrice:price
            }
        })

        if (purchase === null) return { ok: false, purchase: purchase }

        return { ok: true, purchase: purchase }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }

}

export const createPurchaseItems = async (purchaseId: number, items: PurchaseItemFormData[]) => {
    try {

        const createdItems = await Promise.all(
            items.map((item) =>
                db.purchaseItem.create({
                    data: {
                        purchaseId: purchaseId,
                        quantity: item.quantity,
                        price: item.price,
                        productId: item.id,
                    },
                })
            )
        );

        if (!createdItems.length) return { ok: false, items: null }


        await Promise.all(
            items.map((item) =>
                db.product.update({
                    where: { id: item.id },
                    data: { stock: { increment: item.quantity },lastStockEntry: new Date(), },
                })
            )
        );

        return { ok: true, items: createdItems };
    } catch (error: any) {
        return {
            ok: false,
            error: error.message || "Error al crear los purchase items o actualizar el stock",
        };
    }
};