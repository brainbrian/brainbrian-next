import React from 'react';
import { GetStaticProps } from 'next';
import { NextPage } from 'next';

import { Head, Header, Pagination, PostLink } from '../../components';
import type { Post } from '../../types';
import { getPosts } from '../../utils/posts';

const PAGE_SIZE = 20;
const PAGE_ORDER = 'desc';

interface Props {
    currentPage: number;
    error?: string;
    posts: Post[];
    totalCount: number;
    recentPosts?: Post[];
}

const Posts: NextPage<Props> = ({ currentPage, error, posts, totalCount }) => {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const postsComponents = posts.map(
        ({ dateFormatted, excerpt, slug, title }, index) => (
            <PostLink
                date={dateFormatted}
                excerpt={excerpt}
                href={`/post/${slug}`}
                key={index}
                title={title}
            />
        ),
    );

    if (error) return <p>An error occurred: {error}</p>;

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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const currentPage = 1;
    try {
        const postData = await getPosts(currentPage, PAGE_SIZE, PAGE_ORDER);
        const { posts, totalCount } = postData;
        const recentPostData = await getPosts(1, 8, 'desc');
        const { posts: recentPosts } = recentPostData;
        return {
            props: { currentPage, posts, totalCount, recentPosts },
        };
    } catch (error: any) {
        return {
            props: {
                currentPage,
                error: error?.message,
                posts: [],
                totalCount: 0,
                recentPosts: [],
            },
        };
    }
};

export default Posts;
