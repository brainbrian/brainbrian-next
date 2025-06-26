'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Play } from 'lucide-react';
import { BlueSkyImage, HeaderSection } from '@/components';

interface BlueSkyAuthor {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
    createdAt: string;
}

interface BlueSkyEmbed {
    $type: string;
    images?: {
        thumb: string;
        fullsize: string;
        alt: string;
        aspectRatio: {
            width: number;
            height: number;
        };
        video?: {
            duration: number;
            size: number;
            type: string;
            url: string;
        };
    }[];
    external?: {
        uri: string;
        title: string;
        description: string;
        thumb: string;
    };
    record?: {
        uri: string;
        cid: string;
        author?: {
            did: string;
            handle: string;
            displayName?: string;
            avatar?: string;
        };
        value?: {
            text: string;
        };
        embeds?: BlueSkyEmbed[];
    };
    cid?: string;
    playlist?: string;
    thumbnail?: string;
    aspectRatio?: {
        width: number;
        height: number;
    };
}

interface BlueSkyPost {
    uri: string;
    cid: string;
    author: BlueSkyAuthor;
    record: {
        $type: string;
        text: string;
        createdAt: string;
        reply?: {
            parent: {
                cid: string;
                uri: string;
            };
            root: {
                cid: string;
                uri: string;
            };
        };
    };
    embed?: BlueSkyEmbed;
    indexedAt: string;
}

interface BlueSkyFeedItem {
    post: BlueSkyPost;
}

interface BlueSkyFeedProps {
    actor: string;
    postsToShow?: number;
    className?: string;
}

export const BlueSkyFeed: React.FC<BlueSkyFeedProps> = async ({
    actor,
    postsToShow = 3,
    className = 'sm:w-1/2 sm:odd:pr-4 sm:even:pl-4',
}) => {
    let feed: BlueSkyFeedItem[] = [];
    let error: string | null = null;

    try {
        const response = await fetch(
            `https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=${postsToShow}&filter=posts_no_replies`,
            {
                next: { revalidate: 300 }, // Cache for 5 minutes
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch feed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data?.feed) {
            feed = data.feed;
        } else {
            console.error('Unexpected API response format:', data);
            error = 'Unexpected API response format';
        }
    } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to fetch feed';
        console.error('Error fetching BlueSky feed:', err);
    }

    const renderError = () => (
        <div className="text-red-400 p-4 bg-[#383838] rounded-lg text-sm">
            Failed to load BlueSky feed. {error}
        </div>
    );

    const renderExternalEmbed = (
        embed: NonNullable<BlueSkyEmbed['external']>,
    ) => (
        <div className="mt-3 mb-3 border border-gray-700 rounded-lg overflow-hidden flex">
            {embed.thumb && (
                <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                        src={embed.thumb}
                        alt=""
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="p-2 flex-1 min-w-0">
                <h3 className="text-xs font-medium m-0 line-clamp-1">
                    {embed.title}
                </h3>
                <p className="text-xs text-gray-400 m-0 line-clamp-1">
                    {embed.description}
                </p>
            </div>
        </div>
    );

    const renderVideoEmbed = (embed: BlueSkyEmbed) => (
        <div className="mt-3 mb-3">
            <div className="relative rounded-lg overflow-hidden border border-gray-700 aspect-video max-w-[320px]">
                <div className="absolute inset-0">
                    {embed.thumbnail ? (
                        <Image
                            src={embed.thumbnail}
                            alt="Video thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <div className="text-center">
                                <div className="bg-black bg-opacity-75 rounded-full p-4 inline-block mb-2">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                                <p className="text-sm text-gray-400">Video</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-200">
                        <div className="bg-black/75 rounded-full p-3">
                            <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderQuotedPost = (embed: NonNullable<BlueSkyEmbed['record']>) => (
        <div className="mt-3 mb-3 border border-gray-700 rounded-lg p-3 bg-[#2a2a2a]">
            <div className="text-xs text-gray-400 mb-1">
                Quoted post by @{embed.author?.handle || 'unknown'}
            </div>
            <p className="text-sm text-text line-clamp-2">
                {embed.value?.text || ''}
            </p>
            {embed.embeds?.map((quotedEmbed, index) => {
                if (
                    quotedEmbed.$type === 'app.bsky.embed.images#view' &&
                    quotedEmbed.images
                ) {
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-1 mt-2"
                        >
                            {quotedEmbed.images.map(
                                (image, imgIndex) =>
                                    image && (
                                        <div
                                            key={imgIndex}
                                            className="rounded overflow-hidden relative"
                                        >
                                            <BlueSkyImage
                                                image={image}
                                                size="small"
                                            />
                                        </div>
                                    ),
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );

    const renderFeed = () => {
        if (!feed || feed.length === 0) {
            return (
                <div className="text-gray-400 p-3 bg-[#383838] rounded-lg text-xs">
                    No posts found.
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {feed.map((item) => {
                    if (
                        !item?.post?.author ||
                        !item.post.uri ||
                        !item.post.record
                    ) {
                        return null;
                    }

                    const { post } = item;
                    const postId = post.uri.split('/').pop();
                    const handle = post.author.handle || actor;
                    const createdAt = post.record.createdAt || post.indexedAt;

                    return (
                        <Link
                            href={`https://bsky.app/profile/${handle}/post/${postId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={post.cid || `post-${postId}`}
                            className="block bg-[#383838] p-3 rounded-lg hover:bg-[#404040] focus-visible:bg-[#404040] focus-visible:outline-none transition-colors no-underline group"
                        >
                            <div>
                                <p className="text-sm text-text mb-1 line-clamp-3">
                                    {post.record.text || ''}
                                </p>

                                <div className="mt-1">
                                    {post.embed && (
                                        <>
                                            {post.embed.$type ===
                                                'app.bsky.embed.images#view' &&
                                                post.embed.images && (
                                                    <div className="mt-3 mb-3">
                                                        <div className="grid grid-cols-2 gap-2 w-full">
                                                            {post.embed.images.map(
                                                                (
                                                                    image,
                                                                    index,
                                                                ) =>
                                                                    image && (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="rounded-lg overflow-hidden relative border border-gray-700"
                                                                            style={{
                                                                                maxHeight:
                                                                                    post
                                                                                        .embed
                                                                                        ?.images
                                                                                        ?.length ===
                                                                                    1
                                                                                        ? '240px'
                                                                                        : '180px',
                                                                                maxWidth:
                                                                                    '100%',
                                                                            }}
                                                                        >
                                                                            <BlueSkyImage
                                                                                image={
                                                                                    image
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            {post.embed.$type ===
                                                'app.bsky.embed.external#view' &&
                                                post.embed.external &&
                                                renderExternalEmbed(
                                                    post.embed.external,
                                                )}
                                            {post.embed.$type ===
                                                'app.bsky.embed.video#view' &&
                                                renderVideoEmbed(post.embed)}
                                            {post.embed.$type ===
                                                'app.bsky.embed.record#view' &&
                                                post.embed.record &&
                                                renderQuotedPost(
                                                    post.embed.record,
                                                )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-2 text-xs flex items-baseline">
                                    <span className="text-gray-400">
                                        {createdAt
                                            ? format(
                                                  new Date(createdAt),
                                                  'MMMM d, yyyy',
                                              )
                                            : ''}
                                    </span>
                                    <span className="text-gray-500 opacity-50 ml-1 group-hover:opacity-100 group-hover:text-[#23a1ff] group-focus-visible:opacity-100 group-focus-visible:text-[#23a1ff] transition-all duration-200">
                                        - @brainbrian.com on Bluesky
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <section className={className}>
            <HeaderSection
                title="Social"
                component="h2"
                href={`https://bsky.app/profile/${actor}`}
                target="_blank"
                rel="noopener noreferrer"
            />
            <div className="mx-auto">
                {error ? renderError() : renderFeed()}
            </div>
        </section>
    );
};
