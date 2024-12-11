import db from "@/lib/db"
import { ProductDTO } from "@/types"
import {formatDate} from "@/lib/utils"
import { Prisma } from '@prisma/client';

export const createProduct = async (product: ProductDTO) => {
    const { status, name,description, price, discount,orderLimit,category,image } = product

    try {
        const newProduct = await db.product.create({
            data: {
                status,
                stock:0,
                name,
                description,
                price,
                category,
                orderLimit,
                discount,
                img:image
            }
        })


        return { success: true, product: newProduct }

    } catch (error: any) {
        console.error("Error en el registro del producto en la BD:", error.meta?.target[0])

        return {
            success: false,
            error: {
                msg: "Error en el registro del producto en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

export const updateProduct = async (id: number, product: ProductDTO) => {
    const { status, name, description, price, discount, orderLimit, category,image } = product

    try {
        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                status,
                name,
                description,
                category,
                price,
                discount,
                orderLimit,
                img:image
            }
        })


        return { ok: true, product: updatedProduct }

    } catch (error: any) {

        return {
            ok: false,
            error: {
                msg: "Error en la actualizacion del producto en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

export const deleteProduct = async (id:number) => {
    try {
        
        const deletedProduct = await db.product.delete({
            where:{
                id
            }
        })

        return {ok:true, product:deletedProduct}

    } catch (error:any) {
        console.log(error)
        return {
            ok: false,
            error: {
                msg: "Error en la eliminación del producto en la BD",
                details: error.meta?.target[0] || "Error desconocido en la BD",
            }
        }
    }
}

type GetProductsProps = {
    hasStock?:boolean | null
    category?:string
    max?:number,
    order?:string,
    query: string,
    limit: number,
    page: number,
    status: boolean | null
}

export const getProducts = async ({ page, query, limit, status, category, hasStock, max, order }: GetProductsProps) => {
    try {
        const pages = page || 1;
        const skip = (pages - 1) * limit;
        const conditions: Prisma.ProductWhereInput[] = [];


        if (hasStock !== null && hasStock !== undefined && hasStock) {
            conditions.push({ stock: { gt: 0 } });
        }


        if (query) {
            conditions.push({ name: { contains: query, mode: Prisma.QueryMode.insensitive } });
        }


        if (category) {
            conditions.push({ category: { contains: category } });
        }


        if (status !== null && status !== undefined) {
            conditions.push({ status });
        }

        if (max !== null && max !== undefined) {
            conditions.push({ price: { lte: max } });
        }


        const products = await db.product.findMany({
            where: {
                AND: conditions,
            },
            skip: skip,
            take: limit,
            orderBy: order
                ? { price: order === 'asc' ? 'asc' : 'desc' }
                : undefined, 
        });

 
        const formattedProducts = products.map((product) => ({
            ...product,
            created: formatDate(new Date(product.created)),
            updated: formatDate(new Date(product.updated)),
        }));

        return formattedProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductsInventory= async({ page, query, limit, status }: GetProductsProps)=>{
    try {

        const pages = page || 1
        const skip = (pages - 1) * limit

        let conditions=[]

        if (query) conditions.push({ name: { contains: query,mode:Prisma.QueryMode.insensitive  } })
        
        if (status !== null && status !== undefined) conditions.push({ status })
        

        const products = await db.product.findMany({
            select:{
                id:true,
                name:true,
                stock:true,
                lastStockEntry:true,
                status:true
            },
            where:{
                AND:conditions
            },
            skip: skip,
            take: limit,

            
        })

        const formattedProducts = products.map((product) => ({
            ...product,
            lastStockEntry: product.lastStockEntry !== null ? formatDate(new Date(product.lastStockEntry)) : null,
        }))

        return formattedProducts

    } catch (error) {

        return []

    }
}

export const getProductsPages = async  ({ query, limit, status,category,hasStock }: GetProductsProps) => {
    try {
        const conditions = []

        if (hasStock!== null && hasStock !== undefined && hasStock)  conditions.push({ stock: { gt: 0 } })

        if (query) conditions.push({ name: { contains: query,mode:Prisma.QueryMode.insensitive  } })
        

        if (category) conditions.push({ category: { contains: category } })
        

        if (status !== null && status !== undefined) conditions.push({ status })


        const totalProducts = await db.product.count({
            where: {
                AND: conditions,
            },
        });

        const totalPages = Math.ceil(totalProducts / limit)

        return totalPages

    } catch (error) {
        return 0
    }
}



export const getProductById = async (id: number) => {
    try {

        const product = await db.product.findUnique({ where: { id } })

        if (product === null) return { ok: false, product: product }

        return { ok: true, product: product }

    } catch (error: any) {

        return {
            ok: false,
            error: error
        }
    }
}