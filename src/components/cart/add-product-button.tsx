"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";
import type { CartProduct, Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { sleep } from "@/lib/utils";
import { useState } from "react";
type Props={
	product:Product
}

export function AddCartProductButton( {product} : Props )  {
	const addCartProduct = useCartStore(state => state.addProduct)
	const [loading, setLoading] = useState(false)

	const addToCart = async () => {
		setLoading(true)

		await sleep(1000)
		const cartProduct : CartProduct ={
			id: product.id,
			name: product.name,
			description:product.description,
			price: parseFloat(product.price),
			discount: parseFloat(product.discount),
			maxQuantity: Math.min(product.stock, product.orderLimit),
			quantity: 1,
			category:product.category,
			img:product.img
			
		}

		addCartProduct(cartProduct)
		setLoading(false)
	}


	return (
		<Button size={"icon"} onClick={addToCart} disabled={loading} className={loading ? "shadow-lg shadow-primary/40 ":" "}>
			{loading ? (
				<AiOutlineLoading size={18} className="animate-spin ease-in-out"/>
			):(
				<MdOutlineShoppingCart size={18}/>
			)}

		</Button>	
	);
}