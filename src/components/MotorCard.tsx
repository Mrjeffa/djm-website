import Link from 'next/link';
import { Motor, formatPrijs, formatKm, isNieuwBinnen } from '@/lib/motors';
import { Bike, ArrowRight } from 'lucide-react';

export default function MotorCard({ motor }: { motor: Motor }) {
  const nieuw = isNieuwBinnen(motor.datum_in);

  return (
    <Link href={`/motor/${motor.id}`}
      className="group relative block bg-[#0A0A0A] overflow-hidden cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#111] overflow-hidden">
        {motor.fotos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={motor.fotos[0]}
            alt={`${motor.merk} ${motor.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Bike size={48} className="text-[#333]" />
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/40 transition-all duration-300" />

        {/* Badges */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3">
          {nieuw ? (
            <span className="bg-[#E31E24] text-white text-[9px] font-['Barlow_Condensed'] font-black uppercase tracking-[2px] px-2.5 py-1">
              Nieuw binnen
            </span>
          ) : <span />}
          {motor.status === 'gereserveerd' && (
            <span className="bg-[#F59E0B] text-white text-[9px] font-['Barlow_Condensed'] font-black uppercase tracking-[2px] px-2.5 py-1">
              Gereserveerd
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-2 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest px-5 py-2.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Bekijk motor <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white border-b-2 border-transparent group-hover:border-[#E31E24] transition-colors duration-300">
        <div className="text-[9px] font-['Barlow_Condensed'] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">
          {[motor.bouwjaar, motor.type].filter(Boolean).join(' · ')}
        </div>
        <h3 className="font-['Barlow_Condensed'] font-black text-xl uppercase leading-tight text-[#0A0A0A] mb-3">
          {motor.merk} {motor.model}
        </h3>
        <div className="flex justify-between items-end">
          <div className="text-[#999] text-xs font-['Barlow_Condensed'] uppercase tracking-wide">{formatKm(motor.km)}</div>
          <div className="font-['Barlow_Condensed'] font-black text-xl text-[#E31E24] leading-none">
            {formatPrijs(motor.prijs)}
          </div>
        </div>
      </div>
    </Link>
  );
}
