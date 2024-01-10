import * as React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import Styles from './Header.module.scss';

export const Header = (): any => {
    const navItems = [
        { name: 'Projects', href: '/projects' },
        { name: 'Resume', href: '/resume' },
        { name: 'Posts', href: '/posts' },
        { name: 'Videos', href: '/videos' },
        { name: 'Gallery', href: 'https://gallery.brainbrian.com' },
    ];

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
                                        [Styles.NavLinkActive]: false, //router.asPath === href,
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
