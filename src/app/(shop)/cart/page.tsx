export const revalidate = 0;

import { MdShoppingCart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CartTable } from "@/components/cart/cart-table";
import { CartDetails } from "@/components/cart/details-container";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
    CardFooter
} from "@/components/ui/card"
import { PaypalButton } from "@/components/paypal-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function Page() {

    return (
        <>
            <main className="relative w-full h-full flex max-xl:flex-col gap-5 p-5 max-sm:pb-24">
                <div className="w-full relative xl:h-[calc(100vh-100px)] flex flex-col gap-5 xl:p-5">
                    <Card className="max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex gap-2 items-center">
                                <Image src={"/mass_icon.png"} height={20} width={30} alt="" className="dark:invert"/>
                                A punto de realizar tu pedido
                            </CardTitle>
                            <CardDescription>
                                Confirma las cantidades de cada producto que desees.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="h-[600px] w-full ">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-center">
                                <MdShoppingCart size={28} />
                                Tu carrito
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-auto h-[500px] w-full scrollbar-thin scrollbar-track-background scrollbar-thumb-primary relative">
                            <CartTable/>
                        </CardContent>
                    </Card>   
                </div>

                <Card className="xl:h-[calc(100vh-100px)] xl:max-w-screen-xs w-full xl:border-none xl:rounded-none xl:shadow-none">
                    <CardHeader>
                        <CardTitle>
                                Detalles
                        </CardTitle>
                        <CardDescription>
                        Asegúrate de revisar todos los detalles antes de continuar con el pago.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-10 border-t-2 border-border p-6">
                        <CartDetails/>
                    </CardContent>
                    <CardFooter className="p-6 flex flex-col gap-5">
                        <Button variant={"outline"} asChild className="sm:text-lg w-full">
                            <Link href={"/"}>
                                Continuar Comprando
                            </Link>
                        </Button>
                        <PaypalButton/>
                    </CardFooter>
                </Card>

            </main>
        </>
    );
}