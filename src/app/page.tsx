import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Bike, Clock, MapPin, Smartphone, Tag, Wrench } from 'lucide-react';
import { getMotors } from '@/lib/motors';
import { getInstellingen } from '@/lib/getInstellingen';
import { CONTENT_FALLBACK, euro, formatOpeningsTijden, tarief, vandaagStatus } from '@/lib/instellingen';
import { afbeeldingSrc, afbeeldingSrcSet, getCms } from '@/lib/cms';
import { getFaqs } from '@/lib/faq';
import { BEDRIJF } from '@/lib/site';
import { faqNode, graph, itemList, webPage } from '@/lib/schema';
import MotorCard from '@/components/MotorCard';
import InkoopForm from '@/components/forms/InkoopForm';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { Tekst } from '@/components/Markdown';

const HERO_FOTO = { url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87', alt: 'Rode sportmotor in een donkere garage', breedte: 1600, hoogte: 1867 };
const TITEL = 'De Jonge Motoren | Motor occasions en werkplaats in Tholen';
const DESCRIPTION = 'De Jonge Motoren in Tholen: motor occasions kopen, je motor verkopen, onderhoud en winterstalling. Al 25 jaar aan de Stevinweg 14, vlak bij Bergen op Zoom.';

// Teksten die de beheerder in de app kan aanpassen; dit is de terugval als een veld leeg is
const USPS = [
  { titel: `${BEDRIJF.jarenErvaring} jaar in Tholen`, tekst: 'Vertrouwd adres aan de Stevinweg' },
  { titel: 'Gratis proefrit', tekst: 'Met een geldig A- of A2-rijbewijs' },
  { titel: 'Inkoop alle merken', tekst: 'Vrijblijvende taxatie van je motor' },
  { titel: 'Eigen werkplaats', tekst: 'Onderhoud, reparatie en stalling' },
];
const USP_ICONEN = [MapPin, Bike, Tag, Wrench];
const ROUTES = [
  { titel: 'Motor kopen', tekst: `Bekijk de occasions die nu bij ${BEDRIJF.naam} staan, met foto's, kilometerstand en prijs. Plan daarna een proefrit in Tholen.` },
  { titel: 'Motor verkopen', tekst: 'Vul het merk, model en de kilometerstand in. We bellen je voor een vrijblijvende taxatie en regelen de overdracht.' },
  { titel: 'Onderhoud en reparatie', tekst: 'Van kleine beurt tot banden, remmen en diagnose. Nieuwe klanten vragen een afspraak aan via de website.' },
];
const ROUTE_LINKS = [
  { href: '/occasions', cta: 'Naar de occasions' },
  { href: '/motor-verkopen', cta: 'Taxatie aanvragen' },
  { href: '/werkplaats', cta: 'Naar de werkplaats' },
];
const STAPPEN = [
  { titel: 'Vul je motor in', tekst: 'Merk, model, bouwjaar en kilometerstand. Het duurt een minuut.' },
  { titel: 'We bellen je terug', tekst: 'We stellen een paar vragen en spreken een taxatie af.' },
  { titel: 'Taxatie en bod', tekst: 'We bekijken de motor samen en doen je een bod.' },
  { titel: 'Overdracht en betaling', tekst: 'Akkoord? Dan regelen we de papieren en de betaling direct.' },
];

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = (await getCms()).seo('home', '', DESCRIPTION);
  return {
    title: { absolute: title ? `${title} | ${BEDRIJF.naam}` : TITEL },
    description,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const [motoren, inst, cms, faqGroepen] = await Promise.all([getMotors(), getInstellingen(), getCms(), getFaqs()]);
  const uitgelicht = motoren.slice(0, 6);
  const stalling = tarief(inst, 'winterstalling_6mnd');
  const faqs = faqGroepen.flatMap(g => g.items).slice(0, 5);
  const hero = cms.afbeelding('home.hero.afbeelding', HERO_FOTO) ?? HERO_FOTO;
  const usps = cms.lijst('home.usps', USPS, { aantal: 4 });
  const routes = cms.lijst('home.routes', ROUTES, { aantal: 3 });
  const stappen = cms.lijst('verkopen.stappen', STAPPEN);
  const tijden = formatOpeningsTijden(inst);

  return (
    <>
      <JsonLd data={graph(
        webPage('/', 'De Jonge Motoren', DESCRIPTION),
        uitgelicht.length ? [{ ...itemList(uitgelicht.map(m => `/occasions/${m.slug}`)), name: 'Nieuwste occasions' }] : [],
        faqNode('/', faqs),
      )} />

      {/* HERO */}
      <section className="on-dark relative overflow-hidden bg-dark text-white">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            <h1>
              <span className="eyebrow block">{cms.tekst('home.hero.eyebrow', 'Motorzaak in Tholen · occasions, inkoop en werkplaats')}</span>
              <span className="mt-5 block text-[clamp(3.25rem,8.5vw,7.25rem)] leading-[0.9]">
                {cms.tekst('home.hero.titel1', CONTENT_FALLBACK.hero_regel1)}<br /><span className="text-red-on-dark">{cms.tekst('home.hero.titel2', CONTENT_FALLBACK.hero_regel2)}</span>
              </span>
            </h1>
            <Tekst waarde={cms.tekst('home.hero.ondertitel', CONTENT_FALLBACK.hero_ondertitel)} className="mt-7 max-w-xl text-lg text-muted-on-dark" />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/occasions" className="btn btn-primary">
                Bekijk occasions <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/werkplaats" className="btn btn-outline">Plan onderhoud</Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-muted-on-dark">
              <Clock size={16} aria-hidden /> {vandaagStatus(inst)} · {BEDRIJF.straat}, {BEDRIJF.plaats}
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <div className="absolute -left-3 -top-3 hidden h-24 w-24 bg-red lg:block" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afbeeldingSrc(hero, 900, 7 / 6)}
              srcSet={afbeeldingSrcSet(hero, [600, 900, 1200], 7 / 6)}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={hero.alt}
              width={900}
              height={1050}
              fetchPriority="high"
              className="relative aspect-[4/3] w-full object-cover lg:aspect-[6/7]"
            />
          </div>
        </div>

        <div className="border-t border-line-dark bg-dark-2">
          <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
            {usps.map(({ titel, tekst }, i) => ({ icon: USP_ICONEN[i] ?? Tag, titel, tekst })).map(({ icon: Icon, titel, tekst }) => (
              <li key={titel} className="flex gap-3">
                <Icon size={22} className="mt-0.5 shrink-0 text-red-on-dark" aria-hidden />
                <div>
                  <p className="font-display text-lg font-bold uppercase leading-tight">{titel}</p>
                  <p className="mt-1 text-sm text-muted-on-dark">{tekst}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROUTES */}
      <section className="py-16 lg:py-24" aria-labelledby="routes-titel">
        <div className="container-site">
          <p className="eyebrow">Waarmee kunnen we je helpen?</p>
          <h2 id="routes-titel" className="mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)]">{cms.tekst('home.routes.titel', 'Kopen, verkopen of laten onderhouden')}</h2>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {routes.map((r, i) => ({ ...r, ...ROUTE_LINKS[i] })).map(r => (
              <Link key={r.href} href={r.href} className="group flex flex-col bg-white p-8 transition-colors hover:bg-surface-2">
                <h3 className="text-3xl">{r.titel}</h3>
                <p className="mt-3 flex-1 text-muted">{r.tekst}</p>
                <span className="link-arrow mt-6">{r.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="bg-surface-2 py-16 lg:py-24" aria-labelledby="occasions-titel">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Voorraad</p>
              <h2 id="occasions-titel" className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">Nieuwste occasions</h2>
            </div>
            {motoren.length > 0 && (
              <Link href="/occasions" className="link-arrow">Alle {motoren.length} occasions <ArrowRight size={16} aria-hidden /></Link>
            )}
          </div>
          {uitgelicht.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {uitgelicht.map(m => <MotorCard key={m.id} motor={m} />)}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 border-l-4 border-red bg-white p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="text-3xl">Alle occasions zijn verkocht</h3>
                <p className="mt-3 max-w-2xl text-muted">
                  Op dit moment staat er geen motor online. Zoek je een bepaald merk of model? Geef het door, dan houden we je op de hoogte als er iets passends binnenkomt.
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary">Geef je wens door</Link>
            </div>
          )}
        </div>
      </section>

      {/* INKOOP */}
      <section className="py-16 lg:py-24" aria-labelledby="inkoop-titel">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Motor verkopen</p>
            <h2 id="inkoop-titel" className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{cms.tekst('home.inkoop.titel', 'Verkoop je motor aan De Jonge Motoren')}</h2>
            <Tekst waarde={cms.tekst('home.inkoop.tekst', CONTENT_FALLBACK.inkoop_ondertitel)} className="mt-5 max-w-xl text-lg text-muted" />
            <ol className="mt-10 space-y-6">
              {stappen.map(({ titel, tekst }, i) => (
                <li key={titel} className="flex gap-5">
                  <span className="tabular flex h-11 w-11 shrink-0 items-center justify-center bg-ink font-display text-xl font-extrabold text-white">{i + 1}</span>
                  <div>
                    <h3 className="text-xl">{titel}</h3>
                    <p className="mt-1 text-muted">{tekst}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-line bg-surface-2 p-6 sm:p-8">
            <h3 className="text-2xl">Vraag een vrijblijvende taxatie aan</h3>
            <div className="mt-6"><InkoopForm /></div>
          </div>
        </div>
      </section>

      {/* WERKPLAATS */}
      <section className="on-dark bg-dark py-16 text-white lg:py-24" aria-labelledby="werkplaats-titel">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Werkplaats</p>
            <h2 id="werkplaats-titel" className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{cms.tekst('home.werkplaats.titel', 'Onderhoud, reparatie en stalling')}</h2>
            <Tekst waarde={cms.tekst('home.werkplaats.tekst', CONTENT_FALLBACK.service_intro)} className="mt-5 text-lg text-muted-on-dark" />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/werkplaats" className="btn btn-primary">Vraag een afspraak aan</Link>
              {stalling && <Link href="/winterstalling" className="btn btn-outline">Winterstalling vanaf {euro(stalling)}</Link>}
            </div>
          </div>
          <ul className="grid gap-px bg-line-dark sm:grid-cols-2 lg:col-span-7">
            {(inst.diensten.length ? inst.diensten : []).slice(0, 6).map(g => (
              <li key={g.label} className="bg-dark p-6">
                <h3 className="text-xl">{g.label}</h3>
                <p className="mt-2 text-[15px] text-muted-on-dark">{g.items.slice(0, 4).map(i => i.naam).join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OVER ONS */}
      <section className="py-16 lg:py-24" aria-labelledby="over-titel">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Over ons</p>
            <h2 id="over-titel" className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">{cms.tekst('home.over.titel', 'Nieuwe eigenaren, dezelfde werkplaats')}</h2>
            <Tekst className="mt-5 text-lg text-muted" waarde={cms.tekst('home.over.tekst', `${CONTENT_FALLBACK.over_ons_intro}

Léon en Diana de Jonge bouwden ${BEDRIJF.naam} in ${BEDRIJF.jarenErvaring} jaar op tot een vertrouwd adres voor motorrijders uit Tholen en omgeving. Jeffrey en Anouk zetten het bedrijf voort op hetzelfde adres.`)} />
            <Link href="/over-ons" className="link-arrow mt-8">Lees ons verhaal <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <dl className="grid grid-cols-2 gap-px border border-line bg-line">
            {[
              ['Sinds', `${BEDRIJF.jarenErvaring}+ jaar`],
              ['Adres', `${BEDRIJF.straat}, ${BEDRIJF.plaats}`],
              ['Occasions', motoren.length ? `${motoren.length} op voorraad` : 'Wisselende voorraad'],
              ['Werkgebied', 'Zeeland en West-Brabant'],
            ].map(([dt, dd]) => (
              <div key={dt} className="bg-white p-6">
                <dt className="eyebrow text-xs">{dt}</dt>
                <dd className="mt-2 font-display text-2xl font-bold uppercase leading-tight">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* APP + REVIEWS */}
      <section className="border-y border-line bg-surface-2 py-16 lg:py-20">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col bg-white p-8">
            <Smartphone size={28} className="text-red" aria-hidden />
            <h2 className="mt-4 text-3xl">{cms.tekst('home.app.titel', 'De DJM-app voor klanten')}</h2>
            <Tekst className="mt-3 flex-1 text-muted" waarde={cms.tekst('home.app.tekst', `Klanten van ${BEDRIJF.naam} houden in de app het onderhoud en de kilometerstand van hun motor bij, krijgen een seintje als een beurt eraan komt en plannen zelf een afspraak.`)} />
            <p className="mt-6 text-sm text-muted">Je krijgt toegang zodra je klant bent.</p>
          </div>
          <div className="flex flex-col bg-white p-8">
            <p className="eyebrow">Google-reviews</p>
            <h2 className="mt-3 text-3xl">Lees wat klanten zeggen</h2>
            <p className="mt-3 flex-1 text-muted">
              Op ons Google-bedrijfsprofiel lees je de ervaringen van klanten die een motor kochten, verkochten of lieten onderhouden.
            </p>
            <a href={BEDRIJF.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6 self-start">
              Bekijk reviews op Google <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ + BEZOEK */}
      <section className="py-16 lg:py-24" aria-labelledby="faq-titel">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Veelgestelde vragen</p>
            <h2 id="faq-titel" className="mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">Goed om te weten</h2>
            <div className="mt-8"><FaqList items={faqs} /></div>
            <Link href="/veelgestelde-vragen" className="link-arrow mt-6">Alle vragen <ArrowRight size={16} aria-hidden /></Link>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="bezoek-titel">
            <div className="on-dark bg-dark p-8 text-white">
              <h2 id="bezoek-titel" className="text-3xl">Kom langs in Tholen</h2>
              <p className="mt-4 text-muted-on-dark">{BEDRIJF.straat}<br />{BEDRIJF.postcode} {BEDRIJF.plaats}</p>
              <dl className="mt-6 space-y-2 border-t border-line-dark pt-6 text-[15px]">
                {tijden.map(t => (
                  <div key={t.label} className="flex justify-between gap-4">
                    <dt className={t.gesloten ? 'text-muted-on-dark' : ''}>{t.label}</dt>
                    <dd className="tabular text-muted-on-dark">{t.waarde}</dd>
                  </div>
                ))}
              </dl>
              <a href={BEDRIJF.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 w-full">
                <MapPin size={18} aria-hidden /> Plan je route
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
