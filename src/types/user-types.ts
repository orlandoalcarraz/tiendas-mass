export type User= {
    id: string,
    created:string,
    updated:string,
    dni:string,
    name: string,
    lastName: string,
    number:string,
    email:string,
    role:number,
    status: boolean,
  }

  export type UserFormData={
    dni:string,
    name:string,
    lastName:string,
    number:string,
    email:string,
    role:string,
    status:string,
    password:string,
    confirmPassword?:string,

  }

  export type UserEditFormData={
    dni:string,
    name:string,
    lastName:string,
    number:string,
    email:string,
    role:string,
    status:string,

  }

  export type UserDTO={
    dni:string,
    name:string,
    lastName:string,
    number:string,
    email:string,
    role:number,
    status:boolean,
    password:string,
  }

  export type UserEditDTO={
    dni:string,
    name:string,
    lastName:string,
    number:string,
    email:string,
    role:number,
    status:boolean,

  }