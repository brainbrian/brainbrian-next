'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import GitHubButton from 'react-github-btn';
import LinkedIn from './Icons/LinkedIn';
import { BlueSkyProfile } from './BlueSkyProfile';

interface ProfileHeaderProps {
    children: ReactNode;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ children }) => {
    return (
        <section className="mx-auto max-w-[64rem] flex flex-col lg:flex-row">
            <div className="w-full lg:mr-8 mb-10 lg:mb-0">
                <div className="w-full [&>p]:text-lg [&>p]:leading-normal [&>p]:m-0 sm:[&>p]:text-xl md:[&>p]:text-2xl">
                    {children}
                </div>
            </div>
            <aside className="w-full lg:max-w-[17rem] lg:w-2/5">
                <p className="mb-4">
                    <a href="https://www.linkedin.com/in/brianbehrens/">
                        <LinkedIn className="text-[#0a66c2] block h-[30px] w-[120px]" />
                    </a>
                </p>
                <p className="mb-6 h-7">
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
                <div className="flex flex-col sm:flex-row sm:gap-6 lg:flex-col lg:gap-0 mb-8">
                    <div
                        className="rounded-[0.7rem] overflow-hidden relative w-full max-w-[350px] mb-4 group"
                        tabIndex={0}
                    >
                        <Image
                            alt="Portrait of Brian Behrens"
                            height="1125"
                            src="/images/brian-behrens-profile.webp"
                            width="1125"
                            className="block h-auto w-full object-fill"
                        />
                        <div className="absolute inset-0 bg-[url('/images/brian-behrens-profile-old.webp')] bg-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </div>
                    <div className="w-full">
                        <BlueSkyProfile
                            actor="brainbrian.com"
                            showBanner={true}
                            showCreationDate={true}
                        />
                    </div>
                </div>
            </aside>
        </section>
    );
};
