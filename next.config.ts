import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "wise-notes-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
