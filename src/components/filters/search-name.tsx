"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { IoSearchOutline } from 'react-icons/io5';
import { Input } from '@/components/ui/input';

type Props = {
    className?:string,
}

export function SearchByName({className}:Props) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
            params.set('page', '1')
        } else {
            params.delete('query')
            params.set('page', '1')
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
    const debouncedHandleSearch = useDebouncedCallback(handleSearch, 500)

    return (
        <label className="relative flex-center ">
            <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Busqueda"
                className={`${className} rounded-lg bg-background pl-8 w-full duration-200`}
                onChange={(e) => { debouncedHandleSearch(e.target.value) }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </label>
    );
}