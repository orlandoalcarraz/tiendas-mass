import { CATEGORIES } from "@/data/categories";

import Link from "next/link";

export default function GridCategories() {
    return (
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8 grid-flow-row gap-[2px] bg-secondary">
            {
            CATEGORIES.map((category, index) => {
                const Icon = category.icon
                return (
                    <Link href={`/category/${category.slug}`} key={index} className='bg-background flex-center flex-col gap-5 h-32 hover:bg-secondary hover:text-primary duration-200'>
                        <Icon size={40}/>
                        {category.name}
                    </Link>
                );
            })
            }
        </div>
    );
}
