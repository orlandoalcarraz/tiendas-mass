import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const ruc = searchParams.get("ruc")

    if (!ruc || ruc.length !== 11)  return NextResponse.json({ message: "RUC inválido" }, { status: 400 });
 

    const url = `https://api.apis.net.pe/v2/sunat/ruc/full?numero=${ruc}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_RENIEC_TOKEN}`,
            },
        })

        if (!response.ok) return NextResponse.json({ status: response.status })

        const data = await response.json()
        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        console.error("Error en la solicitud a RENIEC:", error)
        return NextResponse.json({ message: "Error en la solicitud" }, { status: 500 })
    }
}