import { NextResponse } from "next/server"
import { getPurchaseById } from "../../helpers/purchases-actions"
import { PurchaseDetails, PurchaseItem } from "@/types"
import { formatDate } from "@/lib/utils"


type Params = {
    params: {
        id: string
    }
}

export async function GET(request: Request,{ params }: Params) {

    const { id } = params

    const purchaseId = parseInt(id,10)

    const {ok,purchase,error} = await getPurchaseById(purchaseId)

    if (ok && purchase) {

        const Items = purchase.PurchaseItem
        
        const purchaseDetails = {
            id: purchase.id,
            created:formatDate(purchase.created),
            providerName: purchase.Provider.name,
            userName: purchase.User.name+" "+ purchase.User.lastName,
            receiptType: purchase.receiptType,
            receiptNumber: purchase.receiptNumber,
            receiptDate: formatDate(purchase.receiptDate),
            totalPrice: purchase.totalPrice
        }


        const purchaseItems:PurchaseItem[] = Items.map((item) => ({
        
            id: item.id,
            productName:item.Product.name,
            quantity:item.quantity,
            price:item.price.toNumber(),
            totalPrice: parseFloat((item.quantity * item.price.toNumber()).toFixed(2)),

        }))


        return NextResponse.json({
            ok:true,
            purchaseDetails: purchaseDetails,
            purchaseItems:purchaseItems
    
        })
    
    }






    return NextResponse.json({
        ok:false,
        message:"Hubo un error en el servicio REST",
        error:error,

    })

}