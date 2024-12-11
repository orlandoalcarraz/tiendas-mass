import { NextResponse } from "next/server"
import { getUserById, updateUser } from "../../helpers/user-actions"
import { UserEditFormData, UserFormData } from "@/types"
import { UserEditSchema } from "@/Schemas"


type Params = {
    params: {
        id: string
    }
}
export async function GET(request: Request, { params }: Params) {

    const { id } = params

    const userId = parseInt(id, 10)

    if (isNaN(userId) || userId < 0) {
        return NextResponse.json({message: "ID de usuario inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    const { ok, error, user } = await getUserById(userId);

    if (!ok) {
        const errorMessage = error || "No se encontró un usuario con ese ID";
        return NextResponse.json({ message: errorMessage }, { status: 404 })
    }


    if (user) {
        const userResponse: UserEditFormData = {
            dni: user.dni,
            name: user.name,
            lastName: user.lastName,
            number: user.number,
            email: user.email,
            role: user.role===1 ? "1" : "0",
            status: user.status ? "1" : "0"
            
        }

        return NextResponse.json({ user: userResponse }, { status: 200 })
    } else {
        return NextResponse.json({message: "ID de usuario inválida", error: "No se encontró un usuario con ese ID" }, { status: 404 })
    }

}

export async function PUT(request: Request, { params }: Params) {

    const rawBody: UserEditFormData = await request.json()

    const body = UserEditSchema.parse(rawBody)

    const {name,lastName,dni,email,number,role,status} = body

    const { id } = params

    const userId = parseInt(id, 10)

    if (isNaN(userId) || userId < 0) {
        return NextResponse.json({message: "ID de usuario inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    const userBody = {
        dni:dni,
        name:name,
        lastName:lastName,
        email:email,
        number:number,
        role:parseInt(role),
        status:status==="1" 
    }

    const { ok, error, user } = await updateUser(userId, userBody)
    
    const errorMessage = error?.msg || "No se encontró un usuario con ese ID"
    const errorDetails = error?.details || ""

    if (!ok) return NextResponse.json({ message: errorMessage, error: errorDetails}, { status: 404 })


    if (user) {
        return NextResponse.json({ user: user }, { status: 200 })
    } else {
        return NextResponse.json({ message: errorMessage, error: errorDetails }, { status: 500 })
    }

}