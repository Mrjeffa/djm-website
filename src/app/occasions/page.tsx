import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getMotors, isVerkocht, motorPad, type MotorFilters, type Sortering } from '@/lib/motors';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { breadcrumb, graph, itemList, webPage } from '@/lib/schema';
import { getFaqs } from '@/lib/faq';
import { getCms } from '@/lib/cms';
import Markdown, { Tekst } from '@/components/Markdown';
import PageHeader from '@/components/PageHeader';
import MotorCard from '@/components/MotorCard';
import OccasionFilters from '@/components/OccasionFilters';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';

type Params = { merk?: string; categorie?: string; maxPrijs?: string; maxKm?: string; sort?: string };

const TITEL = 'Motor occasions in Tholen, Zeeland';
const DESCRIPTION = 'Bekijk de gebruikte motoren van De Jonge Motoren in Tholen. Met foto\'s, bouwjaar, kilometerstand en prijs. Plan een gratis proefrit, vlak bij Bergen op Zoom.';

export async function generateMetadata({ searchParams }: { searchParams: Promise<Params> }): Promise<Metadata> {
  const p = await searchParams;
  const gefilterd = Object.values(p).some(Boolean);
  const { title, description } = (await getCms()).seo('occasions', TITEL, DESCRIPTION);
  return {
    title,
    description,
    alternates: { canonical: '/occasions' },
    robots: gefilterd ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: '/occasions', images: [OG_IMAGE] },
  };
}

const KOPEN_TEKST = `Bij ${BEDRIJF.naam} koop je een gebruikte motor van een zaak die al ${BEDRIJF.jarenErvaring} jaar in ${BEDRIJF.plaats} zit. Je ziet de motor in het echt, je maakt een proefrit en je stelt je vragen aan de mensen die de motor hebben ingekocht.

Een proefrit is gratis. Neem een geldig rijbewijs mee dat past bij de motor (A of A2), je eigen helm en motorkleding. Bel of app vooraf, dan staat de motor klaar.

Wil je je huidige motor kwijt? Laat hem taxeren via [motor verkopen](/motor-verkopen). Twijfel je over een motor die je elders wilt kopen? Onze [werkplaats](/werkplaats) doet ook aankoopkeuringen.`;

const SORTERINGEN: Sortering[] = ['nieuw', 'prijs-op', 'prijs-af', 'km'];

export default async function OccasionsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const filters: MotorFilters = {
    merk: p.merk || undefined,
    categorie: p.categorie || undefined,
    maxPrijs: Number(p.maxPrijs) || undefined,
    maxKm: Number(p.maxKm) || undefined,
    sort: SORTERINGEN.includes(p.sort as Sortering) ? (p.sort as Sortering) : undefined,
  };
  const gefilterd = Boolean(filters.merk || filters.categorie || filters.maxPrijs || filters.maxKm);
  // Te koop + de afgelopen 30 dagen verkocht; verkochte motoren apart onderaan
  const [alleMetVerkocht, cms, faqGroepen] = await Promise.all([getMotors({}, { metVerkocht: true }), getCms(), getFaqs()]);
  const resultaat = gefilterd || filters.sort ? await getMotors(filters, { metVerkocht: true }) : alleMetVerkocht;
  const alle = alleMetVerkocht.filter(m => !isVerkocht(m));
  const motoren = resultaat.filter(m => !isVerkocht(m));
  const verkocht = resultaat.filter(isVerkocht).sort((a, b) => (b.verkochtOp ?? '').localeCompare(a.verkochtOp ?? ''));
  const merken = [...new Set(alleMetVerkocht.map(m => m.merk))].sort();
  const categorieen = [...new Set(alleMetVerkocht.map(m => m.categorie).filter((c): c is string => Boolean(c)))].sort();
  const kopenFaq = faqGroepen.find(g => g.id === 'kopen')?.items ?? [];

  return (
    <>
      <JsonLd data={graph(
        webPage('/occasions', TITEL, DESCRIPTION, 'CollectionPage', motoren.length ? { mainEntity: itemList(motoren.map(motorPad)) } : {}),
        breadcrumb([{ name: 'Occasions', path: '/occasions' }]),
      )} />

      <PageHeader
        crumbs={[{ name: 'Occasions', path: '/occasions' }]}
        eyebrow={alle.length ? `${alle.length} ${alle.length === 1 ? 'motor' : 'motoren'} op voorraad` : 'Voorraad'}
        title={TITEL}
        intro={<Tekst waarde={cms.tekst('occasions.intro', `Elke occasion staat bij ${BEDRIJF.naam} aan de ${BEDRIJF.straat} in ${BEDRIJF.plaats}. Zie je iets dat je bevalt? Plan een gratis proefrit of stuur ons een WhatsApp.`)} />}
      />

      <section className="py-10 lg:py-14" aria-label="Voorraad">
        <div className="container-site">
          {alleMetVerkocht.length > 0 && (
            <div className="border border-line bg-white p-5">
              <OccasionFilters merken={merken} categorieen={categorieen} waarden={p} />
            </div>
          )}

          {alleMetVerkocht.length > 0 && (
            <p className="mt-6 text-sm text-muted" aria-live="polite">
              {motoren.length} {motoren.length === 1 ? 'motor' : 'motoren'} gevonden
            </p>
          )}

          {motoren.length > 0 ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {motoren.map((m, i) => <MotorCard key={m.id} motor={m} prioriteit={i < 3} kop="h2" />)}
            </div>
          ) : (
            <div className="mt-6 border-l-4 border-red bg-surface-2 p-8">
              <h2 className="text-3xl">{gefilterd ? 'Geen motoren met deze filters' : 'Alle occasions zijn verkocht'}</h2>
              <p className="mt-3 max-w-2xl text-muted">
                {gefilterd
                  ? 'Probeer een ruimere prijs of kilometerstand, of wis de filters om de hele voorraad te zien.'
                  : 'Op dit moment staat er geen motor online. Geef door welk merk of model je zoekt, dan bellen we je als er iets passends binnenkomt.'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {gefilterd
                  ? <Link href="/occasions" className="btn btn-primary">Wis filters</Link>
                  : <Link href="/contact" className="btn btn-primary">Geef je wens door</Link>}
                <Link href="/motor-verkopen" className="btn btn-outline">Je eigen motor verkopen</Link>
              </div>
            </div>
          )}

          {verkocht.length > 0 && (
            <div className="mt-14" aria-labelledby="verkocht-titel">
              <h2 id="verkocht-titel" className="text-3xl">Onlangs verkocht</h2>
              <p className="mt-2 max-w-2xl text-muted">
                Deze motoren zijn de afgelopen weken verkocht. Zoek je iets vergelijkbaars? Geef het door, dan houden we je op de hoogte.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {verkocht.map(m => <MotorCard key={m.id} motor={m} kop="h3" />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="kopen-titel">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="kopen-titel" className="text-[clamp(2rem,4vw,3rem)]">{cms.tekst('occasions.kopen.titel', `Een occasion kopen bij ${BEDRIJF.naam}`)}</h2>
            <div className="mt-6"><Markdown source={cms.tekst('occasions.kopen.tekst', KOPEN_TEKST)} /></div>
          </div>
          <div>
            <h2 className="text-2xl">Vragen over kopen</h2>
            <div className="mt-6"><FaqList items={kopenFaq} /></div>
            <Link href="/proefrit" className="btn btn-primary mt-8">Plan een proefrit <ArrowRight size={18} aria-hidden /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
