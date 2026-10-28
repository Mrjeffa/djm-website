import { getMotors, formatKm, formatPrijs, motorPad } from '@/lib/motors';
import { getInstellingen } from '@/lib/getInstellingen';
import { euro, formatOpeningsTijden, tarief } from '@/lib/instellingen';
import { BLOG_POSTS } from '@/content/blog';
import { BEDRIJF, SITE_URL } from '@/lib/site';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const [motoren, inst] = await Promise.all([getMotors(), getInstellingen()]);
  const u = (p: string) => `${SITE_URL}${p}`;
  const tijden = formatOpeningsTijden(inst).map(t => `${t.label}: ${t.waarde}`).join('; ');
  const tarieven = ([
    ['Winterstalling 6 maanden', tarief(inst, 'winterstalling_6mnd')],
    ['Winterstalling extra maand', tarief(inst, 'winterstalling_extra_mnd')],
    ['Aankoopkeuring', tarief(inst, 'aankoopkeuring_basis')],
    ['Seizoensklaar maken', tarief(inst, 'seizoensklaarmaak')],
  ] as [string, number | null][]).filter(([, p]) => p).map(([n, p]) => `- ${n}: ${euro(p!)}`);

  const body = `# ${BEDRIJF.naam}

> Motorzaak in ${BEDRIJF.plaats} (${BEDRIJF.provincie}) met occasions, inkoop van motoren, een eigen werkplaats, winterstalling en onderdelen. Al ${BEDRIJF.jarenErvaring} jaar aan de ${BEDRIJF.straat}.

## Belangrijkste feiten

- Naam: ${BEDRIJF.naam} (${BEDRIJF.kort})
- Adres: ${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}, Nederland
- Telefoon: ${BEDRIJF.telefoon.label}; WhatsApp: ${BEDRIJF.mobiel.label}; e-mail: ${BEDRIJF.email}
- Openingstijden: ${tijden}. Overige tijden op afspraak.
- Eigenaren: Jeffrey en Anouk, opvolgers van oprichters Léon en Diana de Jonge
- Werkgebied: ${BEDRIJF.werkgebied.join(', ')}
- Proefrit: gratis, met een geldig A- of A2-rijbewijs en eigen helm

## Occasions

- [Alle occasions](${u('/occasions')}): actuele voorraad gebruikte motoren met prijs, bouwjaar en kilometerstand (${motoren.length} op voorraad op ${new Date().toLocaleDateString('nl-NL')}).
${motoren.slice(0, 30).map(m => `- [${m.naam} (${m.bouwjaar})](${u(motorPad(m))}): ${formatKm(m.km, m.kmEenheid)}, ${formatPrijs(m.prijs)}${m.status === 'gereserveerd' ? ', gereserveerd' : ''}.\n`).join('')}- [Proefrit aanvragen](${u('/proefrit')}): gratis proefrit plannen met een occasion.

## Diensten

- [Werkplaats](${u('/werkplaats')}): onderhoud, banden, ketting, remmen, diagnose, schadeherstel en aankoopkeuring.
- [Winterstalling](${u('/winterstalling')}): stalling voor 6 maanden, te combineren met poetsen of onderhoud.
- [Motor verkopen](${u('/motor-verkopen')}): inkoop van motoren van alle merken met vrijblijvende taxatie.
- [Onderdelen en accessoires](${u('/onderdelen')}): onderdelen en accessoires op voorraad.

## Tarieven

${tarieven.join('\n') || '- Op aanvraag'}

## Informatie

- [Over ons](${u('/over-ons')}): geschiedenis van het bedrijf en de overname.
- [Veelgestelde vragen](${u('/veelgestelde-vragen')}): kopen, verkopen, werkplaats, stalling en openingstijden.
- [Contact en route](${u('/contact')}): adres, telefoon, WhatsApp en openingstijden.
${BLOG_POSTS.map(p => `- [${p.titel}](${u(`/blog/${p.slug}`)}): ${p.beschrijving}`).join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
