'use client';

import { useState, useEffect } from "react";

import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";
import TableSkeleton from "../skeletons/table-skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Pagination } from "@/components/ui";
import { AiOutlineInfoCircle } from "react-icons/ai";


export type Sale={
    id:number,
    created:string,
    transaction:string,
    userName:string,
    totalAmount:number,
    totalDiscount:number,
    totalPayment:number,
    paymentMethod:string,
    status:string
  }



type SortConfig = {
    key: keyof Sale;
    order: 'asc' | 'desc';
}

type Props = {
    query: string;
    status: string;
    page: number;
    limit: number;
}

export default function SalesTbl({ page, limit, status, query }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'asc' })
    const [sales, setSales] = useState<Sale[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, settotalPages] = useState<number>(0)

    const handleSort = (key: keyof Sale) => {
        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'
        setSortConfig({ key, order })

        const sortedData = [...sales].sort((a, b) => {
            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }
            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }
            return 0
        })

        setSales(sortedData);
    };

    useEffect(() => {

        const fetchSales = async () => {

            try {
                const response = await fetch(`/api/sales?page=${page}&query=${query}&statusSale=${status}&limit=${limit}`);
                const data = await response.json()

                settotalPages(data.totalPages)
                setSales(data.sales)

            } catch (error) {
                console.error("Error:", error)
            } finally {

                setLoading(false)
            }
        }

        fetchSales()
    }, [page, limit, query, status])

    return (
        <Card x-chunk="sales-table">
            <CardHeader>
                <CardTitle>Ventas</CardTitle>
                <CardDescription>Visualiza tus ventas</CardDescription>
            </CardHeader>
            <CardContent>
                <table className="table-auto text-center w-full relative">
                    <thead className=" border-b relative text-sm lg:text-base">
                        <tr className="h-16">
                            <td >
                                <button onClick={() => handleSort('id')} className='flex-center  gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded'>
                                    <HiOutlineArrowsUpDown />
                                    Id
                                </button>
                            </td>
                            <td >
                                Transacción
                            </td>
                            <td className="max-md:hidden">
                                Fecha
                            </td>
                            <td className="max-lg:hidden">
                                Cliente
                            </td>
                            <td className="">
                                Monto
                            </td>
                            <td className="max-md:hidden">
                                Descuento
                            </td>

                            <td className="max-xl:hidden">
                                Metodo
                            </td>
                            <td className="max-lg:hidden">
                                Estado
                            </td>
                            <td>

                            </td>
                        </tr>
                    </thead>
                    <tbody className=" text-xs sm:text-sm relative w-full">
                        {loading  ? ( 
                            <TableSkeleton rows={limit}/>
                         ) : (
                            sales.length > 0 ? (
                                sales.map((sale, index) => (
                                    <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                                        <td className="rounded-l-lg">{sale.id}</td>
                                        <td>{sale.transaction}</td>
                                        <td className="max-md:hidden">{sale.created}</td>
                                        <td className="max-lg:hidden">{sale.userName}</td>
                                        <td className="">S/ {sale.totalAmount}</td>
                                        <td className="max-md:hidden">S/ {sale.totalDiscount}</td>
                                        <td className="max-xl:hidden">
                                            {sale.paymentMethod}
                                        </td>
                                        <td className={`max-lg:hidden text-shadow-lg text-green-500 shadow-green-500/50`}>
                                            {sale.status}
                                        </td>
                                        <td className="rounded-r-lg space-x-2">
                                            <Popover>
                                                <PopoverTrigger className="p-2 rounded hover:shadow-xl hover:shadow-pressed/50 hover:bg-background duration-200">
                                                    <MdOutlineUnfoldMore size={20} />
                                                </PopoverTrigger>
                                                <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                                    <Link href={`/admin/sales/${sale.id}}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
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
                <Pagination totalPages={totalPages} />
            </CardFooter>
        </Card>
    );


}
