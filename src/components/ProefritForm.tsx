'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

type Props = {
  motorId?: string;
  motorNaam?: string;
};

export default function ProefritForm({ motorId, motorNaam }: Props) {
  const [form, setForm] = useState({ naam: '', telefoon: '', datum: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('afspraken').insert({
      naam: form.naam,
      telefoon: form.telefoon,
      datum: form.datum || new Date().toISOString().split('T')[0],
      type: 'proefrit',
      voorraad_motor_id: motorId || null,
      status: 'aangevraagd',
      opmerking: motorNaam ? `Proefrit aangevraagd voor: ${motorNaam}` : undefined,
    });
    setStatus(error ? 'err' : 'ok');
  }

  if (status === 'ok') {
    return (
      <div className="bg-[#E31E24]/10 border border-[#E31E24]/30 p-4 text-center">
        <div className="font-['Barlow_Condensed'] font-bold text-lg text-[#E31E24] uppercase mb-1">Aanvraag ontvangen!</div>
        <p className="text-sm text-[#555]">Jeffrey of Anouk belt je zo snel mogelijk terug.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {motorNaam && (
        <div className="text-sm text-[#888] pb-2 border-b border-[#eee]">
          Proefrit aanvragen voor: <strong>{motorNaam}</strong>
        </div>
      )}
      <input
        required
        type="text"
        placeholder="Jouw naam"
        value={form.naam}
        onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]"
      />
      <input
        required
        type="tel"
        placeholder="Telefoonnummer"
        value={form.telefoon}
        onChange={e => setForm(f => ({ ...f, telefoon: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]"
      />
      <input
        type="date"
        placeholder="Gewenste datum (optioneel)"
        value={form.datum}
        min={new Date().toISOString().split('T')[0]}
        onChange={e => setForm(f => ({ ...f, datum: e.target.value }))}
        className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] text-[#555]"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide py-3 hover:bg-[#c01920] transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Versturen...' : 'Proefrit aanvragen'}
      </button>
      {status === 'err' && (
        <p className="text-xs text-red-600">Er ging iets mis. Bel ons direct op 0166-606090.</p>
      )}
    </form>
  );
}
