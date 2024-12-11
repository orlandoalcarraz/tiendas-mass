import Link from 'next/link'
import { Button } from "@/components/ui/button"

const navItems = [
    { name: 'General', href: '/account' },
    { name: 'Compras', href: '/account/purchases' },
]

export function AccountSidebar() {
    return (
        <nav className="space-y-2">
            {navItems.map((item) => (
                <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-center text-lg"
                    asChild
                >
                    <Link href={item.href}>{item.name}</Link>
                </Button>
            ))}
        </nav>
    )
}