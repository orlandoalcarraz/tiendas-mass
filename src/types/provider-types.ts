export type Provider= {
    id: string,
	created:string,
	updated:string,
    ruc:string,
    name: string,
    legal:string,
    number:string,
    email:string,
    web:string,
    status: boolean,
  }


export type ProviderFormData = {
	name: string,
	legal: string,
	status: string,
	ruc: string,
	number: string,
	email: string,
	web: string,
}

export type ProviderDTO = {
	name: string,
	legal: string,
	status: boolean,
	ruc: string,
	number: string,
	email: string,
	web: string,
}