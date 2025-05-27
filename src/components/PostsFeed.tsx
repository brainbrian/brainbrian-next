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
            <ul className="mt-4 space-y-2 list-none">
                {posts?.map(({ date, slug, title }) => (
                    <li key={slug}>
                        <Link
                            href={`/posts/${slug}`}
                            className="block bg-[#383838] hover:bg-[#404040] focus-visible:bg-[#404040] focus-visible:outline-none transition-colors hover:no-underline focus-visible:no-underline rounded-lg p-3 group no-underline"
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="bg-[url('/images/brain.svg')] bg-no-repeat bg-[length:2.5rem_1.75rem] w-10 h-7 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-x-90 group-focus-visible:scale-x-90"
                                    aria-hidden="true"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-text group-hover:text-primary group-focus-visible:text-primary transition-colors text-sm font-medium leading-tight mb-1">
                                        {title}
                                    </h3>
                                    <span className="text-xs text-gray-400">
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
