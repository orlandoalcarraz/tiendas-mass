import { NextResponse } from "next/server";
import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { totalPayment } = body;

        if (!totalPayment || totalPayment <= 0) {
            return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
        }

        const req = new paypal.orders.OrdersCreateRequest();
        req.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalPayment.toFixed(2), 
                    },
                },
            ],
        });

        const response = await client.execute(req);

        return NextResponse.json({
            id: response.result.id,
        });
    } catch (error) {
        console.error("Error en la creación de la orden:", error)
        return NextResponse.json({ error: "Error al crear la orden" }, { status: 500 })
    }
}