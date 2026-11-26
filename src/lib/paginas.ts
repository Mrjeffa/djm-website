// Eigen dienst- en infopagina's uit de DJM-app (tabel website_paginas, fase 5).
// Dienst: /werkplaats/<slug>, info: /info/<slug>. Alleen gepubliceerde pagina's zijn leesbaar
// (RLS); oude adressen (oude_slugs) verwijzen door.
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Afbeelding } from './cms';
import { vulCodesIn } from './cms';
import { getInstellingen } from './getInstellingen';

export type Sjabloon = 'dienst' | 'info';

export type WebPagina = {
  sjabloon: Sjabloon;
  slug: string;
  titel: string;
  intro: string;
  inhoud: string;
  afbeelding: Afbeelding | null;
  prijs: string | null;
  duur: string | null;
  afspraakSoort: string | null;
  faq: { vraag: string; antwoord: string }[];
  seoTitel: string | null;
  seoOmschrijving: string | null;
  inMenu: boolean;
  gepubliceerd: string;
  bijgewerkt: string;
};

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const KOLOMMEN = 'sjabloon, slug, titel, intro, inhoud, afbeelding, prijs_tekst, duur_tekst, afspraak_soort, faq, seo_titel, seo_omschrijving, in_menu, volgorde, gepubliceerd_op, bijgewerkt_op';

export const paginaPad = (p: Pick<WebPagina, 'sjabloon' | 'slug'>) => `${p.sjabloon === 'dienst' ? '/werkplaats' : '/info'}/${p.slug}`;

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

const tekstOfNull = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);

function naarAfbeelding(v: unknown): Afbeelding | null {
  if (!v || typeof v !== 'object') return null;
  const a = v as Record<string, unknown>;
  const url = typeof a.url === 'string' ? a.url.trim() : '';
  if (!/^https:\/\/[^\s"<>]+$/.test(url)) return null;
  return { url, alt: typeof a.alt === 'string' ? a.alt : '', breedte: Number(a.breedte) || 0, hoogte: Number(a.hoogte) || 0 };
}

async function naarPagina(r: Record<string, unknown>): Promise<WebPagina> {
  const inst = await getInstellingen();
  const prijs = tekstOfNull(r.prijs_tekst);
  const faq = (Array.isArray(r.faq) ? r.faq : [])
    .map(q => {
      const vraag = tekstOfNull((q as Record<string, unknown>)?.vraag);
      const antwoord = tekstOfNull((q as Record<string, unknown>)?.antwoord);
      const gevuld = antwoord ? vulCodesIn(antwoord, inst) : null;
      return vraag && gevuld ? { vraag, antwoord: gevuld } : null;
    })
    .filter((q): q is { vraag: string; antwoord: string } => !!q)
    .slice(0, 8);
  return {
    sjabloon: r.sjabloon === 'dienst' ? 'dienst' : 'info',
    slug: String(r.slug),
    titel: String(r.titel ?? ''),
    intro: vulCodesIn(String(r.intro ?? ''), inst) ?? String(r.intro ?? ''),
    inhoud: String(r.inhoud ?? ''),
    afbeelding: naarAfbeelding(r.afbeelding),
    prijs: prijs ? vulCodesIn(prijs, inst) : null, // code niet in te vullen = "Prijs op aanvraag"
    duur: tekstOfNull(r.duur_tekst),
    afspraakSoort: tekstOfNull(r.afspraak_soort),
    faq,
    seoTitel: tekstOfNull(r.seo_titel),
    seoOmschrijving: tekstOfNull(r.seo_omschrijving),
    inMenu: r.in_menu !== false,
    gepubliceerd: String(r.gepubliceerd_op ?? '').slice(0, 10),
    bijgewerkt: String(r.bijgewerkt_op ?? r.gepubliceerd_op ?? '').slice(0, 10),
  };
}

/** Alle gepubliceerde pagina's, in de volgorde uit de app. */
export const getPaginas = cache(async (): Promise<WebPagina[]> => {
  try {
    const { data, error } = await client()
      .from('website_paginas').select(KOLOMMEN)
      .eq('status', 'gepubliceerd')
      .order('volgorde', { ascending: true }).order('titel', { ascending: true });
    if (error || !data) return [];
    return Promise.all(data.map(naarPagina));
  } catch {
    return [];
  }
});

/** Pagina op sjabloon + slug, of het nieuwe adres als dit een oud adres is. */
export const getPagina = cache(async (sjabloon: Sjabloon, slug: string): Promise<{ pagina?: WebPagina; nieuwPad?: string }> => {
  if (!SLUG.test(slug)) return {};
  try {
    const supabase = client();
    const { data, error } = await supabase
      .from('website_paginas').select(KOLOMMEN)
      .eq('status', 'gepubliceerd').eq('sjabloon', sjabloon).eq('slug', slug).maybeSingle();
    if (error) return {};
    if (data) return { pagina: await naarPagina(data) };
    const { data: oud } = await supabase
      .from('website_paginas').select('sjabloon, slug')
      .eq('status', 'gepubliceerd').eq('sjabloon', sjabloon).contains('oude_slugs', [slug]).limit(1);
    return oud?.[0] ? { nieuwPad: paginaPad(oud[0] as Pick<WebPagina, 'sjabloon' | 'slug'>) } : {};
  } catch {
    return {};
  }
});
