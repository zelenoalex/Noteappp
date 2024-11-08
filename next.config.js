/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["flowbite.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
