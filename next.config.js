/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: [],
    },
    reactStrictMode: true,
    webpack: (config) => {
        return config;
    },
};
