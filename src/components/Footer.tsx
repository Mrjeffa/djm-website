import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold tracking-[3px] text-[#E31E24] uppercase mb-1">Occasion Motors · Tholen</div>
          <div className="font-['Barlow_Condensed'] text-2xl font-black uppercase mb-3">De Jonge Motoren</div>
          <p className="text-[#888] text-sm leading-relaxed">
            Jouw betrouwbare motordealer in Tholen, Zeeland. Al 25 jaar eerlijk, persoonlijk en met passie voor motoren.
          </p>
        </div>

        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest mb-4 text-[#888]">Navigatie</h3>
          <ul className="space-y-2">
            {[
              { href: '/aanbod', label: 'Aanbod' },
              { href: '/motor-verkopen', label: 'Motor verkopen' },
              { href: '/proefrit', label: 'Proefrit aanvragen' },
              { href: '/blog', label: 'Blog' },
              { href: '/over-ons', label: 'Over ons' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-[#888] hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest mb-4 text-[#888]">Contact</h3>
          <ul className="space-y-3">
            <li>
              <a href="tel:+31166606090" className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors">
                <Phone size={14} className="text-[#E31E24] shrink-0" />
                0166-606090
              </a>
            </li>
            <li>
              <a href="mailto:info@dejongemotoren.nl" className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors">
                <Mail size={14} className="text-[#E31E24] shrink-0" />
                info@dejongemotoren.nl
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#888]">
              <MapPin size={14} className="text-[#E31E24] mt-0.5 shrink-0" />
              <span>Stevinweg 14<br />4691 SM Tholen</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest mb-4 text-[#888]">Openingstijden</h3>
          <ul className="space-y-2 text-sm text-[#888]">
            <li className="flex items-start gap-2">
              <Clock size={14} className="text-[#E31E24] mt-0.5 shrink-0" />
              <div>
                <div className="text-white text-xs font-['Barlow_Condensed'] font-bold uppercase mb-1">Wo – Vr</div>
                <div>10:00 – 12:00</div>
                <div>13:00 – 17:30</div>
              </div>
            </li>
            <li className="text-[#555] text-xs mt-2">Ma, di, za, zo: op afspraak</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[#555] text-xs">© {new Date().getFullYear()} De Jonge Motoren. Alle rechten voorbehouden.</p>
          <p className="text-[#555] text-xs">Stevinweg 14 · 4691 SM Tholen · 0166-606090</p>
        </div>
      </div>
    </footer>
  );
}
