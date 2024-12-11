"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


type Props = {
    children?:React.ReactNode
    open: boolean,
    handleOpenChange: (open: boolean) => void
}

export function FetchDniDialog({ open, handleOpenChange,children }: Props) {
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">Consultar DNI</DialogTitle>
                    <DialogDescription className="text-xl text-left flex justify-between items-center">
                    </DialogDescription>

                    <>
                        {children}
                    </>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}