/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
};

module.exports = nextConfig;
