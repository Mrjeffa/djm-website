import { getMotors } from '@/lib/motors';
import MotorCard from '@/components/MotorCard';
import AanbodFilters from './AanbodFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aanbod occasion motors | De Jonge Motoren',
  description: 'Bekijk alle beschikbare occasion motors bij De Jonge Motoren in Tholen, Zeeland. Filter op merk, type, prijs en km-stand.',
};

export const runtime = 'edge';
export const revalidate = 60;

export default async function AanbodPage({
  searchParams,
}: {
  searchParams: Promise<{ merk?: string; type?: string; maxPrijs?: string; maxKm?: string }>;
}) {
  const params = await searchParams;
  const motoren = await getMotors({
    merk: params.merk,
    type: params.type,
    maxPrijs: params.maxPrijs ? Number(params.maxPrijs) : undefined,
    maxKm: params.maxKm ? Number(params.maxKm) : undefined,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">
          {motoren.length} motors beschikbaar
        </div>
        <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase">Aanbod</h1>
      </div>

      <AanbodFilters />

      {motoren.length === 0 ? (
        <div className="text-center py-20 text-[#888]">
          <p className="font-['Barlow_Condensed'] text-2xl uppercase mb-2">Geen motors gevonden</p>
          <p className="text-sm">Pas de filters aan of bekijk het volledige aanbod.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {motoren.map(motor => (
            <MotorCard key={motor.id} motor={motor} />
          ))}
        </div>
      )}
    </div>
  );
}
