import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export type Product = {
  id: string;
  naam: string;
  omschrijving: string | null;
  prijs: number | null;
  fotos: string[];
  categorie: 'onderdelen' | 'accessoires';
};

export function formatProductPrijs(prijs: number | null): string {
  if (!prijs) return 'Prijs op aanvraag';
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prijs);
}

export async function getProducten(categorie?: 'onderdelen' | 'accessoires'): Promise<Product[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    let query = supabase
      .from('producten')
      .select('id, naam, omschrijving, prijs, fotos, categorie')
      .eq('actief', true)
      .is('verkocht_op', null)
      .order('created_at', { ascending: false });
    if (categorie) query = query.eq('categorie', categorie);
    const { data } = await query;
    return (data ?? []).map(p => ({ ...p, fotos: Array.isArray(p.fotos) ? p.fotos : [] }));
  } catch {
    return [];
  }
}
