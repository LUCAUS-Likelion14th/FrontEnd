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

  async rewrites() {
    return [
      {
        source: "/api/:path*", // 브라우저에서 /api로 시작하는 주소로 요청을 보내면
        destination: `${process.env.API_URL}/:path*`, // .env 파일에 적힌 실제 백엔드 주소로 전달!
      },
    ];
  },
};

export default nextConfig;
