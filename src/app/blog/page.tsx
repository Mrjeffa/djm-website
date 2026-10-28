import Link from 'next/link';
import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/site';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS, datumNL } from '@/content/blog';
import { ORG_ID, abs, breadcrumb, graph, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Motortips en koopadvies';
const DESCRIPTION = 'Tips van De Jonge Motoren over motor occasions kopen, beginnersmotoren, verzekeren en onderhoud dat je zelf kunt doen.';

export const metadata: Metadata = {
  title: 'Blog: motortips en koopadvies',
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/blog', images: [OG_IMAGE] },
};

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.gepubliceerd.localeCompare(a.gepubliceerd));
  return (
    <>
      <JsonLd data={graph(
        webPage('/blog', TITEL, DESCRIPTION, 'Blog', {
          publisher: { '@id': ORG_ID },
          blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.titel, url: abs(`/blog/${p.slug}`), datePublished: p.gepubliceerd })),
        }),
        breadcrumb([{ name: 'Blog', path: '/blog' }]),
      )} />

      <PageHeader crumbs={[{ name: 'Blog', path: '/blog' }]} eyebrow="Blog" title={TITEL} intro={DESCRIPTION} />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {posts.map(p => (
            <article key={p.slug} className="group relative flex flex-col border border-line p-8 transition-colors hover:border-ink">
              <p className="text-sm text-muted">
                <span className="eyebrow text-xs">{p.categorie}</span> · <time dateTime={p.gepubliceerd}>{datumNL(p.gepubliceerd)}</time> · {p.leestijd} min lezen
              </p>
              <h2 className="mt-3 text-3xl">
                <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-red">{p.titel}</Link>
              </h2>
              <p className="mt-3 flex-1 text-muted">{p.beschrijving}</p>
              <span className="link-arrow mt-6">Lees verder <ArrowRight size={16} aria-hidden /></span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
