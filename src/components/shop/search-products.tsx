"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

export default function SearchProducts() {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
            params.set('page', '1')
        } else {
            params.delete('query')
            params.set('page', '1')
        }
        push(`/search?${params.toString()}`, { scroll: true })
    }

    const debouncedHandleSearch = useDebouncedCallback(handleSearch, 500)
    
    return (
        <label className="relative flex-center ">
            <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                onChange={(e) => { debouncedHandleSearch(e.target.value)}}
                defaultValue={searchParams.get('query')?.toString()}
                placeholder="Buscar Productos"
                className="rounded-lg bg-background pl-8 w-full focus-visible:h-14 "
            />
        </label>
    );
}