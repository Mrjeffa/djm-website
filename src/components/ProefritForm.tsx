'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { isDateGesloten, type Instellingen } from '@/lib/instellingen';

const supabase = createClient();

type Motor = { id: string; merk: string; model: string; bouwjaar: number };

type Props = {
  motorId?: string;
  motorNaam?: string;
  motoren?: Motor[];
  instellingen?: Instellingen;
};

export default function ProefritForm({ motorId, motorNaam, motoren = [], instellingen }: Props) {
  const [form, setForm] = useState({
    naam: '',
    telefoon: '',
    email: '',
    datum: '',
    geselecteerdeMotorId: motorId || '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [datumFout, setDatumFout] = useState<string | null>(null);
  const [drukke, setDrukke] = useState<Record<string, number>>({});

  useEffect(() => {
    const start = new Date().toISOString().split('T')[0];
    const eind = new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0];
    supabase.rpc('get_drukke_datums', { start_datum: start, eind_datum: eind }).then(({ data }) => {
      if (data) {
        const map: Record<string, number> = {};
        for (const r of data) map[r.datum] = Number(r.aantal);
        setDrukke(map);
      }
    });
  }, []);

  const geselecteerde = motoren.find(m => m.id === form.geselecteerdeMotorId);
  const displayNaam = geselecteerde
    ? `${geselecteerde.merk} ${geselecteerde.model} (${geselecteerde.bouwjaar})`
    : motorNaam || '';

  function handleDatum(dateStr: string) {
    setForm(f => ({ ...f, datum: dateStr }));
    if (!dateStr) { setDatumFout(null); return; }
    if (instellingen) {
      const fout = isDateGesloten(dateStr, instellingen);
      if (fout) { setDatumFout(fout); return; }
    }
    const max = instellingen?.max_afspraken_per_dag ?? 5;
    if (drukke[dateStr] >= max) {
      setDatumFout('Deze dag zit vol. Kies een andere datum of bel ons.');
      return;
    }
    setDatumFout(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (datumFout) return;
    setStatus('loading');
    const { error } = await supabase.from('afspraken').insert({
      naam: form.naam,
      telefoon: form.telefoon,
      email: form.email || null,
      datum: form.datum || new Date().toISOString().split('T')[0],
      type: 'proefrit',
      voorraad_motor_id: form.geselecteerdeMotorId || null,
      status: 'aangevraagd',
      opmerking: displayNaam ? `Proefrit aanvraag voor: ${displayNaam}` : undefined,
    });
    setStatus(error ? 'err' : 'ok');
  }

  if (status === 'ok') {
    return (
      <div className="bg-[#E31E24]/10 border border-[#E31E24]/30 p-6 text-center">
        <div className="font-['Barlow_Condensed'] font-black text-2xl text-[#E31E24] uppercase mb-2">Aanvraag ontvangen!</div>
        <p className="text-sm text-[#555]">We bellen je zo snel mogelijk terug om een moment af te spreken.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      {motoren.length > 0 && (
        <div>
          <label className="block text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-[#888] mb-1">
            Kies een motor
          </label>
          <select
            value={form.geselecteerdeMotorId}
            onChange={e => setForm(f => ({ ...f, geselecteerdeMotorId: e.target.value }))}
            className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] bg-white font-['Barlow_Condensed'] font-bold uppercase"
          >
            <option value="">Nog niet zeker / geen voorkeur</option>
            {motoren.map(m => (
              <option key={m.id} value={m.id}>
                {m.bouwjaar} {m.merk} {m.model}
              </option>
            ))}
          </select>
        </div>
      )}

      {!motoren.length && displayNaam && (
        <div className="text-sm text-[#888] pb-2 border-b border-[#eee]">
          Proefrit voor: <strong className="text-[#1A1A1A]">{displayNaam}</strong>
        </div>
      )}

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
          Gewenste datum (optioneel)
        </label>
        <input
          type="date"
          value={form.datum}
          min={new Date().toISOString().split('T')[0]}
          onChange={e => handleDatum(e.target.value)}
          className={`w-full border px-3 py-2.5 text-sm focus:outline-none text-[#555] ${datumFout ? 'border-red-400 bg-red-50' : 'border-[#E5E5E5] focus:border-[#E31E24]'}`}
        />
        {datumFout && <p className="text-xs text-red-600 mt-1">{datumFout}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'loading' || !!datumFout}
        className="w-full bg-[#E31E24] text-white font-['Barlow_Condensed'] font-black uppercase tracking-widest py-3.5 hover:bg-[#c01920] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {status === 'loading' ? 'Versturen...' : 'Proefrit aanvragen'}
      </button>
      {status === 'err' && (
        <p className="text-xs text-red-600 text-center">Er ging iets mis. Bel ons direct op 0166-606090.</p>
      )}
    </form>
  );
}
