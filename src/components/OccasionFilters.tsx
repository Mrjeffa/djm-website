'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

type Props = {
  merken: string[];
  categorieen: string[];
  waarden: { merk?: string; categorie?: string; maxPrijs?: string; maxKm?: string; sort?: string };
};

const PRIJZEN = [3000, 5000, 7500, 10000, 15000, 20000];
const KMS = [10000, 20000, 30000, 50000, 75000];

function Select({ name, label, value, children }: { name: string; label: string; value?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={`f-${name}`} className="field-label">{label}</label>
      <div className="relative">
        <select id={`f-${name}`} name={name} defaultValue={value ?? ''} className="field appearance-none pr-10">
          {children}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </div>
  );
}

export default function OccasionFilters({ merken, categorieen, waarden }: Props) {
  const actief = Boolean(waarden.merk || waarden.categorie || waarden.maxPrijs || waarden.maxKm);
  return (
    <form
      method="get"
      action="/occasions"
      role="search"
      aria-label="Occasions filteren"
      onChange={e => e.currentTarget.requestSubmit()}
      onSubmit={e => {
        const form = e.currentTarget;
        for (const el of Array.from(form.elements) as HTMLSelectElement[]) {
          if (el.name && !el.value) el.disabled = true;
        }
        requestAnimationFrame(() => (Array.from(form.elements) as HTMLSelectElement[]).forEach(el => { el.disabled = false; }));
      }}
      className="grid grid-cols-2 gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto] lg:items-end"
    >
      <Select name="merk" label="Merk" value={waarden.merk}>
        <option value="">Alle merken</option>
        {merken.map(m => <option key={m} value={m}>{m}</option>)}
      </Select>
      <Select name="categorie" label="Soort motor" value={waarden.categorie}>
        <option value="">Alle soorten</option>
        {categorieen.map(c => <option key={c} value={c}>{c}</option>)}
      </Select>
      <Select name="maxPrijs" label="Maximale prijs" value={waarden.maxPrijs}>
        <option value="">Geen maximum</option>
        {PRIJZEN.map(p => <option key={p} value={p}>Tot € {p.toLocaleString('nl-NL')}</option>)}
      </Select>
      <Select name="maxKm" label="Maximale km-stand" value={waarden.maxKm}>
        <option value="">Geen maximum</option>
        {KMS.map(k => <option key={k} value={k}>Tot {k.toLocaleString('nl-NL')} km</option>)}
      </Select>
      <Select name="sort" label="Sorteren" value={waarden.sort}>
        <option value="">Nieuwste eerst</option>
        <option value="prijs-op">Prijs laag naar hoog</option>
        <option value="prijs-af">Prijs hoog naar laag</option>
        <option value="km">Minste kilometers</option>
      </Select>
      <div className="col-span-2 flex gap-3 lg:col-span-1">
        <noscript><button type="submit" className="btn btn-dark">Toon</button></noscript>
        {actief && <Link href="/occasions" className="btn btn-outline w-full lg:w-auto">Wis filters</Link>}
      </div>
    </form>
  );
}
