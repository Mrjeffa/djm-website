'use client';

import { useRef, useState } from 'react';
import type { DienstGroep, Instellingen } from '@/lib/instellingen';
import {
  Bedankt, Field, Foutmelding, LieverDirect, checkTelefoon, checkVerplicht,
  fieldProps, focusEersteFout, supabase, useDatumCheck, vandaagISO,
} from './shared';

type Veld = 'naam' | 'telefoon' | 'soort' | 'datum';

const STANDAARD: DienstGroep[] = [
  { label: 'Onderhoud', items: [{ naam: 'Kleine beurt', duur: 2 }, { naam: 'Grote beurt', duur: 3 }] },
  { label: 'Banden en aandrijving', items: [{ naam: 'Banden vervangen', duur: 1 }, { naam: 'Ketting en tandwielen vervangen', duur: 2 }] },
  { label: 'Overig', items: [{ naam: 'Reparatie of storing', duur: 1 }, { naam: 'Anders', duur: 1 }] },
];

export default function WerkplaatsForm({ instellingen, voorkeur, extra = [] }: { instellingen?: Instellingen; voorkeur?: string; extra?: DienstGroep[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const checkDatum = useDatumCheck(instellingen);
  const groepen = [...extra, ...(instellingen?.diensten.length ? instellingen.diensten : STANDAARD)];
  const [form, setForm] = useState({ naam: '', telefoon: '', soort: voorkeur ?? '', motor: '', datum: '', toelichting: '' });
  const [fouten, setFouten] = useState<Partial<Record<Veld, string | null>>>({});
  const [status, setStatus] = useState<'idle' | 'bezig' | 'ok' | 'fout'>('idle');

  const regels: Record<Veld, (v: string) => string | null> = {
    naam: v => checkVerplicht(v, 'je naam'),
    telefoon: checkTelefoon,
    soort: v => (v ? null : 'Kies wat er moet gebeuren. Weet je het niet, kies dan "Anders".'),
    datum: checkDatum,
  };
  const valideer = (veld: Veld) => setFouten(f => ({ ...f, [veld]: regels[veld](form[veld]) }));
  const zet = (veld: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [veld]: v }));
    if (fouten[veld as Veld]) setFouten(f => ({ ...f, [veld]: regels[veld as Veld](v) }));
  };

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    const nieuw = Object.fromEntries((Object.keys(regels) as Veld[]).map(v => [v, regels[v](form[v])]));
    setFouten(nieuw);
    if (Object.values(nieuw).some(Boolean)) return focusEersteFout(formRef.current);
    setStatus('bezig');
    const opmerking = [
      form.motor.trim() && `Motor/kenteken: ${form.motor.trim()}`,
      form.toelichting.trim() && `Toelichting: ${form.toelichting.trim()}`,
      !form.datum && 'Geen voorkeursdatum opgegeven',
    ].filter(Boolean).join('\n');
    const { error } = await supabase.rpc('maak_afspraak', {
      p_naam: form.naam.trim(),
      p_telefoon: form.telefoon.trim(),
      p_email: null,
      p_datum: form.datum || vandaagISO(),
      p_type: 'service',
      p_soort: form.soort,
      p_voorraad_motor_id: null,
      p_opmerking: opmerking || null,
    });
    setStatus(error ? 'fout' : 'ok');
  }

  if (status === 'ok') {
    return (
      <Bedankt
        titel={`Bedankt, ${form.naam.trim().split(' ')[0]}`}
        tekst={`We hebben je aanvraag voor "${form.soort}" ontvangen en bellen je op ${form.telefoon} om de afspraak te bevestigen.`}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={verstuur} noValidate className="space-y-5">
      <Field id="wp-soort" label="Wat moet er gebeuren?" error={fouten.soort}>
        <select {...fieldProps('wp-soort', fouten.soort)} value={form.soort}
          onChange={e => zet('soort', e.target.value)} onBlur={() => valideer('soort')}>
          <option value="">Kies een werkzaamheid</option>
          {groepen.map(g => (
            <optgroup key={g.label} label={g.label}>
              {g.items.map(i => <option key={i.naam} value={i.naam}>{i.naam}</option>)}
            </optgroup>
          ))}
        </select>
      </Field>
      <Field id="wp-motor" label="Merk, model en kenteken" optional>
        <input {...fieldProps('wp-motor')} placeholder="Bijv. Yamaha MT-07, MZ-123-X" value={form.motor}
          onChange={e => zet('motor', e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="wp-naam" label="Naam" error={fouten.naam}>
          <input {...fieldProps('wp-naam', fouten.naam)} autoComplete="name" value={form.naam}
            onChange={e => zet('naam', e.target.value)} onBlur={() => valideer('naam')} />
        </Field>
        <Field id="wp-telefoon" label="Telefoonnummer" error={fouten.telefoon}>
          <input {...fieldProps('wp-telefoon', fouten.telefoon)} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12345678"
            value={form.telefoon} onChange={e => zet('telefoon', e.target.value)} onBlur={() => valideer('telefoon')} />
        </Field>
      </div>
      <Field id="wp-datum" label="Voorkeursdag" optional error={fouten.datum}>
        <input {...fieldProps('wp-datum', fouten.datum)} type="date" min={vandaagISO()} value={form.datum}
          onChange={e => { zet('datum', e.target.value); setFouten(f => ({ ...f, datum: checkDatum(e.target.value) })); }} />
      </Field>
      <Field id="wp-toelichting" label="Toelichting" optional>
        <textarea {...fieldProps('wp-toelichting')} rows={3} className="field resize-y"
          placeholder="Bijv. tikkend geluid bij koude start" value={form.toelichting}
          onChange={e => zet('toelichting', e.target.value)} />
      </Field>

      {status === 'fout' && <Foutmelding />}
      <button type="submit" className="btn btn-primary w-full" disabled={status === 'bezig'}>
        {status === 'bezig' ? 'Bezig met versturen' : 'Vraag afspraak aan'}
      </button>
      <LieverDirect />
    </form>
  );
}
