import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import type { Post } from '../../types';
import { TwitterTimeline } from '../TwitterTimeline/TwitterTimeline';

import Styles from './Footer.module.scss';

interface Props {
    posts?: Post[];
}

export const Footer: NextPage<Props> = ({ posts }) => {
    return (
        <div className="bg-page">
            <aside className={`content ${Styles.Aside}`}>
                <section>
                    <Link href="/posts" className="header-bar">
                        <h2 className="header-bar__text">From The Brain</h2>
                    </Link>
                    <ul className={Styles.List}>
                        {posts?.map(({ date, slug, title }) => (
                            <li key={slug} className={Styles.ListItemBrain}>
                                <p>
                                    <Link href={`/post/${slug}`}>
                                        {title} <span>{date}</span>
                                    </Link>
                                </p>
                            </li>
                        ))}
                    </ul>
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
