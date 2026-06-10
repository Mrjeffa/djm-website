import { Phone, Mail, MapPin, MessageCircle, Clock, Wrench } from 'lucide-react';
import ServiceForm from '@/components/ServiceForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Service | De Jonge Motoren',
  description: 'Neem contact op met De Jonge Motoren in Tholen. Bel 0166-606090, stuur een WhatsApp of vraag online een servicebeurt aan.',
};

export default function ContactPage() {
  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Kom in contact</div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Contact
          </h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Vraag? Interesse in een motor? Jeffrey en Anouk reageren altijd snel — meestal binnen een uur.
          </p>
        </div>
      </div>

      {/* Contact info + service form */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Bereikbaarheid</h2>

          <div className="space-y-3 mb-8">
            {[
              { icon: Phone, label: 'Telefoon', value: '0166-606090', href: 'tel:+31166606090' },
              { icon: Mail, label: 'E-mail', value: 'info@dejongemotoren.nl', href: 'mailto:info@dejongemotoren.nl' },
              { icon: MapPin, label: 'Adres', value: 'Stevinweg 14 · 4691 SM Tholen', href: 'https://maps.google.com/?q=Stevinweg+14+Tholen' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Stuur een bericht', href: 'https://wa.me/31166606090' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3 p-4 border border-[#E5E5E5]">
                <div className="bg-[#E31E24]/10 p-2 shrink-0">
                  <Icon size={18} className="text-[#E31E24]" />
                </div>
                <div>
                  <div className="text-xs text-[#888] font-['Barlow_Condensed'] uppercase tracking-wide mb-0.5">{label}</div>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="font-['Barlow_Condensed'] font-bold hover:text-[#E31E24] transition-colors">
                    {value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F5] p-5 border border-[#E5E5E5]">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-[#E31E24]" />
              <div className="font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#888]">Openingstijden</div>
            </div>
            <div className="space-y-2 text-sm text-[#555]">
              <div className="flex justify-between">
                <span className="font-medium text-[#1A1A1A]">Woensdag – Vrijdag</span>
                <span>10:00 – 12:00 en 13:00 – 17:30</span>
              </div>
              <div className="flex justify-between">
                <span>Ma, di, za, zo</span>
                <span className="text-[#888]">Op afspraak</span>
              </div>
            </div>
            <p className="text-xs text-[#888] mt-3 border-t border-[#E5E5E5] pt-3">
              Buiten openingstijden? Bel of WhatsApp ons — we zijn flexibel.
            </p>
          </div>
        </div>

        {/* Service aanvraag */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#E31E24] p-2">
              <Wrench size={18} className="text-white" />
            </div>
            <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase">Service aanvragen</h2>
          </div>
          <p className="text-sm text-[#666] leading-relaxed mb-5">
            Nieuwe klant en je motor moet worden onderhouden of gerepareerd? Vul het formulier in en Jeffrey plant een afspraak met je in.
          </p>
          <div className="border border-[#E5E5E5] p-6">
            <ServiceForm />
          </div>
          <p className="text-xs text-[#AAA] mt-3 text-center">
            Bestaande klant? Maak je afspraak via de <strong>DJM app</strong>.
          </p>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-[#F5F5F5] border-t border-[#E5E5E5] py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Hoe je ons vindt</div>
          <p className="font-['Barlow_Condensed'] font-black text-2xl uppercase mb-1">Stevinweg 14 · Tholen</p>
          <p className="text-sm text-[#888] mb-6">4691 SM Tholen, Zeeland</p>
          <a
            href="https://maps.google.com/?q=Stevinweg+14+4691+SM+Tholen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest bg-[#E31E24] text-white px-6 py-3 hover:bg-[#c01920] transition-colors"
          >
            <MapPin size={14} /> Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
