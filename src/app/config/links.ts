//Iconos de admin
import { FiUsers } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoShieldHalfSharp } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { BiPurchaseTag } from "react-icons/bi";
//Iconos de Cliente
import { MdStoreMallDirectory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { PiUserCheckLight } from "react-icons/pi";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";

export const dashboardLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: AiOutlineLineChart },
    { label: "Productos", href: "/admin/products", icon: BsBoxSeam },
    { label: "Clientes", href: "/admin/customers", icon: FiUsers },
    { label: "Inventario", href: "/admin/inventory", icon: MdOutlineInventory2 },
    { label: "Proveedores", href: "/admin/providers", icon: FaUsersGear },
    { label: "Usuarios", href: "/admin/users", icon: IoShieldHalfSharp },
    { label: "Ventas", href: "/admin/sales", icon: MdOutlinePayment },
    { label: "Compras", href: "/admin/purchases", icon: BiPurchaseTag },
]

export const shopLinks = [
    { label: "Tienda", href: "/", icon: MdStoreMallDirectory },
    { label: "Mi Carrito", href: "/cart", icon: MdOutlineShoppingCart },
    { label: "Compras", href: "/account/purchases", icon: TbMoneybag },
    { label: "Cuenta", href: "/account", icon: PiUserCheckLight },
]