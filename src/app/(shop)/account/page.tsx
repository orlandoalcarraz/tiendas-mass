import UserChangePasswordForm from "@/components/account/user-change-password-form";
import UserDataForm from "@/components/account/user-data-form";
import CloseSessionButton from "@/components/session/close-session-btn";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page() {
    const session= await getServerSession(authOptions)
        if (!session) {
            redirect("/auth/login")
            return
        }

        const {id} = session.user
    return (
        <>
            <div className="space-y-6">

                <UserDataForm id={id}/>


                <UserChangePasswordForm id={id}/>

                <CloseSessionButton label="Cerrar Sesión" iconSize={22} className="p-2 w-full md:hidden bg-primary hover:bg-primary/80"/>

            </div>
        </>
    )
}