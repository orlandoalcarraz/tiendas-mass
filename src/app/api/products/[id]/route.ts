import { NextResponse } from "next/server";
import { ProductFormData } from "@/types";
import { ProductSchema } from "@/Schemas";
import { deleteProduct, getProductById, updateProduct } from "../../helpers/product-actions";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary"



cloudinary.config({
    cloud_name:"dlvusqcul",
    api_key:"124597952859627",
    api_secret:"piJbCjGxA4jMGf4HXFETwP0wE0Y"
})

type Params = {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: Params) {

    const { id } = params

    const productId = parseInt(id, 10)

    if (isNaN(productId) || productId < 0) {
        return NextResponse.json({message: "ID de producto inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    const { ok, error, product } = await getProductById(productId)

    if (!ok) {
        const errorMessage = error || "No se encontró un producto con ese ID";
        return NextResponse.json({ message: errorMessage }, { status: 404 })
    }


    if (product) {
        const productResponse: ProductFormData = {
            name: product.name,
            description: product.description,
            status: product.status ? "1" : "0",
            category: product.category,
            price: product.price.toFixed(2).toString(),
            discount: product.discount.toString(),
            orderLimit: product.orderLimit.toString(),
            img:product.img
        }

        return NextResponse.json({ product: productResponse }, { status: 200 })
    } else {
        return NextResponse.json({message: "ID de producto inválida", error: "No se encontró un producto con ese ID" }, { status: 404 })
    }

}





export async function PUT(request: Request, { params }: Params) {

    const rawBody: ProductFormData = await request.json()

    const body = ProductSchema.parse(rawBody)

    const { name, description, category, price, discount,orderLimit, status,img } = body

    const { id } = params

    const productId = parseInt(id, 10)

    if (isNaN(productId) || productId < 0) {
        return NextResponse.json({message: "ID de producto inválida", error: "No modificar manualmente la url" }, { status: 400 })
    }

    let imageUrl: string | undefined=""

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

    const productBody = {
        status: status==="1",
        name: name,
        description: description,
        price: parseFloat(price),
        discount: parseFloat(discount),
        category: category,
        orderLimit: parseInt(orderLimit),
        image: imageUrl || "PENDIENTE",
    }

    const { ok, error, product } = await updateProduct(productId, productBody)
    
    const errorMessage = error?.msg || "No se encontró un producto con ese ID"
    const errorDetails = error?.details || ""

    if (!ok) return NextResponse.json({ message: errorMessage, error: errorDetails}, { status: 404 })


    if (product) {
        return NextResponse.json({ provider: product }, { status: 200 })
    } else {
        return NextResponse.json({ message: errorMessage, error: errorDetails }, { status: 500 })
    }

}





export async function DELETE(request: Request, { params }: Params) {

    const { id } = params

    const productId = parseInt(id, 10)

    if (isNaN(productId) || productId < 0) {
        return NextResponse.json({message: "ID de producto inválida", error: "No modificar manualmente la URL" }, { status: 400 })
    }


    const { ok, error, product } = await deleteProduct(productId)
    
    const errorMessage = error?.msg || "No se encontró un producto con ese ID"
    const errorDetails = error?.details || ""

    if (!ok) return NextResponse.json({ message: errorMessage, error: errorDetails}, { status: 404 })


    if (product) {
        return NextResponse.json({ provider: product }, { status: 200 })
    } else {
        return NextResponse.json({ message: errorMessage, error: errorDetails }, { status: 500 })
    }

}