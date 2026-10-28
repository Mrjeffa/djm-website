import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/aanbod', destination: '/occasions', permanent: true },
      { source: '/producten', destination: '/onderdelen', permanent: true },
      { source: '/blog/motorverzekering-kosten-2026', destination: '/blog/motorverzekering-kosten', permanent: true },
    ];
  },
};

export default nextConfig;
