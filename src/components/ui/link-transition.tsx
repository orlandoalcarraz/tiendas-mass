'use client';

import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type LinkTransitionProps = HTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

export function LinkTransition({ href, children, ...rest }: LinkTransitionProps) {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!document.startViewTransition) {
            return;
        } else {
            e.preventDefault();
            document.startViewTransition(() => {
                router.push(href);
            });
        }
    };

    return isDesktop ? (
        <Link href={href} onClick={handleClick} {...rest} scroll={true}>
            {children}
        </Link>
    ) : (
        <Link href={href} {...rest} scroll={true}>
            {children}
        </Link>
    );
}