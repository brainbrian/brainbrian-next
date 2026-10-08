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

    return (
        <>
            <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-y-8 sm:gap-x-0 lg:gap-8">
                {videos?.map((video, index) => (
                    <li
                        key={video?.snippet?.resourceId?.videoId}
                        className="opacity-0 animate-fadeInUp sm:odd:pr-4 sm:even:pl-4 lg:odd:pr-0 lg:even:pl-0"
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <a
                            href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}
                            className="card card-interactive flex flex-col hover:no-underline focus-visible:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group overflow-hidden h-full"
                        >
                            <div className="overflow-hidden pb-[56.25%] relative w-full flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={
                                        video?.snippet?.thumbnails?.standard
                                            ?.url ??
                                        video?.snippet?.thumbnails?.high?.url
                                    }
                                    alt={`Thumbnail of video ${video.id}`}
                                    className="absolute top-1/2 -translate-y-1/2 w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                />
                            </div>
                            <div className="p-4 sm:p-5 flex-1">
                                <h3 className="text-text group-hover:text-primary group-focus-visible:text-primary transition-colors text-[0.9375rem] font-semibold leading-snug mb-1 m-0">
                                    {video?.snippet?.title}
                                </h3>
                                {video?.snippet?.publishedAt && (
                                    <span className="text-xs text-[var(--text-subtle)]">
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
            <div className="text-center mt-10 md:mt-12">
                <a
                    href="https://www.youtube.com/c/BrianBehrens/videos"
                    className="btn btn-primary"
                >
                    View more on YouTube
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
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
