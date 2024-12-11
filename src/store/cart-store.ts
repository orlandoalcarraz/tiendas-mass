
import { CartProduct } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartState = {
    cart: CartProduct[],

    getTotalProductsQuantity: () => number
    getFinalPrice:() => number
    getTotalProductsPrice:() => number
    getTotalDiscount:() => number
    addProduct: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct,quantity:number) => void
    removeProduct: (product:CartProduct) => void
    resetItems:()=>void
}

export const useCartStore = create<CartState>()(

    persist(

        (set, get) => ({

            cart: [],
            resetItems: () => {
                set({ cart: [] })
            },
            getTotalProductsQuantity: () => {
                const { cart } = get()
                let totalQuantity = 0

                for (let i = 0; i < cart.length; i++) {
                    const quantity = cart[i].quantity
                    totalQuantity+=quantity
                }

                return totalQuantity
            },

            getTotalDiscount: ()=> {
                const { cart } = get()
                let totalDiscount = 0

                for (let i = 0; i < cart.length; i++) {
                    totalDiscount+=cart[i].discount
                }

                return totalDiscount
            },

            getTotalProductsPrice: ()=>{
                const { cart } = get()
                let totalPrice = 0

                for (let i = 0; i < cart.length; i++) {
                    const price = cart[i].quantity * cart[i].price
                    totalPrice+=price
                }

                return totalPrice
            },

            getFinalPrice: () => {
                const { cart } = get()
                let finalPrice = 0

                for (let i = 0; i < cart.length; i++) {
                    const price = cart[i].quantity * (cart[i].price-cart[i].discount) 
                    finalPrice+=price
                }

                return finalPrice
            },

            addProduct: (product: CartProduct) => {
                const { cart } = get()

                const inCart = cart.some(
                    (item) => (item.id === product.id)
                )

                if (!inCart) {
                    set({ cart: [...cart, product] })
                    return
                }

                const updatedCart = cart.map((item) => {
                    if (item.id === product.id) {

                        if (item.maxQuantity <= item.quantity + product.quantity ) return { ...item, quantity: item.maxQuantity }

                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item
                })

                set({ cart: updatedCart })
            },
            updateProductQuantity: (product:CartProduct, quantity:number)=>{
                const {cart} = get()
                const updateCartQuantity = cart.map(item => {

                    if (item.id === product.id ) {
                        return {...item,quantity:quantity}
                    }
                    return item 
                }) 

                set({cart:updateCartQuantity})
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get()

                const newCart = cart.filter(item => item.id !== product.id)

                set({ cart: newCart })
            },

        })
        , {
            name: "cart",
        })


)