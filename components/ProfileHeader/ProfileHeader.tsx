'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import GitHubButton from 'react-github-btn';
import { Follow } from 'react-twitter-widgets';

import Styles from './ProfileHeader.module.scss';

export const ProfileHeader = ({ children }: { children: ReactNode }) => {
    return (
        <section className={Styles.ProfileHeader}>
            <div className={Styles.Biography}>{children}</div>
            <aside className={Styles.Aside}>
                <div className={Styles.ProfileImage} tabIndex={0}>
                    <Image
                        alt="Portrait of Brian Behrens"
                        height="1125"
                        src="/images/brian-behrens-profile.webp"
                        width="1125"
                        style={{ objectFit: 'fill' }}
                    />
                </div>
                <p>
                    <a href="https://www.linkedin.com/in/brianbehrens/">
                        <Image
                            loading="lazy"
                            src="/images/linkedin.svg"
                            alt="View Brian Behrens's profile on LinkedIn"
                            width="140"
                            height="35"
                        />
                    </a>
                </p>
                <p>
                    <GitHubButton
                        href="https://github.com/brainbrian"
                        data-color-scheme="no-preference: dark; light: light; dark: dark;"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Follow @brainbrian on GitHub"
                    >
                        Follow @brainbrian
                    </GitHubButton>
                </p>
                <Follow username="brianbehrens" options={{ size: 'large' }} />
            </aside>
        </section>
    );
};
