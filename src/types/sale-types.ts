export type SaleDetails = {
    id:number,
    created:string,
    userName:string,
    transaction:string,       
    totalAmount:string,        
    totalDiscount:string,
    totalPayment:number,
    paymentMethod:string  
}

export type SaleItem = {
    id:number,
    productName:string,
    quantity:number,
    price:number,
    discount:number,
    totalPrice:number

}