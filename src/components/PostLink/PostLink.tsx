import React from 'react';
import Link from 'next/link';

import Styles from './PostLink.module.scss';

interface PostLinkProps {
    date: string;
    excerpt?: string;
    href: string;
    title: string;
}

export const PostLink: React.FC<PostLinkProps> = ({
    excerpt,
    date,
    href,
    title,
}): React.ReactElement<HTMLDivElement> => {
    return (
        <article className="limit-text-width">
            <Link className={Styles.PostLink} href={href}>
                {title}
            </Link>
            <p className={Styles.PostLinkDate}>{date}</p>
            {excerpt && (
                <p>
                    {excerpt} <Link href={href}>[read more]</Link>
                </p>
            )}
        </article>
    );
};
