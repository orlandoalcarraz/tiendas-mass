import { LuArrowUpRight } from "react-icons/lu";
import { customers } from "@/data/data";
import { Button } from "../ui/button";
export default function LastSales() {
    return (
        <ul className="relative flex flex-col h-full divide-y-2 divide-secondary">
            {customers.slice(3, 8).map((customer, i) => (
                <LastSaleItem
                    key={i}
                    name={`${customer.name} ${customer.lastName}`}
                    email={customer.email}
                    spent={120}
                />
            ))}
        </ul>
    );
}

type Props = {
    name: string;
    email: string;
    spent: number;
}

const LastSaleItem = ({ name, email, spent }: Props)=>{
    return(
        <li className="flex justify-between w-full h-24 p-2 sm:p-4 items-center gap-3 relative hover:bg-muted/50 duration-200" >
            <Button variant={"secondary"} className=" text-lg ">
                <span className="max-md:hidden">Ver</span>
                <LuArrowUpRight className="w-6 h-6"/>
            </Button>
            <div className="flex flex-col justify-between w-full">
                <span className="text-base sm:text-lg md:text-xl ">{name}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{email}</span>
            </div>
            <div className="absolute bottom-1 right-1 ">
                <span className="text-base sm:text-xl">+${spent}</span>
            </div>
        </li>
    )   
};