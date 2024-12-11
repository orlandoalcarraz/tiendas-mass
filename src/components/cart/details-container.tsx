"use client"
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

export function CartDetails() {
    const cartQuantity = useCartStore(state => state.getTotalProductsQuantity())
    const totalPrice = useCartStore(state => state.getTotalProductsPrice())
    const totalDiscount = useCartStore(state => state.getTotalDiscount())
    const finalPrice = useCartStore(state => state.getFinalPrice())
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)

    }, [])

    return (
        <>
            {
                loaded && (
                    <>

                        <div className="w-full flex items-center justify-between">
                            <span className="text-lg tracking-tight leading-none">Cantidad de Productos:</span>
                            <span>{cartQuantity}</span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <span className="text-lg tracking-tight leading-none">Total Productos:</span>
                            <span>S/ {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <span className="text-lg tracking-tight leading-none">Total Descuento:</span>
                            <span>S/ {totalDiscount.toFixed(2)}</span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <span className="text-lg tracking-tight leading-none">Total:</span>
                            <span>S/ {finalPrice.toFixed(2)}</span>
                        </div>
                    </>
                )
            }
        </>
    );
}