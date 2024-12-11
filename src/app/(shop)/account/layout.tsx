import { AccountSidebar } from "@/components/account/account-sidebar";
import CloseSessionButton from "@/components/session/close-session-btn";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex w-full gap-10 max-md:pb-24 bg-secondary">
            <aside className="w-64 bg-background p-6 hidden md:block">
                <h1 className="text-2xl font-bold mb-6 mx-auto">Cuenta</h1>
                <AccountSidebar />
                <CloseSessionButton iconSize={22} label="Cerrar Sesión" className="mt-20 w-full justify-start"/>
            </aside>
            <main className="flex-1 p-6 min-h-screen md:h-screen">
                {children}
            </main>
        </div>
    );
}