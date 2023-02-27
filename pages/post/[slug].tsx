import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import { Footer, Head, Header } from '../../components';
import { config } from '../../config';
import { getPosts } from '../../utils/posts';
import { Post } from '../../types';

export interface PostProps {
    categories?: string[];
    content?: string;
    date: string;
    dateFormatted: string;
    slug: string;
    tags?: string[];
    title: string;
    recentPosts: Post[];
}

const Post = ({
    content,
    dateFormatted,
    slug,
    title,
    recentPosts,
}: PostProps): React.ReactNode => {
    const ResponsiveImage = (props: any) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt={props.alt}
                {...props}
                src={props.src.replaceAll('./', `/images/posts/${slug}/`)}
            />
        );
    };

    const processor = unified()
        .use(rehypeParse)
        .use(rehypeReact, {
            createElement: React.createElement,
            components: {
                img: ResponsiveImage,
            },
        });

    return (
        <>
            <Head title={`${title} | Posts | Brian Behrens`} />
            <Header />
            <main className="content">
                <div className="post-container">
                    <article className="post">
                        <h1>{title}</h1>
                        <h3>{dateFormatted}</h3>
                        <div className="post-content">
                            {processor.processSync(content).result}
                        </div>
                    </article>
                </div>
            </main>
            <Footer recentPosts={recentPosts} />
        </>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join(`${config.contentDirectory}/posts`));

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
    try {
        const { data: frontmatter, content } = matter(
            fs.readFileSync(
                path.join(
                    `${config.contentDirectory}/posts/${slug}/`,
                    'index.md',
                ),
                'utf-8',
            ),
        );

        const processor = unified()
            .use(remarkParse)
            .use(remarkRehype, {
                sanitize: false,
                allowDangerousHTML: true,
            } as any)
            .use(rehypeStringify);

        const recentPostData = await getPosts(1, 8, 'desc');
        const { posts: recentPosts } = recentPostData;

        return {
            props: {
                ...frontmatter,
                slug,
                dateFormatted: format(
                    new Date(frontmatter.date),
                    'MMMM dd, yyyy',
                ),
                content: await processor
                    .process(content || '')
                    .then((file) => String(file)),
                recentPosts,
            },
        };
    } catch (error: any) {
        return {
            props: {
                slug,
                dateFormatted: null,
                content: null,
                recentPosts: [],
            },
        };
    }
}

export default Post;
