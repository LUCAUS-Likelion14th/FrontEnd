import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "lucaus-994851303288-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
