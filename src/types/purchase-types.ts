export type PurchaseFormData = {
    providerId:string,
    type:string,
    number:string,
    date:Date,
    purchaseItems : PurchaseItemFormData[]
}

export type PurchaseDTO = {
    providerId:number,
    type:string,
    number:string
    date:Date,
    purchaseItems : PurchaseItemFormData[]
}

export type PurchaseItemFormData = {
    id:number
    name:string,
    quantity:number,
    price:number
}

export type Purchase = {
    id:number,
    created:string,
    providerName:string,
    receiptType:string,       
    receiptNumber:string,        
    receiptDate:string,
    totalPrice:string  
    
}

export type PurchaseDetails = {
    id:number,
    created:string,
    providerName:string,
    userName:string,
    receiptType:string,       
    receiptNumber:string,        
    receiptDate:string,
    totalPrice:number  
}

export type PurchaseItem = {
    id:number,
    productName:string,
    quantity:number,
    price:number,
    totalPrice:number

}