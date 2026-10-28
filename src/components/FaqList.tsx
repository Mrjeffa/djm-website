import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { Faq } from '@/content/faq';

export default function FaqList({ items, kop = 'h3' }: { items: Faq[]; kop?: 'h2' | 'h3' }) {
  const Kop = kop;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(f => (
        <details key={f.vraag} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
            <Kop className="font-sans text-lg font-semibold normal-case tracking-normal">{f.vraag}</Kop>
            <Plus size={22} className="shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden />
          </summary>
          <div className="pb-6 pr-10 text-muted">
            <p>{f.antwoord}</p>
            {f.link && <Link href={f.link.href} className="link-arrow mt-3 text-sm">{f.link.label}</Link>}
          </div>
        </details>
      ))}
    </div>
  );
}
