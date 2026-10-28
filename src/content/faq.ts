import { BEDRIJF } from '@/lib/site';
import { euro, formatOpeningsTijden, tarief, type Instellingen } from '@/lib/instellingen';

export type Faq = { vraag: string; antwoord: string; link?: { href: string; label: string } };
export type FaqGroep = { id: string; titel: string; items: Faq[] };

export function getFaqGroepen(inst: Instellingen): FaqGroep[] {
  const keuring = tarief(inst, 'aankoopkeuring_basis');
  const keuringExtra = tarief(inst, 'aankoopkeuring_extra_10min');
  const zoek = tarief(inst, 'zoekopdracht_bemiddeling');
  const stalling = tarief(inst, 'winterstalling_6mnd');
  const stallingExtra = tarief(inst, 'winterstalling_extra_mnd');
  const klaar = tarief(inst, 'seizoensklaarmaak');
  const tijden = formatOpeningsTijden(inst).map(t => `${t.label}: ${t.waarde.toLowerCase()}`).join('; ');

  const groepen: FaqGroep[] = [
    {
      id: 'kopen',
      titel: 'Een motor kopen',
      items: [
        {
          vraag: 'Kan ik een proefrit maken met een occasion?',
          antwoord: `Ja. Bij ${BEDRIJF.naam} in ${BEDRIJF.plaats} plan je een proefrit gratis en zonder verplichting. Je hebt een geldig motorrijbewijs nodig dat past bij de motor (A of A2) en je neemt je eigen helm en motorkleding mee. Vraag de proefrit aan via de website, bel ${BEDRIJF.telefoon.label} of stuur een WhatsApp naar ${BEDRIJF.mobiel.label}.`,
          link: { href: '/proefrit', label: 'Proefrit aanvragen' },
        },
        {
          vraag: 'Wat betekent "gereserveerd" bij een occasion?',
          antwoord: 'Op een motor met het label "gereserveerd" rust een reservering van een andere klant. De motor staat nog online omdat een koop soms niet doorgaat. Bel of app ons als je interesse hebt, dan laten we weten of hij weer beschikbaar komt.',
        },
        ...(zoek ? [{
          vraag: 'Zoeken jullie ook een specifieke motor voor mij?',
          antwoord: `Ja. Staat jouw motor niet in de voorraad, dan kun je ${BEDRIJF.naam} een zoekopdracht geven. We gaan dan gericht op zoek naar het merk, model en budget dat jij opgeeft. Het tarief voor een zoekopdracht is ${euro(zoek)}. Neem contact op om je wensen en de voorwaarden door te spreken.`,
          link: { href: '/contact', label: 'Zoekopdracht bespreken' },
        }] : []),
        ...(keuring ? [{
          vraag: 'Kan ik een motor laten keuren die ik ergens anders wil kopen?',
          antwoord: `Ja. De werkplaats van ${BEDRIJF.naam} doet aankoopkeuringen, ook van motoren die je bij een particulier of een andere zaak koopt. Een basiskeuring kost ${euro(keuring)}${keuringExtra ? `; elke extra 10 minuten kost ${euro(keuringExtra)}` : ''}. Plan de keuring in via het werkplaatsformulier of bel ons.`,
          link: { href: '/werkplaats', label: 'Keuring plannen' },
        }] : []),
      ],
    },
    {
      id: 'verkopen',
      titel: 'Je motor verkopen',
      items: [
        {
          vraag: 'Hoe verkoop ik mijn motor aan De Jonge Motoren?',
          antwoord: `Vul het formulier op de pagina Motor verkopen in met het merk, model, bouwjaar en de kilometerstand. ${BEDRIJF.naam} belt je terug voor een vrijblijvende taxatie. Ben je het eens met het bod, dan regelen we de overdracht en de betaling direct.`,
          link: { href: '/motor-verkopen', label: 'Taxatie aanvragen' },
        },
        {
          vraag: 'Welke motoren kopen jullie in?',
          antwoord: `${BEDRIJF.naam} koopt motoren van alle merken en types in: naked, sport, tour, adventure, chopper en klassiekers. De prijs hangt af van de staat, de kilometerstand, het onderhoud en de vraag in de markt. Een onderhoudsboekje en een tweede sleutel helpen bij de taxatie.`,
        },
        {
          vraag: 'Kan ik mijn motor ook in consignatie verkopen?',
          antwoord: `Ja. Bij consignatieverkoop staat je motor in de showroom van ${BEDRIJF.naam} en verkopen wij hem namens jou. Jij blijft eigenaar tot de verkoop. Vraag naar de voorwaarden en kosten, dan leggen we uit hoe het werkt.`,
          link: { href: '/contact', label: 'Vraag naar de voorwaarden' },
        },
      ],
    },
    {
      id: 'werkplaats',
      titel: 'Werkplaats en stalling',
      items: [
        {
          vraag: 'Hoe plan ik onderhoud of een reparatie?',
          antwoord: `Nieuwe klanten vragen onderhoud aan via het formulier op de werkplaatspagina of bellen ${BEDRIJF.telefoon.label}. We bellen je terug om een datum af te spreken. Ben je al klant, dan plan je de afspraak in de DJM-app.`,
          link: { href: '/werkplaats', label: 'Onderhoud aanvragen' },
        },
        ...(stalling ? [{
          vraag: 'Wat kost winterstalling voor mijn motor?',
          antwoord: `Winterstalling bij ${BEDRIJF.naam} in ${BEDRIJF.plaats} kost ${euro(stalling)} voor 6 maanden${stallingExtra ? ` en ${euro(stallingExtra)} per extra maand` : ''}. Je kunt de stalling combineren met een poetsbeurt of een onderhoudsbeurt, zodat je motor in het voorjaar klaarstaat.`,
          link: { href: '/winterstalling', label: 'Alles over winterstalling' },
        }] : []),
        ...(klaar ? [{
          vraag: 'Maken jullie mijn motor klaar voor het nieuwe seizoen?',
          antwoord: `Ja. Met de seizoensklaarbeurt van ${euro(klaar)} controleert de werkplaats je motor na de winter, zodat je veilig het seizoen start. Combineer je het met onderhoud, dan plannen we dat in één afspraak.`,
        }] : []),
      ],
    },
    {
      id: 'bezoek',
      titel: 'Langskomen',
      items: [
        {
          vraag: 'Waar zit De Jonge Motoren?',
          antwoord: `${BEDRIJF.naam} zit aan de ${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}, in Zeeland en vlak bij Bergen op Zoom.`,
          link: { href: '/contact', label: 'Route en contact' },
        },
        {
          vraag: 'Wat zijn de openingstijden?',
          antwoord: `De openingstijden van ${BEDRIJF.naam} zijn: ${tijden}. Buiten deze tijden kom je langs op afspraak.`,
        },
      ],
    },
  ];

  return groepen.filter(g => g.items.length > 0);
}
