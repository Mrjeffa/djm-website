import type { MetadataRoute } from 'next';
import { getMotors, motorPad } from '@/lib/motors';
import { getProducten } from '@/lib/producten';
import { BLOG_POSTS } from '@/content/blog';
import { SITE_URL } from '@/lib/site';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [motoren, producten] = await Promise.all([getMotors(), getProducten()]);
  const laatsteMotor = motoren.map(m => m.datumIn ?? m.createdAt).filter(Boolean).sort().at(-1);

  const vast: MetadataRoute.Sitemap = [
    '/', '/occasions', '/werkplaats', '/winterstalling', '/motor-verkopen', '/proefrit',
    '/over-ons', '/contact', '/veelgestelde-vragen', '/blog', '/privacy', '/algemene-voorwaarden',
    ...(producten.length ? ['/onderdelen'] : []),
  ].map(path => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    ...((path === '/' || path === '/occasions') && laatsteMotor ? { lastModified: new Date(laatsteMotor) } : {}),
  }));

  return [
    ...vast,
    ...motoren.map(m => ({ url: `${SITE_URL}${motorPad(m)}`, lastModified: new Date(m.datumIn ?? m.createdAt) })),
    ...BLOG_POSTS.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.bijgewerkt) })),
  ];
}
