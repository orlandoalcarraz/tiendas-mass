import db from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Prisma } from '@prisma/client';

type GetSalesProps = {
    query: string,
    limit: number,
    page: number,
}

export const getSales = async ({ query, limit, page }: GetSalesProps) => {
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        const sales = await db.sale.findMany({

            where: {
                AND: [
                    query ? { transaction: { contains: query,mode:Prisma.QueryMode.insensitive } } : {},
                ]
            },
            include:{
                User:{
                    select:{
                        name:true
                    }
                }
            },
            
            skip: skip,
            take: limit,
        })

        const formattedSales = sales.map((sale) => ({
            ...sale,
            created: formatDate(new Date(sale.created))
        }))

        return formattedSales

    } catch (error) {

        return []

    }
}


export const getSalesPages = async ({ query, limit }: GetSalesProps) => {
    try {
        const sales = await db.sale.findMany({
            where: {
                AND: [
                    query ? { transaction: { contains: query,mode:Prisma.QueryMode.insensitive  } } : {},
                ]
            },
        })

        const totalPages = Math.ceil(sales.length / limit)

        return totalPages

    } catch (error) {
        return 0;
    }

}

export const getSaleById = async (id: number) => {
    try {

        const sale = await db.sale.findUnique({ 
            where: { id },
            include:{

                User:{
                    select:{
                        name:true,
                        lastName:true
                    }
                },
                SaleItem:{
                    include:{
                        Product:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
            
        })

        if (sale === null) return { ok: false, sale: sale }

        return { ok: true, sale: sale }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }
}