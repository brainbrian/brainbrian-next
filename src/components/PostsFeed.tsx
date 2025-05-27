import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import type { Post } from '@/types';

interface PostsFeedProps {
    posts: Post[];
}

export const PostsFeed: React.FC<PostsFeedProps> = ({ posts }) => {
    return (
        <section className="mb-8 sm:mb-0 sm:w-1/2 sm:pr-4">
            <Link
                href="/posts"
                className="bg-background text-text block font-headline font-bold mb-4 p-4 uppercase hover:no-underline hover:text-primary group rounded-lg"
            >
                <h2 className="text-text text-xl sm:text-2xl font-bold group-hover:text-primary">
                    From The Brain
                </h2>
            </Link>
            <ul className="mt-4 space-y-2 list-none">
                {posts?.map(({ date, slug, title }) => (
                    <li key={slug}>
                        <Link
                            href={`/posts/${slug}`}
                            className="block bg-[#383838] hover:bg-[#404040] transition-colors hover:no-underline rounded-lg p-3 group no-underline"
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="bg-[url('/images/brain.svg')] bg-no-repeat bg-[length:2.5rem_1.75rem] w-10 h-7 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-x-90"
                                    aria-hidden="true"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-text group-hover:text-primary transition-colors text-sm font-medium leading-tight mb-1">
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
