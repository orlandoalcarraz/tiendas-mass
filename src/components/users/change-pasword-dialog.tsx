'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import ChangePasswordForm from "./change-password-form";


type Props = {
    id: number;
};

export default function UserChangePasswordDialog({ id }: Props) {
    const [open, setOpen] = useState(false); 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="max-w-sm mx-auto">Cambiar Contraseña</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contraseña</DialogTitle>
                    <DialogDescription>Modifica la contraseña</DialogDescription>
                </DialogHeader>
                <CardContent className="space-y-4">

                    <ChangePasswordForm id={id} onSuccess={() => setOpen(false)} />
                </CardContent>
            </DialogContent>
        </Dialog>
    );
}