// Dienst- of infopagina die de beheerder in de DJM-app maakt (website_paginas, fase 5).
// De opmaak ligt vast; de app levert alleen de inhoud.
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { getInstellingen } from '@/lib/getInstellingen';
import { afbeeldingSrc, afbeeldingSrcSet } from '@/lib/cms';
import { paginaPad, type WebPagina } from '@/lib/paginas';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { ORG_ID, abs, breadcrumb, faqNode, graph, webPage } from '@/lib/schema';
import { platteTekst } from '@/lib/tekst';
import PageHeader from './PageHeader';
import Markdown from './Markdown';
import FaqList from './FaqList';
import JsonLd from './JsonLd';
import WerkplaatsForm from './forms/WerkplaatsForm';

const kruimels = (p: WebPagina) => p.sjabloon === 'dienst'
  ? [{ name: 'Werkplaats', path: '/werkplaats' }, { name: p.titel, path: paginaPad(p) }]
  : [{ name: p.titel, path: paginaPad(p) }];

export function eigenPaginaMetadata(p: WebPagina): Metadata {
  const pad = paginaPad(p);
  const title = p.seoTitel || p.titel;
  const description = p.seoOmschrijving || platteTekst(p.intro).slice(0, 160);
  const beeld = p.afbeelding
    ? [{ url: afbeeldingSrc(p.afbeelding, 1200, 630 / 1200), width: 1200, height: 630, alt: p.afbeelding.alt || p.titel }]
    : [OG_IMAGE];
  return { title, description, alternates: { canonical: pad }, openGraph: { title, description, url: pad, images: beeld } };
}

// Eerste bedrag uit de prijstekst ("Vanaf € 25 per band" → 25), voor de structured data
function bedrag(prijs: string | null): number | null {
  const m = prijs?.match(/€\s*([0-9]+(?:[.,][0-9]{1,2})?)/);
  return m ? Number(m[1].replace(',', '.')) : null;
}

export default async function EigenPagina({ pagina: p }: { pagina: WebPagina }) {
  const inst = await getInstellingen();
  const pad = paginaPad(p);
  const dienst = p.sjabloon === 'dienst';
  const prijsBedrag = bedrag(p.prijs);
  // Het formulier staat al op de afspraaksoort van deze dienst (alleen als die nog bestaat)
  const voorkeur = p.afspraakSoort && inst.diensten.some(g => g.items.some(i => i.naam === p.afspraakSoort)) ? p.afspraakSoort : undefined;
  const beschrijving = platteTekst(p.intro);

  return (
    <>
      <JsonLd data={graph(
        webPage(pad, p.titel, beschrijving, 'WebPage', dienst ? {
          mainEntity: {
            '@type': 'Service',
            name: p.titel,
            description: beschrijving,
            provider: { '@id': ORG_ID },
            areaServed: ['Tholen', 'Zeeland', 'West-Brabant'],
            url: abs(pad),
            ...(p.prijs && {
              offers: { '@type': 'Offer', priceCurrency: 'EUR', description: platteTekst(p.prijs), ...(prijsBedrag && { price: prijsBedrag }) },
            }),
          },
        } : {}),
        breadcrumb(kruimels(p)),
        p.faq.length ? [faqNode(pad, p.faq)] : [],
      )} />

      <PageHeader crumbs={kruimels(p)} eyebrow={dienst ? 'Werkplaats' : 'Informatie'} title={p.titel} intro={<p>{p.intro}</p>}>
        {dienst && <a href="#afspraak" className="btn btn-primary mt-8">Vraag een afspraak aan <ArrowRight size={18} aria-hidden /></a>}
      </PageHeader>

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            {p.afbeelding && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={afbeeldingSrc(p.afbeelding, 1100)} srcSet={afbeeldingSrcSet(p.afbeelding, [640, 900, 1300])}
                sizes="(min-width: 1024px) 60vw, 100vw" alt={p.afbeelding.alt} width={p.afbeelding.breedte || 1100}
                height={p.afbeelding.hoogte || 825} className="mb-10 w-full object-cover" />
            )}
            {p.inhoud.trim() && <div className="[&_.prose-djm>:first-child]:!mt-0"><Markdown source={p.inhoud} /></div>}
          </div>
          <aside className="order-first lg:order-none lg:col-span-5 xl:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-28">
              {dienst && (
                <dl className="border border-line">
                  <div className="flex gap-4 border-b border-line p-5">
                    <Tag size={22} className="mt-0.5 shrink-0 text-red" aria-hidden />
                    <div><dt className="eyebrow text-xs">Prijs</dt><dd className="mt-1 text-lg font-semibold">{p.prijs ?? 'Prijs op aanvraag'}</dd></div>
                  </div>
                  {p.duur && (
                    <div className="flex gap-4 p-5">
                      <Clock size={22} className="mt-0.5 shrink-0 text-red" aria-hidden />
                      <div><dt className="eyebrow text-xs">Duur</dt><dd className="mt-1 text-lg font-semibold">{p.duur}</dd></div>
                    </div>
                  )}
                </dl>
              )}
              <div className="border-l-4 border-red bg-surface-2 p-6">
                <p className="font-semibold">Vragen?</p>
                <p className="mt-1 text-sm text-muted">Bel {BEDRIJF.telefoon.label} of stuur een WhatsApp naar {BEDRIJF.mobiel.label}.</p>
                <Link href="/contact" className="link-arrow mt-3 text-sm">Contact en route</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {p.faq.length > 0 && (
        <section className="border-t border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="pagina-faq">
          <div className="container-site max-w-4xl">
            <h2 id="pagina-faq" className="text-[clamp(2rem,4vw,3rem)]">Veelgestelde vragen</h2>
            <div className="mt-8"><FaqList items={p.faq} /></div>
          </div>
        </section>
      )}

      {dienst && (
        <section id="afspraak" className="scroll-mt-28 py-16 lg:py-20" aria-labelledby="afspraak-titel">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="afspraak-titel" className="text-[clamp(2rem,4vw,3rem)]">Afspraak aanvragen</h2>
              <p className="mt-4 text-muted">Vul het formulier in, dan bellen we je om de afspraak te bevestigen. Ben je al klant? Plan je afspraak dan in de DJM-app.</p>
              <Link href="/werkplaats" className="link-arrow mt-8">Alles over de werkplaats <ArrowRight size={16} aria-hidden /></Link>
            </div>
            <div className="border border-line p-6 sm:p-8 lg:col-span-7">
              <WerkplaatsForm instellingen={inst} voorkeur={voorkeur} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
