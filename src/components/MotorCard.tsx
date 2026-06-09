import Link from 'next/link';
import { Motor, formatPrijs, formatKm, isNieuwBinnen } from '@/lib/motors';
import { Bike } from 'lucide-react';

export default function MotorCard({ motor }: { motor: Motor }) {
  const nieuw = isNieuwBinnen(motor.created_at);

  return (
    <Link href={`/motor/${motor.slug}`} className="group block bg-white border border-[#E5E5E5] hover:border-[#E31E24] transition-colors rounded-none overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
        {motor.fotos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={motor.fotos[0]}
            alt={`${motor.merk} ${motor.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Bike size={48} className="text-[#DDD]" />
        )}
        {nieuw && (
          <span className="absolute top-3 left-3 bg-[#E31E24] text-white text-[10px] font-['Barlow_Condensed'] font-bold uppercase tracking-widest px-2 py-1">
            Nieuw binnen
          </span>
        )}
        {motor.status === 'verkocht' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="font-['Barlow_Condensed'] font-black text-white text-2xl uppercase tracking-widest">Verkocht</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-[10px] font-['Barlow_Condensed'] font-bold uppercase tracking-widest text-[#E31E24] mb-1">
          {motor.bouwjaar} · {motor.type}
        </div>
        <h3 className="font-['Barlow_Condensed'] font-bold text-xl uppercase leading-tight mb-3">
          {motor.merk} {motor.model}
        </h3>
        <div className="flex justify-between items-center">
          <div className="text-[#888] text-sm">{formatKm(motor.km)}</div>
          <div className="font-['Barlow_Condensed'] font-black text-xl text-[#E31E24]">
            {formatPrijs(motor.prijs)}
          </div>
        </div>
      </div>
    </Link>
  );
}
