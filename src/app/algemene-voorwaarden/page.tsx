import type { Metadata } from 'next';
import { BEDRIJF } from '@/lib/site';
import { breadcrumb, graph, webPage } from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';

const DESCRIPTION = 'Algemene voorwaarden van De Jonge Motoren, motorzaak in Tholen, Zeeland.';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden',
  description: DESCRIPTION,
  alternates: { canonical: '/algemene-voorwaarden' },
};

const ARTIKELEN: [string, string[]][] = [
  ['Definities', [
    `${BEDRIJF.naam}: de handelsnaam van de motorzaak aan de ${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}.`,
    `Klant: de persoon of organisatie die een overeenkomst sluit met ${BEDRIJF.naam}.`,
    'Voertuig: een motorfiets, scooter of bromfiets waarop een koopovereenkomst of dienst betrekking heeft.',
  ]],
  ['Toepasselijkheid', [`Deze voorwaarden gelden voor alle aanbiedingen, offertes en overeenkomsten van ${BEDRIJF.naam}, tenzij schriftelijk anders is afgesproken.`]],
  ['Aanbod en overeenkomst', ['Aanbiedingen op de website en in de showroom zijn vrijblijvend en gelden zolang de voorraad strekt. Een overeenkomst komt tot stand na schriftelijke bevestiging of ondertekening van een koopovereenkomst door beide partijen.']],
  ['Proefrit', [`Een proefrit is vrijblijvend. De klant heeft een geldig rijbewijs dat past bij het voertuig (categorie A of A2). De klant is aansprakelijk voor schade die tijdens de proefrit door eigen toedoen ontstaat.`]],
  ['Prijs en betaling', ['Alle prijzen zijn inclusief btw, tenzij anders vermeld. Betaling vindt plaats bij aflevering, tenzij schriftelijk anders is afgesproken. Bij te late betaling is de klant de wettelijke rente verschuldigd.']],
  ['Levering en risico', ['Levering vindt plaats bij betaling en afgifte van het voertuig. Het risico gaat op dat moment over op de klant.']],
  ['Garantie op occasions', [
    'Koopt een consument een voertuig, dan heeft hij recht op een voertuig dat voldoet aan de overeenkomst (wettelijke garantie, artikel 7:17 Burgerlijk Wetboek). Wat de klant mag verwachten, hangt af van onder meer de leeftijd, de kilometerstand en de prijs van het voertuig.',
    'Afspraken over aanvullende garantie leggen we schriftelijk vast in de koopovereenkomst.',
  ]],
  ['Aansprakelijkheid', [`De aansprakelijkheid van ${BEDRIJF.naam} is beperkt tot de factuurwaarde van de betreffende overeenkomst, voor zover de wet dat toestaat.`]],
  ['Geschillen', ['Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Zeeland-West-Brabant.']],
  ['Contact', [`${BEDRIJF.naam}, ${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}. Telefoon ${BEDRIJF.telefoon.label}, e-mail ${BEDRIJF.email}.`]],
];

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <JsonLd data={graph(webPage('/algemene-voorwaarden', 'Algemene voorwaarden', DESCRIPTION), breadcrumb([{ name: 'Algemene voorwaarden', path: '/algemene-voorwaarden' }]))} />
      <PageHeader crumbs={[{ name: 'Algemene voorwaarden', path: '/algemene-voorwaarden' }]} eyebrow="Juridisch" title="Algemene voorwaarden" intro="Versie 1.1, 28 oktober 2026." />
      <div className="container-site py-16">
        <div className="prose-djm">
          {ARTIKELEN.map(([titel, alineas], i) => (
            <section key={titel}>
              <h2>Artikel {i + 1}. {titel}</h2>
              {alineas.map(a => <p key={a}>{a}</p>)}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
