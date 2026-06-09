'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export default function InkoopForm() {
  const [form, setForm] = useState({ naam: '', telefoon: '', motor: '', km: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('inkoop_leads').insert(form);
    setStatus(error ? 'err' : 'ok');
  }

  if (status === 'ok') {
    return (
      <div className="bg-white/10 border border-white/30 p-6 text-center text-white">
        <div className="font-['Barlow_Condensed'] font-black text-2xl uppercase mb-2">Aanvraag ontvangen!</div>
        <p className="text-white/80 text-sm">Jeffrey neemt zo snel mogelijk contact op voor een eerlijke taxatie.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input required type="text" placeholder="Jouw naam" value={form.naam} onChange={e => set('naam', e.target.value)}
        className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:border-white" />
      <input required type="tel" placeholder="Telefoonnummer" value={form.telefoon} onChange={e => set('telefoon', e.target.value)}
        className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:border-white" />
      <input required type="text" placeholder="Motor (merk + model)" value={form.motor} onChange={e => set('motor', e.target.value)}
        className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:border-white" />
      <input required type="text" placeholder="Km-stand" value={form.km} onChange={e => set('km', e.target.value)}
        className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 px-4 py-3 text-sm focus:outline-none focus:border-white" />
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-white text-[#E31E24] font-['Barlow_Condensed'] font-black uppercase tracking-wide py-4 text-lg hover:bg-white/90 transition-colors disabled:opacity-60">
        {status === 'loading' ? 'Versturen...' : 'Vrijblijvende taxatie aanvragen'}
      </button>
      {status === 'err' && <p className="text-white/70 text-xs text-center">Er ging iets mis. Bel ons op 06-1234 5678.</p>}
    </form>
  );
}
