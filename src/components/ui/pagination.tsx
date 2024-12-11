"use client";
import {
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
} from "react-icons/hi";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";


export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px gap-2">
                {allPages.map((page, index) => {
                    let position: "first" | "last" | "single" | "middle" | undefined;

                    if (index === 0) position = "first";
                    if (index === allPages.length - 1) position = "last";
                    if (allPages.length === 1) position = "single";
                    if (page === "...") position = "middle";

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
}) {
    const className = clsx(
        "flex h-10 w-10 items-center justify-center text-sm border dark:border-accent  rounded-md",
        {
            "": position === "first" || position === "single",
            "": position === "last" || position === "single",
            "z-10 bg-primary text-primary-foreground": isActive,
            "hover:bg-secondary": !isActive && position !== "middle",
            "text-muted": position === "middle",
        }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className} scroll={false}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
}) {
    const className = clsx(
        "flex h-10 w-10 items-center justify-center border dark:border-accent rounded-md",
        {
            "pointer-events-none text-muted border-muted/70": isDisabled,
            "hover:bg-secondary": !isDisabled,
            "mr-2 md:mr-4": direction === "left",
            "ml-2 md:ml-4": direction === "right",
        }
    );

    const icon =
        direction === "left" ? (
            <HiOutlineChevronDoubleLeft className="w-4" />
        ) : (
            <HiOutlineChevronDoubleRight className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href} scroll={false}>
            {icon}
        </Link>
    );
}


const generatePagination = (currentPage: number, totalPages: number) => {

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }


    return [
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};