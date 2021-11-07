import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import * as Styles from './Header.module.scss';

export const Header = (): any => {
    const router = useRouter();
    const navItems = [
        { name: 'Projects', href: '/projects/' },
        { name: 'Resume', href: '/resume/' },
        { name: 'Posts', href: '/posts/' },
        { name: 'Videos', href: '/videos/' },
        { name: 'Gallery', href: '/gallery/' },
    ];

    return (
        <header className={Styles.Header}>
            <div className={Styles.HeaderContainer}>
                <Link href="/">
                    <a className={Styles.Logo}>Brain Brian</a>
                </Link>
                <p className={Styles.Tagline}>
                    software engineer living in Los Angeles, California.
                </p>
                <nav className={Styles.Nav}>
                    <ul className={Styles.NavList}>
                        {navItems.map(({ name, href }, index) => (
                            <li className={Styles.NavListItem} key={index}>
                                <Link href={href}>
                                    <a
                                        className={
                                            router.asPath == '/resume/'
                                                ? Styles.NavLinkActive
                                                : Styles.NavLink
                                        }
                                    >
                                        {name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};
