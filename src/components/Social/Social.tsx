'use client';

import React from 'react';
import Script from 'next/script';

import styles from './Social.module.scss';
import { InstagramEmbed } from 'react-social-media-embed';

export const Social: React.FC = () => {
    return (
        <>
            <a href="https://instagram.com/brianbehrens" className="header-bar">
                <h2 className="header-bar__text">Social</h2>
            </a>
            <div className={styles.timeline}>
                <InstagramEmbed
                    url="https://www.instagram.com/brianbehrens/"
                    width={'100%'}
                    // captioned
                />
            </div>
        </>
    );
};
