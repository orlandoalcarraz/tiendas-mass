import { CATEGORIES } from "@/data/categories";
import {SearchByName} from "@/components/filters";
import { Button } from "@/components/ui/button";
import { RxCaretLeft } from "react-icons/rx";
import FiltersContainer from "@/components/shop/filters-container";
import Link from "next/link";
import ProductsGrid from "@/components/shop/products-grid";


export default function Page({ params, searchParams }: { params: { slug: string }; searchParams:any }) {
    const category = CATEGORIES.find((category) => category.slug === params.slug)
    const Icon = category?.icon

    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const max = Number(searchParams?.max) || 100
    const order = searchParams?.order|| "asc"
    const limit = 15
    const status = 'en'
    const hasStock='true'

    return (
        <main className="relative w-full flex flex-col gap-10 pt-10 pb-24">
            <section className="container flex sm:items-center gap-5 max-sm:flex-col">
                <Button asChild variant={"outline"} size={"icon"} className="rounded-full h-10 w-10">
                    <Link href={"/"} >
                        <RxCaretLeft size={40}/>
                    </Link>
                </Button>
                {category ? (
                    <div className="flex items-center gap-3 py-2">
                        {Icon && <Icon size={60} className=" text-primary"/>}
                        <h2 className="text-4xl">{category.name}</h2>
                    </div>
                ) : (
                    <p>Categoría no encontrada</p>
                )}
            </section>

            <section className="container">
                <FiltersContainer/>
            </section>

            <section className="container">
                <SearchByName className="focus-visible:h-14"/>
            </section>

            <section className="relative sm:container">
                    <ProductsGrid page={currentPage} max={max} order={order} limit={limit} query={query} status={status} category={params.slug} hasStock={hasStock}/>
            </section>
        </main>
    );
}