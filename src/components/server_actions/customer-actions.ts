"use server";

import db from "@/lib/db";


export const changeCustomerStatus = async (id: number,status:boolean) => {
    try {

        const updatedCustomer = await db.user.update({
            where: {
                id: id,
            },
            data: {
                status: !status,
            },
        });

        return {
            ok: true,
            customer: updatedCustomer,
        };
    } catch (error) {
        console.error("Error al cambiar el estado del cliente:", error);
        return {
            ok: false,
            message: "Hubo un error al cambiar el estado del cliente.",
        }
    }
}