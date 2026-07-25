/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/blog-site',
    assetPrefix: '/blog-site',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
