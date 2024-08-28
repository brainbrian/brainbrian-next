import React from 'react';
import Link from 'next/link';

import Styles from './Project.module.scss';

interface ProjectProps {
    excerpt?: string;
    imageUrl: string;
    slug: string;
    title: string;
}

export const Project: React.FC<ProjectProps> = ({
    excerpt,
    imageUrl,
    slug,
    title,
}) => (
    <article className={Styles.Project}>
        <Link href={slug} className={Styles.Link}>
            <h2>{title}</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imageUrl && <img src={imageUrl} alt={`${title} Sample`} />}
        </Link>
        {excerpt && (
            <p
                className={Styles.Content}
                dangerouslySetInnerHTML={{ __html: excerpt }}
            />
        )}
    </article>
);
