'use server';

import React from 'react';

import { Project } from '@/components';
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
        ({ slug, title, image, excerpt }, index) => (
            <Project
                key={index}
                excerpt={excerpt}
                imageUrl={`/content/projects/${slug}/${image}`}
                slug={`/projects/${slug}`}
                title={title}
            />
        ),
    );

    return (
        <div className="bg-page">
            <section className="mx-auto -mb-16 max-w-[90rem] p-8">
                <a
                    className="bg-darker text-light block font-headline font-bold mb-4 p-4 uppercase hover:no-underline"
                    href="./projects"
                >
                    <h2 className="text-light text-xl md:text-2xl m-0 hover:text-main">
                        Recent Projects
                    </h2>
                </a>
                {projectsComponents}
            </section>
        </div>
    );
};
