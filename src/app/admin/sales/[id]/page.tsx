import PurchasesItemsTbl from "@/components/purchases/purchaseItems-tbl"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MdOutlineChevronLeft } from "react-icons/md"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PurchaseDetails, PurchaseItem } from "@/types"
import { SaleDetails, SaleItem } from "@/types/sale-types"

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10)


    const { saleDetails, saleItems } = await getSaleData(id)

    if (!saleDetails) {
        return (
            <div>
                <h1>Error</h1>
                <p>No se encontró la venta con el ID: {id}</p>
            </div>
        )
    }

    return (
        <>
            <section className="w-full flex gap-5">
                <Button asChild variant={"outline"} size={"icon"}>
                    <Link href={"/admin/sales"}><MdOutlineChevronLeft size={25} /></Link>
                </Button>
                <h1 className="text-3xl">Venta Registrada: {saleDetails.created}</h1>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">
                        {saleDetails.userName}
                    </CardTitle>

                    <CardDescription className="text-base">
                        Transacción: {saleDetails.transaction}
                    </CardDescription>
                    <CardDescription className="text-base">
                        Importe Total: S/{saleDetails.totalPayment}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PurchasesItemsTbl items={saleItems} />
                </CardContent>
                <CardFooter>
                    Metodo de Pago: {saleDetails.paymentMethod}
                </CardFooter>
            </Card>
        </>
    )
}


async function getSaleData(id: number) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/sales/${id}`,{
            cache:"no-store"
        })
        
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        const { ok, saleDetails, saleItems }: { ok: boolean, saleDetails: SaleDetails, saleItems: SaleItem[] } = await response.json();


        if (ok) return { saleDetails, saleItems }
       

        throw new Error("Error en la solicitud")

    } catch (error: any) {
        console.error("Error", error.message)

        return {
            saleDetails: null,
            saleItems: []
        }
    }
}