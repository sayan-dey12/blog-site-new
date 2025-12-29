// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Fix Windows + Turbopack invalid source map warnings
  productionBrowserSourceMaps: false,

  // Allow Cloudinary & other external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  // Good practice for App Router – avoids some hydration bugs
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
