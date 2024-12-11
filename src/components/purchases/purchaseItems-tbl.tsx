'use client';
import { useState, useEffect } from "react";
import { Purchase, PurchaseItem } from "@/types";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

import { Button } from "../ui/button"


type SortConfig = {
    key: keyof PurchaseItem
    order: 'asc' | 'desc'
}

type Props = {

    items: PurchaseItem[]

}

export default function PurchasesItemsTbl({ items }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'asc' })
    const [purchaseItems, setItems] = useState<PurchaseItem[]>(items)
    const [loading, setLoading] = useState<boolean>(true)


    const handleSort = (key: keyof PurchaseItem) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...items].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        })

        setItems(sortedData)
    }


    return (

        <table className="table-auto text-center text-sm w-full">
            <thead className=" border-b relative text-sm w-full">
                <tr className="h-16 w-full">
                    <td >
                        <Button
                            onClick={() => handleSort('id')}
                            variant={"ghost"}>

                            <HiOutlineArrowsUpDown />
                            Id
                        </Button>
                    </td>
                    <td className="max-lg:hidden">
                        Producto
                    </td>
                    <td>
                        Cantidad
                    </td>
                    <td className="max-xs:hidden">
                        Precio/Compra
                    </td>
                    <td className="max-md:hidden">
                        Importe
                    </td>

                </tr>
            </thead>
            <tbody className="max-sm:text-xs relative">
                {

                    purchaseItems.map((purchase, index) => (
                        <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                            <td className=" rounded-l-lg">
                                {purchase.id}
                            </td>
                            <td className=" max-lg:hidden">
                                {purchase.productName}
                            </td>
                            <td className="truncate max-2xl:max-w-40">
                                {purchase.quantity}
                            </td>
                            <td className="max-xs:hidden">
                               S/ {purchase.price}
                            </td>
                            <td className="max-xs:hidden">
                                S/ {purchase.totalPrice}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}
