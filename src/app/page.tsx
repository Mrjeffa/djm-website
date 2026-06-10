import Link from 'next/link';
import { ArrowRight, CheckCircle, Smartphone, Wrench, TrendingUp, Bell } from 'lucide-react';
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
      <section className="relative min-h-screen bg-[#0A0A0A] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#E31E24]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-16 pt-32">
          <div className="font-['Barlow_Condensed'] text-[11px] font-bold uppercase tracking-[6px] text-[#E31E24] mb-6">
            Motordealer · Tholen · Zeeland
          </div>

          <h1 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}>
            Jouw vrijheid.<br />
            <span className="text-[#E31E24]">Vind hem hier.</span>
          </h1>

          <p className="text-[#AAA] text-lg max-w-lg mb-10 font-['Barlow'] leading-relaxed">
            Occasion motors kopen, verkopen en proefrijden. Eerlijk geprijsd, persoonlijk advies — zonder verkooppraatjes.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/aanbod"
              className="group inline-flex items-center gap-3 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase tracking-widest px-8 py-4 text-base hover:bg-white hover:text-[#E31E24] transition-all duration-200">
              Bekijk aanbod
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/motor-verkopen"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-['Barlow_Condensed'] font-bold uppercase tracking-widest px-8 py-4 text-base hover:border-white hover:bg-white/10 transition-all duration-200">
              Motor verkopen
            </Link>
          </div>

          <div className="border-t border-white/10 pt-8 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { nr: '25+', label: 'Jaar ervaring' },
              { nr: '100%', label: 'Eerlijk advies' },
              { nr: '★ 4.9', label: 'Google Reviews' },
            ].map(({ nr, label }) => (
              <div key={label}>
                <div className="font-['Barlow_Condensed'] font-black text-white text-2xl">{nr}</div>
                <div className="text-[#666] text-xs uppercase tracking-widest font-['Barlow_Condensed'] font-bold mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 NIEUW BINNEN */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Vers in de showroom</div>
              <h2 className="font-['Barlow_Condensed'] font-black uppercase leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Nieuw binnen
              </h2>
            </div>
            <Link href="/aanbod"
              className="hidden sm:inline-flex items-center gap-2 font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest text-[#E31E24] border-b border-[#E31E24]/30 hover:border-[#E31E24] pb-0.5 transition-colors">
              Bekijk alles <ArrowRight size={13} />
            </Link>
          </div>

          {motoren.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] bg-[#F5F5F5] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {motoren.map(motor => <MotorCard key={motor.id} motor={motor} />)}
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/aanbod" className="inline-flex items-center gap-1 font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24]">
              Bekijk alle motoren <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 DRIE ROUTES */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-3 text-center">Waarvoor kom je hier?</div>
          <h2 className="font-['Barlow_Condensed'] font-black text-white uppercase text-center leading-none mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Drie routes. Kies de jouwe.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222]">
            {[
              {
                nr: '01',
                title: 'Motor kopen',
                desc: 'Bekijk het complete aanbod occasion motors. Eerlijk geprijsd, altijd proefrijden mogelijk.',
                href: '/aanbod',
                cta: 'Bekijk aanbod',
              },
              {
                nr: '02',
                title: 'Motor verkopen',
                desc: 'Wij kopen jouw motor. Vrijblijvende taxatie, snelle afhandeling, eerlijke prijs.',
                href: '/motor-verkopen',
                cta: 'Taxatie aanvragen',
              },
              {
                nr: '03',
                title: 'Proefrit',
                desc: 'Serieuze interesse? Kom langs voor een proefrit. Geen druk, gewoon rijden.',
                href: '/proefrit',
                cta: 'Proefrit plannen',
              },
            ].map(({ nr, title, desc, href, cta }) => (
              <Link key={href} href={href}
                className="group bg-[#111] p-8 hover:bg-[#E31E24] transition-colors duration-300 cursor-pointer">
                <div className="font-['Barlow_Condensed'] font-black text-6xl text-white/5 group-hover:text-white/10 leading-none mb-4 transition-colors">{nr}</div>
                <h3 className="font-['Barlow_Condensed'] font-black text-white uppercase text-2xl mb-3">{title}</h3>
                <p className="text-[#777] group-hover:text-white/70 text-sm leading-relaxed mb-6 transition-colors">{desc}</p>
                <span className="inline-flex items-center gap-2 font-['Barlow_Condensed'] font-bold uppercase text-sm text-[#E31E24] group-hover:text-white border-b border-[#E31E24]/30 group-hover:border-white/30 pb-0.5 transition-colors">
                  {cta} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 HOE HET WERKT */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-3 text-center">Simpel en helder</div>
          <h2 className="font-['Barlow_Condensed'] font-black uppercase text-center leading-none mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Zo werkt het
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { nr: '01', title: 'Kies je motor', desc: 'Bekijk het aanbod online of kom langs in Tholen. Filter op merk, type, prijs en km-stand.' },
              { nr: '02', title: 'Vraag proefrit aan', desc: 'Serieuze interesse? Vraag een proefrit aan via de website of bel ons direct op 0166-606090.' },
              { nr: '03', title: 'Rij hem mee', desc: 'Eens over de prijs? Alle papieren worden geregeld. Jij rijdt dezelfde dag nog weg.' },
            ].map(({ nr, title, desc }) => (
              <div key={nr} className="relative">
                <div className="font-['Barlow_Condensed'] font-black text-[7rem] text-[#F0F0F0] leading-none absolute -top-4 -left-2 select-none pointer-events-none">{nr}</div>
                <div className="relative pt-8 pl-4">
                  <h3 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mb-3">{title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 OVER ONS */}
      <section className="py-20 px-4 bg-[#0A0A0A] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-3">Wie zijn wij?</div>
              <h2 className="font-['Barlow_Condensed'] font-black uppercase leading-none mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                De mensen<br />achter DJM
              </h2>
              <p className="text-[#AAA] leading-relaxed mb-6 max-w-lg">
                We nemen De Jonge Motoren over — 25 jaar reputatie, dezelfde eerlijkheid. Geen verkooppraatjes, geen verstopte gebreken. Gewoon een goede motor, eerlijk advies, en een handdruk.
              </p>
              <p className="text-[#666] text-sm leading-relaxed mb-8 max-w-lg">
                Léon en Diana de Jonge bouwden dit bedrijf op met passie en integriteit. Die erfenis nemen wij serieus.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {['Eerlijk', 'Persoonlijk', 'Transparant', '25 jaar ervaring'].map(w => (
                  <span key={w} className="flex items-center gap-2 text-sm text-[#888]">
                    <CheckCircle size={14} className="text-[#E31E24]" /> {w}
                  </span>
                ))}
              </div>
              <Link href="/over-ons"
                className="inline-flex items-center gap-2 font-['Barlow_Condensed'] font-bold uppercase text-sm tracking-widest text-[#E31E24] border-b border-[#E31E24]/30 hover:border-[#E31E24] pb-0.5 transition-colors">
                Meer over ons <ArrowRight size={13} />
              </Link>
            </div>

            <div className="border-l-4 border-[#E31E24] pl-8">
              <blockquote className="font-['Barlow_Condensed'] font-black text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                &ldquo;Als wij een motor niet aan onze eigen familie zouden verkopen, verkopen wij hem niet.&rdquo;
              </blockquote>
              <div className="font-['Barlow_Condensed'] font-bold text-[#E31E24] uppercase text-sm tracking-widest">De eigenaren</div>
              <div className="text-[#555] text-xs uppercase tracking-widest mt-1">De Jonge Motoren · Tholen</div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 REVIEWS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-3 text-center">Google Reviews</div>
          <h2 className="font-['Barlow_Condensed'] font-black uppercase text-center leading-none mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Wat klanten zeggen
          </h2>
          <p className="text-center text-[#888] text-sm mb-12 font-['Barlow_Condensed'] uppercase tracking-widest">★★★★★ 4.9 / 5</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { naam: 'Thomas V.', tekst: 'Super ervaring bij DJM. Eerlijke prijs, geen druk en de motor was exact zoals beschreven. Aanrader!', rating: 5 },
              { naam: 'Marloes de B.', tekst: 'Mijn eerste motor gekocht via DJM. Het team nam de tijd om alles uit te leggen. Echt een fijne dealer.', rating: 5 },
              { naam: 'Remco P.', tekst: 'Motor verkocht aan DJM. Binnen een dag geregeld, eerlijke taxatie en direct betaald. Perfect.', rating: 5 },
            ].map(({ naam, tekst, rating }) => (
              <div key={naam} className="bg-[#F8F8F8] p-8 border-t-4 border-[#E31E24]">
                <div className="text-[#E31E24] text-lg mb-4 tracking-widest">{'★'.repeat(rating)}</div>
                <p className="text-sm text-[#444] leading-relaxed mb-6">&ldquo;{tekst}&rdquo;</p>
                <div className="font-['Barlow_Condensed'] font-black text-sm uppercase tracking-widest">{naam}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 DE DJM APP */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-3">Voor klanten</div>
              <h2 className="font-['Barlow_Condensed'] font-black text-white uppercase leading-none mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Alles over<br />jouw motor<br />
                <span className="text-[#E31E24]">op één plek.</span>
              </h2>
              <p className="text-[#AAA] leading-relaxed mb-8 max-w-lg">
                De DJM app is jouw persoonlijk onderhoudsdossier. Beheer je motor, houd de km-stand bij, plan een servicebeurt en zie wanneer je banden of ketting aan vervanging toe zijn — alles op je telefoon.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Wrench, title: 'Onderhoud bijhouden', desc: 'Servicehistorie altijd bij de hand' },
                  { icon: TrendingUp, title: 'Km-stand registreren', desc: 'Grafiek van jouw rijgedrag' },
                  { icon: Bell, title: 'Slimme meldingen', desc: 'Nooit meer een beurt missen' },
                  { icon: Smartphone, title: 'Afspraken inplannen', desc: 'Serviceafspraak in 30 seconden' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start">
                    <div className="bg-[#E31E24]/10 p-2 shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#E31E24]" />
                    </div>
                    <div>
                      <div className="font-['Barlow_Condensed'] font-bold text-white uppercase text-sm">{title}</div>
                      <div className="text-[#555] text-xs mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#666] text-xs">Beschikbaar voor bestaande klanten van De Jonge Motoren.</p>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-56 h-96 bg-[#111] border-2 border-[#222] rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl">
                  <div className="w-12 h-1.5 bg-[#333] rounded-full mb-8" />
                  <div className="w-10 h-10 bg-[#E31E24] rounded-2xl flex items-center justify-center mb-4">
                    <Smartphone size={22} className="text-white" />
                  </div>
                  <div className="font-['Barlow_Condensed'] font-black text-white text-lg uppercase tracking-widest mb-1">DJM</div>
                  <div className="font-['Barlow_Condensed'] text-[#555] text-xs uppercase tracking-[3px]">Motor app</div>
                  <div className="mt-8 w-32 h-1 bg-[#222] rounded-full" />
                  <div className="mt-2 w-24 h-1 bg-[#1A1A1A] rounded-full" />
                  <div className="mt-2 w-20 h-1 bg-[#1A1A1A] rounded-full" />
                  <div className="mt-6 w-8 h-8 bg-[#222] rounded-full" />
                </div>
                <div className="absolute -top-3 -right-3 bg-[#E31E24] text-white text-xs font-['Barlow_Condensed'] font-bold uppercase px-3 py-1 rounded">
                  Klanten app
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 INKOOP CTA */}
      <section className="py-20 px-4 bg-[#E31E24]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-white/60 mb-3">Wil je verkopen?</div>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Motor te koop?<br />Wij kopen hem.
            </h2>
            <p className="text-white/80 leading-relaxed mb-0 max-w-md">
              Vrijblijvende taxatie, eerlijke prijs, directe afhandeling. Bel of vul het formulier in.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-8">
            <InkoopForm />
          </div>
        </div>
      </section>
    </div>
  );
}
