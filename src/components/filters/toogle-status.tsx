'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function ToogleStatus() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const currentStatus = searchParams.get('status') || "all"

    function handleOrder(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('status', term)
        } else {
            params.delete('status')
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
                <SelectItem value="en">Activo</SelectItem>
                <SelectItem value="dis">Inactivo</SelectItem>
            </SelectContent>
        </Select>
    );
}