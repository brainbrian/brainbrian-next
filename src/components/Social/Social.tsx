'use client';

import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import { useIsMounted } from 'usehooks-ts';

import styles from './Social.module.scss';

export const Social: React.FC = () => {
    const isMounted = useIsMounted();

    return (
        <section>
            <a href="https://instagram.com/brianbehrens" className="header-bar">
                <h2 className="header-bar__text">Social</h2>
            </a>
            <div className={styles.timeline}>
                {isMounted() && (
                    <InstagramEmbed
                        url="https://www.instagram.com/brianbehrens/"
                        width={'100%'}
                        // captioned
                    />
                )}
            </div>
        </section>
    );
};
