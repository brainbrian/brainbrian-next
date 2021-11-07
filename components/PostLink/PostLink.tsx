import React from 'react';
import Link from 'next/link';

import * as Styles from './PostLink.module.scss';

export const PostLink = ({
    date,
    excerpt,
    href,
    title,
}: {
    date: string;
    excerpt: string;
    href: string;
    title: string;
}): React.ReactElement<HTMLDivElement> => (
    <article className="limit-text-width">
        <Link href={href}>
            <a className={Styles.PostLink}>{title}</a>
        </Link>
        <p className={Styles.PostLinkDate}>{date}</p>
        <p>{excerpt}</p>
    </article>
);
