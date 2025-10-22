import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.createusercontent.com/**')],
  },
};

export default nextConfig;
