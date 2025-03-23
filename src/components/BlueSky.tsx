'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlueSkyProfile {
    did: string;
    handle: string;
    displayName?: string;
    description?: string;
    avatar?: string;
    banner?: string;
    followersCount?: number;
    followsCount?: number;
    postsCount?: number;
    createdAt?: string;
    indexedAt?: string;
}

interface BlueSkyProps {
    actor: string;
    showBanner?: boolean;
    showCreationDate?: boolean;
}

export const BlueSky: React.FC<BlueSkyProps> = ({
    actor,
    showBanner = true,
    showCreationDate = true,
}) => {
    const [profile, setProfile] = useState<BlueSkyProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${actor}`,
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch profile: ${response.statusText}`,
                    );
                }

                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch profile',
                );
                console.error('Error fetching BlueSky profile:', err);
            } finally {
                setLoading(false);
            }
        };

        if (actor) {
            fetchProfile();
        }
    }, [actor]);

    if (loading) {
        return (
            <div className="rounded-lg bg-background overflow-hidden animate-pulse">
                {/* Banner skeleton */}
                {showBanner && <div className="w-full h-24 bg-gray-700"></div>}
                <div className="px-4 pb-3 pt-1">
                    <div className="flex flex-col">
                        {/* Avatar skeleton */}
                        <div
                            className={`flex-shrink-0 -ml-2 ${showBanner ? '-mt-14' : 'mt-3'}`}
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-700 border-4 border-background"></div>
                        </div>

                        {/* Profile info skeleton */}
                        <div className="flex justify-between items-start mt-1 mb-2">
                            <div>
                                <div className="h-5 w-28 bg-gray-700 rounded mb-1"></div>
                                <div className="h-3 w-20 bg-gray-700 rounded"></div>
                            </div>
                            <div className="rounded-full bg-gray-700 h-8 w-24 flex items-center justify-center">
                                <div className="h-3 w-3 bg-gray-600 rounded-full mr-2"></div>
                                <div className="h-2 w-16 bg-gray-600 rounded"></div>
                            </div>
                        </div>

                        {/* Emoji row skeleton */}
                        <div className="text-xs mt-1 flex items-center mb-1">
                            <div className="flex">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-3 w-3 bg-gray-700 rounded mr-1"
                                    ></div>
                                ))}
                                <div className="h-3 w-24 bg-gray-700 rounded ml-1"></div>
                            </div>
                        </div>

                        {/* Posts and join date skeleton */}
                        {showCreationDate && (
                            <div className="mt-2 flex items-center">
                                <div className="h-3 w-8 bg-gray-700 rounded"></div>
                                <div className="h-3 w-4 bg-gray-700 rounded-full mx-1"></div>
                                <div className="h-3 w-24 bg-gray-700 rounded"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="rounded-lg bg-background p-3 text-red-400 text-xs">
                Failed to load BlueSky profile
            </div>
        );
    }

    // Format creation date if it exists and showCreationDate is true
    const formattedCreationDate =
        profile.createdAt && showCreationDate
            ? format(new Date(profile.createdAt), 'MMM d, yyyy')
            : null;

    return (
        <div className="rounded-lg bg-background text-gray-200 overflow-hidden">
            {showBanner && profile.banner && (
                <div className="w-full h-24 relative">
                    <Image
                        src={profile.banner}
                        alt="Profile banner"
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="px-4 pb-3">
                <div className="flex flex-col">
                    {/* Avatar that overlaps the banner */}
                    {profile.avatar && (
                        <div
                            className={`flex-shrink-0 -ml-2 ${showBanner && profile.banner ? '-mt-16' : 'mt-3'}`}
                        >
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-background relative">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.displayName || profile.handle}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Profile info with follow button */}
                    <div className="flex justify-between items-start mt-1 mb-2">
                        <div>
                            <p className="text-base font-medium leading-none mb-1">
                                {profile.displayName || profile.handle}
                            </p>
                            <p className="text-xs text-gray-400 mt-0 mb-1">
                                @{profile.handle}
                            </p>
                        </div>
                        <Link
                            href={`https://bsky.app/profile/${profile.handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-blue-500 hover:bg-[#4ca2fe] text-white px-4 py-1 text-sm font-[600] flex items-center no-underline"
                        >
                            <span className="mr-1 text-base leading-none  no-underline">
                                +
                            </span>{' '}
                            Follow
                        </Link>
                    </div>

                    {/* Description content like location and links */}
                    {profile.handle.includes('brainbrian') && (
                        <div className="text-xs mt-1 flex flex-wrap items-center mb-1">
                            <span className="text-gray-300 flex items-center">
                                <span className="mr-3">
                                    🏄🏻🏂 🛹 🌵 🐶 📷 👨🏻‍💻
                                </span>
                                <span className="mr-1">📍</span> Los Angeles
                            </span>
                        </div>
                    )}

                    {/* Only show creation date if explicitly enabled */}
                    {formattedCreationDate && showCreationDate && (
                        <div className="mt-2 text-xs text-gray-500">
                            {profile.postsCount?.toLocaleString() || 0} posts •
                            Joined {formattedCreationDate}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
