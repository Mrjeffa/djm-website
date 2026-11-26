import type { MetadataRoute } from 'next';
import { getMotors, motorPad } from '@/lib/motors';
import { getProducten } from '@/lib/producten';
import { getPosts } from '@/lib/blog';
import { getPaginas, paginaPad } from '@/lib/paginas';
import { SITE_URL } from '@/lib/site';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [motoren, producten, posts, paginas] = await Promise.all([getMotors(), getProducten(), getPosts(), getPaginas()]);
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
    ...posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, ...(p.bijgewerkt ? { lastModified: new Date(p.bijgewerkt) } : {}) })),
    ...paginas.map(p => ({ url: `${SITE_URL}${paginaPad(p)}`, ...(p.bijgewerkt ? { lastModified: new Date(p.bijgewerkt) } : {}) })),
  ];
}
