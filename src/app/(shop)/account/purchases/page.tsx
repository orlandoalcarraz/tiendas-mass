import { PurchaseCard } from "@/components/account/purchase-card";
import { getClientSales } from "@/components/server_actions/sale-actions";
import { authOptions } from "@/lib/auth-options";
import { formatDate } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    const { ok, sales } = await getClientSales(session.user.id);

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">COMPRAS RECIENTES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ok && sales && sales.length > 0 ? (
                    sales.map((sale) => (
                        <PurchaseCard key={sale.id} 
                            id={sale.id}
                            transaction={sale.transaction}
                            status={"Completada"}
                            price={parseFloat(sale.totalAmount.toString())}
                            discount={parseFloat(sale.totalDiscount.toString())}
                            date={formatDate(sale.created)}

                        />
                    ))
                ) : (
                    <p>No se han encontrado compras recientes.</p>
                )}
            </div>
        </>
    );
}