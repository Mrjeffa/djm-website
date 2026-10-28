'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Mail, MessageCircle } from 'lucide-react';
import { BEDRIJF, whatsappUrl } from '@/lib/site';
import {
  Bedankt, Field, Foutmelding, LieverDirect, checkTelefoon, checkVerplicht,
  fieldProps, focusEersteFout, supabase,
} from './shared';

type Veld = 'merk' | 'model' | 'bouwjaar' | 'km' | 'naam' | 'telefoon';
const STAP1: Veld[] = ['merk', 'model', 'bouwjaar', 'km'];
const STAP2: Veld[] = ['naam', 'telefoon'];
const DIT_JAAR = new Date().getFullYear();

export default function InkoopForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [stap, setStap] = useState<1 | 2>(1);
  const [form, setForm] = useState<Record<Veld, string>>({ merk: '', model: '', bouwjaar: '', km: '', naam: '', telefoon: '' });
  const [fouten, setFouten] = useState<Partial<Record<Veld, string | null>>>({});
  const [status, setStatus] = useState<'idle' | 'bezig' | 'ok' | 'fout'>('idle');

  const regels: Record<Veld, (v: string) => string | null> = {
    merk: v => checkVerplicht(v, 'het merk'),
    model: v => checkVerplicht(v, 'het model'),
    bouwjaar: v => {
      if (!v) return null;
      const n = Number(v);
      return n >= 1900 && n <= DIT_JAAR + 1 ? null : `Vul een bouwjaar in tussen 1900 en ${DIT_JAAR + 1}.`;
    },
    km: v => (!v || /^\d{1,7}$/.test(v.replace(/\./g, '')) ? null : 'Vul de kilometerstand in cijfers in.'),
    naam: v => checkVerplicht(v, 'je naam'),
    telefoon: checkTelefoon,
  };
  const valideer = (veld: Veld) => setFouten(f => ({ ...f, [veld]: regels[veld](form[veld]) }));
  const zet = (veld: Veld, v: string) => {
    setForm(f => ({ ...f, [veld]: v }));
    if (fouten[veld]) setFouten(f => ({ ...f, [veld]: regels[veld](v) }));
  };
  const check = (velden: Veld[]) => {
    const nieuw = Object.fromEntries(velden.map(v => [v, regels[v](form[v])]));
    setFouten(f => ({ ...f, ...nieuw }));
    return !Object.values(nieuw).some(Boolean);
  };

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (stap === 1) {
      if (!check(STAP1)) return focusEersteFout(formRef.current);
      setStap(2);
      requestAnimationFrame(() => document.getElementById('ik-naam')?.focus());
      return;
    }
    if (!check(STAP2)) return focusEersteFout(formRef.current);
    setStatus('bezig');
    const { error } = await supabase.rpc('maak_inkoop_lead', {
      p_naam: form.naam.trim(),
      p_telefoon: form.telefoon.trim(),
      p_merk: form.merk.trim(),
      p_model: form.model.trim(),
      p_bouwjaar: form.bouwjaar ? parseInt(form.bouwjaar, 10) : null,
      p_km: form.km ? parseInt(form.km.replace(/\./g, ''), 10) : null,
    });
    setStatus(error ? 'fout' : 'ok');
  }

  if (status === 'ok') {
    const motor = `${form.merk.trim()} ${form.model.trim()}`;
    const gegevens = [
      `Naam: ${form.naam.trim()}`,
      `Telefoon: ${form.telefoon.trim()}`,
      `Motor: ${motor}`,
      form.bouwjaar && `Bouwjaar: ${form.bouwjaar}`,
      form.km && `Kilometerstand: ${Number(form.km.replace(/\./g, '')).toLocaleString('nl-NL')} km`,
    ].filter(Boolean).join('\n');
    const mailBody = `Hoi De Jonge Motoren,\n\nHierbij de foto's van mijn motor voor de taxatie.\n\n${gegevens}\n\nGroet,\n${form.naam.trim()}`;
    const mailHref = `mailto:${BEDRIJF.email}?subject=${encodeURIComponent(`Foto's voor taxatie: ${motor}`)}&body=${encodeURIComponent(mailBody.replace(/\n/g, '\r\n'))}`;
    const appHref = whatsappUrl(`Hoi De Jonge Motoren, hierbij de foto's van mijn motor voor de taxatie.\n\n${gegevens}`);

    return (
      <div className="space-y-6">
        <Bedankt
          titel={`Bedankt, ${form.naam.trim().split(' ')[0]}`}
          tekst={`We bellen je op ${form.telefoon} over je ${motor} en plannen samen de taxatie.`}
        />
        <div className="border border-line bg-white p-6">
          <h3 className="flex items-center gap-2 text-2xl"><Camera size={24} className="text-red" aria-hidden /> Stuur ook foto&apos;s mee</h3>
          <p className="mt-2 text-muted">
            Met foto&apos;s kunnen we je motor sneller en nauwkeuriger taxeren. Kies hieronder mail of WhatsApp: je gegevens staan al in het bericht, je hoeft alleen de foto&apos;s toe te voegen en te versturen.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a href={appHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <MessageCircle size={18} aria-hidden /> Foto&apos;s via WhatsApp
            </a>
            <a href={mailHref} className="btn btn-dark">
              <Mail size={18} aria-hidden /> Foto&apos;s via mail
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            Handig: beide zijkanten, voor- en achterkant, het dashboard met de kilometerstand en eventuele schade of gebruikssporen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={verstuur} noValidate className="space-y-5">
      <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted" aria-live="polite">
        Stap {stap} van 2: {stap === 1 ? 'je motor' : 'je gegevens'}
      </p>

      {stap === 1 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="ik-merk" label="Merk" error={fouten.merk}>
              <input {...fieldProps('ik-merk', fouten.merk)} placeholder="Bijv. Honda" value={form.merk}
                onChange={e => zet('merk', e.target.value)} onBlur={() => valideer('merk')} />
            </Field>
            <Field id="ik-model" label="Model" error={fouten.model}>
              <input {...fieldProps('ik-model', fouten.model)} placeholder="Bijv. CB500F" value={form.model}
                onChange={e => zet('model', e.target.value)} onBlur={() => valideer('model')} />
            </Field>
            <Field id="ik-bouwjaar" label="Bouwjaar" optional error={fouten.bouwjaar}>
              <input {...fieldProps('ik-bouwjaar', fouten.bouwjaar)} inputMode="numeric" maxLength={4} placeholder="Bijv. 2019" value={form.bouwjaar}
                onChange={e => zet('bouwjaar', e.target.value.replace(/\D/g, ''))} onBlur={() => valideer('bouwjaar')} />
            </Field>
            <Field id="ik-km" label="Kilometerstand" optional error={fouten.km}>
              <input {...fieldProps('ik-km', fouten.km)} inputMode="numeric" placeholder="Bijv. 18000" value={form.km}
                onChange={e => zet('km', e.target.value.replace(/[^\d.]/g, ''))} onBlur={() => valideer('km')} />
            </Field>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Volgende stap <ArrowRight size={18} aria-hidden />
          </button>
        </>
      ) : (
        <>
          <p className="bg-surface-2 px-4 py-3 text-sm">
            Je motor: <strong>{form.merk} {form.model}</strong>{form.bouwjaar && `, ${form.bouwjaar}`}{form.km && `, ${form.km} km`}
          </p>
          <Field id="ik-naam" label="Naam" error={fouten.naam}>
            <input {...fieldProps('ik-naam', fouten.naam)} autoComplete="name" value={form.naam}
              onChange={e => zet('naam', e.target.value)} onBlur={() => valideer('naam')} />
          </Field>
          <Field id="ik-telefoon" label="Telefoonnummer" error={fouten.telefoon} hint="We bellen je voor een vrijblijvende taxatie. We delen je nummer met niemand.">
            <input {...fieldProps('ik-telefoon', fouten.telefoon, 'hint')} type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12345678"
              value={form.telefoon} onChange={e => zet('telefoon', e.target.value)} onBlur={() => valideer('telefoon')} />
          </Field>
          <p className="text-sm text-muted">Na het versturen kun je met één klik foto&apos;s sturen via WhatsApp of mail.</p>
          {status === 'fout' && <Foutmelding />}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button type="button" onClick={() => setStap(1)} className="btn btn-outline sm:w-auto">
              <ArrowLeft size={18} aria-hidden /> Terug
            </button>
            <button type="submit" className="btn btn-primary flex-1" disabled={status === 'bezig'}>
              {status === 'bezig' ? 'Bezig met versturen' : 'Vraag taxatie aan'}
            </button>
          </div>
        </>
      )}
      <LieverDirect tekst="Liever bellen of foto's sturen?" />
    </form>
  );
}
