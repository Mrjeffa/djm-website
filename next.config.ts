import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // De site gebruikt next/image niet (foto's via Cloudinary). Beeldbewerker van Next uit:
  // er zijn meerdere beveiligingslekken in gevonden.
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/aanbod', destination: '/occasions', permanent: true },
      { source: '/producten', destination: '/onderdelen', permanent: true },
      { source: '/blog/motorverzekering-kosten-2026', destination: '/blog/motorverzekering-kosten', permanent: true },
    ];
  },
};

export default nextConfig;
