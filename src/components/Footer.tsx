import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BEDRIJF, whatsappUrl } from '@/lib/site';
import { formatOpeningsTijden, type Instellingen } from '@/lib/instellingen';

const KOLOMMEN = [
  {
    titel: 'Aanbod',
    links: [
      { href: '/occasions', label: 'Motor occasions' },
      { href: '/onderdelen', label: 'Onderdelen en accessoires' },
      { href: '/proefrit', label: 'Proefrit aanvragen' },
    ],
  },
  {
    titel: 'Diensten',
    links: [
      { href: '/werkplaats', label: 'Werkplaats en onderhoud' },
      { href: '/winterstalling', label: 'Winterstalling' },
      { href: '/motor-verkopen', label: 'Motor verkopen' },
    ],
  },
  {
    titel: 'Over DJM',
    links: [
      { href: '/over-ons', label: 'Over ons' },
      { href: '/veelgestelde-vragen', label: 'Veelgestelde vragen' },
      { href: '/blog', label: 'Blog en motortips' },
      { href: '/contact', label: 'Contact en route' },
    ],
  },
];

export default function Footer({ instellingen }: { instellingen: Instellingen }) {
  const tijden = formatOpeningsTijden(instellingen);

  return (
    <footer className="on-dark bg-dark text-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-djm.webp" alt={BEDRIJF.naam} width={560} height={234} loading="lazy" className="h-16 w-auto" />
          <p className="mt-5 max-w-sm text-muted-on-dark">{instellingen.content.footer_tagline}</p>
          <address className="mt-6 space-y-3 not-italic">
            <a href={BEDRIJF.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white text-muted-on-dark">
              <MapPin size={18} className="mt-0.5 shrink-0 text-red-on-dark" aria-hidden />
              <span>{BEDRIJF.straat}<br />{BEDRIJF.postcode} {BEDRIJF.plaats}</span>
            </a>
            <a href={`tel:${BEDRIJF.telefoon.e164}`} className="flex gap-3 text-muted-on-dark hover:text-white">
              <Phone size={18} className="shrink-0 text-red-on-dark" aria-hidden /> {BEDRIJF.telefoon.label}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-muted-on-dark hover:text-white">
              <MessageCircle size={18} className="shrink-0 text-red-on-dark" aria-hidden /> WhatsApp {BEDRIJF.mobiel.label}
            </a>
            <a href={`mailto:${BEDRIJF.email}`} className="flex gap-3 text-muted-on-dark hover:text-white">
              <Mail size={18} className="shrink-0 text-red-on-dark" aria-hidden /> {BEDRIJF.email}
            </a>
          </address>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
          {KOLOMMEN.map(k => (
            <nav key={k.titel} aria-label={k.titel}>
              <h2 className="font-display text-base tracking-[0.14em] text-white">{k.titel}</h2>
              <ul className="mt-4 space-y-1">
                {k.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1.5 text-muted-on-dark hover:text-white">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-base tracking-[0.14em] text-white">Openingstijden</h2>
          <dl className="mt-4 space-y-2 text-[15px]">
            {tijden.map(t => (
              <div key={t.label} className="flex justify-between gap-4">
                <dt className={t.gesloten ? 'text-muted-on-dark' : 'text-white'}>{t.label}</dt>
                <dd className="tabular text-muted-on-dark">{t.waarde}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-on-dark">Buiten deze tijden op afspraak.</p>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-3 py-6 pb-24 text-sm text-muted-on-dark sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>© {new Date().getFullYear()} {BEDRIJF.naam}, {BEDRIJF.plaats}</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-white">Privacyverklaring</Link></li>
            <li><Link href="/algemene-voorwaarden" className="hover:text-white">Algemene voorwaarden</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
