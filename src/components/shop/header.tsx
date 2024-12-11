import Mass from "../ui/mass";
import NavBarMobile from "../NavBarMobile";
import { CartButton } from "../cart/cart-ui";
import InstallButton from "../install-button";
import { ToogleTheme } from "../ui/toggle-theme";

export default function Header() {
    return (
        <header className="w-screen h-[60px] flex items-center justify-between px-5 sticky top-0 bg-background z-50 border-b border-border">
            <div className="sm:hidden">
                <ToogleTheme align="start"/>
            </div>
            <div className="max-sm:hidden">
                <NavBarMobile variant="cliente" />
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Mass />
            </div>
            <div className="flex-center gap-2">
                <InstallButton />
                <CartButton />
            </div>
        </header>
    );
}