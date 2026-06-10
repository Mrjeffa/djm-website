import InkoopForm from '@/components/InkoopForm';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Motor verkopen | De Jonge Motoren',
  description: 'Wil je jouw motor verkopen? Vraag een vrijblijvende taxatie aan. Eerlijke prijs, snelle afhandeling. Motordealer Tholen, Zeeland.',
};

export default function MotorVerkopenPage() {
  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Vrijblijvend</div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Motor verkopen
          </h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Wij kopen jouw motor. Geen gedoe, geen tussenpersonen. Eerlijke taxatie, directe betaling.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Hoe werkt het?</h2>
          <div className="space-y-6">
            {[
              { nr: '01', title: 'Vul het formulier in', desc: 'Naam, telefoonnummer, merk/model en km-stand. Dat is alles wat we nodig hebben.' },
              { nr: '02', title: 'We bellen je terug', desc: 'Binnen één werkdag. Eerlijk gesprek, geen verkooppraat.' },
              { nr: '03', title: 'Taxatie op locatie', desc: 'We komen naar jou toe of jij komt langs in Tholen. We beoordelen de motor samen.' },
              { nr: '04', title: 'Directe betaling', desc: 'Akkoord? Betaling dezelfde dag. Motor van de hand, geld op de rekening.' },
            ].map(({ nr, title, desc }) => (
              <div key={nr} className="flex gap-4">
                <div className="font-['Barlow_Condensed'] font-black text-3xl text-[#E31E24]/20 w-10 shrink-0">{nr}</div>
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-lg uppercase mb-1">{title}</h3>
                  <p className="text-[#888] text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#F5F5F5] p-6 border-l-4 border-[#E31E24]">
            <h3 className="font-['Barlow_Condensed'] font-bold uppercase mb-3">Waarom bij DJM verkopen?</h3>
            {[
              'Eerlijke taxatie, geen gefluister',
              'Geen wachten op kopers via Marktplaats',
              'Directe uitbetaling, geen discussie',
              'Alle merken en types welkom',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#555] mb-2">
                <CheckCircle size={14} className="text-[#E31E24] shrink-0" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Taxatie aanvragen</h2>
          <div className="bg-[#E31E24] p-6">
            <InkoopForm />
          </div>
        </div>
      </div>
    </div>
  );
}
