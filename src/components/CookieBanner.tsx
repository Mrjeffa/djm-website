'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const keuze = localStorage.getItem('djm_cookie_keuze');
    if (!keuze) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('djm_cookie_keuze', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('djm_cookie_keuze', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t-2 border-[#E31E24] px-4 py-5 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 text-sm text-[#AAA] leading-relaxed">
          <span className="font-['Barlow_Condensed'] font-bold text-white uppercase text-sm tracking-wide block mb-1">
            Cookies
          </span>
          We gebruiken functionele cookies om de website goed te laten werken. Analytische cookies gebruiken we alleen met jouw toestemming.{' '}
          <Link href="/privacy" className="text-[#E31E24] hover:underline">
            Meer informatie
          </Link>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 border border-[#333] text-[#AAA] font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-widest hover:border-[#666] hover:text-white transition-colors"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-widest hover:bg-[#c01920] transition-colors"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
