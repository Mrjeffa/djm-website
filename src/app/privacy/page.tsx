import type { Metadata } from 'next';
import { BEDRIJF } from '@/lib/site';
import { breadcrumb, graph, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';

const DESCRIPTION = 'Hoe De Jonge Motoren in Tholen omgaat met je persoonsgegevens als je een formulier invult of contact opneemt.';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={graph(webPage('/privacy', 'Privacyverklaring', DESCRIPTION), breadcrumb([{ name: 'Privacyverklaring', path: '/privacy' }]))} />
      <PageHeader crumbs={[{ name: 'Privacyverklaring', path: '/privacy' }]} eyebrow="Juridisch" title="Privacyverklaring" intro="Laatst bijgewerkt op 28 oktober 2026." />
      <div className="container-site py-16">
        <div className="prose-djm">
          <h2>1. Wie zijn wij?</h2>
          <p>
            {BEDRIJF.naam} is een motorzaak aan de {BEDRIJF.straat}, {BEDRIJF.postcode} {BEDRIJF.plaats}. Je bereikt ons via {BEDRIJF.email} of {BEDRIJF.telefoon.label}. KvK-nummer: [in te vullen].
          </p>

          <h2>2. Welke gegevens verwerken we?</h2>
          <p>Als je een formulier op deze website invult, verwerken we:</p>
          <ul>
            <li>je naam en telefoonnummer;</li>
            <li>je voorkeursdatum voor een proefrit of werkplaatsafspraak;</li>
            <li>gegevens over je motor die je zelf invult, zoals merk, model, bouwjaar, kilometerstand en kenteken;</li>
            <li>een toelichting die je zelf meestuurt.</li>
          </ul>

          <h2>3. Waarvoor gebruiken we je gegevens?</h2>
          <ul>
            <li>om je terug te bellen over je aanvraag;</li>
            <li>om een proefrit, werkplaatsafspraak of winterstalling in te plannen;</li>
            <li>om een taxatie van je motor voor te bereiden.</li>
          </ul>
          <p>We gebruiken je gegevens niet voor marketing en we verkopen ze niet. We delen ze alleen met derden als de wet dat verplicht.</p>

          <h2>4. Hoe lang bewaren we je gegevens?</h2>
          <p>We bewaren je gegevens niet langer dan nodig voor het doel waarvoor je ze gaf. Afspraakgegevens bewaren we maximaal 2 jaar.</p>

          <h2>5. Cookies en externe diensten</h2>
          <p>
            Deze website plaatst geen tracking- of advertentiecookies en gebruikt geen analysesoftware. Lettertypen staan op onze eigen server. Foto&apos;s van motoren en artikelen laden we via Cloudinary; de hoofdfoto op de homepage komt van Unsplash. Deze diensten zien bij het laden van een afbeelding je IP-adres, net als bij elke andere website.
          </p>

          <h2>6. Beveiliging</h2>
          <p>
            De gegevens uit de formulieren slaan we op bij Supabase, in een datacenter in de Europese Unie (Parijs). We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen.
          </p>

          <h2>7. Je rechten</h2>
          <p>Op grond van de AVG heb je het recht op:</p>
          <ul>
            <li><strong>inzage</strong> in de gegevens die we van je hebben;</li>
            <li><strong>correctie</strong> van onjuiste gegevens;</li>
            <li><strong>verwijdering</strong> van je gegevens;</li>
            <li><strong>bezwaar</strong> tegen het verwerken van je gegevens.</li>
          </ul>
          <p>Mail naar {BEDRIJF.email} om een van deze rechten te gebruiken.</p>

          <h2>8. Vragen en klachten</h2>
          <p>
            Heb je een vraag over deze verklaring, neem dan contact op via {BEDRIJF.email} of {BEDRIJF.telefoon.label}. Je kunt ook een klacht indienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.
          </p>
        </div>
      </div>
    </>
  );
}
