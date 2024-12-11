
import {ToogleOrder} from "@/components/filters";
import {PriceSelector} from "@/components/filters";
import { BsFilterLeft } from "react-icons/bs";


export default function FiltersContainer() {
  return (
    <div className="w-full flex flex-col gap-5 pb-10 border-b-2 border-border ">
      <BsFilterLeft className="h-10 w-10 text-primary"/>

      <div className="flex items-center justify-between gap-10 max-lg:flex-col ">
        <ToogleOrder/>
        <PriceSelector/>
      </div>
    </div>
  );
}