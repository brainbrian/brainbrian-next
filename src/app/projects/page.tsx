import type { Metadata, NextPage } from 'next';
import React from 'react';

import { Pagination, Project } from '@/components';
import type { Project as ProjectType } from '@/types';
import { getProjects } from '@/utils/projects';

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
                imageUrl={`/content/projects/${slug}/${image}`}
                slug={`/projects/${slug}`}
                title={title}
            />
        ),
    );

    if (projectsError) return <p>An error occurred: {projectsError}</p>;

    return (
        <main className="content">
            {projectsComponents}
            <Pagination
                basePath={'/projects'}
                currentPage={currentPage}
                numPages={totalPages}
            />
        </main>
    );
};

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Projects',
        description:
            'A collection of projects Brian Behrens has completed throughout his life.',
    };
};

export default ProjectsPage;
