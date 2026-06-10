'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { X } from 'lucide-react';

const merken = ['Honda', 'Yamaha', 'Kawasaki', 'BMW', 'Suzuki', 'Ducati', 'KTM', 'Triumph', 'Aprilia'];
const types = ['Naked', 'Sport', 'Tourer', 'Adventure', 'Cruiser', 'Scrambler', 'Enduro'];

function Filters() {
  const router = useRouter();
  const params = useSearchParams();
  const hasFilters = params.get('merk') || params.get('type') || params.get('maxPrijs') || params.get('maxKm');

  function update(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/aanbod?${p.toString()}`);
  }

  function reset() {
    router.push('/aanbod');
  }

  const selectClass = "border border-[#E5E5E5] px-4 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] bg-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide cursor-pointer appearance-none pr-8 min-w-[140px]";

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <select className={selectClass} value={params.get('merk') || ''} onChange={e => update('merk', e.target.value)}>
            <option value="">Alle merken</option>
            {merken.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="relative">
          <select className={selectClass} value={params.get('type') || ''} onChange={e => update('type', e.target.value)}>
            <option value="">Alle types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="relative">
          <select className={selectClass} value={params.get('maxPrijs') || ''} onChange={e => update('maxPrijs', e.target.value)}>
            <option value="">Max. prijs</option>
            {[3000,5000,7500,10000,15000].map(p => (
              <option key={p} value={p}>t/m €{p.toLocaleString('nl-NL')}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <select className={selectClass} value={params.get('maxKm') || ''} onChange={e => update('maxKm', e.target.value)}>
            <option value="">Max. km-stand</option>
            {[10000,20000,30000,50000,75000].map(k => (
              <option key={k} value={k}>t/m {k.toLocaleString('nl-NL')} km</option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button onClick={reset}
            className="flex items-center gap-1.5 text-sm font-['Barlow_Condensed'] font-bold uppercase tracking-wide text-[#888] hover:text-[#E31E24] transition-colors cursor-pointer">
            <X size={14} /> Wis filters
          </button>
        )}
      </div>
    </div>
  );
}

export default function AanbodFilters() {
  return (
    <Suspense fallback={<div className="h-14 mb-10" />}>
      <Filters />
    </Suspense>
  );
}
