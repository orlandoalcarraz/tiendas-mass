import { NextResponse } from "next/server"
import { getSaleById } from "../../helpers/sales-actions"
import { formatDate } from "@/lib/utils"

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: Request,{ params }: Params) {

    const { id } = params

    const saleId = parseInt(id,10)

    const {ok,sale,error} = await getSaleById(saleId)

    if (ok && sale) {

        const Items = sale.SaleItem
        
        const saleDetails = {
            id: sale.id,
            created:formatDate(sale.created),
            userName: sale.User.name+" "+ sale.User.lastName,
            transaction: sale.transaction,
            totalAmount: sale.totalAmount.toNumber(),
            totalDiscount: sale.totalDiscount.toNumber(),
            totalPayment: sale.totalPayment.toNumber(),
            paymentMethod:sale.paymentMethod
        }


        const saleItems = Items.map((item) => ({
        
            id: item.id,
            productName:item.Product.name,
            quantity:item.quantity,
            discount:item.discount,
            price:item.price.toNumber(),
            totalPrice: parseFloat((item.quantity * (item.price.toNumber()-item.discount.toNumber())).toFixed(2)),

        }))


        return NextResponse.json({
            ok:true,
            saleDetails: saleDetails,
            saleItems:saleItems
    
        })
    
    }






    return NextResponse.json({
        ok:false,
        message:"Hubo un error en el servicio REST",
        error:error,

    })

}