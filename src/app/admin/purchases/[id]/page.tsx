import PurchasesItemsTbl from "@/components/purchases/purchaseItems-tbl"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MdOutlineChevronLeft } from "react-icons/md"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PurchaseDetails, PurchaseItem } from "@/types"

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10)


    const { purchaseDetails, purchaseItems } = await getPurchaseData(id)

    if (!purchaseDetails) {
        return (
            <div>
                <h1>Error</h1>
                <p>No se encontró la compra con el ID: {id}</p>
            </div>
        )
    }

    return (
        <>
            <section className="w-full flex gap-5">
                <Button asChild variant={"outline"} size={"icon"}>
                    <Link href={"/admin/purchases"}><MdOutlineChevronLeft size={25} /></Link>
                </Button>
                <h1 className="text-3xl">Compra Registrada: {purchaseDetails.created}</h1>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">
                        {purchaseDetails.providerName}
                    </CardTitle>

                    <CardDescription className="text-base">
                        Tipo: {purchaseDetails.receiptType}
                    </CardDescription>
                    <CardDescription className="text-base">
                        Número: {purchaseDetails.receiptNumber}
                    </CardDescription>
                    <CardDescription className="text-base">
                        Fecha Emitida: {purchaseDetails.receiptDate}
                    </CardDescription>
                    <CardDescription className="text-base">
                        Importe Total: S/{purchaseDetails.totalPrice}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PurchasesItemsTbl items={purchaseItems} />
                </CardContent>
                <CardFooter>
                    Registrada por {purchaseDetails.userName}
                </CardFooter>
            </Card>
        </>
    )
}


async function getPurchaseData(id: number) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/purchases/${id}`,{
            cache:"no-store"
        })
        
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        const { ok, purchaseDetails, purchaseItems }: { ok: boolean, purchaseDetails: PurchaseDetails, purchaseItems: PurchaseItem[] } = await response.json();


        if (ok) return { purchaseDetails, purchaseItems }
       

        throw new Error("Error en la solicitud")

    } catch (error: any) {
        console.error("Error", error.message)

        return {
            purchaseDetails: null,
            purchaseItems: []
        }
    }
}