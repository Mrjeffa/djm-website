import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over Jeffrey & Anouk | De Jonge Motoren Tholen',
  description: 'Jeffrey en Anouk nemen De Jonge Motoren over. Een nieuw hoofdstuk voor de vertrouwde motordealer in Tholen, Zeeland — met dezelfde eerlijkheid en passie.',
};

export default function OverOnsPage() {
  return (
    <div>
      <div className="bg-[#1A1A1A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">De mensen achter DJM</div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase mb-4">Over ons</h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Een nieuw hoofdstuk voor een vertrouwd adres. Jeffrey en Anouk nemen het stokje over van Léon en Diana.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* JEFFREY & ANOUK */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="aspect-square bg-[#F5F5F5] flex items-center justify-center border border-[#E5E5E5]">
            <span className="font-['Barlow_Condensed'] font-black text-[120px] text-[#E31E24]/10 leading-none">J&A</span>
          </div>
          <div>
            <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">Nieuw eigendom</div>
            <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-4">Jeffrey & Anouk</h2>
            <div className="space-y-4 text-[#555] leading-relaxed text-sm">
              <p>
                Wij zijn Jeffrey en Anouk — en we nemen De Jonge Motoren over. Niet omdat het een goede deal was, maar omdat we er oprecht van houden. Motoren zijn geen product voor ons. Het is een levensstijl.
              </p>
              <p>
                Jeffrey rijdt al jaren en kent de markt van binnenuit. Anouk zorgt ervoor dat alles achter de schermen op rolletjes loopt. Samen maken we van De Jonge Motoren wat het altijd is geweest: een plek waar je eerlijk advies krijgt en zonder druk een motor kunt kopen of verkopen.
              </p>
              <p>
                Léon en Diana — die het bedrijf 25 jaar met hart en ziel hebben gerund — blijven de komende tijd betrokken. Zo is de overgang voor klanten rustig en vertrouwd. Maar de toekomst van DJM, die bouwen wij.
              </p>
              <p className="font-medium text-[#1A1A1A]">
                Als wij een motor niet aan onze eigen familie zouden verkopen, verkopen wij hem niet.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                'Gevestigd in Tholen, Zeeland',
                'Alle merken en types',
                'Eerlijke taxaties',
                'Persoonlijk contact',
                'Proefrit altijd mogelijk',
                'A2 én A rijbewijs',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={14} className="text-[#E31E24] shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LÉON & DIANA — ERFENIS */}
        <div className="bg-[#F5F5F5] border-l-4 border-[#E31E24] p-8 mb-16">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">25 jaar fundament</div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-3">Gebouwd door Léon & Diana</h2>
          <p className="text-[#555] text-sm leading-relaxed max-w-2xl">
            De Jonge Motoren bestaat al 25 jaar. Léon de Jonge begon met motoren vanuit passie, en bouwde met Diana een bedrijf op dat staat voor eerlijkheid en vakmanschap. Die basis nemen wij mee. De naam, de reputatie, het adres op de Stevinweg — en het vertrouwen van al die klanten. Dat is geen vanzelfsprekendheid. Dat is een verantwoordelijkheid.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#E31E24] p-8 text-white text-center">
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-3">Kom langs of bel ons</h2>
          <p className="text-white/80 mb-2 text-sm">Stevinweg 14 · 4691 SM Tholen · 0166-606090</p>
          <p className="text-white/60 mb-6 text-xs">Wo – Vr: 10:00–12:00 en 13:00–17:30 · Overige tijden op afspraak</p>
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
