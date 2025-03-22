'use client';

import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        <header className="flex flex-row items-center bg-darker border-0 border-solid border-main border-b-[1rem] relative lg:fixed lg:left-0 lg:top-0 lg:w-full lg:z-10">
            <div className="flex flex-col items-left w-full mx-auto max-w-[90rem] md:flex-row md:items-center md:h-[5rem]">
                <Link
                    className="flex items-center justify-center flex-none bg-main text-light font-headline font-bold text-[1.25rem] h-[3rem] w-full uppercase transition-colors duration-200 hover:bg-dark hover:text-main focus-visible:bg-dark focus-visible:text-main focus:outline-hidden md:h-[5rem] md:w-[13rem] lg:text-[2rem] lg:w-[15rem]"
                    href="/"
                >
                    Brain Brian
                </Link>
                <p className="text-main text-[0.5rem] italic m-0 px-8 whitespace-nowrap hidden xl:block xl:text-[1rem]">
                    software engineer living in Los Angeles, California.
                </p>
                <nav className="w-full">
                    <ul className="flex justify-center bg-darker flex-1 list-none m-0 p-0 md:bg-transparent md:float-right">
                        {navItems.map(({ name, href }, index) => (
                            <li className="relative" key={index}>
                                <Link
                                    className={cx(
                                        "flex items-center justify-center flex-1 text-light font-headline font-medium text-[0.7rem] h-[3rem] px-2 uppercase no-underline transition-colors duration-200 hover:bg-dark hover:no-underline focus-visible:bg-dark focus-visible:no-underline focus:outline-hidden relative after:content-[''] after:absolute after:bg-dark after:bottom-[-1rem] after:h-[1rem] after:left-0 after:w-full after:opacity-0 after:transition-opacity after:duration-200 after:z-2 sm:text-[0.75rem] sm:px-3 md:text-[1.125rem] md:h-[5rem] md:px-[1rem]",
                                        {
                                            'bg-dark after:opacity-100 after:animate-nav-animation':
                                                pathname.includes(href),
                                        },
                                    )}
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
