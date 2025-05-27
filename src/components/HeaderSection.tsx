import React from 'react';
import Link from 'next/link';

interface HeaderSectionProps {
    title: string;
    component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    href?: string;
    target?: string;
    rel?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
    title,
    component: Component,
    href,
    target,
    rel,
}) => {
    const content = (
        <Component className="text-text text-xl sm:text-2xl font-bold group-hover:text-primary group-focus-visible:text-primary">
            {title}
        </Component>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="bg-background text-text block font-headline font-bold mb-4 p-4 uppercase hover:no-underline hover:text-primary focus-visible:no-underline focus-visible:text-primary focus:outline-none group rounded-lg"
                target={target}
                rel={rel}
            >
                {content}
            </Link>
        );
    }

    return (
        <div className="bg-background text-text block font-headline font-bold mb-4 p-4 uppercase rounded-lg">
            {content}
        </div>
    );
};
