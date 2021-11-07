import { format } from 'date-fns';
import fs from 'fs';
import { orderBy } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
// import remark from 'remark';
// import html from 'remark-html';

import { Footer, Head, Header, PostLink } from '../../components'; // Pagination

interface PostProps {
    categories?: string[];
    date: string;
    dateFormatted: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Posts = ({ posts }: { posts: PostProps[] }): React.ReactNode => {
    const postsComponents = posts.map(
        ({ dateFormatted, slug, title }, index) => (
            <PostLink
                key={index}
                date={dateFormatted}
                href={`/posts/${slug}`}
                title={title}
                excerpt="..."
            />
        ),
    );
    // const { currentPage, numPages } = pageContext;

    return (
        <>
            <Head
                title="Posts | Brian Behrens | Los Angeles Software Engineer"
                description="Posts (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            <Header />
            <main className="content">
                {postsComponents}
                {/* <Pagination
                    basePath="/posts/"
                    currentPage={currentPage}
                    numPages={numPages}
                /> */}
            </main>
            <Footer />
        </>
    );
};

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/posts'));

    const posts = files.map((file) => {
        const slug = file;

        const { data: frontmatter } = matter(
            fs.readFileSync(
                path.join(`content/posts/${slug}/`, 'index.md'),
                'utf-8',
            ),
        );

        return {
            ...frontmatter,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            slug,
        };
    });

    return {
        props: {
            posts: orderBy(posts, 'date').reverse(),
        },
    };
}

export default Posts;
