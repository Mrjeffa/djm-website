import ProefritForm from '@/components/ProefritForm';
import { getMotors } from '@/lib/motors';
import { getInstellingen } from '@/lib/getInstellingen';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proefrit aanvragen | De Jonge Motoren',
  description: 'Vraag een proefrit aan voor een occasion motor bij De Jonge Motoren in Tholen, Zeeland. Kies een motor uit ons aanbod en wij plannen een moment.',
};

export const runtime = 'edge';
export const revalidate = 60;

export default async function ProefritPage({
  searchParams,
}: {
  searchParams: Promise<{ motorId?: string; motorNaam?: string }>;
}) {
  const [params, motoren, instellingen] = await Promise.all([
    searchParams,
    getMotors(),
    getInstellingen(),
  ]);

  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Kom langs</div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Proefrit aanvragen
          </h1>
          <p className="text-[#AAA] max-w-xl leading-relaxed">
            Een motor koop je niet op basis van foto&apos;s. Kom langs, rij hem, voel of hij bij je past. Geen druk, geen verplichtingen.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Wat kun je verwachten?</h2>
          <div className="space-y-4 text-sm text-[#555] leading-relaxed">
            <p>Je vraagt een proefrit aan via het formulier hiernaast. We bellen je zo snel mogelijk terug om een moment af te spreken dat jou uitkomt.</p>
            <p>Je komt langs in Tholen. Je rijdt de motor — op jouw tempo, zonder haast. Er is geen druk om te kopen.</p>
            <p>Bevalt hij? Dan praten we over de prijs. Niet? Dan ga je gewoon weer naar huis. Zo simpel is het.</p>
          </div>

          <div className="mt-8 bg-[#F5F5F5] p-5 border border-[#E5E5E5]">
            <div className="font-['Barlow_Condensed'] font-bold uppercase text-sm mb-3 text-[#888]">Praktisch</div>
            <div className="space-y-2 text-sm text-[#555]">
              <div><strong className="text-[#1A1A1A]">Locatie:</strong> Stevinweg 14, Tholen (Zeeland)</div>
              <div><strong className="text-[#1A1A1A]">Rijbewijs:</strong> Geldig rijbewijs vereist (A of A2)</div>
              <div><strong className="text-[#1A1A1A]">Helm:</strong> Neem eigen helm mee</div>
              <div><strong className="text-[#1A1A1A]">Kosten:</strong> Gratis, vrijblijvend</div>
              <div><strong className="text-[#1A1A1A]">Telefoon:</strong> <a href="tel:+31166606090" className="hover:text-[#E31E24] transition-colors">0166-606090</a></div>
            </div>
          </div>

          <div className="mt-6 bg-[#E31E24]/5 border border-[#E31E24]/20 p-5">
            <p className="text-sm text-[#444] leading-relaxed">
              <strong className="text-[#E31E24] font-['Barlow_Condensed'] uppercase text-xs tracking-widest block mb-2">Liever direct bellen?</strong>
              Bel ons op <a href="tel:+31166606090" className="font-bold text-[#1A1A1A] hover:text-[#E31E24] transition-colors">0166-606090</a> — dan plannen we meteen iets in.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Plan jouw proefrit</h2>
          <div className="border border-[#E5E5E5] p-6">
            <ProefritForm
              motorId={params.motorId}
              motorNaam={params.motorNaam}
              motoren={motoren}
              instellingen={instellingen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
