import type { Metadata } from 'next';
import { getInstellingen } from '@/lib/getInstellingen';
import { BEDRIJF, whatsappUrl, OG_IMAGE } from '@/lib/site';
import { breadcrumb, faqNode, graph, webPage } from '@/lib/schema';
import { getFaqGroepen } from '@/content/faq';
import PageHeader from '@/components/PageHeader';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Veelgestelde vragen';
const DESCRIPTION = 'Antwoorden op vragen over occasions kopen, je motor verkopen, onderhoud, winterstalling en openingstijden bij De Jonge Motoren in Tholen.';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen over kopen, verkopen en onderhoud',
  description: DESCRIPTION,
  alternates: { canonical: '/veelgestelde-vragen' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/veelgestelde-vragen', images: [OG_IMAGE] },
};

export default async function FaqPage() {
  const groepen = getFaqGroepen(await getInstellingen());

  return (
    <>
      <JsonLd data={graph(
        webPage('/veelgestelde-vragen', TITEL, DESCRIPTION, 'WebPage'),
        breadcrumb([{ name: TITEL, path: '/veelgestelde-vragen' }]),
        faqNode('/veelgestelde-vragen', groepen.flatMap(g => g.items)),
      )} />

      <PageHeader
        crumbs={[{ name: TITEL, path: '/veelgestelde-vragen' }]}
        eyebrow="Hulp"
        title={TITEL}
        intro={`Staat je vraag er niet bij? Bel ${BEDRIJF.telefoon.label} of stuur een WhatsApp naar ${BEDRIJF.mobiel.label}.`}
      >
        <nav aria-label="Onderwerpen" className="mt-8 flex flex-wrap gap-2">
          {groepen.map(g => <a key={g.id} href={`#${g.id}`} className="btn btn-outline !min-h-11 !px-4">{g.titel}</a>)}
        </nav>
      </PageHeader>

      <div className="container-site max-w-4xl space-y-16 py-16 lg:py-20">
        {groepen.map(g => (
          <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`${g.id}-titel`}>
            <h2 id={`${g.id}-titel`} className="text-[clamp(2rem,4vw,3rem)]">{g.titel}</h2>
            <div className="mt-6"><FaqList items={g.items} /></div>
          </section>
        ))}
        <div className="border-l-4 border-red bg-surface-2 p-8">
          <h2 className="text-3xl">Nog een vraag?</h2>
          <p className="mt-3 text-muted">We helpen je graag verder.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${BEDRIJF.telefoon.e164}`} className="btn btn-primary">Bel {BEDRIJF.telefoon.label}</a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp ons</a>
          </div>
        </div>
      </div>
    </>
  );
}
