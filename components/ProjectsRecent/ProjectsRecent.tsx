import React, { useMemo } from 'react';
import useSWR from 'swr';

import { Project } from '../';
import type { Project as ProjectType } from '../../types';

import Styles from './ProjectsRecent.module.scss';

export const ProjectsRecent = () => {
    const {
        data: projectData,
        isLoading: isProjectLoading,
        error: projectError,
    } = useSWR<{ projects: ProjectType[] }>(
        `/api/projects?size=3`,
        async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        },
    );

    const projectsComponents = useMemo(
        () =>
            projectData?.projects?.map(
                ({ slug, title, image, excerpt }, index) => (
                    <Project
                        key={index}
                        excerpt={excerpt}
                        imageUrl={`/images/projects/${slug}/${image}`}
                        slug={`/projects/${slug}`}
                        title={title}
                    />
                ),
            ),
        [projectData],
    );

    if (isProjectLoading || projectError) return null;

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
