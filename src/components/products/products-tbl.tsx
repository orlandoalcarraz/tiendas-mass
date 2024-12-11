"use client";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { useState,useEffect } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";
import { Pagination } from "../ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/types/product-types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import TableSkeleton from "../skeletons/table-skeleton";
import { DeleteProductDialog } from "./delete-product-dialog";
import { sleep } from "@/lib/utils";
import { Button } from "../ui/button";


type SortConfig = {
	key: keyof Product
	order: "asc" | "desc"
}

type Props = {
    query: string
    status: string
    page: number
    limit: number
}

export default function ProductsTbl({query,status,page,limit} : Props ) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({key: "id",order: "asc",})
	const [products, setProducts] = useState<Product[]>([])
	const [loading,setLoading] = useState<boolean>(true)
	const [totalPages, settotalPages] = useState<number>(0)
	const [open, setOpen] = useState(false)
    const [productDelete, setProductDelete] = useState<Product>()
    const [refreshKey, setRefreshKey] = useState(0)
	const [productsCount,setProductsCount] = useState(limit)

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1)
    }

    const handleOpenChange = (newState: boolean) => {
        setOpen(newState)
    }

	
	const handleSort = (key: keyof Product) => {
		const order = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc"

		setSortConfig({ key, order })
		
		const sortedData = [...products].sort((a, b) => {
			if (a[key] < b[key]) {
				return order === "asc" ? -1 : 1
			}

			if (a[key] > b[key]) {
				return order === "asc" ? 1 : -1
			}

			return 0
		})

		setProducts(sortedData)
	}

    useEffect(() => {

        const fetchProducts = async () => {
			setLoading(true)
            try {
                const response = await fetch(`/api/products?page=${page}&query=${query}&status=${status}&limit=${limit}`)
                const {totalPages,products} = await response.json()
                settotalPages(totalPages)
                setProducts(products)
				setProductsCount(products.length)

            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false);
            }
        }

        fetchProducts()
    }, [page, limit, query, status,refreshKey])
	

	return (
	<Card>
	    <CardHeader>
            <CardTitle>Productos</CardTitle>
            <CardDescription>Administra tus productos y visualiza su rendimiento de ventas.</CardDescription>
        </CardHeader>
		<CardContent>
			<table className="table-auto text-center w-full text-sm ">
				<thead className=" border-b relative w-full">
					<tr className="h-16 w-full">
						<td className="max-w-20">
							<Button
								onClick={() => handleSort("id")}
								variant={"ghost"}
							>
								<HiOutlineArrowsUpDown />
								Id
							</Button>
						</td>
						<td className="max-w-96">
							<Button
								onClick={() => handleSort("name")}
								variant={"ghost"}
							>
								<HiOutlineArrowsUpDown />
								Nombre
							</Button>
						</td>
						<td className="max-sm:hidden">Estado</td>
						<td className="max-sm:hidden">
							<Button
								onClick={() => handleSort("price")}
								variant={"ghost"}
							>
								<HiOutlineArrowsUpDown />
								Precio
							</Button>
						</td>
						<td className="max-lg:hidden">Descuento</td>
						<td className="max-lg:hidden">Creado</td>
						<td className="max-lg:hidden">Modificado</td>
						<td></td>
					</tr>
				</thead>
				<tbody className="max-sm:text-xs relative">
					{ loading ? (
						
						<TableSkeleton rows={Math.min(limit,productsCount)}/>
					):(
					products.length > 0 ? (
						products.map((product, index) => (
							<tr
								key={index}
								className="hover:bg-muted/50  duration-300 relative h-24"
							>
								<td className=" rounded-l-lg">{product.id}</td>
	
								<td className=" ">{product.name}</td>
								<td
									className={`max-sm:hidden  text-shadow-lg ${product.status
											? "text-green-500 shadow-green-500/50"
											: "text-red-500 shadow-red-500/50"
										}`}
								>
									{product.status ? "Activo" : "Inactivo"}
								</td>
								<td className="max-sm:hidden">S/ {parseFloat(product.price).toFixed(2)}</td>
								<td className="max-lg:hidden">S/ {parseFloat(product.discount).toFixed(2)}</td>
								<td className="max-lg:hidden">{product.created}</td>
								<td className="max-lg:hidden">{product.updated}</td>
								<td className="rounded-r-lg space-x-2 ">
									<Popover>
										<PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
											<MdOutlineUnfoldMore size={20} />
										</PopoverTrigger>
										<PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm w-auto ">
											{/* <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
												<AiOutlineInfoCircle size={18} /> Información
											</Link> */}
											<Link href={`/admin/products/edit/${product.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
												<FiEdit size={18} /> Editar
											</Link>
											<button  onClick={() => { setProductDelete(product), handleOpenChange(true) }} className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
												<RiDeleteBin6Line size={18} /> Eliminar
											</button>
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
		<DeleteProductDialog open={open} product={productDelete} handleOpenChange={handleOpenChange} handlRefresh={handleRefresh}/>
	</Card>
	);
}
