"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { shopLinks } from "@/app/config/links";

export default function FooterNav() {
    const pathname = usePathname()
    const [activeLink, setActiveLink] = useState(pathname)


    const handleSetActiveLink = (link: string) => {
        setActiveLink(link)
    }

    return (
        <footer className="w-full fixed bottom-0 grid grid-cols-4 bg-background border-t border-border sm:hidden h-16">
            {
                shopLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={() => handleSetActiveLink(link.href)}
                            className={`w-full flex-center flex-col gap-2 text-xs p-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeLink === link.href
                                ? "bg-primary shadow-md shadow-primary/50 text-primary-foreground"
                                : "active:bg-pressed hover:bg-secondary"
                                }`}
                        >
                            <Icon size={20} />
                            {link.label}
                        </Link>
                    );
                })
            }
        </footer>
    );
}