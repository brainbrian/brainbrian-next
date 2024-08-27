'use client';

import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Styles from './Header.module.scss';

const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Posts', href: '/posts' },
    { name: 'Videos', href: '/videos' },
    { name: 'Gallery', href: 'https://gallery.brainbrian.com' },
];

export const Header: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className={Styles.Header}>
            <div className={Styles.HeaderContainer}>
                <Link className={Styles.Logo} href="/">
                    Brain Brian
                </Link>
                <p className={Styles.Tagline}>
                    software engineer living in Los Angeles, California.
                </p>
                <nav className={Styles.Nav}>
                    <ul className={Styles.NavList}>
                        {navItems.map(({ name, href }, index) => (
                            <li className={Styles.NavListItem} key={index}>
                                <Link
                                    className={cx(Styles.NavLink, {
                                        [Styles.NavLinkActive]:
                                            pathname.includes(href),
                                    })}
                                    href={href}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
