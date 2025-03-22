import React from 'react';
import Link from 'next/link';

interface PostLinkProps {
    date: string;
    excerpt?: string;
    href: string;
    title: string;
}

export const PostLink: React.FC<PostLinkProps> = ({
    excerpt,
    date,
    href,
    title,
}): React.ReactElement<HTMLDivElement> => {
    return (
        <article className="limit-text-width mb-12">
            <Link
                className="text-[#0099ff] inline-block font-[var(--font-headline)] text-4xl font-black -mx-2 p-2 no-underline hover:bg-[#0099ff] hover:text-white hover:no-underline focus-visible:bg-[#0099ff] focus-visible:text-white focus-visible:no-underline"
                href={href}
            >
                {title}
            </Link>
            <p className="font-[var(--font-headline)] font-black text-lg mt-1 mb-3">
                {date}
            </p>
            {excerpt && (
                <p className="mt-2">
                    {excerpt} <Link href={href}>[read more]</Link>
                </p>
            )}
        </article>
    );
};
