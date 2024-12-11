'use client';
import { useState, useEffect } from "react";
import { Purchase } from "@/types";
import { AiOutlineInfoCircle } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";
import { Pagination } from "../ui";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TableSkeleton from "../skeletons/table-skeleton";
import { Button } from "../ui/button"


type SortConfig = {
    key: keyof Purchase
    order: 'asc' | 'desc'
}

type Props = {
    query: string
    page: number
    limit: number
}

export default function PurchasesTbl({ page, limit, query }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'asc' })
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [purchasesCount,setPurchasesCount]=useState(limit)

    const handleSort = (key: keyof Purchase) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...purchases].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        })

        setPurchases(sortedData)
    }

    useEffect(() => {
        const fetchPurchases = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/purchases?page=${page}&query=${query}&limit=${limit}`)
                const {totalPages,purchases} = await response.json()

                setTotalPages(totalPages)
                setPurchases(purchases)
                setPurchasesCount(purchases.length)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPurchases()

    }, [page, limit, query])

    return (
        <Card x-chunk="purchases-table">
            <CardHeader>
                <CardTitle>Compras</CardTitle>
                <CardDescription>Visualiza las compras registradas</CardDescription>
            </CardHeader>
            <CardContent>
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
                                No. Comprobante
                            </td>
                            <td>
                                Proveedor
                            </td>
                            <td className="max-xs:hidden">
                                Tipo
                            </td>
                            <td className="max-md:hidden">
                                Fecha/Compra
                            </td>
                            <td className="max-sm:hidden">
                                Importe
                            </td>
                            <td className="max-xl:hidden">
                                Registrado
                            </td>
                            <td>

                            </td>
                        </tr>
                    </thead>
                    <tbody className="max-sm:text-xs relative">
                        {loading ? (
                            <TableSkeleton rows={Math.min(limit,purchasesCount)} />
                        ) : (
                            purchases.length > 0 ? (
                                purchases.map((purchase, index) => (
                                    <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                                        <td className=" rounded-l-lg">
                                            {purchase.id}
                                        </td>
                                        <td className=" max-lg:hidden">
                                            {purchase.receiptNumber}
                                        </td>
                                        <td className="truncate max-2xl:max-w-40">
                                            {purchase.providerName}
                                        </td>
                                        <td className="max-xs:hidden">
                                            {purchase.receiptType}
                                        </td>
                                        <td className="max-md:hidden">
                                            {purchase.receiptDate}
                                        </td>
                                        <td className="max-xl:hidden">
                                            S/ {parseFloat(purchase.totalPrice).toFixed(2)}
                                        </td>
                                        <td className="max-xl:hidden">
                                            {purchase.created}
                                        </td>
                                        <td className="rounded-r-lg space-x-2">
                                            <Popover>
                                                <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background block duration-300"><MdOutlineUnfoldMore size={20} /></PopoverTrigger>
                                                <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                                    <Link href={`/admin/purchases/${purchase.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                        <AiOutlineInfoCircle size={18} /> Información
                                                    </Link> 

                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="relative h-24">
                                    <td colSpan={9} className="text-center py-4">No hay datos disponibles</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </CardContent>
            <CardFooter>
                <Pagination totalPages={totalPages}/>
            </CardFooter>
        </Card>
    )
}
