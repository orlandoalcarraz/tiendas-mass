import { NextResponse } from "next/server";

import { getSales, getSalesPages } from "../helpers/sales-actions";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""


    const sales = await getSales({page,query,limit})
    const totalPages = await getSalesPages({ page, query, limit })

    const salesList = sales.map((sale) => ({
        id: sale.id,
        created: sale.created,
        userName: sale.User.name,
        transaction: sale.transaction,
        totalAmount: sale.totalAmount,
        totalDiscount: sale.totalDiscount,
        totalPayment: sale.totalPayment,
        paymentMethod:sale.paymentMethod,
        status:sale.status
    }))

    return NextResponse.json({
        sales: salesList,
        totalPages: totalPages,
    })

}