import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Smartphone } from 'lucide-react';
import { getInstellingen } from '@/lib/getInstellingen';
import { euro, tarief } from '@/lib/instellingen';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { WERKPLAATS_ID, breadcrumb, faqNode, graph, webPage } from '@/lib/schema';
import { getFaqGroepen } from '@/content/faq';
import PageHeader from '@/components/PageHeader';
import WerkplaatsForm from '@/components/forms/WerkplaatsForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Motor onderhoud en reparatie in Tholen';
const DESCRIPTION = 'De werkplaats van De Jonge Motoren in Tholen: kleine en grote beurt, banden, ketting, remmen, diagnose, schadeherstel en aankoopkeuring. Vraag online een afspraak aan.';

export const metadata: Metadata = {
  title: TITEL,
  description: DESCRIPTION,
  alternates: { canonical: '/werkplaats' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/werkplaats', images: [OG_IMAGE] },
};

export default async function WerkplaatsPage() {
  const inst = await getInstellingen();
  const faqs = getFaqGroepen(inst).find(g => g.id === 'werkplaats')?.items ?? [];
  const prijzen = ([
    ['Aankoopkeuring', tarief(inst, 'aankoopkeuring_basis'), tarief(inst, 'aankoopkeuring_extra_10min') ? `Elke extra 10 minuten ${euro(tarief(inst, 'aankoopkeuring_extra_10min')!)}` : null],
    ['Seizoensklaar maken', tarief(inst, 'seizoensklaarmaak'), 'Controle na de winter, klaar voor het seizoen'],
    ['Winterstalling, 6 maanden', tarief(inst, 'winterstalling_6mnd'), tarief(inst, 'winterstalling_extra_mnd') ? `Elke extra maand ${euro(tarief(inst, 'winterstalling_extra_mnd')!)}` : null],
  ] as [string, number | null, string | null][]).filter(([, p]) => p);

  return (
    <>
      <JsonLd data={graph(
        webPage('/werkplaats', TITEL, DESCRIPTION, 'WebPage', { mainEntity: { '@id': WERKPLAATS_ID } }),
        breadcrumb([{ name: 'Werkplaats', path: '/werkplaats' }]),
        faqs.length ? [faqNode('/werkplaats', faqs)] : [],
      )} />

      <PageHeader
        crumbs={[{ name: 'Werkplaats', path: '/werkplaats' }]}
        eyebrow="Werkplaats"
        title={TITEL}
        intro={`De werkplaats van ${BEDRIJF.naam} aan de ${BEDRIJF.straat} onderhoudt en repareert motoren van klanten uit ${BEDRIJF.plaats}, Bergen op Zoom en omgeving. Vraag hieronder een afspraak aan; we bellen je om de datum te bevestigen.`}
      >
        <a href="#afspraak" className="btn btn-primary mt-8">Vraag een afspraak aan <ArrowRight size={18} aria-hidden /></a>
      </PageHeader>

      <section className="py-16 lg:py-20" aria-labelledby="diensten-titel">
        <div className="container-site">
          <h2 id="diensten-titel" className="text-[clamp(2rem,4vw,3rem)]">Wat de werkplaats voor je doet</h2>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {inst.diensten.map(g => (
              <div key={g.label} className="bg-white p-7">
                <h3 className="text-2xl">{g.label}</h3>
                <ul className="mt-4 space-y-2 text-muted">
                  {g.items.filter(i => i.naam !== 'Anders').map(i => <li key={i.naam} className="border-l-2 border-red pl-3">{i.naam}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {prijzen.length > 0 && (
        <section className="border-y border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="tarieven-titel">
          <div className="container-site grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="tarieven-titel" className="text-[clamp(2rem,4vw,3rem)]">Vaste tarieven</h2>
              <p className="mt-4 text-muted">De kosten van onderhoud en reparaties hangen af van je motor. Vraag bij je aanvraag gerust naar een prijsindicatie.</p>
            </div>
            <table className="w-full border-collapse text-left lg:col-span-8">
              <thead className="sr-only"><tr><th>Dienst</th><th>Prijs</th></tr></thead>
              <tbody>
                {prijzen.map(([naam, prijs, toelichting]) => (
                  <tr key={naam} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 align-top">
                      <span className="text-lg font-semibold">{naam}</span>
                      {toelichting && <span className="mt-1 block text-sm font-normal text-muted">{toelichting}</span>}
                    </th>
                    <td className="tabular py-4 text-right align-top font-display text-2xl font-extrabold">{euro(prijs!)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section id="afspraak" className="scroll-mt-28 py-16 lg:py-20" aria-labelledby="afspraak-titel">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="afspraak-titel" className="text-[clamp(2rem,4vw,3rem)]">Afspraak aanvragen</h2>
            <p className="mt-4 text-muted">{inst.content.service_intro}</p>
            <div className="mt-8 flex gap-4 border-l-4 border-ink bg-surface-2 p-5">
              <Smartphone size={24} className="shrink-0" aria-hidden />
              <p className="text-sm">Ben je al klant? Plan je afspraak dan in de DJM-app. Daar zie je ook de onderhoudshistorie van je motor.</p>
            </div>
            <Link href="/winterstalling" className="link-arrow mt-8">Lees over winterstalling <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <div className="border border-line p-6 sm:p-8 lg:col-span-7">
            <WerkplaatsForm instellingen={inst} />
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="border-t border-line bg-surface-2 py-16 lg:py-20" aria-labelledby="wp-faq">
          <div className="container-site max-w-4xl">
            <h2 id="wp-faq" className="text-[clamp(2rem,4vw,3rem)]">Vragen over de werkplaats</h2>
            <div className="mt-8"><FaqList items={faqs} /></div>
          </div>
        </section>
      )}
    </>
  );
}
