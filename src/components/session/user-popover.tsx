'use client';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import CloseSessionButton from "./close-session-btn";
import { PiUserCheckLight } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";
import { Button } from "../ui/button";

export default function UserPopover() {
	const { data: session, status } = useSession()

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={"outline"} className="gap-3">
						<PiUserCheckLight size={22} />
						{status === "loading" ? (
							<AiOutlineLoading size={18} className="animate-spin ease-in-out" />
						) : session?.user ? (
							session.user.name
						) : (
							""
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent align="end" className="flex flex-col gap-1 items-start text-sm w-auto">
					<CloseSessionButton iconSize={18} label="Cerrar Sesión" />
				</PopoverContent>
			</Popover>
		</>
	);
}