'use server';

import React from 'react';
import type { NextPage } from 'next';

import { Head, Pagination, Project } from '../../components';
import type { Post, Project as ProjectType } from '../../types';
import { getProjects } from '../../utils/projects';
import { getPosts } from '../../utils/posts';

const PAGE_SIZE = 10;
const PAGE_ORDER = 'desc';

interface ProjectsPageProps {
    searchParams: { page?: string };
}

const ProjectsPage: NextPage<ProjectsPageProps> = async ({ searchParams }) => {
    const currentPage: number = searchParams?.page
        ? Number(searchParams?.page)
        : 1;
    let projects: ProjectType[] = [];
    let totalCount: number = 0;
    let projectsError: any;

    try {
        const projectsData = await getProjects(
            currentPage,
            PAGE_SIZE,
            PAGE_ORDER,
        );
        const { projects: projectsValue, totalCount: totalCountValue } =
            projectsData;
        projects = [...projectsValue];
        totalCount = totalCountValue;
    } catch (error: any) {
        projectsError = error;
    }

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const projectsComponents = projects.map(
        ({ excerpt, slug, title, image }) => (
            <Project
                key={slug}
                excerpt={excerpt}
                imageUrl={`/images/projects/${slug}/${image}`}
                slug={`/projects/${slug}`}
                title={title}
            />
        ),
    );

    if (projectsError) return <p>An error occurred: {projectsError}</p>;

    return (
        <main className="content">
            <Head
                title="Projects | Brian Behrens | Los Angeles Software Engineer"
                description="Projects (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            {projectsComponents}
            <Pagination
                basePath={'/projects'}
                currentPage={currentPage}
                numPages={totalPages}
            />
        </main>
    );
};

export default ProjectsPage;
