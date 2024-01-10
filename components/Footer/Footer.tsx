'use client';

import { format } from 'date-fns';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import type { Post } from '../../types';
import { TwitterTimeline } from '../TwitterTimeline/TwitterTimeline';

import Styles from './Footer.module.scss';

interface Props {
    posts?: Post[];
}

export const Footer: NextPage<Props> = ({ posts }) => (
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

export default Footer;
