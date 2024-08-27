'use server';

import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Social } from '../';
import type { Post } from '../../types';
import { getPosts } from '../../utils/posts';

import Styles from './Footer.module.scss';

export const Footer: React.FC = async () => {
    let recentPosts: Post[] = [];

    try {
        const postData = await getPosts(1, 8, 'desc');
        const { posts } = postData;
        recentPosts = posts;
    } catch (error: any) {}

    return (
        <div className="bg-page">
            <aside className={`content ${Styles.Aside}`}>
                <section>
                    <Link href="/posts" className="header-bar">
                        <h2 className="header-bar__text">From The Brain</h2>
                    </Link>
                    <ul className={Styles.List}>
                        {recentPosts?.map(({ date, slug, title }) => (
                            <li key={slug} className={Styles.ListItemBrain}>
                                <p>
                                    <Link href={`/posts/${slug}`}>
                                        {title}{' '}
                                        <span>
                                            {format(
                                                new Date(date),
                                                'MMMM dd, yyyy',
                                            )}
                                        </span>
                                    </Link>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <Social />
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
