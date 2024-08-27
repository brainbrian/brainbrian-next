'use server';

import React from 'react';
import { NextPage } from 'next';

import { Head, Header, Pagination, PostLink } from '../../components';
import type { Post } from '../../types';
import { getPosts } from '../../utils/posts';

const PAGE_SIZE = 20;
const PAGE_ORDER = 'desc';

interface PostsPageProps {
    searchParams: { page?: string };
}

const PostsPage: NextPage<PostsPageProps> = async ({ searchParams }) => {
    const currentPage: number = searchParams?.page
        ? Number(searchParams?.page)
        : 1;
    let posts: Post[] = [];
    let totalCount: number = 0;
    let postsError: boolean = false;

    try {
        const postData = await getPosts(currentPage, PAGE_SIZE, PAGE_ORDER);
        const { posts: postsValue, totalCount: totalCountValue } = postData;
        posts = [...postsValue];
        totalCount = totalCountValue;
    } catch (error: any) {
        postsError = true;
    }

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const postsComponents = posts.map(
        ({ dateFormatted, excerpt, slug, title }, index) => (
            <PostLink
                date={dateFormatted}
                excerpt={excerpt}
                href={`/posts/${slug}`}
                key={index}
                title={title}
            />
        ),
    );

    if (postsError) return <p>An error occurred</p>;

    return (
        <>
            <Head
                title="Posts | Brian Behrens | Los Angeles Software Engineer"
                description="Posts (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            <Header />
            <main className="content">
                {postsComponents}
                <Pagination
                    basePath={'/posts'}
                    currentPage={currentPage}
                    numPages={totalPages}
                />
            </main>
        </>
    );
};

export default PostsPage;
