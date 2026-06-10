import Link from 'next/link';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { getNieuweMotors } from '@/lib/motors';
import MotorCard from '@/components/MotorCard';
import InkoopForm from '@/components/InkoopForm';

export const runtime = 'edge';
export const revalidate = 60;

export default async function HomePage() {
  const motoren = await getNieuweMotors(4);

  return (
    <div>
      {/* 01 HERO */}
      <section className="relative min-h-[90vh] bg-[#1A1A1A] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
          <div className="font-['Barlow_Condensed'] text-[11px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-4">
            Motordealer Tholen · Zeeland
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tight mb-6">
            Jouw vrijheid.<br />
            <span className="text-[#E31E24]">Vind hem hier.</span>
          </h1>
          <p className="text-[#AAA] text-lg max-w-xl mb-8 font-['Barlow'] leading-relaxed">
            Occasion motors kopen, verkopen en proefrijden. Eerlijk geprijsd, persoonlijk advies. Geen gedoe.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/aanbod"
              className="inline-flex items-center gap-2 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide px-8 py-4 text-lg hover:bg-[#c01920] transition-colors"
            >
              Bekijk aanbod <ArrowRight size={18} />
            </Link>
            <Link
              href="/motor-verkopen"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-['Barlow_Condensed'] font-bold uppercase tracking-wide px-8 py-4 text-lg hover:bg-white/20 transition-colors"
            >
              Motor verkopen
            </Link>
          </div>
        </div>
      </section>

      {/* 02 NIEUW BINNEN */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">Vers in de showroom</div>
              <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase">Nieuw binnen</h2>
            </div>
            <Link href="/aanbod" className="hidden sm:flex items-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24] hover:underline">
              Bekijk alles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {motoren.map(motor => (
              <MotorCard key={motor.id} motor={motor} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/aanbod" className="inline-flex items-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24]">
              Bekijk alle motoren <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 WAARVOOR KOM JE HIER */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-center mb-2">Waarvoor kom je hier?</h2>
          <p className="text-center text-[#888] text-sm mb-10">Drie routes. Kies de jouwe.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Motor kopen',
                desc: 'Bekijk het complete aanbod occasion motors. Eerlijk geprijsd, altijd proefrijden mogelijk.',
                href: '/aanbod',
                cta: 'Bekijk aanbod',
                bg: '#E31E24',
              },
              {
                title: 'Motor verkopen',
                desc: 'Wij kopen jouw motor. Vrijblijvende taxatie, snelle afhandeling, eerlijke prijs.',
                href: '/motor-verkopen',
                cta: 'Taxatie aanvragen',
                bg: '#1A1A1A',
              },
              {
                title: 'Proefrit aanvragen',
                desc: 'Serieuze interesse? Kom langs voor een proefrit. Geen druk, gewoon rijden.',
                href: '/proefrit',
                cta: 'Proefrit plannen',
                bg: '#333',
              },
            ].map(({ title, desc, href, cta, bg }) => (
              <Link
                key={href}
                href={href}
                style={{ background: bg }}
                className="group p-8 text-white hover:opacity-90 transition-opacity"
              >
                <h3 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-3">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{desc}</p>
                <span className="inline-flex items-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-sm border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">
                  {cta} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 HOE HET WERKT */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-center mb-2">Hoe het werkt</h2>
          <p className="text-center text-[#888] text-sm mb-12">Drie stappen. Dat is alles.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { nr: '01', title: 'Kies je motor', desc: 'Bekijk het aanbod online of kom langs in Tholen. Filter op merk, type, prijs en km-stand.' },
              { nr: '02', title: 'Vraag proefrit aan', desc: 'Serieuze interesse? Vraag een proefrit aan via de website of bel Jeffrey direct.' },
              { nr: '03', title: 'Rij hem mee naar huis', desc: 'Eens over de prijs? Alle papieren worden geregeld. Jij rijdt dezelfde dag nog weg.' },
            ].map(({ nr, title, desc }) => (
              <div key={nr} className="flex gap-4">
                <div className="font-['Barlow_Condensed'] font-black text-5xl text-[#E31E24]/20 leading-none shrink-0 w-14">{nr}</div>
                <div>
                  <h3 className="font-['Barlow_Condensed'] font-bold text-xl uppercase mb-2">{title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 JEFFREY PERSOONLIJK */}
      <section className="py-16 px-4 bg-[#1A1A1A] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 rounded-full bg-[#2A2A2A] border-4 border-[#E31E24] flex-shrink-0 overflow-hidden flex items-center justify-center">
            <span className="font-['Barlow_Condensed'] font-black text-4xl text-[#E31E24]">J&A</span>
          </div>
          <div>
            <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-2">De nieuwe eigenaren</div>
            <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-4">Jeffrey & Anouk</h2>
            <p className="text-[#AAA] leading-relaxed max-w-xl mb-6">
              Wij nemen De Jonge Motoren over — 25 jaar reputatie, dezelfde eerlijkheid. Geen verkooppraatjes, geen verstopte gebreken. Gewoon een goede motor en een handdruk. Als wij hem niet aan onze eigen familie zouden verkopen, verkopen wij hem niet.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              {['Eerlijk', 'Persoonlijk', 'Transparant'].map(w => (
                <span key={w} className="flex items-center gap-1.5 text-sm text-[#888]">
                  <CheckCircle size={14} className="text-[#E31E24]" /> {w}
                </span>
              ))}
            </div>
            <Link href="/over-ons" className="inline-flex items-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24] hover:underline">
              Meer over ons <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 GOOGLE REVIEWS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#FACC15] fill-[#FACC15]" />)}
            </div>
          </div>
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase text-center mb-2">Wat klanten zeggen</h2>
          <p className="text-center text-[#888] text-sm mb-10">4.9 / 5 op Google Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { naam: 'Thomas V.', tekst: 'Super ervaring bij Jeffrey. Eerlijke prijs, geen druk en de motor was exact zoals beschreven. Aanrader!', rating: 5 },
              { naam: 'Marloes de B.', tekst: 'Mijn eerste motor gekocht via DJM. Jeffrey nam de tijd om alles uit te leggen. Echt een fijne dealer.', rating: 5 },
              { naam: 'Remco P.', tekst: 'Motor verkocht aan Jeffrey. Binnen een dag geregeld, eerlijke taxatie en direct betaald. Perfect.', rating: 5 },
            ].map(({ naam, tekst, rating }) => (
              <div key={naam} className="border border-[#E5E5E5] p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#FACC15] fill-[#FACC15]" />
                  ))}
                </div>
                <p className="text-sm text-[#555] leading-relaxed mb-4">&ldquo;{tekst}&rdquo;</p>
                <div className="font-['Barlow_Condensed'] font-bold text-sm uppercase">{naam}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 MOTOR TE KOOP */}
      <section className="py-16 px-4 bg-[#E31E24]">
        <div className="max-w-3xl mx-auto text-center text-white mb-10">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-white/60 mb-2">Wil je verkopen?</div>
          <h2 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-3">Heb jij een motor te koop?</h2>
          <p className="text-white/80 leading-relaxed">
            Wij kopen hem. Vrijblijvende taxatie, eerlijke prijs, directe afhandeling.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <InkoopForm />
        </div>
      </section>
    </div>
  );
}
