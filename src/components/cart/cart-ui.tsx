"use client";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart-store";
import RemoveProductButton from "./remove-product-button";
import { AiOutlineLoading } from "react-icons/ai";
import CustomImage from "../ui/custom-image";

const CartIcon = ({ click }: { click: () => void }) => {
    const totalQuantity = useCartStore((state) => state.getTotalProductsQuantity());
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        setloaded(true)

    }, [])


    return (
        <Button variant={"outline"} onClick={click} disabled={!loaded} className="duration-200 w-14 flex-center gap-2" size={"icon"}>
            {
                loaded ? (
                    <>
                        {totalQuantity}
                        <MdOutlineShoppingCart size={22} />
                    </>
                ) : (
                    <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                )
            }
        </Button>
    );
};

const Content = ({ click }: { click: () => void }) => {
    const cartProducts = useCartStore(state => state.cart);
    const cartTotalPrice = useCartStore((state) => state.getFinalPrice());
    return (
        <>
            <div className="relative w-full overflow-y-auto h-96 scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">
                {cartProducts.length > 0 ? (
                    cartProducts.map((product, index) => (
                        <div
                            key={index}
                            className="duration-200 hover:bg-muted/40 relative flex justify-between items-center w-full px-5 h-32 rounded"
                        >
                            <div className="flex gap-3">

                                <CustomImage src={product.img} height={90} width={90} alt="" category={product.category} />
                                <div className="flex flex-col justify-center gap-1">
                                    <span className="leading-none tracking-tight font-semibold sm:text-lg max-w-[200px] sm:max-w-[400px] truncate">
                                        {product.name}
                                    </span>
                                    {product.discount && product.discount > 0 ? (
                                        <span className="flex items-center gap-2">
                                            <span>{product.quantity}</span>
                                            <span> x </span>
                                            <span className="text-sm text-muted-foreground line-through">S/ {product.price.toFixed(2)}</span>
                                            <span className="text-sm text-primary-foreground dark:text-white">
                                                S/ {(product.price - product.discount).toFixed(2)}
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="max-sm:text-xs text-sm text-muted-foreground">
                                            {product.quantity} <span> x </span> <span>S/ {product.price.toFixed(2)}</span>
                                        </span>
                                    )}
                                    <span className="leading-none tracking-tight text-primary-foreground dark:text-white">
                                        S/ {(product.quantity * (product.discount && product.discount > 0
                                            ? product.price - product.discount
                                            : product.price)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <RemoveProductButton product={product} />
                        </div>
                    ))
                ) : (
                    <div className="h-32 flex-center">
                        <span className="font-semibold leading-none tracking-tight">
                            No tiene productos en su carrito
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center justify-between gap-3 px-5 mt-4 text-xl">
                <span>Total: S/ {cartTotalPrice.toFixed(2)}</span>
                <Button asChild className="w-full text-xl" onClick={click}>
                    <Link href={"/cart"}>Ir a Pagar</Link>
                </Button>
            </div>
        </>
    );
};

export function CartButton() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const toggleOpen = () => setOpen(!open);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <CartIcon click={toggleOpen} />
                <DialogContent className="sm:max-w-[768px]">
                    <DialogHeader>
                        <DialogTitle>Tu Carrito</DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-[550px] relative flex flex-col justify-between">
                        <Content click={toggleOpen} />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <CartIcon click={toggleOpen} />
            <DrawerContent className="border rounded-t-xl dark:border-t-primary">
                <DrawerHeader className="text-center">
                    <DrawerTitle>Tu Carrito</DrawerTitle>
                </DrawerHeader>
                <div className="w-full h-[550px] relative flex flex-col justify-start">
                    <Content click={toggleOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}