"use client"
import { useCartStore } from "@/store/cart-store";
import { Button } from "../ui/button";
import { CiTrash } from "react-icons/ci";
import { CartProduct } from "@/types";

type Props={
    product:CartProduct
}

export default function RemoveProductButton({product}:Props) {
    
    const removeProduct = useCartStore(state => state.removeProduct)


    return (
        <Button size={"icon"} variant={"outline"} onClick={ ()=> removeProduct(product) }>
            <CiTrash size={22}/>
        </Button>
    );
}