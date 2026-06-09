import ProefritForm from '@/components/ProefritForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proefrit aanvragen | De Jonge Motoren',
  description: 'Vraag een proefrit aan voor een occasion motor bij De Jonge Motoren in Tholen, Zeeland.',
};

export default function ProefritPage() {
  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">Kom langs</div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase mb-4">Proefrit aanvragen</h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Een motor koop je niet op basis van foto&apos;s. Kom langs, rij hem, voel of hij bij je past. Geen druk.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Barlow_Condensed'] font-bold text-3xl uppercase mb-6">Wat kun je verwachten?</h2>
          <div className="space-y-4 text-sm text-[#555] leading-relaxed">
            <p>Je vraagt een proefrit aan via het formulier. Jeffrey belt je terug om een moment af te spreken.</p>
            <p>Je komt langs in Tholen. Je rijdt de motor, Jeffrey rijdt mee of wacht je op. Geen haast, geen druk.</p>
            <p>Bevalt hij? Dan praten we over de prijs. Niet? Dan ga je gewoon weer naar huis. Zo simpel is het.</p>
          </div>

          <div className="mt-8 bg-[#F5F5F5] p-5 border border-[#E5E5E5]">
            <div className="font-['Barlow_Condensed'] font-bold uppercase text-sm mb-3 text-[#888]">Praktisch</div>
            <div className="space-y-2 text-sm text-[#555]">
              <div><strong>Locatie:</strong> Tholen, Zeeland</div>
              <div><strong>Rijbewijs:</strong> Geldig rijbewijs vereist (A of A2)</div>
              <div><strong>Helm:</strong> Neem eigen helm mee</div>
              <div><strong>Kosten:</strong> Gratis, vrijblijvend</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-['Barlow_Condensed'] font-bold text-3xl uppercase mb-6">Plan jouw proefrit</h2>
          <div className="border border-[#E5E5E5] p-6">
            <ProefritForm />
          </div>
        </div>
      </div>
    </div>
  );
}
