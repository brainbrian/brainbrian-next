import * as React from 'react';

import { Loader } from '@/components';

import Styles from './VideoList.module.scss';

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

    return (
        <>
            <ul className={Styles.VideoList}>
                {videos?.map((video) => (
                    <li
                        key={video?.snippet?.resourceId?.videoId}
                        className={Styles.VideoListItem}
                    >
                        <a
                            href={`https://www.youtube.com/watch?v=${video?.snippet?.resourceId?.videoId}`}
                        >
                            <div className={Styles.VideoListImage}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={
                                        video?.snippet?.thumbnails?.standard
                                            ?.url ??
                                        video?.snippet?.thumbnails?.high?.url
                                    }
                                    alt={`Thumbnail of video ${video.id}`}
                                />
                            </div>
                            <h2>{video?.snippet?.title}</h2>
                        </a>
                    </li>
                ))}
            </ul>
            <p className={Styles.VideoListLink}>
                <a href="https://www.youtube.com/c/BrianBehrens/videos">
                    More on youtube.com
                </a>
            </p>
        </>
    );
};
