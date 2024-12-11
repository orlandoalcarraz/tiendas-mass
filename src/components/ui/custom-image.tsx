import Image from "next/image";
import { CATEGORIES } from "@/data/categories";

type Props = {
    src: string
    width: number
    height: number
    category: string | undefined
    className?: string
    alt: string
};

export default function CustomImage({ src, width, height, category, className, alt }: Props) {

    const categoryData = CATEGORIES.find(cat => cat.slug === category)

    return (
        <>
            {src !== "PENDIENTE" ? (
                <Image
                    src={src}
                    width={width}
                    height={height}
                    className={className}
                    alt={alt}
                />
            ) : (
                categoryData?.icon && (
                    <categoryData.icon size={50} className={"text-muted"} aria-label={alt} />
                )
            )}
        </>
    );
}