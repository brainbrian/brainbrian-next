import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import type { Post } from '@/types';
import { HeaderSection } from '@/components';

interface PostsFeedProps {
    posts: Post[];
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ posts }) => {
    return (
        <section className="mb-8 sm:mb-0 sm:w-1/2 sm:pr-4">
            <HeaderSection
                title="From The Brain"
                component="h2"
                href="/posts"
            />
            <ul className="m-0 p-0 space-y-3 list-none">
                {posts?.map(({ date, slug, title }) => (
                    <li key={slug}>
                        <Link
                            href={`/posts/${slug}`}
                            className="card card-sm card-interactive block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:no-underline focus-visible:no-underline px-4 py-3.5 group no-underline"
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="bg-[url('/images/brain.svg')] bg-no-repeat bg-[length:2.5rem_1.75rem] w-10 h-7 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-x-90 group-focus-visible:scale-x-90"
                                    aria-hidden="true"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-text group-hover:text-primary group-focus-visible:text-primary transition-colors text-[0.9375rem] font-semibold leading-snug mb-1">
                                        {title}
                                    </h3>
                                    <span className="text-xs text-[var(--text-subtle)]">
                                        {format(
                                            new Date(date),
                                            'MMMM dd, yyyy',
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};
