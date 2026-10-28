import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { BEDRIJF, whatsappUrl } from '@/lib/site';

export default function MobileContactBar() {
  const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 font-display text-sm font-bold uppercase tracking-wide';
  return (
    <nav
      aria-label="Snel contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line-dark bg-dark text-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <a href={`tel:${BEDRIJF.telefoon.e164}`} className={`${item} bg-red`}>
        <Phone size={18} aria-hidden /> Bellen
      </a>
      <a href={whatsappUrl('Hoi De Jonge Motoren, ik heb een vraag.')} target="_blank" rel="noopener noreferrer" className={item}>
        <MessageCircle size={18} aria-hidden /> WhatsApp
      </a>
      <a href={BEDRIJF.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${item} border-l border-line-dark`}>
        <MapPin size={18} aria-hidden /> Route
      </a>
    </nav>
  );
}
