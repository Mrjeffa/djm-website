import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Jeffrey & De Jonge Motoren | DJM',
  description: 'Leer Jeffrey kennen — de man achter De Jonge Motoren. Eerlijke motordealer in Tholen, Zeeland.',
};

export default function OverOnsPage() {
  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">De mens achter DJM</div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase mb-4">Over Jeffrey</h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Geen groot bedrijf. Geen anoniem callcenter. Gewoon Jeffrey, en zijn passie voor motoren.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center border border-[#E5E5E5]">
            <span className="font-['Barlow_Condensed'] font-black text-[160px] text-[#E31E24]/10 leading-none">J</span>
          </div>
          <div>
            <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-4">Ik ben Jeffrey.</h2>
            <div className="space-y-4 text-[#555] leading-relaxed text-sm">
              <p>
                Ik ben opgegroeid met motoren. Mijn vader had er altijd één staan, en ik kon nauwelijks wachten totdat ik zelf mocht rijden. Nu, jaren later, is dat gevoel er nog steeds.
              </p>
              <p>
                De Jonge Motoren is mijn bedrijf. Klein, persoonlijk, en gebouwd op eerlijkheid. Ik koop motoren die ik zelf zou willen rijden, en ik verkoop ze aan mensen die ik ken of leer kennen.
              </p>
              <p>
                Geen verkooppraatjes. Geen verstopte gebreken. Geen &ldquo;bel voor de prijs&rdquo;. Wat je ziet is wat je krijgt — inclusief eerlijk advies als een motor toch niet helemaal bij je past.
              </p>
              <p className="font-medium text-[#1A1A1A]">
                Als ik een motor niet aan mijn eigen vader zou verkopen, verkoop ik hem niet.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                'Gevestigd in Tholen, Zeeland',
                'Alle merken en types',
                'Eerlijke taxaties',
                'Persoonlijk contact',
                'Proefrit altijd mogelijk',
                'A2 en A rijbewijs',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={14} className="text-[#E31E24] shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#E31E24] p-8 text-white text-center">
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-3">Klaar om te rijden?</h2>
          <p className="text-white/80 mb-6">Bekijk het aanbod of neem direct contact op.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/aanbod" className="inline-flex items-center gap-1 bg-white text-[#E31E24] font-['Barlow_Condensed'] font-bold uppercase px-6 py-3 hover:bg-white/90 transition-colors">
              Bekijk aanbod <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-1 border border-white text-white font-['Barlow_Condensed'] font-bold uppercase px-6 py-3 hover:bg-white/10 transition-colors">
              Contact opnemen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
