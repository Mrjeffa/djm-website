import { createClient } from '@supabase/supabase-js';

export type ProductCategorie = 'onderdelen' | 'accessoires';

export type Product = {
  id: string;
  naam: string;
  omschrijving: string | null;
  prijs: number | null;
  fotos: string[];
  categorie: ProductCategorie;
};

export function formatProductPrijs(prijs: number | null): string {
  if (!prijs) return 'Prijs op aanvraag';
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prijs);
}

export async function getProducten(categorie?: ProductCategorie): Promise<Product[]> {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
  let query = supabase
    .from('producten')
    .select('id, naam, omschrijving, prijs, fotos, categorie')
    .eq('actief', true)
    .is('verkocht_op', null)
    .order('created_at', { ascending: false });
  if (categorie) query = query.eq('categorie', categorie);
  const { data } = await query;
  return (data ?? []).map(p => ({
    ...p,
    categorie: p.categorie === 'accessoires' ? 'accessoires' : 'onderdelen',
    fotos: Array.isArray(p.fotos) ? p.fotos.filter((f: unknown): f is string => typeof f === 'string') : [],
  }));
}
