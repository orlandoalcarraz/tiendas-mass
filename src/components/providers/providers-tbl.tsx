'use client';
import { useState, useEffect } from "react";
import { Provider } from "@/types";
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
import { DeleteProviderDialog } from "./delete-provider-dialog";
import { Button } from "../ui/button";

type SortConfig = {
    key: keyof Provider;
    order: 'asc' | 'desc';
}

type Props = {
    query: string;
    status: string;
    page: number;
    limit: number;
}

export default function ProvidersTbl({ page, limit, status, query }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'asc' })
    const [providers, setProviders] = useState<Provider[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [open, setOpen] = useState(false)
    const [providerDelete, setProviderDelete] = useState<Provider>()
    const [refreshKey, setRefreshKey] = useState(0)
    const [providersCount,setProvidersCount]=useState(limit)

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1)
    }

    const handleOpenChange = (newState: boolean) => {
        setOpen(newState)
    }
    const handleSort = (key: keyof Provider) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...providers].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        })

        setProviders(sortedData);
    }

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/providers?page=${page}&query=${query}&status=${status}&limit=${limit}`);
                const {totalPages,providers} = await response.json()

                setTotalPages(totalPages)
                setProviders(providers)
                setProvidersCount(providers.length)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProviders()

    }, [page, limit, query, status,refreshKey])

    return (
        <Card x-chunk="providers-table">
            <CardHeader>
                <CardTitle>Proveedores</CardTitle>
                <CardDescription>Administra la información de tus proveedores</CardDescription>
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
                                Ruc
                            </td>
                            <td>
                                Nombre
                            </td>
                            <td className="max-xs:hidden">
                                Número
                            </td>
                            <td className="max-md:hidden">
                                Correo
                            </td>
                            <td className="max-sm:hidden">
                                Estado
                            </td>
                            <td className="max-xl:hidden">
                                Creado
                            </td>
                            <td className="max-xl:hidden">
                                Modificado
                            </td>
                            <td className="">

                            </td>
                        </tr>
                    </thead>
                    <tbody className="max-sm:text-xs relative">
                        {loading ? (
                            <TableSkeleton rows={Math.min(limit,providersCount)} />
                        ) : (
                            providers.length > 0 ? (
                                providers.map((provider, index) => (
                                    <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                                        <td className=" rounded-l-lg">
                                            {provider.id}
                                        </td>
                                        <td className=" max-lg:hidden">
                                            {provider.ruc}
                                        </td>
                                        <td className="truncate max-2xl:max-w-40">
                                            {provider.name}
                                        </td>
                                        <td className="max-xs:hidden">
                                            {provider.number}
                                        </td>
                                        <td className="max-md:hidden">
                                            {provider.email}
                                        </td>
                                        <td
                                            className={`max-sm:hidden text-shadow-lg ${provider.status ? "text-green-500 shadow-green-500/50" : "text-red-500 shadow-red-500/50"}`}
                                        >
                                            {provider.status ? "Activo" : "Inactivo"}
                                        </td>
                                        <td className="max-xl:hidden">
                                            {provider.created}
                                        </td>
                                        <td className="max-xl:hidden">
                                            {provider.updated}
                                        </td>
                                        <td className="rounded-r-lg space-x-2 ">
                                            <Popover>
                                                <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background block duration-300"><MdOutlineUnfoldMore size={20} /></PopoverTrigger>
                                                <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                                    {/* <Link href={`/admin/providers/${provider.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                        <AiOutlineInfoCircle size={18} /> Información
                                                    </Link> */}
                                                    <Link href={`/admin/providers/edit/${provider.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                        <FiEdit size={18} /> Editar
                                                    </Link>
                                                    <button onClick={() => { setProviderDelete(provider), handleOpenChange(true) }} className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><RiDeleteBin6Line size={18} /> Eliminar</button>
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
            <DeleteProviderDialog open={open} provider={providerDelete} handleOpenChange={handleOpenChange} handlRefresh={handleRefresh}/>
        </Card>
    )
}
