import type { Metadata, NextPage } from 'next';
import React from 'react';

import { Pagination, Project } from '@/components';
import type { Project as ProjectType } from '@/types';
import { getProjects } from '@/utils/projects';

const PAGE_SIZE = 10;
const PAGE_ORDER = 'desc';

interface ProjectsPageProps {
    searchParams: Promise<{ page?: string }>;
}

const ProjectsPage: NextPage<ProjectsPageProps> = async ({ searchParams }) => {
    const searchParamsResolved = await searchParams;
    const currentPage: number = searchParamsResolved?.page
        ? Number(searchParamsResolved?.page)
        : 1;
    let projects: ProjectType[] = [];
    let totalCount: number = 0;
    let projectsError: unknown;
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
    } catch (error: unknown) {
        projectsError = error;
    }
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);
    const projectsComponents = projects.map(
        ({ excerpt, slug, title, image, tags }) => (
            <Project
                key={slug}
                excerpt={excerpt}
                imageUrl={`/content/projects/${slug}/${image.replace('./', '')}`}
                slug={`/projects/${slug}`}
                title={title}
                tags={tags}
            />
        ),
    );
    if (projectsError)
        return <p>An error occurred: {projectsError.toString()}</p>;
    return (
        <main className="mx-auto my-8 max-w-screen-2xl px-4 sm:px-6 lg:px-8">
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
        openGraph: {
            images: ['/images/share-computer.jpg'],
        },
    };
};

export default ProjectsPage;
