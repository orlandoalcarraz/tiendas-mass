"use client"
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Slider } from "@/components/ui";

export function PriceSelector() {
    const [Max, setMax] = useState(100)
    const searchParams=useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    function handleMaxPrice(term:any) {
        const params = new URLSearchParams(searchParams)
            if (term) {
                params.set('max', term)
                params.set('page', '1')
            } else {
                params.delete('max')
                params.set('page', '1')
            }
        replace(`${pathname}?${params.toString()}`,{ scroll: false })
      }
    const debouncedHandleMaxPrice=useDebouncedCallback(handleMaxPrice,500)

    return (

        <div className="lg:max-w-screen-xs w-full relative flex flex-col items-start justify-between h-12">

            <span className="pb-2">Rango de Precio:</span>
            <div className='flex gap-5 items-center justify-between w-full'>
                <span>0</span>
                <Slider min={0} max={100} step={1} onValueChange={(values)=>{setMax(values[0])}} className='cursor-pointer'  onValueCommit={(values) =>{ debouncedHandleMaxPrice(values[0].toString())}}  defaultValue={[100]}   />
                <span className='w-20'>{Max}</span>
            </div>

        </div>
  ) ;
}