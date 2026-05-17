import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lucaus.com" }],
        destination: "https://www.lucaus.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
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
