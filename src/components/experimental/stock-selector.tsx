"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { companies } from "@/lib/stock-data";

export function StockSelector() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const currentTicker = searchParams.get("ticker") || "NVDA";

    const handleStockChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("ticker", value);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
            <Select value={currentTicker} onValueChange={handleStockChange}>
            <SelectTrigger className=' max-w-64 w-full h-12 hover:bg-secondary'>
                <SelectValue placeholder='Select a stock' />
            </SelectTrigger>
            <SelectContent>

                {companies.map((company) => (
                    <SelectItem key={company.ticker} value={company.ticker}>
                    {company.name}
                    </SelectItem>
                 ))}
            </SelectContent>
        </Select>

    );
}