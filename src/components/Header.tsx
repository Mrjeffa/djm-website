'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const nav = [
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/motor-verkopen', label: 'Motor verkopen' },
  { href: '/proefrit', label: 'Proefrit' },
  { href: '/blog', label: 'Blog' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-['Barlow_Condensed'] text-[10px] font-bold tracking-[3px] text-[#E31E24] uppercase">Occasion Motors · Tholen</span>
          <span className="font-['Barlow_Condensed'] text-xl font-black uppercase tracking-tight">De Jonge Motoren</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wide px-3 py-2 text-[#333] hover:text-[#E31E24] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="tel:+31166606090"
          className="hidden md:flex items-center gap-2 bg-[#E31E24] text-white px-4 py-2 font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide hover:bg-[#c01920] transition-colors"
        >
          <Phone size={14} />
          0166-606090
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#eee] bg-white">
          <nav className="flex flex-col">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-['Barlow_Condensed'] font-bold uppercase tracking-wide px-4 py-3 border-b border-[#f0f0f0] text-[#333] hover:text-[#E31E24]"
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+31166606090"
              className="flex items-center gap-2 px-4 py-3 font-['Barlow_Condensed'] font-bold text-[#E31E24] uppercase"
            >
              <Phone size={14} />
              0166-606090
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
