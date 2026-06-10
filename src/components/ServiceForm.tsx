'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const soorten = [
  'Algemeen onderhoud',
  'Banden wisselen',
  'Ketting & tandwielen',
  'Remmen',
  'APK / keuring',
  'Schade / reparatie',
  'Electra / accu',
  'Anders',
];

export default function ServiceForm() {
  const [form, setForm] = useState({
    naam: '',
    telefoon: '',
    email: '',
    soort: '',
    opmerking: '',
    datum: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('afspraken').insert({
      naam: form.naam,
      telefoon: form.telefoon,
      email: form.email || null,
      datum: form.datum || new Date().toISOString().split('T')[0],
      type: 'service',
      status: 'aangevraagd',
      opmerking: [form.soort && `Soort: ${form.soort}`, form.opmerking].filter(Boolean).join(' — ') || null,
    });
    setStatus(error ? 'err' : 'ok');
  }

  if (status === 'ok') {
    return (
      <div className="bg-[#E31E24]/10 border border-[#E31E24]/30 p-6 text-center">
        <div className="font-['Barlow_Condensed'] font-black text-2xl text-[#E31E24] uppercase mb-2">Aanvraag ontvangen!</div>
        <p className="text-sm text-[#555]">Jeffrey of Anouk belt je zo snel mogelijk terug om een afspraak te maken.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        type="text"
        placeholder="Jouw naam *"
        value={form.naam}
        onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]"
      />
      <input
        required
        type="tel"
        placeholder="Telefoonnummer *"
        value={form.telefoon}
        onChange={e => setForm(f => ({ ...f, telefoon: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]"
      />
      <input
        type="email"
        placeholder="E-mailadres (optioneel)"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]"
      />
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-[#888] mb-1">
          Soort service
        </label>
        <select
          value={form.soort}
          onChange={e => setForm(f => ({ ...f, soort: e.target.value }))}
          className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] bg-white font-['Barlow_Condensed'] font-bold uppercase"
        >
          <option value="">Kies een categorie (optioneel)</option>
          {soorten.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Omschrijving (optioneel)"
        value={form.opmerking}
        onChange={e => setForm(f => ({ ...f, opmerking: e.target.value }))}
        rows={3}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] resize-none"
      />
      <div>
        <label className="block text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-[#888] mb-1">
          Gewenste datum (optioneel)
        </label>
        <input
          type="date"
          value={form.datum}
          min={new Date().toISOString().split('T')[0]}
          onChange={e => setForm(f => ({ ...f, datum: e.target.value }))}
          className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] text-[#555]"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#E31E24] text-white font-['Barlow_Condensed'] font-black uppercase tracking-widest py-3.5 hover:bg-[#c01920] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === 'loading' ? 'Versturen...' : 'Service aanvragen'}
      </button>
      {status === 'err' && (
        <p className="text-xs text-red-600 text-center">Er ging iets mis. Bel ons direct op 0166-606090.</p>
      )}
    </form>
  );
}
