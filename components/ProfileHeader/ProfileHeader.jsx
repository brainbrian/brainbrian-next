import * as React from 'react';
import Image from 'next/image';

import Styles from './ProfileHeader.module.scss';

export const ProfileHeader = ({ children }) => (
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
                <a
                    className="github-button"
                    href="https://github.com/brainbrian"
                    data-color-scheme="no-preference: light; light: light; dark: dark;"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Follow @brainbrian on GitHub"
                >
                    Follow @brainbrian
                </a>
            </p>
            <p>
                <a href="https://www.linkedin.com/in/brianbehrens/">
                    <Image
                        loading="lazy"
                        src="/images/linkedin.svg"
                        alt="View Brian Behrens's profile on LinkedIn"
                        width="140"
                        height="35"
                        border="0"
                    />
                </a>
            </p>
        </aside>
    </section>
);
