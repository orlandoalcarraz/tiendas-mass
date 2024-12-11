import { NextResponse } from "next/server";
import { UserFormData } from "@/types";
import { UserSchema } from "@/Schemas";
import bcrypt from "bcrypt"
import { createUser, getUsers, getUsersPage } from "@/app/api/helpers/user-actions";


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
    const data = await getUsers({ query, page, limit, status: statusValue })
    const totalPages = await getUsersPage({ query, page, limit, status: statusValue })

    return NextResponse.json({
        users: data,
        totalPages: totalPages,
    })

}


export async function POST(request:Request) {
    try {
        const rawBody: UserFormData = await request.json()

        const body = UserSchema.parse(rawBody);

        const { name, lastName, dni, role, email, number, status, password} = body

        const hashPassword = await bcrypt.hash(password,10)

        const user = {
            dni: dni,
            name: name,
            lastName: lastName,
            email: email,
            number: number,
            role: parseInt(role),
            status: status === "1",
            password:hashPassword
        }

        const newUser = await createUser(user)


        const newUserResponse = {
            ...newUser,
            user: {
                id: newUser.user?.id.toString(),
                name,
                lastName,
                role,
                email,
                number,
                status: user.status,
            }
        }
        


        if (newUserResponse.success) return NextResponse.json({ message: "Usuario creado exitosamente", user: newUserResponse.user }, { status: 201 })


        return NextResponse.json({ message: newUserResponse.error?.msg, error: newUserResponse.error?.details }, { status: 500 })


    } catch (error) {

        console.error("Error en el registro del usuario en la REST API:", error)

        return NextResponse.json({ message: "Error en el registro del usuario en la REST API:", error: error || "Error desconocido en la REST API" }, { status: 500 })
    }

}