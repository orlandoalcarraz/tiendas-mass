import Link from "next/link";
import ProductsTbl from "@/components/products/products-tbl";
import { IoAddCircleOutline } from "react-icons/io5";
import {ToogleStatus} from "@/components/filters";
import {SearchByName} from "@/components/filters";
import {ToogleLimit} from "@/components/filters";
import { Button } from "@/components/ui/button";


export default function Page({searchParams}:any) {
    const query = searchParams?.query || ''
    const limit = Number(searchParams?.limit) || 5
    const currentPage = Number(searchParams?.page) || 1
    const status = searchParams?.status || 'all'

    return (
        <>
            <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
                <div className="space-y-2 max-sm:w-full">
                    <SearchByName className="sm:w-96 "/>
                    <ToogleLimit/>
                    <ToogleStatus/>
                </div>

                <Button variant={"secondary"} asChild>
                    <Link href={"/admin/products/create"} className="max-sm:w-full flex gap-2 ">
                        <IoAddCircleOutline size={22}/> Agregar Producto 
                    </Link> 
                </Button>
            </section>
            
            <ProductsTbl page={currentPage} limit={limit} query={query} status={status} />

        </>
    );
}