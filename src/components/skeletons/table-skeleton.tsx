import { Skeleton } from "../ui/skeleton";

type Props={
    rows:number
}

export default function TableSkeleton({rows}:Props) {
    const skeletonRows = Array(rows).fill(null)

    return (
        <>
            {skeletonRows.map((_, index) => (
                <tr key={index} className="relative h-24">
                     <td colSpan={9} className="text-center">
                        <Skeleton className="h-20"/>
                    </td>
                </tr>
            ))}
        </>
    );
}