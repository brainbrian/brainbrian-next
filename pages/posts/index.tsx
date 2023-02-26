import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Footer, Head, Header, Pagination, PostLink } from '../../components';
import type { Post } from '../../types';

interface PostsResponse {
    posts: Post[];
    totalCount: number;
    error?: string;
}

interface Props {
    posts: Post[];
    totalCount: number;
}

const PAGE_SIZE = 10;

const Posts: NextPage<Props> = ({ posts, totalCount }) => {
    const router = useRouter();
    const page = Number(router.query.page) || 1;
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
                    currentPage={page}
                    numPages={totalPages}
                />
            </main>
            <Footer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context,
) => {
    const page = Number(context.query.page) || 1;
    const order = context.query.order === 'asc' ? 'asc' : 'desc';
    const fetchURL = `${context.req.headers['x-forwarded-proto'] || 'http'}://${
        context.req.headers.host
    }/api/posts?page=${page}&size=${PAGE_SIZE}&order=${order}`;

    try {
        const response = await fetch(fetchURL);
        const { posts, totalCount }: PostsResponse = await response.json();
        return {
            props: { posts, totalCount },
        };
    } catch (error: any) {
        return {
            props: { posts: [], totalCount: 0, error: error?.message },
        };
    }
};

export default Posts;
