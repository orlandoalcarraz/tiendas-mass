"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboardLinks } from "@/app/config/links";
import { ToogleTheme } from "@/components/ui/toggle-theme";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";


export default function NavAdmin() {
	const pathname = usePathname()
	const [activeLink, setActiveLink] = useState(pathname)

	const handleSetActiveLink = (link: string) => {
		setActiveLink(link)
	}
	
	return (
		<nav className="h-full flex flex-col justify-between items-center pb-16 px-2 max-xl:hidden">
			<ul className="w-full flex flex-col gap-3 items-center text-sm overflow-y-auto py-2">
				<TooltipProvider delayDuration={0}>
					{dashboardLinks.map((link, index) => {
						const Icon = link.icon;
						return (
							<li key={index} className="w-full relative">
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											href={link.href}
											onClick={() => handleSetActiveLink(link.href)}
											className={`w-full rounded h-full flex-center duration-200 tracking-wide p-4 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeLink === link.href
												? "bg-primary shadow-md shadow-primary/50 text-primary-foreground"
												: "active:bg-pressed hover:bg-secondary"
												}`}
										>
											<Icon size={24} />
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right" >
										<p className="text-base">{link.label}</p>
									</TooltipContent>
								</Tooltip>
							</li>
						);
					})}
				</TooltipProvider>
			</ul>
			<ToogleTheme align="start"/>

		</nav>
	);
}