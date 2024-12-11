"use server"
import db from "@/lib/db"
import bcrypt from "bcrypt";
export const getUserRole = async (email: string) => {
    try {
        const role = await db.user.findFirst({
            select: {
                role: true,
            },
            where: {
                email: email,
            },
        })

        return role?.role ?? null
    } catch (error: any) {
        console.error("Error al obtener el rol del usuario:", error)
        return null
    }
}

export const getUserData = async (id: number) => {
    try {
        const user = await db.user.findFirst({
            select: {
                dni: true,
                name: true,
                lastName: true,
                number: true,
                email: true
            },
            where: {
                id: id,
            },
        })

        return user

    } catch (error: any) {
        console.error("Error al obtener el usuario:", error)
        return null
    }
}

type ChangeUserProps = {
    id: number
    dni: string,
    email: string,
    number: string
}
export const changeUserData = async (params: ChangeUserProps) => {

    const { id, dni, email, number } = params

    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_RENIEC_TOKEN}`,
            },
        })

        const { numeroDocumento, nombres, apellidoPaterno, apellidoMaterno } = await response.json()


        if (!nombres || !apellidoPaterno || !apellidoMaterno) return { ok: false, message: "DNI invalido" }


        const userUpdated = await db.user.update({
            where: { id: id },
            data: {
                name: nombres,
                lastName: apellidoPaterno + " " + apellidoMaterno,
                dni: dni,
                email: email,
                number: number,
            },
        });

        return { ok: true, message: "Usuario actualizado exitosamente", data: userUpdated };


    } catch (error: any) {
        return { ok: false, message: "Error al realizar los cambios" }
    }

}


export const changeUserPassword = async (id: number, password: string, newPassword: string) => {
    try {

        const user = await db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            },
        })

        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("La contraseña actual no coincide")
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)


        await db.user.update({
            data: {
                password: hashedPassword,
            },
            where: {
                id: id,
            },
        })

        return { ok: true, message: "Contraseña actualizada con éxito" }
    } catch (error: any) {
        console.error("Error al cambiar la contraseña:", error)
        return { ok: false, message: error.message || "Error al cambiar la contraseña" }
    }
}

