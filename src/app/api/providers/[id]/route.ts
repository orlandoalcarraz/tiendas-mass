import { NextResponse } from "next/server";
import { ProviderFormData } from "@/types";
import { deleteProvider, getProviderById, updateProvider } from "@/app/api/helpers/providers-actions";
import { ProviderSchema } from "@/Schemas";


type Params = {
    params: {
        id: string
    }
}
export async function GET(request: Request, { params }: Params) {

    const { id } = params

    const providerId = parseInt(id, 10)

    if (isNaN(providerId) || providerId < 0) {
        return NextResponse.json({message: "ID de proveedor inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    const { ok, error, provider } = await getProviderById(providerId);

    if (!ok) {
        const errorMessage = error || "No se encontró un proveedor con ese ID";
        return NextResponse.json({ message: errorMessage }, { status: 404 })
    }


    if (provider) {
        const providerResponse: ProviderFormData = {
            name: provider.name,
            legal: provider.legal,
            status: provider.status ? "1" : "0",
            ruc: provider.ruc,
            number: provider.number,
            email: provider.email,
            web: provider.web,
        }

        return NextResponse.json({ provider: providerResponse }, { status: 200 })
    } else {
        return NextResponse.json({message: "ID de proveedor inválida", error: "No se encontró un proveedor con ese ID" }, { status: 404 })
    }

}

export async function PUT(request: Request, { params }: Params) {

    const rawBody: ProviderFormData = await request.json()

    const body = ProviderSchema.parse(rawBody)

    const { name, ruc, legal, web, email, number, status } = body

    const { id } = params

    const providerId = parseInt(id, 10)

    if (isNaN(providerId) || providerId < 0) {
        return NextResponse.json({message: "ID de proveedor inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    const providerBody = {
        ruc: ruc,
        name: name,
        legal: legal,
        email: email,
        number: number,
        web: web,
        status: status === "1"
    }

    const { ok, error, provider } = await updateProvider(providerId, providerBody)
    
    const errorMessage = error?.msg || "No se encontró un proveedor con ese ID"
    const errorDetails = error?.details || ""

    if (!ok) return NextResponse.json({ message: errorMessage, error: errorDetails}, { status: 404 })


    if (provider) {
        return NextResponse.json({ provider: provider }, { status: 200 })
    } else {
        return NextResponse.json({ message: errorMessage, error: errorDetails }, { status: 500 })
    }

}

export async function DELETE(request: Request, { params }: Params) {

    const { id } = params

    const providerId = parseInt(id, 10)

    if (isNaN(providerId) || providerId < 0) {
        return NextResponse.json({message: "ID de proveedor inválida", error: "No modificar manualmente la URL" }, { status: 400 })
    }


    const { ok, error, provider } = await deleteProvider(providerId)
    
    const errorMessage = error?.msg || "No se encontró un proveedor con ese ID"
    const errorDetails = error?.details || ""

    if (!ok) return NextResponse.json({ message: errorMessage, error: errorDetails}, { status: 404 })


    if (provider) {
        return NextResponse.json({ provider: provider }, { status: 200 })
    } else {
        return NextResponse.json({ message: errorMessage, error: errorDetails }, { status: 500 })
    }

}