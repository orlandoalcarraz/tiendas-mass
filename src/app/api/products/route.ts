import { NextResponse } from "next/server";
import { ProductFormData } from "@/types";
import { ProductSchema } from "@/Schemas";
import { createProduct, getProducts, getProductsPages } from "@/app/api/helpers/product-actions";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary"



cloudinary.config({
    cloud_name:"dlvusqcul",
    api_key:"124597952859627",
    api_secret:"piJbCjGxA4jMGf4HXFETwP0wE0Y"
})


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const hasStock = searchParams.get("hasStock") || ""
    const category= searchParams.get("category") || ""
    const max= searchParams.get("max") || "100"
    const order = searchParams.get("order") || "asc"
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

    const hasStockMap: { [key: string]: boolean | null } = {
        "true": true,
    }
    const stockValue = hasStockMap[hasStock] ?? null

    const data = await getProducts({ query, page, limit, status: statusValue ,category,hasStock:stockValue,max:parseInt(max),order})
    const totalPages = await getProductsPages({ query, page, limit, status: statusValue,category,hasStock:stockValue })

    return NextResponse.json({
        products: data,
        totalPages: totalPages,
    })

}


export async function POST(request: Request) {
    try {
        const rawBody: ProductFormData = await request.json()


        const body = ProductSchema.parse(rawBody)
        const { name, description, price, discount, category, status, orderLimit, img } = body

        let imageUrl: string | undefined ="PENDIENTE"


        if (img && img !== "PENDIENTE") {
            const imageBuffer = Buffer.from(img.split(',')[1], 'base64')

            const CloudinaryResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(result)
                }).end(imageBuffer)
            })

            imageUrl = CloudinaryResponse?.secure_url
        }


        const product = {
            status: status === "1",
            name: name,
            description: description,
            price: parseFloat(price),
            discount: parseFloat(discount),
            category: category,
            orderLimit: parseInt(orderLimit),
            image: imageUrl, 
        };


        const newProduct = await createProduct(product)

        const newProductResponse = {
            ...newProduct,
            product: {
                id: newProduct.product?.id.toString(),
                name,
                description,
                price,
                discount,
                orderLimit,
                status: product.status,
            },
        }

        if (newProductResponse.success) {
            return NextResponse.json(
                { message: "Producto creado exitosamente", product: newProductResponse.product },
                { status: 201 }
            )
        }

        return NextResponse.json(
            { message: newProductResponse.error?.msg, error: newProductResponse.error?.details },
            { status: 500 }
        );
    } catch (error) {
        console.error("Error en el registro del producto en la REST API:", error)

        return NextResponse.json(
            { message: "Error en el registro del producto en la REST API:", error: error || "Error desconocido en la REST API" },
            { status: 500 }
        )
    }
}