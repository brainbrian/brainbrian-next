import * as React from 'react';
import { format } from 'date-fns';

import { Loader } from '@/components';

interface VideoListProps {
    videos: Array<{
        id: number;
        snippet: {
            publishedAt: string;
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
            <ul className="list-none m-0 p-0 grid grid-cols-1 xs:grid-cols-2 gap-8">
                {videos?.map((video, index) => (
                    <li
                        key={video?.snippet?.resourceId?.videoId}
                        className={`opacity-0 animate-fadeInUp ${getAnimationDelay(index)}`}
                    >
                        <a
                            href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}
                            className="flex flex-col hover:no-underline focus-visible:no-underline group rounded-lg overflow-hidden h-full"
                        >
                            <div className="overflow-hidden pb-[56.25%] relative w-full rounded-t-lg flex-shrink-0">
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
                            <div className="bg-[#383838] group-hover:bg-[#404040] transition-colors p-4 rounded-b-lg flex-1">
                                <h3 className="text-text group-hover:text-primary transition-colors text-sm font-medium leading-tight mb-1 m-0">
                                    {video?.snippet?.title}
                                </h3>
                                {video?.snippet?.publishedAt && (
                                    <span className="text-xs text-gray-400">
                                        {format(
                                            new Date(video.snippet.publishedAt),
                                            'MMMM dd, yyyy',
                                        )}
                                    </span>
                                )}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="text-center mt-8">
                <a
                    href="https://www.youtube.com/c/BrianBehrens/videos"
                    className="inline-flex items-center gap-2 bg-[#262626] text-white px-5 py-2.5 rounded-lg hover:bg-[#23a1ff] transition-all duration-200 no-underline font-medium group"
                >
                    View more on YouTube
                    <svg
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            </div>
        </>
    );
};
