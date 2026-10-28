import Link from 'next/link';
import type { Metadata } from 'next';
import { getProducten, type ProductCategorie } from '@/lib/producten';
import { BEDRIJF, whatsappUrl, OG_IMAGE } from '@/lib/site';
import { breadcrumb, graph, productNode, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Motoronderdelen en accessoires in Tholen';
const DESCRIPTION = 'Motoronderdelen en accessoires bij De Jonge Motoren in Tholen. Bekijk wat er op voorraad is en vraag via WhatsApp naar de beschikbaarheid.';

type Params = { categorie?: string };

function leesCategorie(c?: string): ProductCategorie | undefined {
  return c === 'onderdelen' || c === 'accessoires' ? c : undefined;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const categorie = leesCategorie((await searchParams).categorie);
  const totaal = (await getProducten()).length;
  return {
    title: TITEL,
    description: DESCRIPTION,
    alternates: { canonical: '/onderdelen' },
    robots: categorie || totaal === 0 ? { index: false, follow: true } : undefined,
    openGraph: { title: TITEL, description: DESCRIPTION, url: '/onderdelen', images: [OG_IMAGE] },
  };
}

export default async function OnderdelenPage({ searchParams }: { searchParams: Promise<Params> }) {
  const categorie = leesCategorie((await searchParams).categorie);
  const producten = await getProducten(categorie);

  return (
    <>
      <JsonLd data={graph(
        webPage('/onderdelen', TITEL, DESCRIPTION, 'CollectionPage'),
        breadcrumb([{ name: 'Onderdelen', path: '/onderdelen' }]),
        producten.slice(0, 30).map(productNode),
      )} />

      <PageHeader
        crumbs={[{ name: 'Onderdelen', path: '/onderdelen' }]}
        eyebrow="Onderdelen en accessoires"
        title={TITEL}
        intro={`Onderdelen en accessoires die ${BEDRIJF.naam} op voorraad heeft. De voorraad wisselt; stuur een WhatsApp om te checken of een artikel er nog is of om het te reserveren.`}
      />

      <section className="py-10 lg:py-14" aria-label="Artikelen">
        <div className="container-site">
          <nav aria-label="Categorie" className="flex flex-wrap gap-2">
            {[
              { value: undefined, label: 'Alles' },
              { value: 'onderdelen', label: 'Onderdelen' },
              { value: 'accessoires', label: 'Accessoires' },
            ].map(({ value, label }) => (
              <Link
                key={label}
                href={value ? `/onderdelen?categorie=${value}` : '/onderdelen'}
                aria-current={categorie === value ? 'page' : undefined}
                className={`btn !min-h-11 !px-5 ${categorie === value ? 'btn-dark' : 'btn-outline'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {producten.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {producten.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="mt-8 border-l-4 border-red bg-surface-2 p-8">
              <h2 className="text-3xl">Geen {categorie ?? 'artikelen'} online</h2>
              <p className="mt-3 max-w-2xl text-muted">Zoek je een specifiek onderdeel? Stuur ons het merk, model en bouwjaar van je motor, dan kijken we wat we voor je kunnen doen.</p>
              <a href={whatsappUrl('Hoi, ik zoek een onderdeel voor mijn motor:')} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                Vraag het via WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
