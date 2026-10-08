import React from 'react';
import Link from 'next/link';

interface PostLinkProps {
    date: string;
    excerpt?: string;
    href: string;
    title: string;
    tags?: string[];
}

export const PostLink: React.FC<PostLinkProps> = ({
    excerpt,
    date,
    href,
    title,
    tags = [],
}): React.ReactElement<HTMLDivElement> => {
    return (
        <Link
            href={href}
            className="card card-interactive group block no-underline hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary mb-6 md:mb-8"
        >
            <article>
                <div className="p-6 md:p-8 lg:p-10">
                    {/* Date */}
                    <div className="eyebrow mb-3">{date}</div>

                    {/* Title */}
                    <h2 className="mb-3">
                        <span className="text-white font-bold tracking-tight text-2xl md:text-3xl leading-tight group-hover:text-primary group-focus-visible:text-primary transition-colors duration-200">
                            {title}
                        </span>
                    </h2>

                    {/* Excerpt */}
                    {excerpt && (
                        <div className="mb-5">
                            <p className="m-0 text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                                {excerpt}
                            </p>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, index) => (
                                <span key={index} className="chip" title={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
};
