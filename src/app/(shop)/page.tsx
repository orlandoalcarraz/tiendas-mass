

import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { ProductsCarousel } from "@/components/shop/products-carousel";
import { Button } from "@/components/ui/button";
import GridCategories from "@/components/shop/categories-grid";
import { CATEGORIES } from "@/data/categories";
import Link from "next/link";
import SearchProducts from "@/components/shop/search-products";
import UserWelcome from "@/components/session/user-welcome";

export default function Page({searchParams}:any) {
	
    const limit = 8
    const status = 'en'
	const hasStock='true'

	return (
		<>
			<main className="w-full flex flex-col gap-16 pt-10 pb-24 px-2 sm:px-5">

				<section className="relative container flex-center my-5 sm:my-10">
					<UserWelcome/>
				</section>

				<section className="relative w-full">
					<GridCategories/>
				</section>

				<section className="container relative ">
					<SearchProducts/>
				</section>
				{
					CATEGORIES.map((category,index)=>(
						<section key={index} className="relative container space-y-5 max-sm:p-0" >
							<div className="flex justify-between items-end">
								<div className="flex flex-col gap-2">
									<div className="flex gap-2 items-center">
										<Image src={"/mass_icon.png"} width={30} height={20} alt="" className="dark:invert"/>
										<h2 className="text-lg sm:text-xl leading-none tracking-tight">{category.name}</h2>
									</div>
									<p className="text-muted-foreground">Lo más vendido</p>
								</div>
								<Button asChild variant={"link"} className="text-lg">
									<Link href={`/category/${category.slug}`} >
										Ver Más
									</Link>
								</Button>
							</div>
							<ProductsCarousel category={category.slug} limit={limit} status={status} hasStock={hasStock}/>
						</section>
					))
				}

			</main>
		</>
	);
}