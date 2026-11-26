import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getInstellingen } from '@/lib/getInstellingen';
import { CONTENT_FALLBACK, formatOpeningsTijden } from '@/lib/instellingen';
import { afbeeldingSrc, afbeeldingSrcSet, getCms } from '@/lib/cms';
import { Tekst } from '@/components/Markdown';
import { BEDRIJF, OG_IMAGE } from '@/lib/site';
import { ORG_ID, breadcrumb, graph, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Over De Jonge Motoren';
const DESCRIPTION = 'De Jonge Motoren is al 25 jaar de motorzaak aan de Stevinweg in Tholen. Jeffrey en Anouk nemen het bedrijf over van Léon en Diana de Jonge.';

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getCms()).seo('overons', 'Over ons: Jeffrey en Anouk nemen het stokje over', DESCRIPTION);
  return {
    title,
    description,
    alternates: { canonical: '/over-ons' },
    openGraph: { title: TITEL, description, url: '/over-ons', images: [OG_IMAGE] },
  };
}

export default async function OverOnsPage() {
  const [inst, cms] = await Promise.all([getInstellingen(), getCms()]);
  const foto = cms.afbeelding('overons.foto', null, { optioneel: true });
  const tijden = formatOpeningsTijden(inst).filter(t => !t.gesloten).map(t => `${t.label} ${t.waarde}`).join(', ');

  const feiten: [string, string][] = [
    ['Bedrijfsnaam', BEDRIJF.naam],
    ['Adres', `${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats} (${BEDRIJF.provincie})`],
    ['Actief sinds', `Ruim ${BEDRIJF.jarenErvaring} jaar`],
    ['Eigenaren', 'Jeffrey en Anouk, als opvolgers van Léon en Diana de Jonge'],
    ['Diensten', 'Occasions, inkoop, werkplaats, winterstalling, onderdelen en accessoires'],
    ['Openingstijden', `${tijden}. Overige tijden op afspraak`],
    ['Telefoon', `${BEDRIJF.telefoon.label} of ${BEDRIJF.mobiel.label} (ook WhatsApp)`],
  ];

  return (
    <>
      <JsonLd data={graph(
        webPage('/over-ons', TITEL, DESCRIPTION, 'AboutPage', { mainEntity: { '@id': ORG_ID } }),
        breadcrumb([{ name: 'Over ons', path: '/over-ons' }]),
      )} />

      <PageHeader crumbs={[{ name: 'Over ons', path: '/over-ons' }]} eyebrow="Over ons"
        title={cms.tekst('overons.titel', 'Nieuwe eigenaren, dezelfde werkplaats')}
        intro={<Tekst waarde={cms.tekst('overons.intro', CONTENT_FALLBACK.over_ons_intro)} />} />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <article className="prose-djm lg:col-span-7">
            {foto && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={afbeeldingSrc(foto, 1100)} srcSet={afbeeldingSrcSet(foto, [640, 900, 1300])} sizes="(min-width: 1024px) 55vw, 100vw"
                alt={foto.alt} width={foto.breedte || 1100} height={foto.hoogte || 825} className="!mt-0 mb-10 w-full object-cover" />
            )}
            <h2 className="!mt-0">{cms.tekst('overons.eigenaren.titel', 'Wie zijn Jeffrey en Anouk?')}</h2>
            <Tekst waarde={cms.tekst('overons.eigenaren.tekst', `Jeffrey en Anouk nemen ${BEDRIJF.naam} over. Jeffrey rijdt al jaren motor en kent de markt van binnenuit. Anouk zorgt dat alles achter de schermen op rolletjes loopt. Samen zetten ze voort wat ${BEDRIJF.naam} altijd was: een plek waar je eerlijk advies krijgt en zonder druk een motor koopt, verkoopt of laat onderhouden.`)} />
            <h2>{cms.tekst('overons.historie.titel', `${BEDRIJF.jarenErvaring} jaar opgebouwd door Léon en Diana`)}</h2>
            <Tekst waarde={cms.tekst('overons.historie.tekst', 'Léon de Jonge begon met motoren vanuit passie en bouwde samen met Diana een bedrijf op dat bekendstaat om eerlijkheid en vakmanschap. Léon en Diana blijven de komende tijd betrokken, zodat de overgang voor klanten rustig verloopt.')} />
            <h2>{cms.tekst('overons.motto.titel', 'Waar we voor staan')}</h2>
            <Tekst waarde={cms.tekst('overons.motto.tekst', '"Als wij een motor niet aan onze eigen familie zouden verkopen, verkopen wij hem niet." Met die regel kopen we motoren in, zetten we ze in de showroom en adviseren we klanten. Je ziet bij ons wat je koopt, je maakt een proefrit en je krijgt een eerlijk antwoord op je vragen.')} />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/occasions" className="btn btn-primary">Bekijk de occasions <ArrowRight size={18} aria-hidden /></Link>
              <Link href="/contact" className="btn btn-outline">Neem contact op</Link>
            </div>
          </article>

          <aside className="lg:col-span-5" aria-labelledby="feiten-titel">
            <div className="border border-line">
              <h2 id="feiten-titel" className="border-b border-line bg-surface-2 px-6 py-4 text-2xl">{BEDRIJF.naam} in het kort</h2>
              <table className="w-full border-collapse text-left text-[15px]">
                <tbody>
                  {feiten.map(([k, v]) => (
                    <tr key={k} className="border-b border-line last:border-0">
                      <th scope="row" className="w-2/5 px-6 py-3.5 align-top font-semibold">{k}</th>
                      <td className="py-3.5 pr-6 text-muted">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
