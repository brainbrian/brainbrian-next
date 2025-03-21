'use server';

import React from 'react';

import { Project } from '@/components';
import type { Project as ProjectType } from '@/types';
import { getProjects } from '@/utils/projects';

import Styles from './ProjectsRecent.module.scss';

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
            <section className={Styles.ProjectsRecent}>
                <a className="header-bar" href="./projects">
                    <h2 className="header-bar__text">Recent Projects</h2>
                </a>
                {projectsComponents}
            </section>
        </div>
    );
};
