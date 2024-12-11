import db from "@/lib/db"
import { formatDate } from "@/lib/utils";
import { ProviderDTO } from "@/types"
import { Prisma } from "@prisma/client";
import { format } from 'date-fns';



export const createProvider = async (provider: ProviderDTO) => {
    const { status, web, name, ruc, email, number, legal } = provider

    try {
        const newProvider = await db.provider.create({
            data: {
                status,
                ruc,
                name,
                legal,
                web,
                email,
                number,
            }
        })


        return { ok: true, provider: newProvider }

    } catch (error: any) {
        console.error("Error en el registro del proveedor en la BD:", error.meta?.target[0])

        return {
            ok: false,
            error: {
                msg: "Error en el registro del proveedor en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}



export const updateProvider = async (id: number, provider: ProviderDTO) => {
    const { status, web, name, ruc, email, number, legal } = provider

    try {
        const updatedProvider = await db.provider.update({
            where: {
                id
            },
            data: {
                status,
                ruc,
                name,
                legal,
                web,
                email,
                number,
            }
        })


        return { ok: true, provider: updatedProvider }

    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            error: {
                msg: "Error en la actualizacion del proveedor en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

export const deleteProvider = async (id:number) => {
    try {
        
        const deletedProvider = await db.provider.delete({
            where:{
                id
            }
        })

        return {ok:true, provider:deletedProvider}

    } catch (error:any) {
        console.log(error)
        return {
            ok: false,
            error: {
                msg: "Error en la eliminación del proveedor en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}


type GetProvidersProps = {
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}

export const getProviders = async ({ query, limit, page, status }: GetProvidersProps) => {
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        const providers = await db.provider.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            },
            skip: skip,
            take: limit,
        })

        const formattedProviders = providers.map((provider) => ({
            ...provider,
            created: formatDate(new Date(provider.created)),
            updated: formatDate(new Date(provider.updated)),
        }))

        return formattedProviders

    } catch (error) {

        return []

    }
}


export const getProvidersPages = async ({ query, limit, status }: GetProvidersProps) => {
    try {
        const providers = await db.provider.findMany({
            where: {
                AND: [
                    query ? { name: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                    status !== null && status !== undefined ? { status: status } : {},
                ]
            }
        })

        const totalPages = Math.ceil(providers.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}


export const getProviderById = async (id: number) => {
    try {

        const provider = await db.provider.findUnique({ where: { id } })

        if (provider === null) return { ok: false, provider: provider }

        return { ok: true, provider: provider }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }
}