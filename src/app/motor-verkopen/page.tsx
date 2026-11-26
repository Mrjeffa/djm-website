import type { Metadata } from 'next';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { breadcrumb, faqNode, graph, webPage, ORG_ID } from '@/lib/schema';
import { getFaqs } from '@/lib/faq';
import { getCms } from '@/lib/cms';
import { CONTENT_FALLBACK } from '@/lib/instellingen';
import Markdown, { Tekst } from '@/components/Markdown';
import { Breadcrumbs } from '@/components/PageHeader';
import InkoopForm from '@/components/forms/InkoopForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Motor verkopen in Zeeland en West-Brabant';
const DESCRIPTION = 'Verkoop je motor aan De Jonge Motoren in Tholen. Vul merk, model en kilometerstand in, ontvang een vrijblijvende taxatie en regel overdracht en betaling direct.';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCms();
  const { title, description } = cms.seo('verkopen', cms.tekst('verkopen.titel', TITEL), DESCRIPTION);
  return {
    title,
    description,
    alternates: { canonical: '/motor-verkopen' },
    openGraph: { title, description, url: '/motor-verkopen', images: [OG_IMAGE] },
  };
}

const STAPPEN = [
  { titel: 'Vul je motor in', tekst: 'Merk, model, bouwjaar en kilometerstand, plus je naam en telefoonnummer. Daarna stuur je foto\'s via WhatsApp of mail.' },
  { titel: 'We bellen je terug', tekst: 'We vragen naar de staat, het onderhoud en eventuele schade, en spreken een taxatie af.' },
  { titel: 'Taxatie en bod', tekst: 'Je komt langs in Tholen of we spreken een andere plek af. We bekijken de motor samen en doen je een bod.' },
  { titel: 'Overdracht en betaling', tekst: 'Ga je akkoord, dan regelen we de overschrijving en de betaling direct.' },
];
const VOORDELEN = [
  { tekst: 'Je hoeft geen advertentie te plaatsen of kijkers te ontvangen' },
  { tekst: 'Vrijblijvende taxatie door een motorzaak' },
  { tekst: `Persoonlijk contact met ${BEDRIJF.naam} in ${BEDRIJF.plaats}` },
];
const PRIJS_TEKST = `De taxatiewaarde van een gebruikte motor hangt af van het merk, model en bouwjaar, de kilometerstand, de staat van banden, ketting en remmen, het onderhoud en de vraag naar dat type motor.

Neem bij de taxatie het kentekenbewijs, het onderhoudsboekje en alle sleutels mee. Heb je accessoires of originele onderdelen, zoals koffers of een origineel uitlaatsysteem, vermeld dat dan ook.`;

export default async function MotorVerkopenPage() {
  const [cms, faqGroepen] = await Promise.all([getCms(), getFaqs()]);
  const faqs = faqGroepen.find(g => g.id === 'verkopen')?.items ?? [];
  const titel = cms.tekst('verkopen.titel', TITEL);

  return (
    <>
      <JsonLd data={graph(
        webPage('/motor-verkopen', titel, DESCRIPTION, 'WebPage', {
          mainEntity: { '@type': 'Service', name: 'Motor inkoop', serviceType: 'Inkoop van gebruikte motoren', provider: { '@id': ORG_ID }, areaServed: ['Zeeland', 'West-Brabant'] },
        }),
        breadcrumb([{ name: 'Motor verkopen', path: '/motor-verkopen' }]),
        faqNode('/motor-verkopen', faqs),
      )} />

      <section className="border-b border-line bg-surface-2">
        <div className="container-site grid gap-10 py-10 lg:grid-cols-12 lg:py-14">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ name: 'Motor verkopen', path: '/motor-verkopen' }]} />
            <p className="eyebrow mt-8">Inkoop alle merken</p>
            <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">{titel}</h1>
            <Tekst className="mt-5 max-w-xl text-lg text-muted" waarde={cms.tekst('verkopen.intro', `${BEDRIJF.naam} koopt motoren van alle merken en types. ${CONTENT_FALLBACK.inkoop_ondertitel}`)} />
            <ul className="mt-8 space-y-3">
              {cms.lijst('verkopen.voordelen', VOORDELEN).map(v => v.tekst).map(p => (
                <li key={p} className="flex gap-3"><span className="mt-2.5 h-2 w-2 shrink-0 bg-red" aria-hidden />{p}</li>
              ))}
            </ul>
          </div>
          <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-6">
            <h2 className="text-2xl">Vraag een vrijblijvende taxatie aan</h2>
            <div className="mt-6"><InkoopForm /></div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" aria-labelledby="stappen-titel">
        <div className="container-site">
          <h2 id="stappen-titel" className="text-[clamp(2rem,4vw,3rem)]">Zo verkoop je je motor aan ons</h2>
          <ol className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cms.lijst('verkopen.stappen', STAPPEN).map(({ titel, tekst }, i) => (
              <li key={titel} className="bg-white p-7">
                <span className="tabular font-display text-5xl font-extrabold text-red">{i + 1}</span>
                <h3 className="mt-3 text-2xl">{titel}</h3>
                <p className="mt-2 text-muted">{tekst}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="verkopen-faq">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="verkopen-faq" className="text-[clamp(2rem,4vw,3rem)]">Wat bepaalt de prijs?</h2>
            <div className="mt-6"><Markdown source={cms.tekst('verkopen.prijs.tekst', PRIJS_TEKST)} /></div>
          </div>
          <div className="lg:col-span-7">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
