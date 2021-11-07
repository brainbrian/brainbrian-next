import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';

import { Footer, Head, Header } from '../../components'; // Pagination

export interface PostProps {
    categories?: string[];
    content?: string;
    date: string;
    dateFormatted: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Post = ({
    content,
    dateFormatted,
    title,
}: PostProps): React.ReactNode => {
    return (
        <>
            <Head title={`${title} | Posts | Brian Behrens`} />
            <Header />
            <main className="content">
                <div className="post-container">
                    <article className="post">
                        <h1>{title}</h1>
                        <h3>{dateFormatted}</h3>
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{
                                __html: content || '',
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
            ...frontmatter,
            slug,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            content: await remark()
                .use(remarkParse)
                .use(remarkHtml)
                .process(content || '')
                .then((file) => String(file)),
        },
    };
}

export default Post;
