import { createClient } from '@supabase/supabase-js';

export type Motor = {
  id: string;
  merk: string;
  model: string;
  bouwjaar: number;
  km: number;
  prijs: number;
  type: string | null;
  vermogen: string | null;
  kleur: string | null;
  beschrijving: string | null;
  kenteken: string;
  fotos: string[];
  status: string;
  datum_in: string | null;
  created_at: string;
};

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

export function formatPrijs(prijs: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(prijs);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('nl-NL').format(km) + ' km';
}

export function isNieuwBinnen(datum_in: string | null): boolean {
  if (!datum_in) return false;
  const days = (Date.now() - new Date(datum_in).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 14;
}

function normalize(row: Record<string, unknown>): Motor {
  return {
    id: row.id as string,
    merk: row.merk as string,
    model: (row.model as string) ?? '',
    bouwjaar: (row.bouwjaar as number) ?? 0,
    km: (row.km as number) ?? 0,
    prijs: (row.prijs as number) ?? 0,
    type: (row.type as string | null) ?? null,
    vermogen: (row.vermogen as string | null) ?? null,
    kleur: (row.kleur as string | null) ?? null,
    beschrijving: (row.beschrijving as string | null) ?? null,
    kenteken: (row.kenteken as string) ?? '',
    fotos: Array.isArray(row.fotos) ? (row.fotos as string[]) : [],
    status: (row.status as string) ?? 'beschikbaar',
    datum_in: (row.datum_in as string | null) ?? null,
    created_at: (row.created_at as string) ?? '',
  };
}

export async function getMotors(filters?: {
  merk?: string;
  type?: string;
  maxPrijs?: number;
  maxKm?: number;
}): Promise<Motor[]> {
  const client = getClient();
  let query = client
    .from('voorraad')
    .select('*')
    .in('status', ['beschikbaar', 'gereserveerd'])
    .order('datum_in', { ascending: false });

  if (filters?.merk) query = query.ilike('merk', filters.merk);
  if (filters?.type) query = query.ilike('type', filters.type);
  if (filters?.maxPrijs) query = query.lte('prijs', filters.maxPrijs);
  if (filters?.maxKm) query = query.lte('km', filters.maxKm);

  const { data } = await query;
  return (data ?? []).map(normalize);
}

export async function getMotorById(id: string): Promise<Motor | null> {
  const client = getClient();
  const { data } = await client
    .from('voorraad')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return data ? normalize(data) : null;
}

// Alias so existing imports still work
export const getMotorBySlug = getMotorById;

export async function getNieuweMotors(limit = 4): Promise<Motor[]> {
  const client = getClient();
  const { data } = await client
    .from('voorraad')
    .select('*')
    .in('status', ['beschikbaar', 'gereserveerd'])
    .order('datum_in', { ascending: false })
    .limit(limit);
  return (data ?? []).map(normalize);
}
