'use server';

import type { Metadata, NextPage } from 'next';
import React, { createElement } from 'react';
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

import { config } from '@/config';
import { getPosts } from '@/utils/posts';
import type { Post } from '@/types';

interface Params {
    slug: string;
}

interface Props {
    params: Params;
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

const Project: NextPage<Props> = async ({ params }) => {
    const { slug } = params;

    let projectProps: ProjectProps;

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
                .then((file) => String(file)),
            recentPosts,
        };
    } catch (error: any) {
        projectProps = {
            content: undefined,
            dateFormatted: null,
            recentPosts: [],
            slug,
        };
    }

    const ResponsiveImage = (props: any) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                {...props}
                alt={props.alt}
                className="responsive-image"
                src={props.src.replaceAll('./', `/content/projects/${slug}/`)}
            />
        );
    };

    const processor = unified()
        .use(rehypeParse as any, { fragment: true })
        .use(rehypeReact as any, {
            createElement,
            components: {
                img: ResponsiveImage,
            },
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
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const { slug } = params;
    const projectPath = path.join(
        config.contentDirectory,
        'projects',
        slug,
        'index.md',
    );
    const { data: frontmatter } = matter(fs.readFileSync(projectPath, 'utf-8'));

    return {
        title: `${frontmatter.title} | Projects | Brian Behrens`,
        description: `${frontmatter.title} project overview from the perspective of Brian Behrens.`,
    };
};

export const generateStaticParams = async () => {
    const projectsDir = path.join(config.contentDirectory, 'projects');
    const slugs = fs.readdirSync(projectsDir).filter((file) => {
        return fs.statSync(path.join(projectsDir, file)).isDirectory();
    });

    return slugs.map((slug) => ({
        params: {
            slug,
        },
    }));
};

export default Project;
