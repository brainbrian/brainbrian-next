'use server';

import React from 'react';
import { BlueSkyFeed, PostsFeed } from '@/components';
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
        <div className="w-full bg-gradient-to-b from-transparent to-black/25">
            <div className="max-w-screen-2xl mx-auto">
                <aside className="max-w-(--breakpoint-2xl) mx-auto px-4 pt-12 pb-12 sm:px-6 md:pt-16 lg:px-8 sm:flex">
                    <PostsFeed posts={recentPosts} />
                    <BlueSkyFeed actor="brainbrian.com" postsToShow={3} />
                </aside>
                <div
                    className="divider-glow mx-4 sm:mx-6 lg:mx-8"
                    aria-hidden="true"
                />
                <footer className="max-w-(--breakpoint-2xl) mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center sm:text-left text-xs sm:text-sm text-[var(--text-subtle)]">
                    &copy; {new Date().getFullYear()} Brain Brian (Brian
                    Behrens) –{' '}
                    <span className="hidden sm:inline">
                        Powered by coffee, froth, salt water and curiosity
                        –{' '}
                    </span>
                    <a
                        href="https://www.brainbrian.com"
                        className="text-primary hover:underline"
                    >
                        brainbrian.com
                    </a>
                </footer>
            </div>
        </div>
    );
};
