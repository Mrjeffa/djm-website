'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BEDRIJF, HOOFDMENU } from '@/lib/site';

export default function Header({ status, melding }: { status: string; melding?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const actief = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-dark text-white">
      {melding && (
        <div className="bg-red px-4 py-2 text-center text-sm font-semibold">{melding}</div>
      )}
      <div className="hidden border-b border-line-dark lg:block">
        <div className="container-site flex h-9 items-center justify-between text-[13px] text-muted-on-dark">
          <span>{status}</span>
          <span>{BEDRIJF.straat}, {BEDRIJF.plaats} · <a href={`tel:${BEDRIJF.mobiel.e164}`} className="hover:text-white">{BEDRIJF.mobiel.label}</a></span>
        </div>
      </div>
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href="/" className="shrink-0" aria-label={`${BEDRIJF.naam}, naar de homepage`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-djm.webp" alt={BEDRIJF.naam} width={560} height={234} className="h-11 w-auto lg:h-12" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {HOOFDMENU.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={actief(href) ? 'page' : undefined}
                  className={`relative block px-3 py-2 font-display text-[17px] font-bold uppercase tracking-wide transition-colors ${
                    actief(href) ? 'text-white after:absolute after:inset-x-3 after:-bottom-[15px] after:h-[3px] after:bg-red' : 'text-muted-on-dark hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${BEDRIJF.telefoon.e164}`} className="btn btn-primary hidden !min-h-11 !px-4 sm:inline-flex">
            <Phone size={16} aria-hidden /> {BEDRIJF.telefoon.label}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobiel-menu" aria-label="Mobiel menu" className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-dark bg-dark lg:hidden">
          <ul className="container-site py-4">
            {[{ href: '/', label: 'Home' }, ...HOOFDMENU, { href: '/proefrit', label: 'Proefrit' }, { href: '/veelgestelde-vragen', label: 'Veelgestelde vragen' }].map(({ href, label }) => (
              <li key={href} className="border-b border-line-dark">
                <Link
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`flex min-h-14 items-center font-display text-2xl font-bold uppercase ${pathname === href ? 'text-red-on-dark' : 'text-white'}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-site space-y-3 pb-28 text-muted-on-dark">
            <p>{status}</p>
            <p>{BEDRIJF.straat}, {BEDRIJF.postcode} {BEDRIJF.plaats}</p>
          </div>
        </nav>
      )}
    </header>
  );
}
