import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.bsky.app',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'video.bsky.app',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'brainbrian.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
