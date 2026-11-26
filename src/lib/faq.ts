// Veelgestelde vragen uit de DJM-app (tabel website_faq).
// De vraag over openingstijden maakt de website zelf uit de openingstijden, zodat die nooit
// verouderd raakt. Is de database onbereikbaar, dan gelden de vragen uit de code.
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BEDRIJF } from './site';
import { formatOpeningsTijden, type Instellingen } from './instellingen';
import { getInstellingen } from './getInstellingen';
import { vulCodesIn } from './cms';
import { isInternPad } from './tekst';
import { getFaqGroepen, type Faq, type FaqGroep } from '@/content/faq';

const GROEPEN: { id: string; titel: string }[] = [
  { id: 'kopen', titel: 'Een motor kopen' },
  { id: 'verkopen', titel: 'Je motor verkopen' },
  { id: 'werkplaats', titel: 'Werkplaats en stalling' },
  { id: 'bezoek', titel: 'Langskomen' },
];

function openingstijdenVraag(inst: Instellingen): Faq {
  const tijden = formatOpeningsTijden(inst).map(t => `${t.label}: ${t.waarde.toLowerCase()}`).join('; ');
  return {
    vraag: 'Wat zijn de openingstijden?',
    antwoord: `De openingstijden van ${BEDRIJF.naam} zijn: ${tijden}. Buiten deze tijden kom je langs op afspraak.`,
  };
}

type Rij = { groep: string; vraag: string; antwoord: string; link_href: string | null; link_label: string | null };

export function naarGroepen(rijen: Rij[], inst: Instellingen): FaqGroep[] {
  const groepen = GROEPEN.map(g => ({ ...g, items: [] as Faq[] }));
  for (const r of rijen) {
    const groep = groepen.find(g => g.id === r.groep);
    if (!groep || typeof r.vraag !== 'string' || typeof r.antwoord !== 'string') continue;
    const vraag = vulCodesIn(r.vraag.trim(), inst);
    const antwoord = vulCodesIn(r.antwoord.trim(), inst);
    if (!vraag || !antwoord) continue; // bv. tarief niet ingevuld: vraag niet tonen
    const href = (r.link_href || '').trim();
    const label = (r.link_label || '').trim();
    groep.items.push({ vraag, antwoord, ...(href && label && isInternPad(href) ? { link: { href, label } } : {}) });
  }
  groepen.find(g => g.id === 'bezoek')!.items.push(openingstijdenVraag(inst));
  return groepen.filter(g => g.items.length > 0);
}

export const getFaqs = cache(async (): Promise<FaqGroep[]> => {
  const inst = await getInstellingen();
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
    const { data, error } = await supabase
      .from('website_faq')
      .select('groep, vraag, antwoord, link_href, link_label')
      .eq('actief', true)
      .order('volgorde', { ascending: true });
    if (error || !data) return getFaqGroepen(inst);
    return naarGroepen(data as Rij[], inst);
  } catch {
    return getFaqGroepen(inst);
  }
});
