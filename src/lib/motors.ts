import { createClient } from '@supabase/supabase-js';

export type Motor = {
  id: string;
  slug: string;
  merk: string;
  model: string;
  naam: string;
  bouwjaar: number;
  km: number;
  kmEenheid: 'km' | 'mijl';
  prijs: number;
  categorie: string | null;
  vermogen: string | null;
  kleur: string | null;
  uitvoering: string | null;
  uitrusting: string[];
  beschrijving: string | null;
  fotos: string[];
  status: 'beschikbaar' | 'gereserveerd';
  datumIn: string | null;
  createdAt: string;
};

export type Sortering = 'nieuw' | 'prijs-op' | 'prijs-af' | 'km';

export type MotorFilters = {
  merk?: string;
  categorie?: string;
  maxPrijs?: number;
  maxKm?: number;
  sort?: Sortering;
};

const ZICHTBAAR = ['beschikbaar', 'gereserveerd'];
const UUID_RE = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
const MERK_SCHRIJFWIJZE: Record<string, string> = {
  bmw: 'BMW', ktm: 'KTM', 'mv agusta': 'MV Agusta', cfmoto: 'CFMOTO', 'harley-davidson': 'Harley-Davidson',
};

function client() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
}

export function merkNaam(merk: string): string {
  const key = merk.trim().toLowerCase();
  return MERK_SCHRIJFWIJZE[key] ?? key.replace(/(^|[\s-])\p{L}/gu, s => s.toUpperCase());
}

function slugify(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function motorPad(m: Pick<Motor, 'slug'>): string {
  return `/occasions/${m.slug}`;
}

function normalize(row: Record<string, unknown>): Motor {
  const merk = merkNaam(String(row.merk ?? ''));
  const model = String(row.model ?? '').trim();
  const bouwjaar = Number(row.bouwjaar ?? 0);
  const id = String(row.id);
  return {
    id,
    slug: `${slugify(`${merk} ${model} ${bouwjaar || ''}`)}-${id}`,
    merk,
    model,
    naam: `${merk} ${model}`.trim(),
    bouwjaar,
    km: Number(row.km ?? 0),
    kmEenheid: row.km_eenheid === 'mijl' ? 'mijl' : 'km',
    prijs: Number(row.prijs ?? 0),
    categorie: (row.carrosserietype as string | null) ?? (row.type as string | null) ?? null,
    vermogen: (row.vermogen as string | null) || null,
    kleur: (row.kleur as string | null) || null,
    uitvoering: (row.uitvoering as string | null) || null,
    uitrusting: Array.isArray(row.uitrusting) ? (row.uitrusting as string[]).filter(Boolean) : [],
    beschrijving: (row.beschrijving as string | null) || null,
    fotos: Array.isArray(row.fotos) ? (row.fotos as unknown[]).filter((f): f is string => typeof f === 'string') : [],
    status: row.status === 'gereserveerd' ? 'gereserveerd' : 'beschikbaar',
    datumIn: (row.datum_in as string | null) ?? null,
    createdAt: String(row.created_at ?? ''),
  };
}

const KOLOMMEN = 'id, merk, model, bouwjaar, km, km_eenheid, prijs, type, carrosserietype, vermogen, kleur, uitvoering, uitrusting, beschrijving, fotos, status, datum_in, created_at';

export async function getMotors(filters: MotorFilters = {}): Promise<Motor[]> {
  let query = client().from('voorraad').select(KOLOMMEN).in('status', ZICHTBAAR);
  if (filters.merk) query = query.ilike('merk', filters.merk);
  if (filters.categorie) query = query.or(`carrosserietype.eq.${JSON.stringify(filters.categorie)},type.eq.${JSON.stringify(filters.categorie)}`);
  if (filters.maxPrijs) query = query.lte('prijs', filters.maxPrijs);
  if (filters.maxKm) query = query.lte('km', filters.maxKm);

  switch (filters.sort) {
    case 'prijs-op': query = query.order('prijs', { ascending: true }); break;
    case 'prijs-af': query = query.order('prijs', { ascending: false }); break;
    case 'km': query = query.order('km', { ascending: true }); break;
    default: query = query.order('datum_in', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false });
  }

  const { data } = await query;
  return (data ?? []).map(normalize);
}

export async function getMotorBySlug(slug: string): Promise<Motor | null> {
  const id = slug.match(UUID_RE)?.[1];
  if (!id) return null;
  const { data } = await client().from('voorraad').select(KOLOMMEN).eq('id', id).in('status', ZICHTBAAR).maybeSingle();
  return data ? normalize(data) : null;
}

export async function getMotorById(id: string): Promise<Motor | null> {
  return UUID_RE.test(id) ? getMotorBySlug(id) : null;
}

export function formatPrijs(prijs: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prijs);
}

export function formatKm(km: number, eenheid: 'km' | 'mijl' = 'km'): string {
  return `${new Intl.NumberFormat('nl-NL').format(km)} ${eenheid === 'mijl' ? 'mijl' : 'km'}`;
}

export function isNieuwBinnen(datumIn: string | null): boolean {
  if (!datumIn) return false;
  return (Date.now() - new Date(datumIn).getTime()) / 86_400_000 <= 14;
}
