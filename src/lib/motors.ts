import { supabase, Motor } from './supabase';
export type { Motor };

export async function getMotors(filters?: {
  merk?: string;
  type?: string;
  maxPrijs?: number;
  maxKm?: number;
}): Promise<Motor[]> {
  let query = supabase
    .from('motors')
    .select('*')
    .eq('status', 'beschikbaar')
    .order('created_at', { ascending: false });

  if (filters?.merk) query = query.eq('merk', filters.merk);
  if (filters?.type) query = query.eq('type', filters.type);
  if (filters?.maxPrijs) query = query.lte('prijs', filters.maxPrijs);
  if (filters?.maxKm) query = query.lte('km', filters.maxKm);

  const { data, error } = await query;
  if (error) return mockMotors;
  return data || mockMotors;
}

export async function getMotorBySlug(slug: string): Promise<Motor | null> {
  const { data, error } = await supabase
    .from('motors')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return mockMotors.find(m => m.slug === slug) || null;
  return data;
}

export async function getNieuweMotors(limit = 4): Promise<Motor[]> {
  const { data, error } = await supabase
    .from('motors')
    .select('*')
    .eq('status', 'beschikbaar')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return mockMotors.slice(0, limit);
  return data || mockMotors.slice(0, limit);
}

export function isNieuwBinnen(createdAt: string): boolean {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < 14 * 24 * 60 * 60 * 1000;
}

export function formatPrijs(prijs: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prijs);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('nl-NL').format(km) + ' km';
}

// Mock data for when Supabase is not configured
export const mockMotors: Motor[] = [
  {
    id: '1',
    slug: 'honda-cb500f-2021',
    merk: 'Honda',
    model: 'CB500F',
    bouwjaar: 2021,
    km: 8200,
    prijs: 5950,
    type: 'Naked',
    kleur: 'Mat Gunpowder Black',
    vermogen: '35 kW (A2)',
    kenteken: 'XX-123-Y',
    beschrijving: 'Mooie Honda CB500F in topstaat. Rijdt uitstekend, geen schade. Inclusief originele sleutels en boekjes. A2-rijbewijs geschikt.',
    fotos: [],
    status: 'beschikbaar',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    slug: 'kawasaki-z650-2020',
    merk: 'Kawasaki',
    model: 'Z650',
    bouwjaar: 2020,
    km: 14500,
    prijs: 6750,
    type: 'Naked',
    kleur: 'Candy Lime Green',
    vermogen: '50 kW',
    beschrijving: 'Kawasaki Z650 in uitstekende staat. Regelmatig onderhouden, alle stempels aanwezig.',
    fotos: [],
    status: 'beschikbaar',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    slug: 'yamaha-mt07-2019',
    merk: 'Yamaha',
    model: 'MT-07',
    bouwjaar: 2019,
    km: 21000,
    prijs: 7250,
    type: 'Naked',
    kleur: 'Tech Black',
    vermogen: '55 kW',
    beschrijving: 'Yamaha MT-07 — de favoriet van velen. Krachtig, betrouwbaar en geweldig rijdend. Geen schade, netjes onderhouden.',
    fotos: [],
    status: 'beschikbaar',
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    slug: 'bmw-f800r-2018',
    merk: 'BMW',
    model: 'F800R',
    bouwjaar: 2018,
    km: 28000,
    prijs: 7900,
    type: 'Naked',
    kleur: 'Alpine White',
    vermogen: '61 kW',
    beschrijving: 'BMW F800R in nette staat. BMW-servicehistorie aanwezig. Comfortabele motor voor zowel stad als snelweg.',
    fotos: [],
    status: 'beschikbaar',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
