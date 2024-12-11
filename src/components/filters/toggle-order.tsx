'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ToogleOrder() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()


    function handleOrder(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('order', term)
            params.set('page', '1')
        } else {
            params.delete('order')
            params.set('page', '1')
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
    return (
        <Select onValueChange={handleOrder} defaultValue={searchParams.get('order') ? searchParams.get('order')?.toString() : undefined}>
            <SelectTrigger className="lg:max-w-96 w-full h-12 hover:bg-secondary">
                <span>Ordernar Por: </span>
                <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={10} hideWhenDetached>
                <SelectItem value="asc">Precio ascendente</SelectItem>
                <SelectItem value="desc">Precio descendente</SelectItem>
            </SelectContent>
        </Select>
    );
}