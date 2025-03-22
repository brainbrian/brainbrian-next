import * as React from 'react';

import { Loader } from '@/components';

interface VideoListProps {
    videos: Array<{
        id: number;
        snippet: {
            resourceId: {
                videoId: string;
            };
            thumbnails: {
                standard: {
                    url: string;
                };
                high: {
                    url: string;
                };
            };
            title: string;
        };
    }>;
    isLoading: boolean;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, isLoading }) => {
    if (isLoading) return <Loader />;

    // Define animation delay utility classes
    const getAnimationDelay = (index: number) => {
        const delays = [
            'delay-0',
            'delay-100',
            'delay-200',
            'delay-300',
            'delay-400',
            'delay-500',
            'delay-600',
            'delay-700',
        ];
        return delays[index % delays.length];
    };

    return (
        <>
            <ul className="list-none m-0 p-0 xs:flex xs:flex-wrap xs:w-full">
                {videos?.map((video, index) => (
                    <li
                        key={video?.snippet?.resourceId?.videoId}
                        className={`mb-8 opacity-0 xs:w-1/2 animate-fadeInUp ${getAnimationDelay(index)}`}
                    >
                        <a
                            href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}
                            className="block xs:odd:pr-4 xs:even:pl-4 hover:no-underline focus-visible:no-underline group"
                        >
                            <div className="overflow-hidden pb-[56.25%] relative w-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={
                                        video?.snippet?.thumbnails?.standard
                                            ?.url ??
                                        video?.snippet?.thumbnails?.high?.url
                                    }
                                    alt={`Thumbnail of video ${video.id}`}
                                    className="absolute top-1/2 -translate-y-1/2 w-full"
                                />
                            </div>
                            <h2 className="bg-darker text-xl md:text-2xl font-medium m-0 p-4 uppercase transition-[background-color,color] duration-200 group-hover:bg-main group-hover:text-light group-focus-visible:bg-main group-focus-visible:text-light">
                                {video?.snippet?.title}
                            </h2>
                        </a>
                    </li>
                ))}
            </ul>
            <p className="text-center">
                <a href="https://www.youtube.com/c/BrianBehrens/videos">
                    More on youtube.com
                </a>
            </p>
        </>
    );
};
