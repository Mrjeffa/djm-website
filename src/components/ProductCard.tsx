import { MessageCircle, Package } from 'lucide-react';
import { cld, cldSrcSet } from '@/lib/cloudinary';
import { formatProductPrijs, type Product } from '@/lib/producten';
import { whatsappUrl } from '@/lib/site';

export default function ProductCard({ product }: { product: Product }) {
  const foto = product.fotos[0];
  return (
    <article className="flex flex-col border border-line bg-white">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cld(foto, 'f_auto,q_auto,c_fill,ar_1:1,w_600')}
            srcSet={cldSrcSet(foto, [360, 600, 900], ',c_fill,ar_1:1')}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            alt={product.naam}
            width={600}
            height={600}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted"><Package size={48} aria-hidden /></div>
        )}
        <span className="absolute left-3 top-3 bg-ink px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wide text-white">
          {product.categorie === 'accessoires' ? 'Accessoire' : 'Onderdeel'}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl">{product.naam}</h2>
        {product.omschrijving && <p className="mt-2 line-clamp-3 text-[15px] text-muted">{product.omschrijving}</p>}
        <p className="tabular mt-auto pt-4 font-display text-2xl font-extrabold">{formatProductPrijs(product.prijs)}</p>
        <a
          href={whatsappUrl(`Hoi, is dit artikel nog beschikbaar: ${product.naam}?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-4 w-full"
        >
          <MessageCircle size={18} aria-hidden /> Vraag beschikbaarheid
        </a>
      </div>
    </article>
  );
}
