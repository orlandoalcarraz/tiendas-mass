import { Skeleton } from "../ui/skeleton";
type Props={
    items:number
}

export default function ProductsGridSkeleton({items}:Props) {
    const skeletonItems = Array(items).fill(null)
    return (
        <>
            {skeletonItems.map((_, index) => (
                <Skeleton key={index} className={`h-44 sm:h-80 relative max-sm:rounded-none max-sm:border border-border w-full ${index % 2 == 0 ? "duration-700" :"" }`}>

                </Skeleton>
            ))}
        </>
    );
}