import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dzxywzynjtmzbet5.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
