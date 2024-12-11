
export default function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className=" max-sm:h-[calc(100vh-180px)] h-[calc(100vh-100px)] w-full flex-center flex-col gap-2">            
            {children}
        </main>
    );
}