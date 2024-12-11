import { NextResponse } from "next/server";
import { ProviderFormData } from "@/types";
import { createProvider } from "../helpers/providers-actions";
import { ProviderSchema } from "@/Schemas";
import { getProviders, getProvidersPages } from "@/app/api/helpers/providers-actions";


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
    const data = await getProviders({ query, page, limit, status: statusValue })
    const totalPages = await getProvidersPages({ query, page, limit, status: statusValue })

    return NextResponse.json({
        providers: data,
        totalPages: totalPages,
    })

}




export async function POST(request: Request) {
    try {
        const rawBody: ProviderFormData = await request.json()

        const body = ProviderSchema.parse(rawBody)

        const { name, ruc, legal, web, email, number, status } = body

        const provider = {
            ruc: ruc,
            name: name,
            legal: legal,
            email: email,
            number: number,
            web: web,
            status: status === "1"
        }

        const newProvider = await createProvider(provider)


        const newProviderResponse = {
            ...newProvider,
            provider: {
                id: newProvider.provider?.id.toString(),
                ruc,
                name,
                legal,
                email,
                number,
                web,
                status: provider.status,
            }
        }


        if (newProviderResponse.ok) return NextResponse.json({ message: "Proveedor creado exitosamente", provider: newProviderResponse.provider }, { status: 201 })


        return NextResponse.json({ message: newProviderResponse.error?.msg, error: newProviderResponse.error?.details }, { status: 500 })


    } catch (error) {

        console.error("Error en el registro del proveedor en la REST API:", error)

        return NextResponse.json({ message: "Error en el registro del proveedor en la REST API:", error: error || "Error desconocido en la REST API" }, { status: 500 })
    }
}