import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Helps with hydration issues
    optimizePackageImports: ['axios'],
  },
  // Suppress hydration warnings in development (caused by browser extensions)
  reactStrictMode: true,
};

export default nextConfig;
