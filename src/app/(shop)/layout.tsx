import FooterNav from "@/components/shop/footer";
import Header from "@/components/shop/header";

export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        < >
            <div className="bg-primary w-screen h-10 flex-center sticky text-primary-foreground max-xs:text-xs max-sm:text-sm animate-pulse">
                <span>
                    Aplicación en fase de desarrollo
                </span>
            </div>
			<Header />
            {children}
            <FooterNav/>

        </>
    );
}