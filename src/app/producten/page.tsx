import { getProducten } from '@/lib/producten';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onderdelen & Accessoires | De Jonge Motoren',
  description: 'Motoronderdelen en accessoires bij De Jonge Motoren in Tholen, Zeeland. Bekijk ons aanbod van onderdelen en rijkleding.',
};

export const runtime = 'edge';
export const revalidate = 60;

export default async function ProductenPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;
  const categorie = params.categorie === 'onderdelen' || params.categorie === 'accessoires'
    ? params.categorie : undefined;

  const producten = await getProducten(categorie);

  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">
            {producten.length} artikelen beschikbaar
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Onderdelen &amp;<br />Accessoires
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Categorie filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { value: '', label: 'Alles' },
            { value: 'onderdelen', label: 'Onderdelen' },
            { value: 'accessoires', label: 'Accessoires' },
          ].map(({ value, label }) => (
            <a
              key={value}
              href={value ? `/producten?categorie=${value}` : '/producten'}
              className={`font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest px-5 py-2.5 border transition-colors ${
                (categorie ?? '') === value
                  ? 'bg-[#E31E24] text-white border-[#E31E24]'
                  : 'border-[#E5E5E5] text-[#555] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {producten.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-['Barlow_Condensed'] font-black text-[5rem] text-[#F0F0F0] leading-none mb-4">0</div>
            <p className="font-['Barlow_Condensed'] text-2xl uppercase font-black mb-2">Geen artikelen gevonden</p>
            <p className="text-sm text-[#888]">
              Momenteel zijn er geen {categorie ?? 'artikelen'} beschikbaar. Neem contact op voor meer informatie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {producten.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
