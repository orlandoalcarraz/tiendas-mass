"use client"


import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { cn, formatDateCalendar } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarProps } from "@/components/ui/calendar"
import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

type Props={
	date:Date,
	onChange: ()=> void
}

export function DatePicker({date,onChange}:Props) {


	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"h-12",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? formatDateCalendar(date) : <span>Selecciona una fecha</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={onChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
