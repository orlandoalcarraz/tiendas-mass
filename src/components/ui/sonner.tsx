"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group "
			richColors
			toastOptions={{
				unstyled: true,
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:p-3 group-[.toaster]:rounded-lg  group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:flex-center group-[.toaster]:gap-3",
					description:
						"group-[.toast]:text-muted-foreground group-[.toast]:text-sm ",
					actionButton:
						"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:text-xs group-[.toast]:p-2 group-[.toast]:h-6 group-[.toast]:rounded group-[.toast]:flex-center group-[.toast]:m-auto",
					cancelButton:
						"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
					error:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:p-3 group-[.toaster]:rounded-lg  group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:flex-center group-[.toaster]:gap-2"
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
