'use client';

import { useRef, useState } from 'react';
import {
  Bedankt, Field, Foutmelding, LieverDirect, checkEmail, checkTelefoon, checkVerplicht,
  fieldProps, focusEersteFout, supabase, vandaagISO,
} from './shared';

type Veld = 'pakket' | 'merk' | 'naam' | 'telefoon' | 'email';

const STANDAARD = ['Winterstalling', 'Winterstalling met poetsbeurt', 'Winterstalling met kleine beurt', 'Winterstalling met grote beurt'];

// Zelfde namen als op de stallingslijst in de DJM-app ("Alleen stalling", "Met poetsbeurt", ...)
const pakketVoorLijst = (naam: string) =>
  naam.trim().replace(/^winterstalling$/i, 'Alleen stalling').replace(/^winterstalling met /i, 'Met ');

// Winter waarvoor de aanvraag geldt: januari t/m maart de lopende, vanaf april de komende
function seizoen() {
  const [j, m] = vandaagISO().split('-').map(Number);
  const s = m < 4 ? j - 1 : j;
  return `${s}/${s + 1}`;
}

export default function WinterstallingForm({ pakketten = [] }: { pakketten?: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const opties = pakketten.length ? pakketten : STANDAARD;
  const [form, setForm] = useState({
    pakket: opties[0] ?? '', merk: '', model: '', kenteken: '', naam: '', telefoon: '', email: '', brengen: '', toelichting: '',
  });
  const [fouten, setFouten] = useState<Partial<Record<Veld, string | null>>>({});
  const [status, setStatus] = useState<'idle' | 'bezig' | 'ok' | 'fout'>('idle');
  const [melding, setMelding] = useState<string | null>(null);

  const regels: Record<Veld, (v: string) => string | null> = {
    pakket: v => (v ? null : 'Kies een pakket.'),
    merk: v => checkVerplicht(v, 'het merk van je motor'),
    naam: v => checkVerplicht(v, 'je naam'),
    telefoon: checkTelefoon,
    email: checkEmail,
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
    setMelding(null);
    const wensen = [
      form.brengen.trim() && `Wil de motor brengen: ${form.brengen.trim()}`,
      form.toelichting.trim(),
    ].filter(Boolean).join('\n');
    const { data, error } = await supabase.rpc('vraag_winterstalling_aan', {
      p_naam: form.naam.trim(),
      p_telefoon: form.telefoon.trim(),
      p_email: form.email.trim() || null,
      p_merk: form.merk.trim(),
      p_model: form.model.trim() || null,
      p_kenteken: form.kenteken.trim() || null,
      p_pakket: pakketVoorLijst(form.pakket),
      p_opmerking: wensen || null,
    });
    if (error || !data?.success) {
      setMelding(data?.fout ?? null);
      setStatus('fout');
      return;
    }
    setStatus('ok');
  }

  if (status === 'ok') {
    const motor = [form.merk.trim(), form.model.trim()].filter(Boolean).join(' ');
    return (
      <Bedankt
        titel={`Bedankt, ${form.naam.trim().split(' ')[0]}`}
        tekst={`We hebben je aanvraag voor winterstalling ${seizoen()} van je ${motor} ontvangen. We bellen je op ${form.telefoon} om de reservering te bevestigen en een brengdatum af te spreken.`}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={verstuur} noValidate className="space-y-5">
      <Field id="ws-pakket" label="Pakket" error={fouten.pakket}>
        <select {...fieldProps('ws-pakket', fouten.pakket)} value={form.pakket}
          onChange={e => zet('pakket', e.target.value)} onBlur={() => valideer('pakket')}>
          {opties.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="ws-merk" label="Merk" error={fouten.merk}>
          <input {...fieldProps('ws-merk', fouten.merk)} placeholder="Bijv. Honda" value={form.merk}
            onChange={e => zet('merk', e.target.value)} onBlur={() => valideer('merk')} />
        </Field>
        <Field id="ws-model" label="Model" optional>
          <input {...fieldProps('ws-model')} placeholder="Bijv. CB500F" value={form.model}
            onChange={e => zet('model', e.target.value)} />
        </Field>
        <Field id="ws-kenteken" label="Kenteken" optional>
          <input {...fieldProps('ws-kenteken')} placeholder="Bijv. MZ-123-X" autoCapitalize="characters" value={form.kenteken}
            onChange={e => zet('kenteken', e.target.value.toUpperCase())} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ws-naam" label="Naam" error={fouten.naam}>
          <input {...fieldProps('ws-naam', fouten.naam)} autoComplete="name" value={form.naam}
            onChange={e => zet('naam', e.target.value)} onBlur={() => valideer('naam')} />
        </Field>
        <Field id="ws-telefoon" label="Telefoonnummer" error={fouten.telefoon}>
          <input {...fieldProps('ws-telefoon', fouten.telefoon)} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12345678"
            value={form.telefoon} onChange={e => zet('telefoon', e.target.value)} onBlur={() => valideer('telefoon')} />
        </Field>
      </div>
      <Field id="ws-email" label="E-mailadres" optional error={fouten.email}>
        <input {...fieldProps('ws-email', fouten.email)} type="email" inputMode="email" autoComplete="email" value={form.email}
          onChange={e => zet('email', e.target.value)} onBlur={() => valideer('email')} />
      </Field>
      <Field id="ws-brengen" label="Wanneer wil je de motor brengen?" optional>
        <input {...fieldProps('ws-brengen')} placeholder="Bijv. half oktober" value={form.brengen}
          onChange={e => zet('brengen', e.target.value)} />
      </Field>
      <Field id="ws-toelichting" label="Wensen of opmerkingen" optional>
        <textarea {...fieldProps('ws-toelichting')} rows={3} className="field resize-y"
          placeholder="Bijv. graag ook de voorband vervangen" value={form.toelichting}
          onChange={e => zet('toelichting', e.target.value)} />
      </Field>

      {status === 'fout' && (melding
        ? <p className="border-l-4 border-error bg-white p-4 text-sm" role="alert">{melding}</p>
        : <Foutmelding />)}
      <button type="submit" className="btn btn-primary w-full" disabled={status === 'bezig'}>
        {status === 'bezig' ? 'Bezig met versturen' : `Vraag winterstalling ${seizoen()} aan`}
      </button>
      <LieverDirect />
    </form>
  );
}
