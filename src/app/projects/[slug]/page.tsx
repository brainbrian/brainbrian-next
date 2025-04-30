'use server';

import type { Metadata } from 'next';
import React, { createElement, Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
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

interface ProjectProps {
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

    let projectProps: ProjectProps;

    try {
        // Validate slug format to avoid path traversal issues
        if (!slug || slug.includes('..') || slug.includes('/')) {
            throw new Error(`Invalid slug format: ${slug}`);
        }

        const projectPath = path.join(
            `${config.contentDirectory}/projects/${slug}/`,
            'index.md',
        );

        // Check if file exists before trying to read it
        if (!fs.existsSync(projectPath)) {
            throw new Error(`Project file not found: ${projectPath}`);
        }

        const { data: frontmatter, content } = matter(
            fs.readFileSync(projectPath, 'utf-8'),
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

        projectProps = {
            ...frontmatter,
            slug,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            content: await processor
                .process(content || '')
                .then((file: any) => String(file)),
            recentPosts,
        };
    } catch (error: unknown) {
        console.error(`Error processing project [${slug}]:`, error);
        projectProps = {
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
                    src={props.src.replaceAll(
                        './',
                        `/content/projects/${slug}/`,
                    )}
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

    const { title, dateFormatted, content } = projectProps;

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

        const projectPath = path.join(
            config.contentDirectory,
            'projects',
            slug,
            'index.md',
        );

        // Check if file exists
        if (!fs.existsSync(projectPath)) {
            return {
                title: 'Project Not Found | Brian Behrens',
                description: 'The requested project could not be found.',
            };
        }

        const { data: frontmatter } = matter(
            fs.readFileSync(projectPath, 'utf-8'),
        );

        return {
            title: `${frontmatter.title || 'Untitled'} | Projects | Brian Behrens`,
            description: `${frontmatter.title || 'Untitled'} project overview from the perspective of Brian Behrens.`,
            openGraph: {
                images: [
                    ...(frontmatter.image
                        ? [`/content/projects/${slug}/${frontmatter.image}`]
                        : []),
                    '/images/share-computer.jpg',
                ],
            },
        };
    } catch (error) {
        console.error(
            `Error generating metadata for project [${slug}]:`,
            error,
        );
        return {
            title: 'Error | Brian Behrens',
            description: 'An error occurred while loading this project.',
        };
    }
};

export const generateStaticParams = async () => {
    try {
        const projectsDir = path.join(config.contentDirectory, 'projects');

        // Make sure the directory exists
        if (!fs.existsSync(projectsDir)) {
            console.error(`Projects directory not found: ${projectsDir}`);
            return [];
        }

        // Read and filter directories
        const slugs = fs.readdirSync(projectsDir).filter((file) => {
            // Skip any files/directories with problematic names
            if (file.includes('\n') || file.includes('\r')) {
                console.warn(
                    `Skipping project with problematic filename: "${file}"`,
                );
                return false;
            }

            try {
                const stat = fs.statSync(path.join(projectsDir, file));
                const isDirectory = stat.isDirectory();

                // Check if index.md exists in the directory
                const hasIndexFile =
                    isDirectory &&
                    fs.existsSync(path.join(projectsDir, file, 'index.md'));

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
        console.error('Error generating static params for projects:', error);
        return [];
    }
};
