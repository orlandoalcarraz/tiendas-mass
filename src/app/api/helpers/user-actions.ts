import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { UserDTO, UserEditDTO } from "@/types"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"


export const createUser = async (user: UserDTO) => {

    const { name, lastName, number, dni, email, role, status, password } = user

    try {

        const newUser = await db.user.create({
            data: {
                dni, 
                name, 
                lastName, 
                number, 
                email, 
                role, 
                status, 
                password
            }
        })

        return { success: true, user: newUser }

    } catch (error: any) {
        console.error("Error en el registro del usuario en la BD:", error.meta?.target[0])

        return {
            success: false,
            error: {
                msg: "Error en el registro del usuario en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

export const updateUser = async (id: number, user: UserEditDTO) => {
    const { status, lastName, name, email, number,role } = user

    try {
        const updatedUser = await db.user.update({
            where: {
                id
            },
            data: {
                status,
                name,
                email,
                number,
                lastName,
                role
            }
        })


        return { ok: true, user: updatedUser }

    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            error: {
                msg: "Error en la actualizacion del usuario en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

const deleteUser = async () => {

}

type GetUsersProps = {
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}

export const getCustomers = async ({ query, limit, page, status }: GetUsersProps) => {

    try {
        const pages = page || 1
        const skip = (pages - 1) * limit

        const users = await db.user.findMany({
            where: {
                role:0,
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            },
            skip: skip,
            take: limit,
        })


        const formattedUsers = users.map((user) => ({
            ...user,
            created: formatDate(new Date(user.created)),
            updated: formatDate(new Date(user.updated)),
        }))

        return formattedUsers

    } catch (error) {

        return []

    }
}

export const getCustomersPage = async ({ query, limit, status }: GetUsersProps) => {
    try {
        const users = await db.user.findMany({
            where: {
                role:0,
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            }
        })

        const totalPages = Math.ceil(users.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}

export const getUsers = async ({ query, limit, page, status }: GetUsersProps) => {
    try {
        const pages = page || 1
        const skip = (pages - 1) * limit

        const users = await db.user.findMany({
            where: {
                role:1,
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            },
            skip: skip,
            take: limit,
        })


        const formattedUsers = users.map((user) => ({
            ...user,
            created: formatDate(new Date(user.created)),
            updated: formatDate(new Date(user.updated)),
        }))

        return formattedUsers

    } catch (error) {

        return []

    }
}


export const getUsersPage = async ({ query, limit, status }: GetUsersProps) => {
    try {
        const users = await db.user.findMany({
            where: {
                role:1,
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            }
        })

        const totalPages = Math.ceil(users.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}

export const getUserById = async (id: number) => {
    try {

        const user = await db.user.findUnique({ where: { id } })

        if (user === null) return { ok: false, user: user }

        return { ok: true, user: user }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }
}