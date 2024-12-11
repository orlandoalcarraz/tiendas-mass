import ProductsGrid from "@/components/shop/products-grid";
import SearchProducts from "@/components/shop/search-products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxCaretLeft } from "react-icons/rx";

export default function Page({ searchParams }: any) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const max = Number(searchParams?.max) || 100
    const order = searchParams?.order|| "asc"
    const limit = 15
    const status = 'en'
    const hasStock='true'

    return (
        <main className="flex flex-col w-full gap-16 pt-10 pb-24">
            <section className="container relative flex sm:items-center gap-5 max-sm:flex-col">
                <Button asChild variant={"outline"} size={"icon"} className="rounded-full h-10 w-10">
                    <Link href={"/"} >
                        <RxCaretLeft size={40} />
                    </Link>
                </Button>
                {
                    query === "" ? (
                        <h2 className="text-5xl">Nuestros Productos</h2>
                    ) : (
                        <h2 className="text-4xl sm:text-5xl">Productos relacionados con  &quot;<span className="text-primary">{query}</span>&quot;</h2>

                    )
                }
            </section>
            <section className="container relative ">
                <SearchProducts />
            </section>
            <section className="relative sm:container">
                <ProductsGrid page={currentPage} max={max} order={order} limit={limit} query={query} status={status} hasStock={hasStock}/>
            </section>
        </main>
    );
}