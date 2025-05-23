import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // cho phép bất kỳ domain nào
      },
    ],
  },
};

export default nextConfig;
