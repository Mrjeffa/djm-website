// Blog uit de DJM-app (tabel blog_posts). Alleen gepubliceerde artikelen zijn leesbaar (RLS).
// Oude adressen (oude_slugs) verwijzen door naar het nieuwe. Is de database onbereikbaar, dan
// gelden de artikelen uit de code (src/content/blog.ts), zodat /blog nooit leeg breekt.
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BLOG_POSTS } from '@/content/blog';
import type { Afbeelding } from './cms';
import { telWoorden } from './tekst';

export type Post = {
  slug: string;
  titel: string;
  beschrijving: string;
  gepubliceerd: string; // jjjj-mm-dd
  bijgewerkt: string;   // jjjj-mm-dd
  leestijd: number;
  categorie: string;
  inhoud: string;
  afbeelding: Afbeelding | null;
};

const KOLOMMEN = 'slug, titel, beschrijving, inhoud, categorie, afbeelding, gepubliceerd_op, bijgewerkt_op';
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

const leestijd = (inhoud: string) => Math.max(1, Math.round(telWoorden(inhoud) / 200));

function naarAfbeelding(v: unknown): Afbeelding | null {
  if (!v || typeof v !== 'object') return null;
  const a = v as Record<string, unknown>;
  const url = typeof a.url === 'string' ? a.url.trim() : '';
  if (!/^https:\/\/[^\s"<>]+$/.test(url)) return null;
  return { url, alt: typeof a.alt === 'string' ? a.alt : '', breedte: Number(a.breedte) || 0, hoogte: Number(a.hoogte) || 0 };
}

function naarPost(r: Record<string, unknown>): Post {
  const inhoud = String(r.inhoud ?? '');
  const gepubliceerd = String(r.gepubliceerd_op ?? '').slice(0, 10);
  const bijgewerkt = String(r.bijgewerkt_op ?? r.gepubliceerd_op ?? '').slice(0, 10);
  return {
    slug: String(r.slug),
    titel: String(r.titel ?? ''),
    beschrijving: String(r.beschrijving ?? ''),
    gepubliceerd,
    bijgewerkt: bijgewerkt < gepubliceerd ? gepubliceerd : bijgewerkt,
    leestijd: leestijd(inhoud),
    categorie: String(r.categorie ?? ''),
    inhoud,
    afbeelding: naarAfbeelding(r.afbeelding),
  };
}

const uitCode = (): Post[] =>
  BLOG_POSTS.map(p => ({ ...p, afbeelding: null })).sort((a, b) => b.gepubliceerd.localeCompare(a.gepubliceerd));

export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    const { data, error } = await client()
      .from('blog_posts').select(KOLOMMEN)
      .eq('status', 'gepubliceerd')
      .order('gepubliceerd_op', { ascending: false });
    if (error || !data) return uitCode();
    return data.map(naarPost);
  } catch {
    return uitCode();
  }
});

/** Artikel op slug, of het nieuwe adres als dit een oud adres is. */
export const getPost = cache(async (slug: string): Promise<{ post?: Post; nieuweSlug?: string }> => {
  if (!SLUG.test(slug)) return {};
  try {
    const supabase = client();
    const { data, error } = await supabase
      .from('blog_posts').select(KOLOMMEN)
      .eq('status', 'gepubliceerd').eq('slug', slug).maybeSingle();
    if (error) throw error;
    if (data) return { post: naarPost(data) };
    const { data: oud } = await supabase
      .from('blog_posts').select('slug')
      .eq('status', 'gepubliceerd').contains('oude_slugs', [slug]).limit(1);
    return oud?.[0]?.slug ? { nieuweSlug: String(oud[0].slug) } : {};
  } catch {
    const p = uitCode().find(x => x.slug === slug);
    return p ? { post: p } : {};
  }
});

export function datumNL(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}
