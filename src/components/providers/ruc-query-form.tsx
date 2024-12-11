"use client"
import * as z from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "../ui/button"
import { AiOutlineLoading } from "react-icons/ai"
import { Input } from "../ui/input"
import { IoSearchOutline } from "react-icons/io5"

type Props = {
    handleOpenChange: (open: boolean) => void,
    handleFetchReniec : (ruc:string,name:string,legal:string) => void
}

type ReniecRucFormData = {
    ruc: string
}

const schema = z.object({
    ruc: z.string().length(11, { message: "El RUC debe tener 11 caracteres" }),
})

export function RucQueryForm({ handleOpenChange,handleFetchReniec }: Props) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [serverError, setServerError] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm<ReniecRucFormData>({
        resolver: zodResolver(schema)
    })

    const onConfirm = (result:any)=>{
        handleFetchReniec(result.numeroDocumento,result.razonSocial,result.tipo)
    }

    const onSubmit: SubmitHandler<ReniecRucFormData> = async (data) => {
        setLoading(true)
        setResult(null)
        setServerError("")
        console.log("enviando")
    
        try {
            const response = await fetch(`/api/reniec/ruc?ruc=${data.ruc}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorResponse = await response.json()
                setServerError(errorResponse.message || "Error desconocido")
                return
            }
    
            const resultData = await response.json();

            if (resultData.razonSocial && resultData.tipo) {
                setResult(resultData)
                return
            }
            
            setServerError("RUC inválido");
    
        } catch (error: any) {
            console.error("Error", error);
            setServerError("Error en la consulta")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col gap-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between w-full text-sm items-start gap-5">
                <label className="flex flex-col w-full gap-2">
                    <Input id="ruc" placeholder="RUC" type="text" {...register("ruc")} />
                    {errors.ruc && <span className="text-red-500 text-xs">{errors.ruc.message}</span>}
                </label>

                <Button size={"icon"} disabled={loading}>
                    {loading ? (
                        <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
                    ) : (
                        <IoSearchOutline size={18} />
                    )}
                </Button>
            </form>

            {serverError && <p className="flex w-full text-red-500">{serverError}</p>}

            {result && !serverError && (
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl">Resultado:</h3>
                    <p>Razon Social: {result.razonSocial}</p>
                    <p>Tipo: {result.tipo}</p>
                </div>
            )}
            <Button disabled={!result} className="text-lg" onClick={()=> { onConfirm(result); handleOpenChange(false)}}>
                Confirmar
            </Button>
        </div>
    )
}