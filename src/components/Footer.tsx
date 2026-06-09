import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold tracking-[3px] text-[#E31E24] uppercase mb-1">Occasion Motors</div>
          <div className="font-['Barlow_Condensed'] text-2xl font-black uppercase mb-3">De Jonge Motoren</div>
          <p className="text-[#888] text-sm leading-relaxed">
            Jouw betrouwbare motordealer in Tholen, Zeeland. Eerlijk, persoonlijk en met passie voor motoren.
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
              <a href="tel:+31612345678" className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors">
                <Phone size={14} className="text-[#E31E24]" />
                06-1234 5678
              </a>
            </li>
            <li>
              <a href="mailto:info@dejongemotoren.nl" className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors">
                <Mail size={14} className="text-[#E31E24]" />
                info@dejongemotoren.nl
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#888]">
              <MapPin size={14} className="text-[#E31E24] mt-0.5 shrink-0" />
              Tholen, Zeeland
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[#555] text-xs">© {new Date().getFullYear()} De Jonge Motoren. Alle rechten voorbehouden.</p>
          <p className="text-[#555] text-xs">KvK: 12345678 | BTW: NL123456789B01</p>
        </div>
      </div>
    </footer>
  );
}
