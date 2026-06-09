// Re-export helpers for convenience
export { createClient as createServerClient } from '@/utils/supabase/server';
export { createClient as createBrowserClient } from '@/utils/supabase/client';

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
