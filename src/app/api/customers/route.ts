import { NextResponse } from "next/server";
import { customers } from "@/data/data";
import { sleep } from "@/lib/utils";
import { getCustomers, getCustomersPage } from "../helpers/user-actions";

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
    const data = await getCustomers({ query, page, limit, status: statusValue })
    const totalPages = await getCustomersPage({ query, page, limit, status: statusValue })

    return NextResponse.json({
        customers: data,
        totalPages: totalPages,
    })

}