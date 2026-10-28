import Link from 'next/link';
import type { Metadata } from 'next';
import { getMotors } from '@/lib/motors';
import { getInstellingen } from '@/lib/getInstellingen';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { breadcrumb, graph, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import ProefritForm from '@/components/forms/ProefritForm';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Proefrit maken met een occasion';
const DESCRIPTION = 'Plan een gratis proefrit met een occasion van De Jonge Motoren in Tholen. Neem je rijbewijs (A of A2) en eigen helm mee. Aanvragen kan online, telefonisch of via WhatsApp.';

export const metadata: Metadata = {
  title: TITEL,
  description: DESCRIPTION,
  alternates: { canonical: '/proefrit' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/proefrit', images: [OG_IMAGE] },
};

export default async function ProefritPage({ searchParams }: { searchParams: Promise<{ motorId?: string }> }) {
  const [{ motorId }, motoren, inst] = await Promise.all([searchParams, getMotors(), getInstellingen()]);

  return (
    <>
      <JsonLd data={graph(
        webPage('/proefrit', TITEL, DESCRIPTION),
        breadcrumb([{ name: 'Proefrit', path: '/proefrit' }]),
      )} />

      <PageHeader crumbs={[{ name: 'Proefrit', path: '/proefrit' }]} eyebrow="Gratis en vrijblijvend" title={TITEL} intro={inst.content.proefrit_intro} />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(2rem,4vw,3rem)]">Wat neem je mee?</h2>
            <table className="mt-6 w-full border-collapse text-left">
              <tbody>
                {[
                  ['Rijbewijs', 'Een geldig motorrijbewijs dat past bij de motor (A of A2)'],
                  ['Uitrusting', 'Je eigen helm, handschoenen en motorkleding'],
                  ['Kosten', 'Gratis en zonder verplichting'],
                  ['Locatie', `${BEDRIJF.straat}, ${BEDRIJF.plaats}`],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-line">
                    <th scope="row" className="w-1/3 py-3 pr-4 align-top font-semibold">{k}</th>
                    <td className="py-3 text-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="mt-12 text-3xl">Hoe gaat het?</h2>
            <div className="prose-djm mt-4">
              <p>Je vraagt de proefrit aan en wij bellen je om een moment af te spreken. Op de afgesproken dag staat de motor klaar en rij je op je eigen tempo een rondje. Bevalt de motor, dan bespreken we de koop. Bevalt hij niet, dan zoeken we samen verder.</p>
              <p>Nog geen keuze gemaakt? Bekijk eerst de <Link href="/occasions">occasions</Link>.</p>
            </div>
          </div>
          <div className="border border-line bg-surface-2 p-6 sm:p-8 lg:col-span-7">
            <h2 className="text-2xl">Vraag een proefrit aan</h2>
            <div className="mt-6">
              <ProefritForm
                motorId={motoren.some(m => m.id === motorId) ? motorId : undefined}
                motoren={motoren.map(m => ({ id: m.id, naam: m.naam, bouwjaar: m.bouwjaar }))}
                instellingen={inst}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
