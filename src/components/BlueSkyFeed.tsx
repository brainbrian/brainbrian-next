'use server';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

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
    }[];
    external?: {
        uri: string;
        title: string;
        description: string;
        thumb: string;
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
            `https://api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=${postsToShow}`,
            {
                next: { revalidate: 300 }, // Cache for 5 minutes
            },
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch feed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.feed)) {
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
                    // Skip items with missing critical data
                    if (!item || !item.post) {
                        console.warn(
                            'Skipping item with missing post data:',
                            item,
                        );
                        return null;
                    }

                    const post = item.post;

                    // Skip posts with missing critical data
                    if (!post.author || !post.uri || !post.record) {
                        console.warn('Skipping post with missing data:', post);
                        return null;
                    }

                    const postId = post.uri.split('/').pop();
                    const handle = post.author.handle || actor;
                    const createdAt = post.record.createdAt || post.indexedAt;

                    return (
                        <Link
                            href={`https://bsky.app/profile/${handle}/post/${postId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={post.cid || `post-${postId}`}
                            className="block bg-[#383838] p-3 rounded-lg hover:bg-[#404040] transition-colors no-underline group"
                        >
                            <div>
                                <p className="text-sm text-text mb-1 line-clamp-3">
                                    {post.record.text || ''}
                                </p>

                                <div className="mt-1">
                                    {/* Image embeds - using object-fit: fill without upscaling */}
                                    {post.embed &&
                                        post.embed.$type ===
                                            'app.bsky.embed.images#view' &&
                                        post.embed.images &&
                                        post.embed.images.length > 0 && (
                                            <div className="mt-3 mb-3">
                                                <div className="grid grid-cols-2 gap-2 w-full">
                                                    {post.embed.images.map(
                                                        (image, index) => {
                                                            if (!image)
                                                                return null;

                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="rounded-lg overflow-hidden relative border border-gray-700"
                                                                    style={{
                                                                        maxHeight:
                                                                            post
                                                                                .embed
                                                                                ?.images &&
                                                                            post
                                                                                .embed
                                                                                .images
                                                                                .length ===
                                                                                1
                                                                                ? '240px'
                                                                                : '180px',
                                                                        maxWidth:
                                                                            '100%',
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={
                                                                            image.thumb
                                                                        }
                                                                        alt={
                                                                            image.alt ||
                                                                            ''
                                                                        }
                                                                        width={
                                                                            image.aspectRatio
                                                                                ? image
                                                                                      .aspectRatio
                                                                                      .width
                                                                                : 800
                                                                        }
                                                                        height={
                                                                            image.aspectRatio
                                                                                ? image
                                                                                      .aspectRatio
                                                                                      .height
                                                                                : 800
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                        style={{
                                                                            maxWidth:
                                                                                '100%',
                                                                            maxHeight:
                                                                                '100%',
                                                                        }}
                                                                        sizes="50vw"
                                                                    />
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* External link embeds - left aligned */}
                                    {post.embed &&
                                        post.embed.$type ===
                                            'app.bsky.embed.external#view' &&
                                        post.embed.external && (
                                            <div className="mt-3 mb-3 border border-gray-700 rounded-lg overflow-hidden flex max-w-[85%]">
                                                {post.embed.external.thumb && (
                                                    <div className="relative h-16 w-16 flex-shrink-0">
                                                        <Image
                                                            src={
                                                                post.embed
                                                                    .external
                                                                    .thumb
                                                            }
                                                            alt=""
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-2 flex-1 min-w-0">
                                                    <h3 className="text-xs font-medium m-0 line-clamp-1">
                                                        {
                                                            post.embed.external
                                                                .title
                                                        }
                                                    </h3>
                                                    <p className="text-xs text-gray-400 m-0 line-clamp-1">
                                                        {
                                                            post.embed.external
                                                                .description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
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
            <a
                href={`https://bsky.app/profile/${actor}`}
                className="bg-background text-text block font-headline font-bold mb-4 p-4 uppercase hover:no-underline hover:text-primary group rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h2 className="text-text text-xl sm:text-2xl font-bold group-hover:text-primary">
                    Social
                </h2>
            </a>
            <div className="mx-auto">
                {error ? renderError() : renderFeed()}
            </div>
        </section>
    );
};
