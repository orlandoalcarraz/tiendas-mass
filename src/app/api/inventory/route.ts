import { NextResponse } from "next/server";
import { getProductsInventory,getProductsPages } from "@/app/api/helpers/product-actions";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "5")
    const query = searchParams.get("query") || ""
    const status = searchParams.get("status") || "all"

    const statusMap: { [key: string]: boolean | null } = {
        "en": true,
        "dis": false,
        "all": null
    }

    const statusValue = statusMap[status] ?? null
    const data = await getProductsInventory({ query, page, limit, status: statusValue })
    const totalPages = await getProductsPages({ query, page, limit, status: statusValue })

    return NextResponse.json({
        products: data,
        totalPages: totalPages,
    })
}