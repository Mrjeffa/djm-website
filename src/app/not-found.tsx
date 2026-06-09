import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-['Barlow_Condensed'] font-black text-[120px] leading-none text-[#E31E24]/10">404</div>
        <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-3">Pagina niet gevonden</h1>
        <p className="text-[#888] mb-8">Deze pagina bestaat niet (meer). Misschien is de motor al verkocht?</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/aanbod" className="inline-flex items-center gap-1 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase px-6 py-3 hover:bg-[#c01920] transition-colors">
            Bekijk aanbod <ArrowRight size={14} />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1 border border-[#1A1A1A] font-['Barlow_Condensed'] font-bold uppercase px-6 py-3 hover:bg-[#1A1A1A] hover:text-white transition-colors">
            Naar homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
