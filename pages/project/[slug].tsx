import React, { createElement } from 'react';
import type { NextPage } from 'next';
import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import remarkEmbedder, { TransformerInfo } from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { Footer, Head, Header } from '../../components';
import { config } from '../../config';
import { getPosts } from '../../utils/posts';
import type { Post } from '../../types';

interface Props {
    categories?: string[];
    content?: string;
    date: string;
    dateFormatted: string;
    recentPosts?: Post[];
    slug: string;
    tags?: string[];
    title: string;
}

const Project: NextPage<Props> = ({
    content,
    dateFormatted,
    recentPosts,
    slug,
    title,
}) => {
    const ResponsiveImage = (props: any) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                {...props}
                alt={props.alt}
                className="responsive-image"
                src={props.src.replaceAll('./', `/images/projects/${slug}/`)}
            />
        );
    };

    const processor = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement,
            components: {
                img: ResponsiveImage,
            },
        });

    return (
        <>
            <Head title={`${title} | Projects | Brian Behrens`} />
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
            <Footer posts={recentPosts} />
        </>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(
        path.join(`${config.contentDirectory}/projects`),
    );

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
                    `${config.contentDirectory}/projects/${slug}/`,
                    'index.md',
                ),
                'utf-8',
            ),
        );

        const handleHTML = (html: string, info: TransformerInfo) => {
            const { url, transformer } = info;
            if (
                transformer.name === '@remark-embedder/transformer-oembed' ||
                url.includes('youtube.com') ||
                url.includes('vimeo.com')
            ) {
                return `<div class="embed-video">${html}</div>` as any;
            }
            return html;
        };

        const processor = unified()
            .use(remarkParse)
            .use(remarkEmbedder, {
                transformers: [oembedTransformer],
                handleHTML,
            } as any)
            .use(remarkRehype, {
                allowDangerousHtml: true,
            })
            .use(rehypeRaw)
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

export default Project;
