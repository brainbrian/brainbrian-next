import React from 'react';
import type { GetStaticProps, NextPage } from 'next';

import { Head, Header, Pagination, Project } from '../../components';
import type { Post, Project as ProjectType } from '../../types';
import { getProjects, getProjectsTotalCount } from '../../utils/projects';
import { getPosts } from '../../utils/posts';

const PAGE_SIZE = 10;
const PAGE_ORDER = 'desc';

interface Props {
    currentPage: number;
    error?: string;
    projects: ProjectType[];
    totalCount: number;
    recentPosts?: Post[];
}

const Projects: NextPage<Props> = ({
    currentPage,
    error,
    projects,
    totalCount,
}) => {
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const projectsComponents = projects.map(
        ({ excerpt, slug, title, image }) => (
            <Project
                key={slug}
                excerpt={excerpt}
                imageUrl={`/images/projects/${slug}/${image}`}
                slug={`/project/${slug}`}
                title={title}
            />
        ),
    );

    if (error) return <p>An error occurred: {error}</p>;

    return (
        <>
            <Head
                title="Projects | Brian Behrens | Los Angeles Software Engineer"
                description="Projects (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            <Header />
            <main className="content">
                {projectsComponents}
                <Pagination
                    basePath={'/projects'}
                    currentPage={currentPage}
                    numPages={totalPages}
                />
            </main>
        </>
    );
};

export async function getStaticPaths() {
    const totalPages = Math.ceil((await getProjectsTotalCount()) / PAGE_SIZE);

    const paths = Array(totalPages)
        .fill(0)
        .map((_, index) => ({
            params: { page: String(index + 1) },
        }));

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const currentPage = Number(context.params?.page) || 1;
    try {
        const postData = await getProjects(currentPage, PAGE_SIZE, PAGE_ORDER);
        const { projects, totalCount } = postData;
        const recentPostData = await getPosts(1, 8, 'desc');
        const { posts: recentPosts } = recentPostData;
        return {
            props: { currentPage, projects, recentPosts, totalCount },
        };
    } catch (error: any) {
        return {
            props: {
                currentPage,
                error: error?.message,
                projects: [],
                recentPosts: [],
                totalCount: 0,
            },
        };
    }
};

export default Projects;
