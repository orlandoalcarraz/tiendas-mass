import { NextResponse } from "next/server";
import { Purchase, PurchaseDTO, PurchaseFormData } from "@/types";
import { createPurchase, createPurchaseItems, getPurchasePages, getPurchases } from "@/app/api/helpers/purchases-actions";
import { PurchaseSchema } from "@/Schemas/purchase-schema";
import { parseISO } from "date-fns";
import { formatDate } from "@/lib/utils";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""


    const purchases = await getPurchases({page,query,limit})
    const totalPages = await getPurchasePages({ page, query, limit })

    const purchaseList = purchases.map((purchase) => ({
        id: purchase.id,
        created: purchase.created,
        providerName: purchase.Provider.name,
        receiptType: purchase.receiptType,
        receiptNumber: purchase.receiptNumber,
        receiptDate: formatDate(purchase.receiptDate),
        totalPrice: purchase.totalPrice,
    }))

    return NextResponse.json({
        purchases: purchaseList,
        totalPages: totalPages,
    })

}


export async function POST(request: Request) {


    try {
        const req = await request.json()

        const rawBody:PurchaseFormData = {...req,date:parseISO(req.date)}

        
        const body = PurchaseSchema.parse(rawBody)

        const {providerId,date,number,type, purchaseItems } = body

        const purchaseDTO:PurchaseDTO  = {
            providerId: parseInt(providerId),
            type: type,
            number: number,
            date: date,
            purchaseItems: purchaseItems
        }

        const {ok,purchase} = await createPurchase(purchaseDTO)

        if(purchase){

            const {ok,items,error} = await createPurchaseItems(purchase.id,purchaseItems)




            if (ok) return NextResponse.json({ message: "Compra registrada exitosamente"}, { status: 201 })

            if (error) return NextResponse.json({ message: error?.msg, error:error?.details }, { status: 500 })

        }



        return NextResponse.json({ message: "Error en el registro de la compra en la REST API:", error: "Error desconocido en la REST API" }, { status: 500 })


    } catch (error) {

        console.error("Error en el registro de la compra en la REST API:", error)

        return NextResponse.json({ message: "Error en el registro de la compra en la REST API:", error: error || "Error desconocido en la REST API" }, { status: 500 })
    }
}