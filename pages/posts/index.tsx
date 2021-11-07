import fs from 'fs';
import path from 'path';
import React from 'react';
import matter from 'gray-matter';
// import remark from 'remark';
// import html from 'remark-html';

import { Footer, Head, Header, PostLink } from '../../components'; // Pagination

interface PostProps {
    categories?: string[];
    date: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Posts = ({ posts }: { posts: PostProps[] }): React.ReactNode => {
    const postsComponents = posts.map(({ date, slug, title }, index) => (
        <PostLink
            key={index}
            date={date}
            href={`/posts/${slug}`}
            title={title}
            excerpt="..."
        />
    ));
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
    // https://www.youtube.com/watch?v=MrjeefD8sac
    const files = fs.readdirSync(path.join('posts'));

    const posts = files.map((file) => {
        const slug = file;

        const { data: frontmatter } = matter(
            fs.readFileSync(path.join(`posts/${slug}/`, 'index.md'), 'utf-8'),
        );

        return {
            slug,
            ...frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    };
}

export default Posts;
