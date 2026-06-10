import Link from 'next/link';
import { Motor, formatPrijs, formatKm, isNieuwBinnen } from '@/lib/motors';
import { Bike, ArrowRight } from 'lucide-react';

export default function MotorCard({ motor }: { motor: Motor }) {
  const nieuw = isNieuwBinnen(motor.datum_in);
  const motorNaam = encodeURIComponent(`${motor.merk} ${motor.model} (${motor.bouwjaar})`);

  return (
    <div className="group bg-white border border-[#E5E5E5] hover:border-[#E31E24] transition-colors overflow-hidden flex flex-col">
      {/* Klikbaar foto gedeelte */}
      <Link href={`/motor/${motor.id}`} className="relative aspect-[4/3] bg-[#111] overflow-hidden block">
        {motor.fotos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={motor.fotos[0]}
            alt={`${motor.merk} ${motor.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F5F5F5]">
            <Bike size={48} className="text-[#DDD]" />
          </div>
        )}

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
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[9px] font-['Barlow_Condensed'] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">
          {[motor.bouwjaar, motor.type].filter(Boolean).join(' · ')}
        </div>
        <Link href={`/motor/${motor.id}`}>
          <h3 className="font-['Barlow_Condensed'] font-black text-xl uppercase leading-tight text-[#0A0A0A] mb-3 hover:text-[#E31E24] transition-colors">
            {motor.merk} {motor.model}
          </h3>
        </Link>
        <div className="flex justify-between items-end mb-4">
          <div className="text-[#999] text-xs font-['Barlow_Condensed'] uppercase tracking-wide">{formatKm(motor.km)}</div>
          <div className="font-['Barlow_Condensed'] font-black text-xl text-[#E31E24] leading-none">
            {formatPrijs(motor.prijs)}
          </div>
        </div>

        {/* Knoppen */}
        <div className="mt-auto flex gap-2">
          <Link href={`/motor/${motor.id}`}
            className="flex-1 text-center font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-widest py-2.5 border border-[#E5E5E5] text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors">
            Details
          </Link>
          <Link href={`/proefrit?motorId=${motor.id}&motorNaam=${motorNaam}`}
            className="flex-1 text-center inline-flex items-center justify-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-xs tracking-widest py-2.5 bg-[#E31E24] text-white hover:bg-[#c01920] transition-colors">
            Proefrit <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
