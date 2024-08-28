'use client';

import { type NextPage } from 'next';
import React from 'react';
import useSWR from 'swr';
import { Head, VideoList } from '@/components';

const Page: NextPage = () => {
    const {
        data: videos,
        isLoading,
        error,
    } = useSWR(`/api/videos?size=20`, async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) return <main>An error occurred: {error.message}</main>;

    return (
        <main className="content">
            <Head
                title="Videos | Brian Behrens"
                description="A collection of 20 of the latest videos created by Brian Behrens."
            />
            <VideoList isLoading={isLoading} videos={videos} />
        </main>
    );
};

export default Page;
