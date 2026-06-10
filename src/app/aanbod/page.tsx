import { getMotors } from '@/lib/motors';
import MotorCard from '@/components/MotorCard';
import AanbodFilters from './AanbodFilters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Occasion motors kopen in Tholen | De Jonge Motoren',
  description: 'Bekijk alle beschikbare occasion motors bij De Jonge Motoren in Tholen, Zeeland. BMW, Honda, Kawasaki, Yamaha en meer. Filter op merk, type, prijs en km-stand.',
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

  const hasFilters = params.merk || params.type || params.maxPrijs || params.maxKm;

  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">
            {motoren.length} motors beschikbaar
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Aanbod
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <AanbodFilters />

        {motoren.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-['Barlow_Condensed'] font-black text-[5rem] text-[#F0F0F0] leading-none mb-4">0</div>
            <p className="font-['Barlow_Condensed'] text-2xl uppercase font-black mb-2">Geen motors gevonden</p>
            <p className="text-sm text-[#888]">
              {hasFilters ? 'Pas de filters aan of verwijder ze om alles te zien.' : 'Er zijn momenteel geen motors beschikbaar. Kom snel terug!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {motoren.map(motor => (
              <MotorCard key={motor.id} motor={motor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
