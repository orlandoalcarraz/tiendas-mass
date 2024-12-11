"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AddCartProductButton } from "../cart/add-product-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types/product-types";
import ProductsGridSkeleton from "../skeletons/products-grid-skeleton";
import { sleep } from "@/lib/utils";
import CustomImage from "../ui/custom-image";


type Props = {
    category?:string,
    hasStock:string
    query: string;
    page: number;
    limit: number;
    status: string;
    max:number;
    order:string
}

export default function ProductsGrid({ query, page, limit, status,category,hasStock,order,max }: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, settotalPages] = useState<number>(0)


    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const categoryParam = category ? `&category=${encodeURIComponent(category)}` : ''
                const response = await fetch(`/api/products?page=${page}&query=${query}&max=${max}&order=${order}&limit=${limit}&status=${status}&hasStock=${hasStock}${categoryParam}`)
                const {totalPages,products} = await response.json()


                settotalPages(totalPages)
                setProducts(products)

            } catch (error) {
                console.error("Error:", error)
            } finally {

                setLoading(false);
            }
        }

        fetchProducts()
    }, [page, limit, query,category,hasStock,status,max,order])


    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-5">

            {
                loading ? (
                    <ProductsGridSkeleton items={15} />
                ) : (
                    products.length > 0 ? (
                        products.map((product, index) => (
                            <article key={index} >
                                <Card className=" p-3 h-44 sm:h-80 relative flex sm:flex-col max-sm:items-center sm:justify-between max-sm:rounded-none hover:bg-muted/40 duration-200">
                                    <CardHeader className="p-0 max-sm:ml-2">
                                        <CardTitle className="text-base">{product.name}</CardTitle>
                                        <CardDescription className="text-base">{product.description}</CardDescription>
                                        <span className="leading-none sm:hidden dark:text-white text-primary-foreground">S/ {product.price}</span>
                                    </CardHeader>
                                    <CardContent className="p-0 py-2 flex-center max-sm:order-first">
                                        <CustomImage src={product.img} width={140} height={140} alt="a" category={category} className="max-sm:h-24 max-sm:w-auto"/>
                                    </CardContent>
                                    <CardFooter className="p-0 flex justify-between max-sm:order-last max-sm:ml-auto ">
                                        <span className="leading-none max-sm:hidden">S/ {parseFloat(product.price).toFixed(2)}</span>
                                        <AddCartProductButton product={product} />
                                    </CardFooter>
                                </Card>
                            </article>
                        ))
                    ) : (
                        <div className="relative h-96 col-span-5 text-center w-full">
                            No hay productos disponibles
                        </div>
                    ))
            }

        </div>
    );
}