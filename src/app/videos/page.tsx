import type { Metadata } from 'next';
import React from 'react';
import { VideoList } from '@/components';

const Page = async () => {
    let videos = [];
    let error = null;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/videos?size=20`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        videos = await response.json();
    } catch (err: any) {
        error = err?.message ?? true;
    }

    if (error)
        return <main className="content">An error occurred: {error}</main>;

    return (
        <main className="content">
            <VideoList isLoading={false} videos={videos} />
        </main>
    );
};

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: 'Videos',
        description:
            'A collection of 20 of the latest videos created by Brian Behrens.',
    };
};

export default Page;
