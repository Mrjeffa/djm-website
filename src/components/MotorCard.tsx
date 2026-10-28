import Link from 'next/link';
import { Bike } from 'lucide-react';
import { cld, cldSrcSet } from '@/lib/cloudinary';
import { formatKm, formatPrijs, isNieuwBinnen, motorPad, type Motor } from '@/lib/motors';

export default function MotorCard({ motor, prioriteit = false, kop = 'h3' }: { motor: Motor; prioriteit?: boolean; kop?: 'h2' | 'h3' }) {
  const Kop = kop;
  const foto = motor.fotos[0];
  return (
    <article className="group relative flex flex-col border border-line bg-white transition-colors duration-150 hover:border-ink">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cld(foto, 'f_auto,q_auto,c_fill,ar_4:3,w_640')}
            srcSet={cldSrcSet(foto, [400, 640, 900], ',c_fill,ar_4:3')}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt={`${motor.naam} uit ${motor.bouwjaar}`}
            width={640}
            height={480}
            loading={prioriteit ? 'eager' : 'lazy'}
            fetchPriority={prioriteit ? 'high' : undefined}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted"><Bike size={56} aria-hidden /></div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {motor.status === 'gereserveerd' && (
            <span className="bg-amber px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wide text-white">Gereserveerd</span>
          )}
          {motor.status !== 'gereserveerd' && isNieuwBinnen(motor.datumIn) && (
            <span className="bg-red px-2.5 py-1 font-display text-sm font-bold uppercase tracking-wide text-white">Nieuw binnen</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="tabular text-sm text-muted">
          {[motor.bouwjaar, formatKm(motor.km, motor.kmEenheid), motor.categorie].filter(Boolean).join(' · ')}
        </p>
        <Kop className="mt-1.5 text-2xl">
          <Link href={motorPad(motor)} className="after:absolute after:inset-0 group-hover:text-red">
            {motor.naam}
          </Link>
        </Kop>
        <p className="tabular mt-auto pt-4 font-display text-3xl font-extrabold">{formatPrijs(motor.prijs)}</p>
      </div>
    </article>
  );
}
