import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { type Instellingen, INSTELLINGEN_FALLBACK } from './instellingen';

export async function getInstellingen(): Promise<Instellingen> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase
      .from('instellingen')
      .select('openingstijden, gesloten_dagen, gesloten_weken, max_afspraken_per_dag, opmerking')
      .eq('id', 1)
      .single();
    if (!data) return INSTELLINGEN_FALLBACK;
    return {
      openingstijden: data.openingstijden ?? INSTELLINGEN_FALLBACK.openingstijden,
      gesloten_dagen: data.gesloten_dagen ?? [],
      gesloten_weken: data.gesloten_weken ?? [],
      max_afspraken_per_dag: data.max_afspraken_per_dag ?? 5,
      opmerking: data.opmerking ?? '',
    };
  } catch {
    return INSTELLINGEN_FALLBACK;
  }
}
