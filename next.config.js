/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: false,
    ignoreDuringBuilds: true,
    staticPageGenerationTimeout: 1000,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'gamers-board.vercel.app',
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        },
      ],
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
);

module.exports = nextConfig;
