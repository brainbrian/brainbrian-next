const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: [],
    },
    async redirects() {
        return [
            {
                source: '/posts/1',
                destination: '/posts',
                permanent: true,
            },
            {
                source: '/projects/1',
                destination: '/projects',
                permanent: true,
            },
        ];
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: '**/**/*.jpg',
                        to: path.join(
                            __dirname,
                            'public/images/[path][name][ext]',
                        ),
                        context: path.join(__dirname, 'content'),
                    },
                    {
                        from: '**/**/*.webp',
                        to: path.join(
                            __dirname,
                            'public/images/[path][name][ext]',
                        ),
                        context: path.join(__dirname, 'content'),
                    },
                ],
                options: {
                    concurrency: 100,
                },
            }),
        );

        return config;
    },
};
