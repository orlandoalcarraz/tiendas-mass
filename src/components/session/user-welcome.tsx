"use client"
import { useSession } from "next-auth/react";


export default function UserWelcome() {
    const {data:session} = useSession()    
    return (
        <h2 className="text-5xl lg:text-6xl xl:text-8xl inline-block">
            Bienvenido, <span className="text-primary animate-pulse">{session?.user.name || "Usuario"}</span>
        </h2>
    );
}