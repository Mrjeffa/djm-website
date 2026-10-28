import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getInstellingen } from '@/lib/getInstellingen';
import { formatOpeningsTijden, vandaagStatus } from '@/lib/instellingen';
import { BEDRIJF, whatsappUrl, OG_IMAGE } from '@/lib/site';
import { breadcrumb, graph, webPage, ORG_ID } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';

const TITEL = 'Contact en route';
const DESCRIPTION = 'Contact met De Jonge Motoren, Stevinweg 14 in Tholen. Bel 0166-606090, app 06-21908697 of mail info@dejongemotoren.nl. Bekijk de openingstijden en plan je route.';

export const metadata: Metadata = {
  title: 'Contact, openingstijden en route',
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { title: TITEL, description: DESCRIPTION, url: '/contact', images: [OG_IMAGE] },
};

export default async function ContactPage() {
  const inst = await getInstellingen();
  const tijden = formatOpeningsTijden(inst);

  const kanalen = [
    { icon: Phone, label: 'Bellen', waarde: BEDRIJF.telefoon.label, href: `tel:${BEDRIJF.telefoon.e164}`, tekst: 'Tijdens openingstijden' },
    { icon: MessageCircle, label: 'WhatsApp', waarde: BEDRIJF.mobiel.label, href: whatsappUrl('Hoi De Jonge Motoren, '), tekst: 'Ook voor foto\'s van je motor' },
    { icon: Mail, label: 'E-mail', waarde: BEDRIJF.email, href: `mailto:${BEDRIJF.email}`, tekst: 'Voor uitgebreide vragen' },
  ];

  return (
    <>
      <JsonLd data={graph(
        webPage('/contact', TITEL, DESCRIPTION, 'ContactPage', { mainEntity: { '@id': ORG_ID } }),
        breadcrumb([{ name: 'Contact', path: '/contact' }]),
      )} />

      <PageHeader
        crumbs={[{ name: 'Contact', path: '/contact' }]}
        eyebrow="Contact"
        title={TITEL}
        intro={`${BEDRIJF.naam} zit aan de ${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}. Bel, app of mail ons, of kom langs tijdens openingstijden.`}
      />

      <section className="py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(2rem,4vw,3rem)]">Neem contact op</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {kanalen.map(({ icon: Icon, label, waarde, href, tekst }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex h-full flex-col border border-line p-6 transition-colors hover:border-ink">
                    <Icon size={26} className="text-red" aria-hidden />
                    <span className="mt-4 font-display text-xl font-bold uppercase">{label}</span>
                    <span className="mt-1 break-all font-semibold">{waarde}</span>
                    <span className="mt-2 text-sm text-muted">{tekst}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-3xl">Waar kun je mee terecht?</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {[
                ['Een motor kopen of een proefrit plannen', '/occasions'],
                ['Je motor laten taxeren en verkopen', '/motor-verkopen'],
                ['Onderhoud, reparatie of een aankoopkeuring', '/werkplaats'],
                ['Winterstalling voor je motor', '/winterstalling'],
                ['Een onderdeel of accessoire zoeken', '/onderdelen'],
              ].map(([tekst, href]) => (
                <li key={href}>
                  <Link href={href} className="flex min-h-14 items-center justify-between gap-4 py-3 font-semibold hover:text-red">
                    {tekst} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="on-dark bg-dark p-8 text-white">
              <h2 className="flex items-center gap-3 text-3xl"><Clock size={26} className="text-red-on-dark" aria-hidden /> Openingstijden</h2>
              <p className="mt-3 text-muted-on-dark">{vandaagStatus(inst)}</p>
              <dl className="mt-6 space-y-2 border-t border-line-dark pt-6">
                {tijden.map(t => (
                  <div key={t.label} className="flex justify-between gap-4">
                    <dt className={t.gesloten ? 'text-muted-on-dark' : ''}>{t.label}</dt>
                    <dd className="tabular text-muted-on-dark">{t.waarde}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-muted-on-dark">Buiten openingstijden kom je langs op afspraak.</p>
            </div>
            <div className="border border-line p-8">
              <h2 className="flex items-center gap-3 text-3xl"><MapPin size={26} className="text-red" aria-hidden /> Adres</h2>
              <address className="mt-4 not-italic text-lg">
                {BEDRIJF.naam}<br />{BEDRIJF.straat}<br />{BEDRIJF.postcode} {BEDRIJF.plaats}
              </address>
              <p className="mt-3 text-sm text-muted">In Tholen, Zeeland, vlak bij Bergen op Zoom.</p>
              <a href={BEDRIJF.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">Plan je route</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
