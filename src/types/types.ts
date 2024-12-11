export type Product= {
    id: number,
    name: string,
    price: number,
    category:string,
    stock: number,
    description: string,
    provider:string,
    status: number,
  }

  export type Customer= {
    id: number,
    name: string,
    lastName: string,
    email:string,
    status: number,
  }

  export type User= {
    id: number,
    dni:number,
    name: string,
    lastName: string,
    number:number,
    email:string,
    role:number,
    status: number,
  }

  export type Provider= {
    id: number,
    ruc:number,
    name: string,
    number:number,
    email:string,
    web:string,
    status: number,
  }

  export type Sale={
    id:number,
    date:string,
    transaction:string,
    customerId:number,
    totalAmount:number,
    discount:number,
    paymentMethod:string,
    status:number

  }

  export type SaleItem = {
    id: number,     
    saleId: number,      
    productId: number,    
    quantity: number,    
    unitPrice: number,    
    totalPrice: number,   
  }
