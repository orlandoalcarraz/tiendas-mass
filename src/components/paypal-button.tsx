'use client';

import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCartStore } from '@/store/cart-store';
import { useSession } from 'next-auth/react';
import { SaleDTO, captureSale } from './server_actions/sale-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';

export const PaypalButton = () => {
    const { data: session, status } = useSession();
    const { push } = useRouter();
    const cart = useCartStore((state) => state.cart);
    const totalAmount = useCartStore((state) => state.getTotalProductsPrice);
    const totalDiscount = useCartStore((state) => state.getTotalDiscount);
    const resetItems = useCartStore((state) => state.resetItems);
    const [loading, setLoading] = useState(false);

    const totalPayment = totalAmount() - totalDiscount();


    if (status === 'loading') {
        return (
            <div className="flex justify-center w-full">
                <Button asChild variant={"default"} disabled className='w-full text-xl'>
                    <Link href="/">
                        Cargando...
                    </Link>
                </Button>
            </div>
        );
    }


    if (!session) {
        return (
            <div className="flex justify-center w-full">
                <Button asChild variant={"default"} className='w-full text-xl'>
                    <Link href="/auth/login">
                        Iniciar sesión para pagar
                    </Link>
                </Button>
            </div>
        );
    }


    if (cart.length <= 0 || totalPayment === 0) {
        return (
            <div className="flex justify-center w-full">
                <Button asChild variant={"default"} className='w-full text-xl'>
                    <Link href="/">
                        Agrega productos al carrito
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: 'AWavsGHCmDGduWX_0KUVv2GSQXSBUcAg-RUhPYq9LpoSmvZXYR7kaG0Oi-Eqet2u2EeQXJQcctiWWk4V',
            }}
        >
            <PayPalButtons
                className="w-full"
                createOrder={async () => {
                    setLoading(true);
                    try {
                        const res = await fetch('/api/checkout', {
                            method: 'POST',
                            body: JSON.stringify({ totalPayment }),
                        });
                        const order = await res.json();

                        return order.id;
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error al crear la orden');
                    } finally {
                        setLoading(false);
                    }
                }}
                onApprove={async (data, actions) => {
                    try {
                        const details = await actions.order?.capture();
                        console.log('Detalles de la captura:', details);

                        if (details !== undefined && details.id && session.user?.id) {
                            const saleData: SaleDTO = {
                                transaction: details.id,
                                userId: session.user.id,
                                totalAmount: totalAmount(),
                                totalDiscount: totalDiscount(),
                                totalPayment: totalAmount() - totalDiscount(),
                                paymentMethod: 'PayPal',
                                status: 'completed',
                            };

                            const res = await captureSale({ sale: saleData, items: cart });

                            if (res.ok) {
                                resetItems();
                                push('/checkout-confirm');
                                console.log('Venta:', res);
                            } else {
                                console.error('Error en captura:', res.error);
                            }
                        } else {
                            alert('Error: No se pudo capturar el ID de usuario o los detalles de la transacción.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error en la captura del pago.');
                    }
                }}
                onError={(err) => alert('Error en el proceso de pago: ' + err.message)}
                style={{ layout: 'horizontal', color: 'gold', shape: 'rect' }}
            />
        </PayPalScriptProvider>
    );
};