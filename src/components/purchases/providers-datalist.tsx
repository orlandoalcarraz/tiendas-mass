'use client';
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { Provider } from "@/types";
import { useDebouncedCallback } from "use-debounce";

type Props = {
    onChange: (value:string) => void,
    value: string,
}

export default function ProvidersDatalist({ onChange }: Props) {
    const [open, setOpen] = useState(false)
    const [providers, setProviders] = useState<Provider[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [query, setQuery] = useState("")
    const [selectedValue, setSelectedValue] = useState<string>("")
    const buttonRef = useRef<HTMLButtonElement>(null)


    const debouncedQuery = useDebouncedCallback((value: string) => { setQuery(value) }, 300)

    useEffect(() => {
        
        const fetchProviders = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/providers?query=${query}`)
                const { providers } = await response.json()
                setProviders(providers)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProviders()

    }, [query])

    const handleSelectChange = (value: string) => {

        const valueName = providers.find(provider => provider.id === value)

        if (valueName) {
            setSelectedValue(valueName.name)  
            onChange(valueName.id.toString())
            setOpen(false)
        } 

    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="justify-start" ref={buttonRef}>
                    {selectedValue ? selectedValue : "Seleccionar Proveedor"}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-2" style={{ width: buttonRef.current?.offsetWidth }}>
                <input
                    onChange={(e) => debouncedQuery(e.target.value)}
                    type="text"
                    className="outline-none border-b focus-visible:border-black dark:focus-visible:border-primary p-3 duration-200 bg-background text-sm w-full"
                    placeholder="Buscar proveedores..."
                    defaultValue={query}
                />
                <div className="flex flex-col py-4">
                    {loading ? (
                        <div className="flex-center w-full h-14">
                            <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                        </div>
                    ) : (
                        providers.map((provider) => (
                            <Button
                                type="button"
                                key={provider.id}
                                variant={"ghost"}
                                onClick={() => handleSelectChange(provider.id)}
                                className="w-full justify-start"
                            >
                                {provider.name}
                            </Button>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}