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
import Link from 'next/link';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';

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
            <span className="my-4 w-full flex justify-center 2xl:my-8 2xl:max-w-[120%] 2xl:w-[120%] 2xl:-ml-[10%] block">
                <Image
                    {...props}
                    width={props.width || 1200}
                    height={props.height || 800}
                    className="max-w-full h-auto object-contain rounded-md"
                    alt={props.alt}
                    src={props.src.replaceAll('./', `/content/posts/${slug}/`)}
                />
            </span>
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

    const { title, dateFormatted, content, tags, categories } = postProps;

    return (
        <main className="content">
            <div className="post-container">
                <article className="post">
                    <header className="mb-8 md:mb-12 border-b border-gray-200/20 pb-6 md:pb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4 md:mb-6">
                            {title}
                        </h1>
                        {dateFormatted && (
                            <div className="flex items-center text-gray-400">
                                <Calendar
                                    className="w-4 h-4 mr-2 opacity-70"
                                    aria-label="Published date"
                                />
                                <time
                                    className="text-sm md:text-base font-medium tracking-wide"
                                    dateTime={postProps.date}
                                >
                                    {dateFormatted}
                                </time>
                            </div>
                        )}
                    </header>
                    <div className="post-content">
                        {processor.processSync(content).result as any}
                    </div>
                    <footer className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200/20">
                        {/* Categories */}
                        {categories && categories.length > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <span className="text-gray-400 text-sm font-medium">
                                        Categories:
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-blue-600/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-500/30"
                                            title={category}
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center flex-wrap gap-2">
                                    <Tag
                                        className="w-4 h-4 mr-2 text-gray-400 opacity-70"
                                        aria-label="Tags"
                                    />
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-gray-600/80 text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-500/50"
                                            title={tag}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between items-center">
                            <Link
                                href="/posts"
                                className="inline-flex items-center text-gray-400 hover:text-primary transition-colors duration-200 text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Posts
                            </Link>
                        </div>
                    </footer>
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
