import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
    _client = createClient(url, key);
  }
  return _client;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Motor = {
  id: string;
  slug: string;
  merk: string;
  model: string;
  bouwjaar: number;
  km: number;
  prijs: number;
  type: string;
  kleur: string;
  vermogen: string;
  kenteken?: string;
  beschrijving: string;
  fotos: string[];
  status: 'beschikbaar' | 'verkocht' | 'gereserveerd';
  created_at: string;
};

export type ProefritAanvraag = {
  naam: string;
  telefoon: string;
  motor_id?: string;
  motor_naam?: string;
  bericht?: string;
};

export type InkoopLead = {
  naam: string;
  telefoon: string;
  motor: string;
  km: string;
  bericht?: string;
};
