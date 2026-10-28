'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { BEDRIJF, whatsappUrl } from '@/lib/site';
import { isDateGesloten, type Instellingen } from '@/lib/instellingen';

export const supabase = createClient();

export function vandaagISO() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Amsterdam' });
}

export function checkTelefoon(v: string): string | null {
  const s = v.replace(/[\s\-().]/g, '');
  if (!s) return 'Vul je telefoonnummer in, zodat we je kunnen terugbellen.';
  if (!/^(\+|00)?[0-9]{10,13}$/.test(s)) return 'Dit nummer klopt niet. Vul het in zoals 06 12345678.';
  return null;
}

export function checkVerplicht(v: string, wat: string): string | null {
  return v.trim() ? null : `Vul ${wat} in.`;
}

export function checkEmail(v: string): string | null {
  if (!v.trim()) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'Dit e-mailadres klopt niet.';
}

export function Field({
  id, label, error, hint, optional, children,
}: {
  id: string;
  label: string;
  error?: string | null;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-muted">(optioneel)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-fout`} className="field-error" role="alert">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

export function fieldProps(id: string, error?: string | null, hint?: string) {
  return {
    id,
    name: id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-fout` : hint ? `${id}-hint` : undefined,
    className: 'field',
  } as const;
}

export function useDatumCheck(instellingen?: Instellingen) {
  const [drukke, setDrukke] = useState<Record<string, number>>({});

  useEffect(() => {
    const start = vandaagISO();
    const eind = new Date(Date.now() + 120 * 86_400_000).toISOString().slice(0, 10);
    supabase.rpc('get_drukke_datums', { start_datum: start, eind_datum: eind }).then(({ data }) => {
      if (!Array.isArray(data)) return;
      setDrukke(Object.fromEntries(data.map((r: { datum: string; aantal: number }) => [r.datum, Number(r.aantal)])));
    });
  }, []);

  return (datum: string): string | null => {
    if (!datum) return null;
    if (datum < vandaagISO()) return 'Kies een datum vanaf vandaag.';
    if (instellingen) {
      const gesloten = isDateGesloten(datum, instellingen);
      if (gesloten) return gesloten;
    }
    const max = instellingen?.max_afspraken_per_dag ?? 5;
    if ((drukke[datum] ?? 0) >= max) return 'Deze dag is volgeboekt. Kies een andere dag of bel ons.';
    return null;
  };
}

export function Bedankt({ titel, tekst }: { titel: string; tekst: string }) {
  return (
    <div className="border-l-4 border-success bg-white p-6" role="status" aria-live="polite">
      <CheckCircle2 className="text-success" size={32} aria-hidden />
      <p className="mt-3 font-display text-2xl font-extrabold uppercase">{titel}</p>
      <p className="mt-2 text-muted">{tekst}</p>
      <p className="mt-4 text-sm text-muted">
        Haast? Bel <a className="font-semibold text-ink underline" href={`tel:${BEDRIJF.telefoon.e164}`}>{BEDRIJF.telefoon.label}</a> of
        stuur een <a className="font-semibold text-ink underline" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
      </p>
    </div>
  );
}

export function Foutmelding() {
  return (
    <p className="border-l-4 border-error bg-white p-4 text-sm" role="alert">
      Versturen lukte niet. Probeer het opnieuw of bel ons op{' '}
      <a href={`tel:${BEDRIJF.telefoon.e164}`} className="font-semibold underline">{BEDRIJF.telefoon.label}</a>.
    </p>
  );
}

export function LieverDirect({ tekst }: { tekst?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
      <span>{tekst ?? 'Liever direct contact?'}</span>
      <a href={`tel:${BEDRIJF.telefoon.e164}`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
        <Phone size={16} aria-hidden /> {BEDRIJF.telefoon.label}
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline">
        <MessageCircle size={16} aria-hidden /> WhatsApp
      </a>
    </div>
  );
}

export function focusEersteFout(form: HTMLFormElement | null) {
  requestAnimationFrame(() => form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
}
