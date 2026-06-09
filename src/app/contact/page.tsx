'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', bericht: '' });
  const [status, setStatus] = useState<'idle' | 'ok'>('idle');

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('ok');
  }

  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">Kom in contact</div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase mb-4">Contact</h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Vraag? Interesse in een motor? Of gewoon even kennismaken? Jeffrey reageert altijd snel.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Barlow_Condensed'] font-bold text-3xl uppercase mb-6">Bereikbaarheid</h2>

          <div className="space-y-4 mb-8">
            {[
              { icon: Phone, label: 'Telefoon', value: '06-1234 5678', href: 'tel:+31612345678' },
              { icon: Mail, label: 'E-mail', value: 'info@dejongemotoren.nl', href: 'mailto:info@dejongemotoren.nl' },
              { icon: MapPin, label: 'Locatie', value: 'Tholen, Zeeland', href: undefined },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Stuur een bericht', href: 'https://wa.me/31612345678' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3 p-4 border border-[#E5E5E5]">
                <div className="bg-[#E31E24]/10 p-2 shrink-0">
                  <Icon size={18} className="text-[#E31E24]" />
                </div>
                <div>
                  <div className="text-xs text-[#888] font-['Barlow_Condensed'] uppercase tracking-wide mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} className="font-['Barlow_Condensed'] font-bold hover:text-[#E31E24] transition-colors">{value}</a>
                  ) : (
                    <div className="font-['Barlow_Condensed'] font-bold">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F5] p-5 border border-[#E5E5E5]">
            <div className="font-['Barlow_Condensed'] font-bold uppercase text-sm mb-3 text-[#888]">Openingstijden</div>
            <div className="space-y-1 text-sm text-[#555]">
              <div className="flex justify-between"><span>Maandag – vrijdag</span><span className="font-medium">09:00 – 18:00</span></div>
              <div className="flex justify-between"><span>Zaterdag</span><span className="font-medium">10:00 – 16:00</span></div>
              <div className="flex justify-between"><span>Zondag</span><span className="text-[#888]">Op afspraak</span></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-['Barlow_Condensed'] font-bold text-3xl uppercase mb-6">Stuur een bericht</h2>
          {status === 'ok' ? (
            <div className="border border-[#E5E5E5] p-8 text-center">
              <div className="font-['Barlow_Condensed'] font-black text-2xl uppercase text-[#E31E24] mb-2">Bericht ontvangen!</div>
              <p className="text-sm text-[#888]">Jeffrey reageert binnen één werkdag.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="border border-[#E5E5E5] p-6 space-y-3">
              <input required type="text" placeholder="Naam" value={form.naam} onChange={e => set('naam', e.target.value)}
                className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]" />
              <input type="email" placeholder="E-mailadres" value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]" />
              <input type="tel" placeholder="Telefoonnummer" value={form.telefoon} onChange={e => set('telefoon', e.target.value)}
                className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24]" />
              <textarea required placeholder="Je bericht" value={form.bericht} onChange={e => set('bericht', e.target.value)} rows={5}
                className="w-full border border-[#E5E5E5] px-3 py-2.5 text-sm focus:outline-none focus:border-[#E31E24] resize-none" />
              <button type="submit"
                className="w-full bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide py-3 hover:bg-[#c01920] transition-colors">
                Verstuur bericht
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
