import React from 'react';
import Link from 'next/link';

import Styles from './PostLink.module.scss';

export const PostLink = ({
    excerpt,
    date,
    href,
    title,
}: {
    date: string;
    excerpt?: string;
    href: string;
    title: string;
}): React.ReactElement<HTMLDivElement> => {
    return (
        <article className="limit-text-width">
            <Link className={Styles.PostLink} href={href}>
                {title}
            </Link>
            <p className={Styles.PostLinkDate}>{date}</p>
            <p>{excerpt}</p>
        </article>
    );
};
