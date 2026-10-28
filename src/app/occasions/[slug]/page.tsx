import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Bike, MessageCircle, Phone } from 'lucide-react';
import { formatKm, formatPrijs, getMotorBySlug, getMotors, motorPad, type Motor } from '@/lib/motors';
import { getInstellingen } from '@/lib/getInstellingen';
import { cld, cldSrcSet } from '@/lib/cloudinary';
import { BEDRIJF, OG_IMAGE, whatsappUrl } from '@/lib/site';
import { abs, breadcrumb, graph, motorNode, webPage } from '@/lib/schema';
import { Breadcrumbs } from '@/components/PageHeader';
import MotorCard from '@/components/MotorCard';
import ProefritForm from '@/components/forms/ProefritForm';
import JsonLd from '@/components/JsonLd';

type Props = { params: Promise<{ slug: string }> };

function titel(m: Motor) {
  return `${m.naam} ${m.bouwjaar} occasion kopen`;
}

function omschrijving(m: Motor) {
  const basis = `${m.naam} uit ${m.bouwjaar} met ${formatKm(m.km, m.kmEenheid)} voor ${formatPrijs(m.prijs)} bij ${BEDRIJF.naam} in ${BEDRIJF.plaats}.`;
  return m.beschrijving ? `${basis} ${m.beschrijving}`.slice(0, 158) : `${basis} Plan een gratis proefrit.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await getMotorBySlug((await params).slug);
  if (!m) return { title: 'Motor niet gevonden', robots: { index: false } };
  return {
    title: titel(m),
    description: omschrijving(m),
    alternates: { canonical: motorPad(m) },
    openGraph: {
      title: `${m.naam} (${m.bouwjaar}) | ${formatPrijs(m.prijs)}`,
      description: omschrijving(m),
      url: motorPad(m),
      images: m.fotos[0] ? [{ url: cld(m.fotos[0], 'f_jpg,q_auto,c_fill,w_1200,h_630'), width: 1200, height: 630, alt: `${m.naam} ${m.bouwjaar}` }] : [OG_IMAGE],
    },
  };
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params;
  const m = await getMotorBySlug(slug);
  if (!m) notFound();
  if (slug !== m.slug) permanentRedirect(motorPad(m));

  const [alle, inst] = await Promise.all([getMotors(), getInstellingen()]);
  const vergelijkbaar = alle
    .filter(x => x.id !== m.id)
    .sort((a, b) => Number(b.categorie === m.categorie) - Number(a.categorie === m.categorie) || Math.abs(a.prijs - m.prijs) - Math.abs(b.prijs - m.prijs))
    .slice(0, 3);
  const naamJaar = `${m.naam} (${m.bouwjaar})`;

  const specs: [string, string | null][] = [
    ['Merk', m.merk],
    ['Model', m.model],
    ['Bouwjaar', String(m.bouwjaar)],
    ['Kilometerstand', formatKm(m.km, m.kmEenheid)],
    ['Soort motor', m.categorie],
    ['Uitvoering', m.uitvoering],
    ['Vermogen', m.vermogen],
    ['Kleur', m.kleur],
    ['Prijs', formatPrijs(m.prijs)],
    ['Status', m.status === 'gereserveerd' ? 'Gereserveerd' : 'Beschikbaar'],
  ];

  return (
    <>
      <JsonLd data={graph(
        webPage(motorPad(m), naamJaar, omschrijving(m), 'ItemPage', { mainEntity: { '@id': `${abs(motorPad(m))}#motor` } }),
        motorNode(m),
        breadcrumb([{ name: 'Occasions', path: '/occasions' }, { name: naamJaar, path: motorPad(m) }]),
      )} />

      <div className="container-site py-8 lg:py-12">
        <Breadcrumbs items={[{ name: 'Occasions', path: '/occasions' }, { name: naamJaar, path: motorPad(m) }]} />

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            {m.fotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {m.fotos.map((foto, i) => (
                  <a key={foto} href={cld(foto, 'f_auto,q_auto,w_1800')} target="_blank" rel="noopener noreferrer"
                    className={`block overflow-hidden bg-surface-2 ${i === 0 ? 'col-span-2' : ''}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cld(foto, `f_auto,q_auto,c_fill,ar_${i === 0 ? '4:3' : '1:1'},w_${i === 0 ? 1100 : 600}`)}
                      srcSet={i === 0 ? cldSrcSet(foto, [640, 900, 1300], ',c_fill,ar_4:3') : undefined}
                      sizes={i === 0 ? '(min-width: 1024px) 60vw, 100vw' : undefined}
                      alt={`${naamJaar}, foto ${i + 1} van ${m.fotos.length}`}
                      width={i === 0 ? 1100 : 600}
                      height={i === 0 ? 825 : 600}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      className={`w-full object-cover ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-surface-2 text-muted"><Bike size={96} aria-hidden /></div>
            )}
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">{[m.categorie, m.bouwjaar].filter(Boolean).join(' · ')}</p>
              <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)]">{m.naam}</h1>
              <p className="tabular mt-3 font-display text-5xl font-extrabold">{formatPrijs(m.prijs)}</p>
              {m.status === 'gereserveerd' && (
                <p className="mt-4 border-l-4 border-amber bg-surface-2 px-4 py-3 text-sm">
                  Deze motor is <strong>gereserveerd</strong>. Bel of app ons om te horen of hij weer beschikbaar komt.
                </p>
              )}
              <ul className="tabular mt-5 flex flex-wrap gap-2 text-sm">
                {[String(m.bouwjaar), formatKm(m.km, m.kmEenheid), m.vermogen].filter(Boolean).map(s => (
                  <li key={s} className="border border-line px-3 py-1.5">{s}</li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={whatsappUrl(`Hoi, ik heb interesse in de ${naamJaar} van ${formatPrijs(m.prijs)}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <MessageCircle size={18} aria-hidden /> WhatsApp
                </a>
                <a href={`tel:${BEDRIJF.telefoon.e164}`} className="btn btn-outline">
                  <Phone size={18} aria-hidden /> Bellen
                </a>
              </div>
              <div className="mt-8 border border-line bg-surface-2 p-6">
                <h2 className="text-2xl">Plan een proefrit</h2>
                <p className="mt-1 text-sm text-muted">Gratis, met je eigen helm en een geldig rijbewijs.</p>
                <div className="mt-5"><ProefritForm motorId={m.id} motorNaam={naamJaar} instellingen={inst} /></div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <section className="lg:col-span-7 xl:col-span-8" aria-labelledby="specs-titel">
            <h2 id="specs-titel" className="text-3xl">Specificaties</h2>
            <table className="mt-6 w-full border-collapse text-left">
              <tbody>
                {specs.filter((s): s is [string, string] => Boolean(s[1])).map(([k, v]) => (
                  <tr key={k} className="border-b border-line">
                    <th scope="row" className="w-1/2 py-3 pr-4 font-semibold sm:w-1/3">{k}</th>
                    <td className="tabular py-3 text-muted">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {m.uitrusting.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl">Uitrusting</h2>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {m.uitrusting.map(u => <li key={u} className="border-l-2 border-red pl-3">{u}</li>)}
                </ul>
              </>
            )}

            {m.beschrijving && (
              <>
                <h2 className="mt-12 text-3xl">Omschrijving</h2>
                <div className="prose-djm mt-5 whitespace-pre-line">{m.beschrijving}</div>
              </>
            )}
          </section>

          <aside className="space-y-4 lg:col-span-5 xl:col-span-4" aria-label="Meer van De Jonge Motoren">
            <Link href="/motor-verkopen" className="block border border-line p-6 hover:border-ink">
              <h2 className="text-xl">Je huidige motor verkopen?</h2>
              <p className="mt-2 text-sm text-muted">Laat hem vrijblijvend taxeren door {BEDRIJF.naam}.</p>
            </Link>
            <Link href="/werkplaats" className="block border border-line p-6 hover:border-ink">
              <h2 className="text-xl">Onderhoud in onze werkplaats</h2>
              <p className="mt-2 text-sm text-muted">Van kleine beurt tot banden en remmen, in {BEDRIJF.plaats}.</p>
            </Link>
          </aside>
        </div>

        {vergelijkbaar.length > 0 && (
          <section className="mt-16 border-t border-line pt-12" aria-labelledby="meer-titel">
            <h2 id="meer-titel" className="text-3xl">Meer occasions</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vergelijkbaar.map(x => <MotorCard key={x.id} motor={x} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
