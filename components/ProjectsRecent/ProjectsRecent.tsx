import React, { useMemo } from 'react';

import { Project } from '../';
import type { Project as ProjectType } from '../../types';

import Styles from './ProjectsRecent.module.scss';

export const ProjectsRecent = ({ projects }: { projects?: ProjectType[] }) => {
    const projectsComponents = useMemo(
        () =>
            projects?.map(({ slug, title, image, excerpt }, index) => (
                <Project
                    key={index}
                    excerpt={excerpt}
                    imageUrl={`/images/projects/${slug}/${image}`}
                    slug={`/project/${slug}`}
                    title={title}
                />
            )),
        [projects],
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
