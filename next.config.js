/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['commons.wikimedia.org', 'upload.wikimedia.org'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Add path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
};

module.exports = nextConfig;
