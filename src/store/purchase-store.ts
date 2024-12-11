
import { PurchaseItemFormData } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type PurchaseState = {
    purchaseItems: PurchaseItemFormData[],

    getTotalItemsQuantity: () => number
    getTotalItemsPrice:() => number
    addItems: (product: PurchaseItemFormData) => void
    updateItemQuantity: (product: PurchaseItemFormData,quantity:number) => void
    updateItemPrice:(product:PurchaseItemFormData,price:number)=> void
    removeItem: (product:PurchaseItemFormData) => void
    resetItems: () => void
}

export const usePurchaseStore = create<PurchaseState>()(

    persist(

        (set, get) => ({

            purchaseItems: [],

            resetItems: () => {
                set({ purchaseItems: [] })
            },

            getTotalItemsQuantity: () => {
                const { purchaseItems: cart } = get()
                let totalQuantity = 0

                for (let i = 0; i < cart.length; i++) {
                    const quantity = cart[i].quantity
                    totalQuantity+=quantity
                }

                return totalQuantity
            },

            getTotalItemsPrice: ()=>{
                const { purchaseItems: cart } = get()
                let totalPrice = 0

                for (let i = 0; i < cart.length; i++) {
                    const price = cart[i].quantity * cart[i].price
                    totalPrice+=price
                }

                return totalPrice
            },


            addItems: (product: PurchaseItemFormData) => {
                const { purchaseItems: cart } = get()

                const inCart = cart.some(
                    (item) => (item.id === product.id)
                )

                if (!inCart) {
                    set({ purchaseItems: [...cart, product] })
                    return
                }

                const updatedCart = cart.map((item) => {
                    if (item.id === product.id) {

                        return { ...item, quantity:product.quantity }
                    }
                    return item
                })

                set({ purchaseItems: updatedCart })
            },

            updateItemQuantity: (product:PurchaseItemFormData, quantity:number)=>{
                const {purchaseItems: cart} = get()
                const updateCartQuantity = cart.map(item => {

                    if (item.id === product.id ) {
                        return {...item,quantity:quantity}
                    }
                    return item 
                }) 

                set({purchaseItems:updateCartQuantity})
            },

            updateItemPrice: (product:PurchaseItemFormData, price:number)=>{
                const {purchaseItems: cart} = get()
                const updateProductPrice = cart.map(item => {

                    if (item.id === product.id ) {
                        return {...item,price:price}
                    }
                    return item 
                }) 

                set({purchaseItems:updateProductPrice})
            },

            removeItem: (product: PurchaseItemFormData) => {
                const { purchaseItems: cart } = get()

                const newCart = cart.filter(item => item.id !== product.id)

                set({ purchaseItems: newCart })
            },

        })
        , {
            name: "purchase-cart",
        })


)