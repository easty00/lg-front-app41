import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {                            // ✨ 새로: 허락 명단
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lgcns.com",    // 로고 그림이 있는 사이트
        pathname: "/**",              // 그 사이트의 모든 그림
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
