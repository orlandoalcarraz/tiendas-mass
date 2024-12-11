'use client';

import { usePurchaseStore } from "@/store/purchase-store";
import QuantityProductSelector from "./quantity-product-selector";
import RemoveProductPurchaseButton from "./remove-product";
import TooglePriceProduct from "./toogle-price";

export default function PurchaseItemsStoreTbl() {
    const purchaseItems = usePurchaseStore(state => state.purchaseItems)
    return (
        <table className="relative w-full table-fixed text-sm text-center max-md:w-[800px]">
            <thead className="border-b">
                <tr className="h-10">
                    <td>
                        Producto
                    </td>
                    <td>
                        Cantidad
                    </td>
                    <td>
                        Precio/U
                    </td>
                    <td>
                        Importe
                    </td>
                    <td>

                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    purchaseItems.length > 0 ? (
                        purchaseItems.map((item, index) => (
                            <tr key={index} className="hover:bg-muted/40 duration-200 h-24">
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <QuantityProductSelector product={item} />
                                </td>
                                <td>
                                    <TooglePriceProduct product={item} />
                                </td>
                                <td>
                                    S/ {(item.quantity * item.price).toFixed(2)}
                                </td>
                                <td>
                                    <RemoveProductPurchaseButton product={item} />
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center h-20">No se agregó ningun producto</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}