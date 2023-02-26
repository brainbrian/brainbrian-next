import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { TwitterTimeline } from '../TwitterTimeline/TwitterTimeline';

import Styles from './Footer.module.scss';

interface Post {
    date: string;
    slug: string;
    title: string;
}

interface PostsResponse {
    posts: Post[];
}

export const Footer = () => {
    const { data: posts, error: postsError } = useSWR<PostsResponse>(
        `/api/posts?size=10`,
        async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        },
    );

    return (
        <div className="bg-page">
            <aside className={`content ${Styles.Aside}`}>
                <section>
                    <Link href="/posts" className="header-bar">
                        <h2 className="header-bar__text">From The Brain</h2>
                    </Link>
                    {postsError ? (
                        <p>Error getting posts.</p>
                    ) : (
                        <ul className={Styles.List}>
                            {posts?.posts?.map(({ date, slug, title }) => (
                                <li key={slug} className={Styles.ListItemBrain}>
                                    <p>
                                        <Link href={`/posts/${slug}`}>
                                            {title} <span>{date}</span>
                                        </Link>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section>
                    <TwitterTimeline />
                </section>
            </aside>
            <footer className={Styles.Footer}>
                &copy; {new Date().getFullYear()} Brain Brian (Brian Behrens) –{' '}
                Powered by coffee, froth, salt water and curiosity –{' '}
                <a href="https://www.brainbrian.com">brainbrian.com</a>
            </footer>
        </div>
    );
};

export default Footer;
