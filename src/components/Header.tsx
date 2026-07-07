'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const nav = [
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/producten', label: 'Onderdelen' },
  { href: '/motor-verkopen', label: 'Motor verkopen' },
  { href: '/proefrit', label: 'Proefrit' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="De Jonge Motoren — Home">
          <Image
            src="/logo.png"
            alt="De Jonge Motoren"
            width={140}
            height={70}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wide px-3 py-2 text-[#AAA] hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:+310621908697"
            className="flex items-center gap-1.5 text-[#AAA] hover:text-white font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide transition-colors"
          >
            <Phone size={13} />
            06-21908697
          </a>
          <span className="text-[#333]">|</span>
          <a
            href="tel:+31166606090"
            className="flex items-center gap-1.5 bg-[#E31E24] text-white px-4 py-2 font-['Barlow_Condensed'] font-bold text-sm uppercase tracking-wide hover:bg-[#c01920] transition-colors"
          >
            <Phone size={13} />
            0166-606090
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#1A1A1A] bg-[#0A0A0A]">
          <nav className="flex flex-col">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-['Barlow_Condensed'] font-bold uppercase tracking-wide px-4 py-3.5 border-b border-[#1A1A1A] text-[#AAA] hover:text-white hover:bg-[#111]"
              >
                {label}
              </Link>
            ))}
            <a
              href="tel:+310621908697"
              className="flex items-center gap-2 px-4 py-3.5 border-b border-[#1A1A1A] font-['Barlow_Condensed'] font-bold text-[#AAA] uppercase"
            >
              <Phone size={14} />
              06-21908697
            </a>
            <a
              href="tel:+31166606090"
              className="flex items-center gap-2 px-4 py-3.5 font-['Barlow_Condensed'] font-bold text-[#E31E24] uppercase"
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
