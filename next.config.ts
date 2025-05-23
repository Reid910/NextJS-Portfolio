import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
      reactRefresh: false,
  },
  images: {
      domains: ['assets.diablo3.blizzard.com'],
  }
};

export default nextConfig;
