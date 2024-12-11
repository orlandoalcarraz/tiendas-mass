import { Skeleton } from "../ui/skeleton";
import { CarouselItem } from "../ui/carousel";
type Props={
    items:number
}

export default function ProductsCarouselSkeleton({items}:Props) {
    const skeletonItems = Array(items).fill(null)
    return (
        <>
            {skeletonItems.map((_, index) => (
                
                <CarouselItem key={index} className={`pl-2 md:pl-5 basis-[65%] xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 `}>
                    <Skeleton className={`h-80 w-full ${index % 2 == 0 ? "duration-700" :"" }`}>

                    </Skeleton>
                </CarouselItem>
            ))}
        </>
    );
}