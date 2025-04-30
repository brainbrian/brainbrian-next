import React, { createElement, Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import type { Metadata } from 'next';
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
import Image from 'next/image';

import { config } from '@/config';
import { getPosts } from '@/utils/posts';
import type { Post } from '@/types';

interface PageParams {
    slug: string;
}

interface PageProps {
    params: Promise<PageParams>;
}

interface PostProps {
    categories?: string[];
    content?: string;
    date?: string;
    dateFormatted: string | null;
    recentPosts?: Post[];
    slug: string;
    tags?: string[];
    title?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    let postProps: PostProps;

    try {
        // Validate slug format to avoid path traversal issues
        if (!slug || slug.includes('..') || slug.includes('/')) {
            throw new Error(`Invalid slug format: ${slug}`);
        }

        const postPath = path.join(
            `${config.contentDirectory}/posts/${slug}/`,
            'index.md',
        );

        // Check if file exists before trying to read it
        if (!fs.existsSync(postPath)) {
            throw new Error(`Post file not found: ${postPath}`);
        }

        const { data: frontmatter, content } = matter(
            fs.readFileSync(postPath, 'utf-8'),
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
            .use(remarkParse as any)
            .use(remarkEmbedder, {
                transformers: [oembedTransformer],
                handleHTML,
            } as any)
            .use(remarkRehype as any, {
                allowDangerousHtml: true,
            })
            .use(rehypeRaw as any)
            .use(rehypeStringify as any);

        const recentPostData = await getPosts(1, 8, 'desc');
        const { posts: recentPosts } = recentPostData;

        postProps = {
            ...frontmatter,
            slug,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            content: await processor
                .process(content || '')
                .then((file: any) => String(file)),
            recentPosts,
        };
    } catch (error: unknown) {
        console.error(`Error processing post [${slug}]:`, error);
        postProps = {
            content: undefined,
            dateFormatted: null,
            recentPosts: [],
            slug,
        };
    }

    const ResponsiveImage = (props: any) => {
        return (
            <div className="my-4 w-full flex justify-center 2xl:my-8 2xl:max-w-[120%] 2xl:w-[120%] 2xl:-ml-[10%]">
                <Image
                    {...props}
                    className="max-w-full h-auto object-contain rounded-md"
                    alt={props.alt}
                    src={props.src.replaceAll('./', `/content/posts/${slug}/`)}
                />
            </div>
        );
    };

    const processor = unified()
        .use(rehypeParse as any, { fragment: true })
        .use(rehypeReact as any, {
            Fragment,
            components: {
                img: ResponsiveImage,
            },
            createElement,
            jsx,
            jsxs,
        });

    const { title, dateFormatted, content } = postProps;

    return (
        <main className="content">
            <div className="post-container">
                <article className="post">
                    <h1>{title}</h1>
                    <h3>{dateFormatted}</h3>
                    <div className="post-content">
                        {processor.processSync(content).result as any}
                    </div>
                </article>
            </div>
        </main>
    );
}

export const generateMetadata = async ({
    params,
}: PageProps): Promise<Metadata> => {
    const { slug } = await params;

    try {
        // Validate slug format
        if (!slug || slug.includes('..') || slug.includes('/')) {
            throw new Error(`Invalid slug format: ${slug}`);
        }

        const postsPath = path.join(
            config.contentDirectory,
            'posts',
            slug,
            'index.md',
        );

        // Check if file exists
        if (!fs.existsSync(postsPath)) {
            return {
                title: 'Post Not Found | Brian Behrens',
                description: 'The requested post could not be found.',
            };
        }

        const { data: frontmatter } = matter(
            fs.readFileSync(postsPath, 'utf-8'),
        );

        return {
            title: `${frontmatter.title || 'Untitled'} | Posts | Brian Behrens`,
            description: `${frontmatter.title || 'Untitled'} blog post written from the perspective of Brian Behrens.`,
            openGraph: {
                images: [
                    ...(frontmatter.image
                        ? [`/content/posts/${slug}/${frontmatter.image}`]
                        : []),
                    '/images/share.jpg',
                ],
            },
        };
    } catch (error) {
        console.error(`Error generating metadata for post [${slug}]:`, error);
        return {
            title: 'Error | Brian Behrens',
            description: 'An error occurred while loading this post.',
        };
    }
};

export const generateStaticParams = async () => {
    try {
        const postsDir = path.join(config.contentDirectory, 'posts');

        // Make sure the directory exists
        if (!fs.existsSync(postsDir)) {
            console.error(`Posts directory not found: ${postsDir}`);
            return [];
        }

        // Read and filter directories
        const slugs = fs.readdirSync(postsDir).filter((file) => {
            // Skip any files/directories with problematic names
            if (file.includes('\n') || file.includes('\r')) {
                console.warn(
                    `Skipping post with problematic filename: "${file}"`,
                );
                return false;
            }

            try {
                const stat = fs.statSync(path.join(postsDir, file));
                const isDirectory = stat.isDirectory();

                // Check if index.md exists in the directory
                const hasIndexFile =
                    isDirectory &&
                    fs.existsSync(path.join(postsDir, file, 'index.md'));

                return isDirectory && hasIndexFile;
            } catch (err) {
                console.warn(`Error checking directory ${file}:`, err);
                return false;
            }
        });

        return slugs.map((slug) => ({
            slug,
        }));
    } catch (error) {
        console.error('Error generating static params for posts:', error);
        return [];
    }
};
