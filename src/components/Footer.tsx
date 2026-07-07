import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Image
            src="/logo.png"
            alt="De Jonge Motoren"
            width={160}
            height={80}
            className="h-14 w-auto mb-4"
          />
          <p className="text-[#666] text-sm leading-relaxed">
            Jouw betrouwbare motordealer in Tholen, Zeeland. Al 25 jaar eerlijk, persoonlijk en met passie voor motoren.
          </p>
        </div>

        {/* Navigatie */}
        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-[3px] mb-4 text-[#E31E24]">Navigatie</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/aanbod', label: 'Aanbod' },
              { href: '/producten', label: 'Onderdelen & Accessoires' },
              { href: '/motor-verkopen', label: 'Motor verkopen' },
              { href: '/proefrit', label: 'Proefrit aanvragen' },
              { href: '/over-ons', label: 'Over ons' },
              { href: '/contact', label: 'Contact & Service' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-[#666] hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-[3px] mb-4 text-[#E31E24]">Contact</h3>
          <ul className="space-y-3">
            <li>
              <a href="tel:+31166606090" className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors">
                <Phone size={14} className="text-[#E31E24] shrink-0" />
                0166-606090
              </a>
            </li>
            <li>
              <a href="tel:+310621908697" className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors">
                <Smartphone size={14} className="text-[#E31E24] shrink-0" />
                06-21908697
              </a>
            </li>
            <li>
              <a href="mailto:info@dejongemotoren.nl" className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors">
                <Mail size={14} className="text-[#E31E24] shrink-0" />
                info@dejongemotoren.nl
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#666]">
              <MapPin size={14} className="text-[#E31E24] mt-0.5 shrink-0" />
              <span>Stevinweg 14<br />4691 SM Tholen</span>
            </li>
          </ul>
        </div>

        {/* Openingstijden */}
        <div>
          <h3 className="font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-[3px] mb-4 text-[#E31E24]">Openingstijden</h3>
          <p className="text-xs text-[#555] mb-3">Actuele tijden worden beheerd via de app.</p>
          <ul className="space-y-1.5 text-sm text-[#666]">
            <li className="flex justify-between gap-4">
              <span className="text-white text-xs font-['Barlow_Condensed'] font-bold uppercase">Wo – Vr</span>
              <span className="text-xs">10:00 – 17:30</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-xs">Zaterdag</span>
              <span className="text-xs">Op afspraak</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-xs">Ma, di, zo</span>
              <span className="text-xs text-[#444]">Gesloten</span>
            </li>
          </ul>
          <p className="text-[#444] text-xs mt-3">Zie <Link href="/contact" className="hover:text-white underline">contactpagina</Link> voor actuele tijden.</p>
        </div>
      </div>

      <div className="border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 flex-wrap">
          <p className="text-[#444] text-xs">© {new Date().getFullYear()} De Jonge Motoren · Stevinweg 14 · 4691 SM Tholen</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[#444] text-xs hover:text-white transition-colors">Privacyverklaring</Link>
            <Link href="/algemene-voorwaarden" className="text-[#444] text-xs hover:text-white transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
