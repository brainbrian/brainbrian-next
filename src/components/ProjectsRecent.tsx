'use server';

import React from 'react';

import { HeaderSection, Project } from '@/components';
import type { Project as ProjectType } from '@/types';
import { getProjects } from '@/utils/projects';

export const ProjectsRecent: React.FC = async () => {
    let recentProjects: ProjectType[] = [];

    try {
        const projectData = await getProjects(1, 3, 'desc');
        const { projects } = projectData;
        recentProjects = projects;
    } catch (error: unknown) {
        console.error(error);
    }

    const projectsComponents = recentProjects?.map(
        ({ slug, title, image, excerpt, tags }, index) => (
            <Project
                key={index}
                excerpt={excerpt}
                imageUrl={`/content/projects/${slug}/${image.replace('./', '')}`}
                slug={`/projects/${slug}`}
                title={title}
                tags={tags}
            />
        ),
    );

    return (
        <div className="bg-surface">
            <section className="mx-auto -mb-16 max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                <HeaderSection
                    title="Recent Projects"
                    component="h2"
                    href="./projects"
                />
                {projectsComponents}
            </section>
        </div>
    );
};
