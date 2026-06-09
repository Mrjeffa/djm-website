'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const merken = ['Honda', 'Yamaha', 'Kawasaki', 'BMW', 'Suzuki', 'Ducati', 'KTM', 'Triumph'];
const types = ['Naked', 'Sport', 'Tourer', 'Adventure', 'Cruiser', 'Scrambler', 'Enduro'];

function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/aanbod?${p.toString()}`);
  }

  const selectClass = "border border-[#E5E5E5] px-3 py-2 text-sm focus:outline-none focus:border-[#E31E24] bg-white font-['Barlow'] min-w-[140px]";

  return (
    <div className="flex flex-wrap gap-3 mb-8 p-4 bg-[#F5F5F5] border border-[#E5E5E5]">
      <select className={selectClass} value={params.get('merk') || ''} onChange={e => update('merk', e.target.value)}>
        <option value="">Alle merken</option>
        {merken.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select className={selectClass} value={params.get('type') || ''} onChange={e => update('type', e.target.value)}>
        <option value="">Alle types</option>
        {types.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <select className={selectClass} value={params.get('maxPrijs') || ''} onChange={e => update('maxPrijs', e.target.value)}>
        <option value="">Max. prijs</option>
        {[3000,5000,7500,10000,15000].map(p => (
          <option key={p} value={p}>€ {p.toLocaleString('nl-NL')}</option>
        ))}
      </select>
      <select className={selectClass} value={params.get('maxKm') || ''} onChange={e => update('maxKm', e.target.value)}>
        <option value="">Max. km-stand</option>
        {[10000,20000,30000,50000,75000].map(k => (
          <option key={k} value={k}>{k.toLocaleString('nl-NL')} km</option>
        ))}
      </select>
    </div>
  );
}

export default function AanbodFilters() {
  return (
    <Suspense fallback={<div className="h-16 bg-[#F5F5F5] mb-8" />}>
      <Filters />
    </Suspense>
  );
}
