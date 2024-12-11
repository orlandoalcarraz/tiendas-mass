
import {
	Card, 
	CardHeader, 
	CardTitle, 
	CardContent,
	CardDescription,
    CardFooter
} from "@/components/ui/card"
import { Suspense } from "react";
import { companies } from "@/lib/stock-data";
import { getStockData } from "@/lib/get-stock-data";
import ProductYearlySalesChart from "@/components/charts/ProductYearlySalesChart";


export default async function Page( {params} : {params : { id : string, ticker?:string } } ) {
	const ticker = params.ticker || companies[0].ticker;
	const stockData = getStockData(ticker);
	return (
		<>
        <div className="flex w-full gap-5">
            <Card className="w-full max-w-screen-xs">
                <CardHeader className="gap-3">
                    <CardTitle className="font-normal">
                        Producto {params.id}
                    </CardTitle>
                    <div className="flex justify-between">
                        <CardDescription className="text-xl flex flex-col gap-3">
                            <span>Marca</span>
                            <span>Descripcion</span>
                        </CardDescription>

                        <span className="text-sm border rounded-full px-4 py-2 border-border text-shadow-lg text-red-500 shadow-red-500/30 h-9">Stock: 10</span>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">

                    <div className="w-[300px] h-[300px] border rounded">

                    </div>

                    <p className="space-x-3 text-lg">
                        <span>Estado:</span>
                        <span className="text-muted-foreground">Activo</span>
                    </p>
                    
                    <p className="space-x-3 text-lg">
                        <span>Categoria:</span>
                        <span className="text-muted-foreground">Abarrotes</span>
                    </p>

                    <p className="space-x-3 text-lg ">
                        <span>Proveedor:</span>
                        <span className="text-muted-foreground">Proveedor 1</span>
                    </p>

                    <p className="space-x-3 text-lg ">
                        <span>Precio de venta:</span>
                        <span className="text-muted-foreground">S/10000</span>
                    </p>





                </CardContent>
            </Card>

            <Card className="w-full">
                <CardHeader >
                    <CardTitle >
                       Rendimiento en ventas
                    </CardTitle>
                    <CardDescription>
                        Rendimiento en ventas durante el año.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-center">
                    <Suspense>
                        <ProductYearlySalesChart/>
                    </Suspense>
                </CardContent>
            </Card>
            
        </div>

        <Card>
            <CardHeader>
                <CardTitle>
                    Comparativa
                </CardTitle>
                <CardDescription>
                    Comparativa de rendimiento de ventas con otros productos similares
                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>

		</>
	);
}