'use client';

import React, { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';

export const Social: React.FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="sm:w-1/2 sm:odd:pr-4 sm:even:pl-4">
            <a href="https://instagram.com/brianbehrens" className="header-bar">
                <h2 className="header-bar__text">Social</h2>
            </a>
            <div className="mx-auto">
                {isMounted && (
                    <InstagramEmbed
                        url="https://www.instagram.com/brianbehrens/"
                        width={'100%'}
                        // captioned
                        className="border-none m-0 w-full"
                    />
                )}
            </div>
        </section>
    );
};
