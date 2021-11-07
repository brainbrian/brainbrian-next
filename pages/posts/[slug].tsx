import fs from 'fs';
import path from 'path';
import React from 'react';
import matter from 'gray-matter';
import { marked } from 'marked';
// import remark from 'remark';
// import html from 'remark-html';

import { Footer, Head, Header } from '../../components'; // Pagination

export interface PostProps {
    categories?: string[];
    content?: string;
    date: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Post = ({ content, date, title }: PostProps): React.ReactNode => {
    return (
        <>
            <Head title={`${title} | Posts | Brian Behrens`} />
            <Header />
            <main className="content">
                <div className="post-container">
                    <article className="post">
                        <h1>{title}</h1>
                        <h3>{date}</h3>
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{
                                __html: marked.parse(content),
                            }}
                        />
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/posts'));

    const paths = files.map((file) => ({ params: { slug: file } }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const { data: frontmatter, content } = matter(
        fs.readFileSync(
            path.join(`content/posts/${slug}/`, 'index.md'),
            'utf-8',
        ),
    );

    return {
        props: {
            slug,
            ...frontmatter,
            content,
        },
    };
}

export default Post;
