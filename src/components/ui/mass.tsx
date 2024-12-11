import Image from "next/image";

type Props={
    className?:string
}

export default function Mass({className}:Props) {
    return (
        <div className={`flex gap-1 justify-center items-start ${className}`}>
            <h1 className="text-2xl font-semibold">MASS</h1>
            <Image src={"/mass_icon_dark.webp"} width={30} height={20} alt="icon" className="dark:invert duration-200" />
        </div>
    );
}