import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.dejongemotoren.nl/sitemap.xml',
    host: 'https://www.dejongemotoren.nl',
  };
}
