import { Package } from 'lucide-react';
import { type Product, formatProductPrijs } from '@/lib/producten';

export default function ProductCard({ product }: { product: Product }) {
  const foto = product.fotos?.[0];
  return (
    <div className="group bg-white border border-[#E5E5E5] hover:border-[#E31E24] transition-colors overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto}
            alt={product.naam}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-[#DDD]" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="bg-[#0A0A0A] text-white text-[9px] font-['Barlow_Condensed'] font-black uppercase tracking-[2px] px-2 py-1">
            {product.categorie === 'onderdelen' ? 'Onderdeel' : 'Accessoire'}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-['Barlow_Condensed'] font-black text-lg uppercase leading-tight text-[#0A0A0A] mb-2 flex-1">
          {product.naam}
        </h3>
        {product.omschrijving && (
          <p className="text-xs text-[#888] leading-relaxed mb-3 line-clamp-2">{product.omschrijving}</p>
        )}
        <div className="font-['Barlow_Condensed'] font-black text-xl text-[#E31E24]">
          {formatProductPrijs(product.prijs)}
        </div>
      </div>
    </div>
  );
}
