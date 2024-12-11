import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {


    return (
        <div className='w-screen h-screen bg-background flex-center flex-col gap-5'>
            <h1 className='text-3xl'>
               Tiendas MASS
            </h1>
            <h2 className='text-xl text-muted-foreground'>Gracias por su Compra</h2>

            <Button asChild className='text-lg w-40'>
                <Link href={"/"}>
                    Regresar
                </Link>
            </Button>

        </div>
    )
}