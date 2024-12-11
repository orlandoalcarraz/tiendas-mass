"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";
import { Product, PurchaseItemFormData } from "@/types";
import { usePurchaseStore } from "@/store/purchase-store";



type Props={
	product:Product
}

export function AddPurchaseItemButton( {product} : Props )  {
	const addCartProduct = usePurchaseStore(state => state.addItems)
	const cart = usePurchaseStore(state => state.purchaseItems)

	const addToCart = async () => {

		const cartProduct : PurchaseItemFormData ={
			id: product.id,
			name: product.name,
			price: 0,
			quantity: 1
		}

		addCartProduct(cartProduct)
	}

	const inCart = () => {
		return cart.some(item => item.id === product.id)
	}


	return (
		<Button onClick={addToCart} variant={"ghost"} disabled={inCart()} className={"w-full justify-start "}>
            {product.name}
		</Button>	
	);
}