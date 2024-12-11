import { customers } from "@/data/data";

export default function TopCustomers() {
    return (
        <ul className="relative flex flex-col h-full divide-y-2 divide-secondary">
            {customers.slice(0, 5).map((customer, i) => (
                <TopCustomerItem
                    key={i}
                    name={`${customer.name} ${customer.lastName}`}
                    email={customer.email}
                    spent={10000}
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

const TopCustomerItem = ({ name, email, spent }: Props) => {
    return (
        <li className="flex justify-between w-full h-24 p-2 sm:p-4 items-center gap-3 relative hover:bg-muted/50 duration-300">
            <div className="flex flex-col justify-between w-full">
                <span className="text-base sm:text-lg md:text-xl">{name}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{email}</span>
            </div>
            <div className="absolute bottom-1 right-1">
                <span className="text-base sm:text-xl">+${spent}</span>
            </div>
        </li>
    );
};