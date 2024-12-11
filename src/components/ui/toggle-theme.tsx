"use client";

import { useTheme } from "next-themes";
import { PiMoonLight,PiSunLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ALIGN_OPTIONS = ["start", "center", "end"] as const
type Align = (typeof ALIGN_OPTIONS)[number]

export function ToogleTheme({ align }: { align: Align } ) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <PiSunLight className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <PiMoonLight className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} sideOffset={10} className="w-auto">
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                    <PiSunLight />
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                    <PiMoonLight />
                    Oscuro
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
