
import { FiDollarSign } from "react-icons/fi";
import { PiUsersThreeFill } from "react-icons/pi";
import { PiChartLineUpLight } from "react-icons/pi";
import { PiChartLineDownLight } from "react-icons/pi";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function TotalProfit() {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Ganancia Total
                </CardTitle>
                <FiDollarSign size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$4,000</div>
                <p className="text-xs text-muted-foreground">
                    +20.1% respecto al mes pasado
                </p>
            </CardContent>
        </Card>
    );
}

export function CustomersRegistered() {
    return (
        <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Clientes Registrados
                </CardTitle>
                <PiUsersThreeFill size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+235</div>
                <p className="text-xs text-muted-foreground">
                    +180.1% respecto al mes pasado
                </p>
            </CardContent>
        </Card>
    );
}

export function TotalSales() {
    return (
        <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <PiChartLineUpLight size={22} className="text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12,000</div>
                <p className="text-xs text-muted-foreground">
                    +19% respecto al mes pasado
                </p>
            </CardContent>
        </Card>
    );
}

export function TotalExpenses() {
    return (
        <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compras</CardTitle>
                <PiChartLineDownLight size={22} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">-8,000</div>
                <p className="text-xs text-muted-foreground">
                    +19% respecto al mes pasado
                </p>
            </CardContent>
        </Card>
    );
}
