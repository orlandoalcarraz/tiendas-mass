import { PiPopcorn } from "react-icons/pi";
import { PiBreadDuotone } from "react-icons/pi";
import { PiBeerBottle } from "react-icons/pi";
import { LuMilk } from "react-icons/lu";
import { TbCandy } from "react-icons/tb";
import { PiToiletPaper } from "react-icons/pi";
import { PiHandSoap } from "react-icons/pi";
import { GiFlour } from "react-icons/gi";

export const CATEGORIES = [
    { id: 1 , icon: PiBreadDuotone , name: "Panaderia", slug:"panaderia" },
    { id: 2 , icon: PiBeerBottle, name: "Bebidas", slug:"bebidas" },
    { id: 3 , icon: LuMilk , name: "Lacteos", slug:"lacteos" },
    { id: 4 , icon: TbCandy, name: "Confitería", slug:"confiteria" },
    { id: 5 , icon: PiPopcorn , name: "Piqueos", slug:"piqueos" },
    { id: 6 , icon: PiToiletPaper , name: "Limpieza", slug:"limpieza" },
    { id: 7 , icon: PiHandSoap , name: "Cuidado Personal", slug:"cuidado-personal" },
    { id: 8 , icon: GiFlour , name: "Abarrotes", slug:"abarrotes" },
]