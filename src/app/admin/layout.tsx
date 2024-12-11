import NavAdmin from "@/components/NavBar";
import NavBarMobile from "@/components/NavBarMobile";

import UserPopover from "@/components/session/user-popover";
import InstallButton from "@/components/install-button";
import { CartButton } from "@/components/cart/cart-ui";
import Mass from "@/components/ui/mass";

export default function AdminLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<header className="w-screen h-[60px] flex items-center justify-between px-5">
				<Mass className="max-xl:hidden"/>
				<div className="xl:hidden">
					<NavBarMobile variant="admin"/>
				</div>
				<div className="flex-center gap-2 ">
					<InstallButton/>
					<UserPopover/>
				</div>
			</header>
			<div className="flex h-[calc(100dvh-60px)] relative w-screen ">
				<NavAdmin />
				<main className={` w-full h-full relative bg-secondary px-2 py-5 sm:p-10 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-background scrollbar-thumb-primary`}>
					{children}
				</main>
			</div>
		</>
	);
}