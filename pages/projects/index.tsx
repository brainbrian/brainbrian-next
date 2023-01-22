import { format } from 'date-fns';
import fs from 'fs';
import { orderBy } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import React from 'react';
// import remark from 'remark';
// import html from 'remark-html';

import { Footer, Head, Header, PostLink } from '../../components'; // Pagination

interface PostProps {
    categories?: string[];
    date: string;
    dateFormatted: string;
    slug: string;
    tags?: string[];
    title: string;
}

const Projects = ({ projects }: { projects: PostProps[] }): React.ReactNode => {
    const projectsComponents = projects.map(
        ({ dateFormatted, slug, title }, index) => (
            <PostLink
                key={index}
                date={dateFormatted}
                href={`/projects/${slug}`}
                title={title}
                excerpt="..."
            />
        ),
    );
    // const { currentPage, numPages } = pageContext;

    return (
        <>
            <Head
                title="Projects | Brian Behrens | Los Angeles Software Engineer"
                description="Projects (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            <Header />
            <main className="content">
                {projectsComponents}
                {/* <Pagination
                    basePath="/projects/"
                    currentPage={currentPage}
                    numPages={numPages}
                /> */}
            </main>
            <Footer />
        </>
    );
};

export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/projects'));

    const projects = files.map((file) => {
        const slug = file;

        const { data: frontmatter } = matter(
            fs.readFileSync(
                path.join(`content/projects/${slug}/`, 'index.md'),
                'utf-8',
            ),
        );

        return {
            ...frontmatter,
            dateFormatted: format(new Date(frontmatter.date), 'MMMM dd, yyyy'),
            slug,
        };
    });

    return {
        props: {
            projects: orderBy(projects, 'date').reverse(),
        },
    };
}

export default Projects;
