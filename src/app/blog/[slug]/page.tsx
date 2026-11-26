import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { datumNL, getPost, getPosts } from '@/lib/blog';
import { afbeeldingSrc, afbeeldingSrcSet } from '@/lib/cms';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { ORG_ID, abs, breadcrumb, graph } from '@/lib/schema';
import { Breadcrumbs } from '@/components/PageHeader';
import Markdown from '@/components/Markdown';
import JsonLd from '@/components/JsonLd';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await getPost((await params).slug);
  if (!post) return { title: 'Artikel niet gevonden', robots: { index: false } };
  const beeld = post.afbeelding
    ? [{ url: afbeeldingSrc(post.afbeelding, 1200, 630 / 1200), width: 1200, height: 630, alt: post.afbeelding.alt || post.titel }]
    : [OG_IMAGE];
  return {
    title: post.titel,
    description: post.beschrijving,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.titel, description: post.beschrijving, url: `/blog/${post.slug}`, publishedTime: post.gepubliceerd, modifiedTime: post.bijgewerkt, images: beeld },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { post, nieuweSlug } = await getPost((await params).slug);
  if (nieuweSlug) permanentRedirect(`/blog/${nieuweSlug}`);
  if (!post) notFound();
  const pad = `/blog/${post.slug}`;
  const meer = (await getPosts()).filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={graph(
        {
          '@type': 'BlogPosting',
          '@id': `${abs(pad)}#artikel`,
          headline: post.titel,
          description: post.beschrijving,
          datePublished: post.gepubliceerd,
          dateModified: post.bijgewerkt,
          inLanguage: 'nl-NL',
          url: abs(pad),
          mainEntityOfPage: abs(pad),
          author: { '@id': ORG_ID },
          publisher: { '@id': ORG_ID },
          articleSection: post.categorie,
          ...(post.afbeelding && { image: abs(afbeeldingSrc(post.afbeelding, 1200)) }),
        },
        breadcrumb([{ name: 'Blog', path: '/blog' }, { name: post.titel, path: pad }]),
      )} />

      <article className="container-site py-10 lg:py-14">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: post.titel, path: pad }]} />
          <p className="eyebrow mt-8">{post.categorie}</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{post.titel}</h1>
          <p className="mt-5 text-lg text-muted">{post.beschrijving}</p>
          <p className="mt-6 border-y border-line py-3 text-sm text-muted">
            Door {BEDRIJF.naam} · Gepubliceerd <time dateTime={post.gepubliceerd}>{datumNL(post.gepubliceerd)}</time>
            {post.bijgewerkt !== post.gepubliceerd && <> · Bijgewerkt <time dateTime={post.bijgewerkt}>{datumNL(post.bijgewerkt)}</time></>}
            {' '}· {post.leestijd} min lezen
          </p>
          {post.afbeelding && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={afbeeldingSrc(post.afbeelding, 1100)} srcSet={afbeeldingSrcSet(post.afbeelding, [640, 900, 1300])}
              sizes="(min-width: 768px) 768px, 100vw" alt={post.afbeelding.alt} width={post.afbeelding.breedte || 1100}
              height={post.afbeelding.hoogte || 619} className="mt-10 w-full object-cover" />
          )}
          <div className="mt-10"><Markdown source={post.inhoud} /></div>

          <aside className="mt-14 border-l-4 border-red bg-surface-2 p-8">
            <h2 className="text-2xl">Op zoek naar een motor?</h2>
            <p className="mt-2 text-muted">Bekijk de occasions van {BEDRIJF.naam} in {BEDRIJF.plaats} en plan een gratis proefrit.</p>
            <Link href="/occasions" className="btn btn-primary mt-6">Bekijk occasions</Link>
          </aside>

          {meer.length > 0 && (
            <nav aria-labelledby="meer-titel" className="mt-14">
              <h2 id="meer-titel" className="text-2xl">Meer lezen</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {meer.map(p => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="flex min-h-14 items-center py-3 font-semibold hover:text-red">{p.titel}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
