'use client';

import { useRef, useState } from 'react';
import type { Instellingen } from '@/lib/instellingen';
import {
  Bedankt, Field, Foutmelding, LieverDirect, checkTelefoon, checkVerplicht,
  fieldProps, focusEersteFout, supabase, useDatumCheck, vandaagISO,
} from './shared';

type MotorOptie = { id: string; naam: string; bouwjaar: number };
type Veld = 'naam' | 'telefoon' | 'datum';

export default function ProefritForm({
  motorId, motorNaam, motoren = [], instellingen,
}: {
  motorId?: string;
  motorNaam?: string;
  motoren?: MotorOptie[];
  instellingen?: Instellingen;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const checkDatum = useDatumCheck(instellingen);
  const [form, setForm] = useState({ naam: '', telefoon: '', datum: '', motor: motorId ?? '' });
  const [fouten, setFouten] = useState<Partial<Record<Veld, string | null>>>({});
  const [status, setStatus] = useState<'idle' | 'bezig' | 'ok' | 'fout'>('idle');

  const gekozen = motoren.find(m => m.id === form.motor);
  const naamMotor = gekozen ? `${gekozen.naam} (${gekozen.bouwjaar})` : motorNaam ?? '';

  const regels: Record<Veld, (v: string) => string | null> = {
    naam: v => checkVerplicht(v, 'je naam'),
    telefoon: checkTelefoon,
    datum: checkDatum,
  };
  const valideer = (veld: Veld) => setFouten(f => ({ ...f, [veld]: regels[veld](form[veld]) }));
  const zet = (veld: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [veld]: v }));
    if (veld in fouten && fouten[veld as Veld]) setFouten(f => ({ ...f, [veld]: regels[veld as Veld](v) }));
  };

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    const nieuw = Object.fromEntries((Object.keys(regels) as Veld[]).map(v => [v, regels[v](form[v])]));
    setFouten(nieuw);
    if (Object.values(nieuw).some(Boolean)) return focusEersteFout(formRef.current);
    setStatus('bezig');
    const { error } = await supabase.rpc('maak_afspraak', {
      p_naam: form.naam.trim(),
      p_telefoon: form.telefoon.trim(),
      p_email: null,
      p_datum: form.datum || vandaagISO(),
      p_type: 'proefrit',
      p_soort: naamMotor ? `Proefrit: ${naamMotor}` : 'Proefrit',
      p_voorraad_motor_id: form.motor || null,
      p_opmerking: form.datum ? null : 'Geen voorkeursdatum opgegeven',
    });
    setStatus(error ? 'fout' : 'ok');
  }

  if (status === 'ok') {
    return (
      <Bedankt
        titel={`Bedankt, ${form.naam.trim().split(' ')[0]}`}
        tekst={`We bellen je op ${form.telefoon} om de proefrit${naamMotor ? ` met de ${naamMotor}` : ''} in te plannen.`}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={verstuur} noValidate className="space-y-5">
      {motoren.length > 0 ? (
        <Field id="pr-motor" label="Welke motor wil je rijden?" optional>
          <select id="pr-motor" name="motor" className="field" value={form.motor} onChange={e => zet('motor', e.target.value)}>
            <option value="">Weet ik nog niet</option>
            {motoren.map(m => <option key={m.id} value={m.id}>{m.naam} ({m.bouwjaar})</option>)}
          </select>
        </Field>
      ) : naamMotor ? (
        <p className="bg-surface-2 px-4 py-3 text-sm">Proefrit met de <strong>{naamMotor}</strong></p>
      ) : null}

      <Field id="pr-naam" label="Naam" error={fouten.naam}>
        <input {...fieldProps('pr-naam', fouten.naam)} autoComplete="name" value={form.naam}
          onChange={e => zet('naam', e.target.value)} onBlur={() => valideer('naam')} />
      </Field>
      <Field id="pr-telefoon" label="Telefoonnummer" error={fouten.telefoon} hint="We bellen je om een moment af te spreken.">
        <input {...fieldProps('pr-telefoon', fouten.telefoon, 'hint')} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12345678"
          value={form.telefoon} onChange={e => zet('telefoon', e.target.value)} onBlur={() => valideer('telefoon')} />
      </Field>
      <Field id="pr-datum" label="Voorkeursdag" optional error={fouten.datum}>
        <input {...fieldProps('pr-datum', fouten.datum)} type="date" min={vandaagISO()} value={form.datum}
          onChange={e => { zet('datum', e.target.value); setFouten(f => ({ ...f, datum: checkDatum(e.target.value) })); }} />
      </Field>

      {status === 'fout' && <Foutmelding />}
      <button type="submit" className="btn btn-primary w-full" disabled={status === 'bezig'}>
        {status === 'bezig' ? 'Bezig met versturen' : 'Vraag proefrit aan'}
      </button>
      <LieverDirect />
    </form>
  );
}
