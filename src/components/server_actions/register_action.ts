"use server"
import { createUser } from "@/app/api/helpers/user-actions"
import { UserDTO } from "@/types"
import bcrypt from "bcrypt"

type RegisterInput = {
    dni:string,
    email: string,
    password: string
}

export const createClient =async (params:RegisterInput) => {
    
    const { dni, email , password} = params

    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`

    try {
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_RENIEC_TOKEN}`,
            },
        })

        const {numeroDocumento,nombres,apellidoPaterno,apellidoMaterno} =await response.json()


        if (!nombres || !apellidoPaterno ||  !apellidoMaterno) return {ok:false, message:"DNI invalido"}

        const hashPassword = await bcrypt.hash(password,10)

        const userDTO:UserDTO={
            dni: numeroDocumento,
            name: nombres,
            lastName: apellidoPaterno+" "+apellidoMaterno,
            number: "         ",
            email: email,
            role: 0,
            status: true,
            password: hashPassword
        }

        const newUser  = await createUser(userDTO)

        if (newUser.error) {
            throw {
                message:newUser.error.msg
            }
        }



        return {ok:true, message:"Usuario registrado"}





    }catch(error:any){
        return {ok:false, message:"Correo ya registrado"}
    }

} 