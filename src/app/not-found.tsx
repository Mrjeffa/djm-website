import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Pagina niet gevonden', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col justify-center py-20">
      <p className="eyebrow">Foutcode 404</p>
      <h1 className="mt-3 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)]">Deze pagina bestaat niet (meer)</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">
        Zocht je een motor? Die is dan waarschijnlijk verkocht. Bekijk de occasions die nu op voorraad staan.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/occasions" className="btn btn-primary">Bekijk occasions <ArrowRight size={18} aria-hidden /></Link>
        <Link href="/" className="btn btn-outline">Naar de homepage</Link>
      </div>
    </section>
  );
}
