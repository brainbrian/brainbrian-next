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

import { Footer, Head, Header } from '../../components'; // Pagination

export interface ProjectProps {
    categories?: string[];
    content?: string;
    date: string;
    dateFormatted: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Project = ({
    content,
    dateFormatted,
    slug,
    title,
}: ProjectProps): React.ReactNode => {
    const ResponsiveImage = (props: any) => {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt={props.alt}
                {...props}
                src={props.src.replaceAll('./', `/images/projects/${slug}/`)}
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
                        {/* <div
                            className="post-content"
                            dangerouslySetInnerHTML={{
                                __html:
                                    processor.processSync(content).result || '',
                            }}
                        /> */}
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('content/projects'));

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
            path.join(`content/projects/${slug}/`, 'index.md'),
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

    return {
        props: {
            ...frontmatter,
            slug,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            content: await processor
                .process(content || '')
                .then((file) => String(file)),
        },
    };
}

export default Project;