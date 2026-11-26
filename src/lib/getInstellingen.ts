import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { INSTELLINGEN_FALLBACK, type DienstGroep, type Instellingen } from './instellingen';

function toTarieven(raw: unknown): Record<string, number> {
  if (!raw || typeof raw !== 'object') return {};
  return Object.fromEntries(
    Object.entries(raw as Record<string, unknown>)
      .map(([k, v]) => [k, Number(v)] as const)
      .filter(([, v]) => Number.isFinite(v)),
  );
}

function toDiensten(raw: unknown): DienstGroep[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(g => g && typeof g.label === 'string' && Array.isArray(g.items))
    .map(g => ({
      label: g.label,
      items: g.items
        .filter((i: { naam?: unknown }) => typeof i?.naam === 'string')
        .map((i: { naam: string; duur?: unknown }) => ({ naam: i.naam, duur: Number(i.duur) || 1 })),
    }));
}

export const getInstellingen = cache(async (): Promise<Instellingen> => {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
    const { data } = await supabase
      .from('instellingen')
      .select('openingstijden, gesloten_dagen, gesloten_weken, max_afspraken_per_dag, opmerking, diensten_tarieven, afspraak_soorten')
      .eq('id', 1)
      .single();
    if (!data) return INSTELLINGEN_FALLBACK;
    return {
      openingstijden: data.openingstijden ?? INSTELLINGEN_FALLBACK.openingstijden,
      gesloten_dagen: data.gesloten_dagen ?? [],
      gesloten_weken: data.gesloten_weken ?? [],
      max_afspraken_per_dag: data.max_afspraken_per_dag ?? 5,
      opmerking: data.opmerking ?? '',
      tarieven: toTarieven(data.diensten_tarieven),
      diensten: toDiensten(data.afspraak_soorten),
    };
  } catch {
    return INSTELLINGEN_FALLBACK;
  }
});
