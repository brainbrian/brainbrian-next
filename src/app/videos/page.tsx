import type { Metadata } from 'next';
import React from 'react';
import { HeaderSection, VideoList } from '@/components';
import { fetchVideosFromPlaylist } from '@/lib/youtube';

const Page = async () => {
    let videos = [];
    let error = null;

    try {
        videos = await fetchVideosFromPlaylist(21);
    } catch (err: unknown) {
        error = err instanceof Error ? err.message : true;
    }

    if (error)
        return <main className="content">An error occurred: {error}</main>;

    return (
        <main className="content md:my-12">
            <HeaderSection title="Videos" component="h1" />
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
