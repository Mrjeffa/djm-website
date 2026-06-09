import type { MetadataRoute } from 'next';
import { getMotors } from '@/lib/motors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://djm-website.pages.dev';

  const motors = await getMotors();
  const motorUrls = motors.map(m => ({
    url: `${base}/motor/${m.slug}`,
    lastModified: new Date(m.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/aanbod`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/motor-verkopen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/proefrit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/over-ons`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...motorUrls,
  ];
}
