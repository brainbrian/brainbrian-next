import React from 'react';
import type { Metadata, NextPage } from 'next';

import { Pagination, PostLink } from '@/components';
import type { Post } from '@/types';
import { getPosts } from '@/utils/posts';

const PAGE_SIZE = 20;
const PAGE_ORDER = 'desc';

interface PostsPageProps {
    searchParams: Promise<{ page?: string }>;
}

const PostsPage: NextPage<PostsPageProps> = async ({ searchParams }) => {
    const searchParamsResolved = await searchParams;
    const currentPage: number = searchParamsResolved?.page
        ? Number(searchParamsResolved?.page)
        : 1;
    let posts: Post[] = [];
    let totalCount: number = 0;
    let postsError: boolean = false;

    try {
        const postData = await getPosts(currentPage, PAGE_SIZE, PAGE_ORDER);
        const { posts: postsValue, totalCount: totalCountValue } = postData;
        posts = [...postsValue];
        totalCount = totalCountValue;
    } catch (error: unknown) {
        console.error(error);
        postsError = true;
    }

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const postsComponents = posts.map(
        ({ dateFormatted, excerpt, slug, title, tags }, index) => (
            <PostLink
                date={dateFormatted}
                excerpt={excerpt}
                href={`/posts/${slug}`}
                key={index}
                title={title}
                tags={tags}
            />
        ),
    );

    if (postsError) return <p>An error occurred</p>;

    return (
        <main className="mx-auto my-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            {postsComponents}
            <Pagination
                basePath={'/posts'}
                currentPage={currentPage}
                numPages={totalPages}
            />
        </main>
    );
};

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Posts',
        description: `Posts (blogs) written by Brian Behrens during his journey through life.`,
    };
};

export default PostsPage;
