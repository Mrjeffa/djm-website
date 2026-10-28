import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getInstellingen } from '@/lib/getInstellingen';
import { euro, tarief } from '@/lib/instellingen';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { breadcrumb, faqNode, graph, webPage, ORG_ID } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import WerkplaatsForm from '@/components/forms/WerkplaatsForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Motor winterstalling in Tholen';
const DESCRIPTION = 'Winterstalling voor je motor bij De Jonge Motoren in Tholen, Zeeland. Te combineren met een poetsbeurt of onderhoud. Bekijk de tarieven en meld je motor aan.';

export const metadata: Metadata = {
  title: TITEL,
  description: DESCRIPTION,
  alternates: { canonical: '/winterstalling' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/winterstalling', images: [OG_IMAGE] },
};

export default async function WinterstallingPage() {
  const inst = await getInstellingen();
  const basis = tarief(inst, 'winterstalling_6mnd');
  const extraMaand = tarief(inst, 'winterstalling_extra_mnd');
  const pakketten = ([
    ['Winterstalling', 'Je motor staat 6 maanden bij ons gestald.', basis],
    ['Winterstalling met poetsbeurt', 'Stalling, en je motor gaat schoon het nieuwe seizoen in.', tarief(inst, 'winterstalling_poetsen')],
    ['Winterstalling met kleine beurt', 'Stalling plus een kleine onderhoudsbeurt in de werkplaats.', tarief(inst, 'winterstalling_kleine_beurt')],
    ['Winterstalling met grote beurt', 'Stalling plus een grote onderhoudsbeurt in de werkplaats.', tarief(inst, 'winterstalling_grote_beurt')],
  ] as [string, string, number | null][]).filter(([, , p]) => p);

  const faqs = [
    ...(basis ? [{
      vraag: 'Wat kost winterstalling bij De Jonge Motoren?',
      antwoord: `Winterstalling kost ${euro(basis)} voor 6 maanden${extraMaand ? `. Blijft je motor langer staan, dan betaal je ${euro(extraMaand)} per extra maand` : ''}. Combineer je de stalling met een poets- of onderhoudsbeurt, dan geldt de pakketprijs uit de tabel op deze pagina.`,
    }] : []),
    {
      vraag: 'Hoe meld ik mijn motor aan voor winterstalling?',
      antwoord: `Vul het formulier op deze pagina in en kies het stallingspakket dat je wilt. ${BEDRIJF.naam} belt je om een datum af te spreken waarop je de motor brengt. Bestaande klanten plannen dit ook in de DJM-app.`,
    },
    {
      vraag: 'Kan ik onderhoud laten doen tijdens de winterstalling?',
      antwoord: 'Ja. De winter is een rustig moment voor onderhoud. Kies een pakket met kleine of grote beurt, dan doet de werkplaats het onderhoud terwijl je motor gestald staat.',
    },
  ];

  return (
    <>
      <JsonLd data={graph(
        webPage('/winterstalling', TITEL, DESCRIPTION, 'WebPage', {
          mainEntity: {
            '@type': 'Service',
            name: 'Motor winterstalling',
            serviceType: 'Winterstalling voor motoren',
            provider: { '@id': ORG_ID },
            areaServed: ['Tholen', 'Zeeland', 'West-Brabant'],
            ...(basis && { offers: { '@type': 'Offer', price: basis, priceCurrency: 'EUR', description: '6 maanden winterstalling' } }),
          },
        }),
        breadcrumb([{ name: 'Werkplaats', path: '/werkplaats' }, { name: 'Winterstalling', path: '/winterstalling' }]),
        faqNode('/winterstalling', faqs),
      )} />

      <PageHeader
        crumbs={[{ name: 'Werkplaats', path: '/werkplaats' }, { name: 'Winterstalling', path: '/winterstalling' }]}
        eyebrow="Winterstalling"
        title={TITEL}
        intro={`Stal je motor deze winter bij ${BEDRIJF.naam} aan de ${BEDRIJF.straat} in ${BEDRIJF.plaats}.${basis ? ` Winterstalling kost ${euro(basis)} voor 6 maanden` : ''}${basis ? ' en' : ' Je'} kunt de stalling combineren met een poetsbeurt of onderhoud.`}
      >
        <a href="#aanmelden" className="btn btn-primary mt-8">Meld je motor aan <ArrowRight size={18} aria-hidden /></a>
      </PageHeader>

      {pakketten.length > 0 && (
        <section className="py-16 lg:py-20" aria-labelledby="pakketten-titel">
          <div className="container-site">
            <h2 id="pakketten-titel" className="text-[clamp(2rem,4vw,3rem)]">Tarieven winterstalling</h2>
            <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {pakketten.map(([naam, tekst, prijs]) => (
                <div key={naam} className="flex flex-col bg-white p-7">
                  <h3 className="text-2xl">{naam}</h3>
                  <p className="mt-3 flex-1 text-muted">{tekst}</p>
                  <p className="tabular mt-6 font-display text-4xl font-extrabold">{euro(prijs!)}</p>
                </div>
              ))}
            </div>
            {extraMaand && <p className="mt-4 text-sm text-muted">Prijzen gelden voor 6 maanden stalling. Elke extra maand kost {euro(extraMaand)}.</p>}
          </div>
        </section>
      )}

      <section id="aanmelden" className="scroll-mt-28 border-t border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="aanmelden-titel">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="aanmelden-titel" className="text-[clamp(2rem,4vw,3rem)]">Meld je motor aan</h2>
            <p className="mt-4 text-muted">Kies het pakket, laat je nummer achter en we bellen je om een brengdatum af te spreken.</p>
            <div className="mt-10"><FaqList items={faqs} /></div>
          </div>
          <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-7">
            <WerkplaatsForm
              instellingen={inst}
              voorkeur={pakketten[0]?.[0]}
              extra={pakketten.length ? [{ label: 'Winterstalling', items: pakketten.map(([naam]) => ({ naam, duur: 1 })) }] : []}
            />
          </div>
        </div>
      </section>
    </>
  );
}
