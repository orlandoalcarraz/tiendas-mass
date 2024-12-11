import { NextResponse } from "next/server";
import { MovementFormData } from "@/types/movement-types";
import { MovementSchema } from "@/Schemas/movement-schema";
import { createMovement } from "@/app/api/helpers/movements-actions";

export async function POST(request: Request) {
    try {
        const rawBody: MovementFormData = await request.json()

        const body = MovementSchema.parse(rawBody);

        const {productId, type, description, quantity} = body

        const movement = {

            productId:parseInt(productId),
            type:type,
            description: description,
            quantity: parseInt(quantity),

        }

        const newMovement = await createMovement(movement)


        const newMovementResponse = {
            ...newMovement,
            movement: {
                id: newMovement.movement?.id.toString(),
            }
        }


        if (newMovementResponse.success) return NextResponse.json({ message: "Movimiento realizado exitosamente", movement: newMovementResponse }, { status: 201 })


        return NextResponse.json({ message: newMovementResponse.error?.msg, error: newMovementResponse.error?.details }, { status: 500 })


    } catch (error) {

        console.error("Error en el registro del movimiento en la REST API:", error)

        return NextResponse.json({ message: "Error en el registro del movimiento en la REST API:", error: error || "Error desconocido en la REST API" }, { status: 500 })
    }
}