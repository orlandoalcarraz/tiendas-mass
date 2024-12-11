

export type Product= {
    id: number,
    created:string,
    updated:string
    name: string,
    description:string,
    price: string,
    discount:string
    category:string,
    status: boolean,
    stock:number,
    orderLimit:number,
    img:any
  }

  export type ProductInventory={
    id:number,
    name:string,
    status:boolean
    stock:number,
    lastStockEntry:string
  }

  export type CartProduct={
    id:number,
    name:string,
    description:string,
    price:number,
    discount:number,
    maxQuantity:number,
    quantity:number,
    category:string,
    img:any

  }

  export type ProductFormData = {
    name: string,
    description: string,
    status: string,
    category: string,
    price: string,
    discount: string,
    orderLimit:string,
    img:any
  }

  export type ProductDTO={
    name: string,
    description: string,
    status: boolean,
    category: string,
    price: number,
    discount: number,
    orderLimit:number,
    image:any
  }
