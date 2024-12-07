'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import GitHubButton from 'react-github-btn';

import Styles from './ProfileHeader.module.scss';
import Script from 'next/script';

interface ProfileHeaderProps {
    children: ReactNode;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ children }) => {
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
                            width="120"
                            height="30"
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
                <div
                    dangerouslySetInnerHTML={{
                        __html: `<bsky-widget handle="brainbrian.com" show-description="false" theme="dim"></bsky-widget>
                        `,
                    }}
                />
                <Script
                    src="https://unpkg.com/bsky-widget@~0.1/dist/index.js"
                    type="module"
                />
            </aside>
        </section>
    );
};
