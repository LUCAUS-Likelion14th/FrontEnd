import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lucaus-994851303288-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
