// Website-inhoud uit de DJM-app ("Website aanpassen"): tabel website_blokken.
//
// Eén query per bezoek (React cache), met terugval op de tekst in de code als een veld
// ontbreekt, leeg is, een onbekende code bevat of de database onbereikbaar is. Zo blijft de
// site altijd werken, ook als de beheerder iets leeg laat.
//
// De sleutels (bv. 'home.hero.titel1') zijn het contract met de app. Niet hernoemen; de
// app-repo (supabase/website_cms.sql) heeft de volledige lijst.
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BEDRIJF } from './site';
import { euro, tarief, type Instellingen } from './instellingen';
import { getInstellingen } from './getInstellingen';

export type Afbeelding = { url: string; alt: string; breedte: number; hoogte: number };

const MAX_TEKST = 5000;

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

export const getBlokken = cache(async (): Promise<Map<string, unknown>> => {
  try {
    const { data, error } = await client().from('website_blokken').select('sleutel, waarde');
    if (error || !data) return new Map();
    return new Map(data.map(r => [r.sleutel as string, r.waarde as unknown]));
  } catch {
    return new Map();
  }
});

/** Vult {jaren}, {telefoon}, {whatsapp} en {tarief:sleutel} in. null als een code niet in te vullen is. */
export function vulCodesIn(tekst: string, inst: Instellingen): string | null {
  let onbekend = false;
  const uit = tekst.replace(/\{([^{}]{1,60})\}/g, (code, k: string) => {
    if (k === 'jaren') return String(BEDRIJF.jarenErvaring);
    if (k === 'telefoon') return BEDRIJF.telefoon.label;
    if (k === 'whatsapp') return BEDRIJF.mobiel.label;
    const m = k.match(/^tarief:([a-z0-9_]+)$/);
    const bedrag = m ? tarief(inst, m[1]) : null;
    if (bedrag) return euro(bedrag);
    onbekend = true;
    return code;
  });
  return onbekend ? null : uit;
}

/** Alleen https-afbeeldingen; 'leeg' = bewust geen afbeelding. */
function naarAfbeelding(v: unknown): Afbeelding | 'leeg' | null {
  if (!v || typeof v !== 'object') return null;
  const a = v as Record<string, unknown>;
  const url = typeof a.url === 'string' ? a.url.trim() : '';
  if (!url) return 'leeg';
  if (!/^https:\/\/[^\s"<>]+$/.test(url)) return null;
  return {
    url,
    alt: typeof a.alt === 'string' ? a.alt.trim().slice(0, 200) : '',
    breedte: Number(a.breedte) || 0,
    hoogte: Number(a.hoogte) || 0,
  };
}

export type Cms = {
  /** Tekst of lange tekst (markdown-subset), met codes ingevuld. */
  tekst(sleutel: string, terugval: string): string;
  /** Lijst met dezelfde velden als de terugval; met `aantal` moet het aantal precies kloppen. */
  lijst<T extends Record<string, string>>(sleutel: string, terugval: T[], opties?: { aantal?: number }): T[];
  /** Afbeelding; bij `optioneel` betekent een lege afbeelding: niets tonen. */
  afbeelding(sleutel: string, terugval: Afbeelding | null, opties?: { optioneel?: boolean }): Afbeelding | null;
  /** Google-titel en -omschrijving van een pagina (pagina 'seo' in de app). */
  seo(pagina: string, titel: string, omschrijving: string): { title: string; description: string };
};

export function maakCms(blokken: Map<string, unknown>, inst: Instellingen): Cms {
  const tekst = (sleutel: string, terugval: string) => {
    const v = blokken.get(sleutel);
    if (typeof v !== 'string' || !v.trim()) return terugval;
    return vulCodesIn(v.trim().slice(0, MAX_TEKST), inst) ?? terugval;
  };
  return {
    tekst,
    lijst(sleutel, terugval, opties = {}) {
      const v = blokken.get(sleutel);
      if (!Array.isArray(v) || !v.length || !terugval.length) return terugval;
      if (opties.aantal && v.length !== opties.aantal) return terugval;
      const velden = Object.keys(terugval[0]);
      const items = v.map(item => {
        if (!item || typeof item !== 'object') return null;
        const uit: Record<string, string> = {};
        for (const veld of velden) {
          const t = (item as Record<string, unknown>)[veld];
          if (typeof t !== 'string' || !t.trim()) return null;
          const gevuld = vulCodesIn(t.trim().slice(0, MAX_TEKST), inst);
          if (gevuld === null) return null;
          uit[veld] = gevuld;
        }
        return uit;
      });
      return items.every(Boolean) ? (items as typeof terugval) : terugval;
    },
    afbeelding(sleutel, terugval, opties = {}) {
      const a = naarAfbeelding(blokken.get(sleutel));
      if (a === 'leeg') return opties.optioneel ? null : terugval;
      return a ?? terugval;
    },
    seo(pagina, titel, omschrijving) {
      return { title: tekst(`seo.${pagina}.titel`, titel), description: tekst(`seo.${pagina}.omschrijving`, omschrijving) };
    },
  };
}

export const getCms = cache(async (): Promise<Cms> => {
  const [blokken, inst] = await Promise.all([getBlokken(), getInstellingen()]);
  return maakCms(blokken, inst);
});

/** Afbeelding in de juiste maat: Cloudinary en Unsplash met transformatie, andere bronnen ongewijzigd. */
export function afbeeldingSrc(a: Afbeelding, breedte: number, verhouding?: number): string {
  const h = verhouding ? Math.round(breedte * verhouding) : null;
  if (a.url.includes('res.cloudinary.com') && a.url.includes('/image/upload/')) {
    const t = `f_auto,q_auto,${h ? `c_fill,w_${breedte},h_${h}` : `c_limit,w_${breedte}`}`;
    return a.url.replace('/image/upload/', `/image/upload/${t}/`);
  }
  if (a.url.startsWith('https://images.unsplash.com/')) {
    const basis = a.url.split('?')[0];
    return `${basis}?auto=format&fit=crop&w=${breedte}${h ? `&h=${h}` : ''}&q=70`;
  }
  return a.url;
}

export function afbeeldingSrcSet(a: Afbeelding, breedtes: number[], verhouding?: number): string | undefined {
  if (!a.url.includes('res.cloudinary.com') && !a.url.startsWith('https://images.unsplash.com/')) return undefined;
  return breedtes.map(w => `${afbeeldingSrc(a, w, verhouding)} ${w}w`).join(', ');
}
