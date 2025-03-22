'use server';

import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Social } from '@/components';
import type { Post } from '@/types';
import { getPosts } from '@/utils/posts';

export const Footer: React.FC = async () => {
    let recentPosts: Post[] = [];

    try {
        const postData = await getPosts(1, 8, 'desc');
        const { posts } = postData;
        recentPosts = posts;
    } catch (error: unknown) {
        console.error(error);
    }

    return (
        <div className="bg-page w-full">
            <aside className="max-w-(--breakpoint-2xl) mx-auto px-4 py-8 sm:px-6 lg:px-8 sm:flex">
                <section className="mb-8 sm:mb-0 sm:w-1/2 sm:pr-4">
                    <Link
                        href="/posts"
                        className="bg-darker text-light block font-headline font-bold mb-4 p-4 uppercase hover:no-underline hover:text-main"
                    >
                        <h2 className="text-light text-xl sm:text-2xl font-bold hover:text-main">
                            From The Brain
                        </h2>
                    </Link>
                    <ul className="mt-4 space-y-4 sm:space-y-6 list-none px-4 my-4">
                        {recentPosts?.map(({ date, slug, title }) => (
                            <li
                                key={slug}
                                className="bg-[url('/images/brain.svg')] bg-no-repeat bg-[length:2rem_2rem] mb-4 min-h-[2rem] pl-12"
                            >
                                <p>
                                    <Link
                                        href={`/posts/${slug}`}
                                        className="transition-colors hover:text-main text-light"
                                    >
                                        {title}{' '}
                                        <span className="text-xs sm:text-sm md:text-base text-main block hover:underline">
                                            {format(
                                                new Date(date),
                                                'MMMM dd, yyyy',
                                            )}
                                        </span>
                                    </Link>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
                <Social />
            </aside>
            <footer className="max-w-(--breakpoint-2xl) mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center sm:text-left text-xs sm:text-sm border-t-2 border-main">
                &copy; {new Date().getFullYear()} Brain Brian (Brian Behrens) –{' '}
                <span className="hidden sm:inline">
                    Powered by coffee, froth, salt water and curiosity –{' '}
                </span>
                <a
                    href="https://www.brainbrian.com"
                    className="text-main hover:underline"
                >
                    brainbrian.com
                </a>
            </footer>
        </div>
    );
};
