'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ToogleStatusSale() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const currentStatus = searchParams.get('statusSale') || "all"

    function handleOrder(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('statusSale', term)
        } else {
            params.delete('statusSale')
        }
        params.set('page', '1')
        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <Select onValueChange={handleOrder} defaultValue={currentStatus}>
            <SelectTrigger className=" max-w-64 w-full h-12 ">
                <span>Estado: </span>
                <SelectValue/>
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={10} hideWhenDetached>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pend">Pendiente</SelectItem>
                <SelectItem value="comp">Completo</SelectItem>
            </SelectContent>
        </Select>
    );
}