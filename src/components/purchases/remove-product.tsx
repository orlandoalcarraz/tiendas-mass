"use client"
import { usePurchaseStore } from "@/store/purchase-store";
import { Button } from "../ui/button";
import { CiTrash } from "react-icons/ci";
import { PurchaseItemFormData } from "@/types";

type Props={
    product:PurchaseItemFormData
}

export default function RemoveProductPurchaseButton({product}:Props) {
    
    const removeProduct = usePurchaseStore(state => state.removeItem)


    return (
        <Button size={"icon"} variant={"outline"} onClick={ ()=> removeProduct(product) }>
            <CiTrash size={22}/>
        </Button>
    )
}