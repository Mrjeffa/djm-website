import { getMotorById, getMotors, formatPrijs, formatKm } from '@/lib/motors';
import { notFound } from 'next/navigation';
import ProefritForm from '@/components/ProefritForm';
import MotorCard from '@/components/MotorCard';
import { Bike, Calendar, Gauge, Zap, MessageCircle, Phone, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const runtime = 'edge';
export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const motor = await getMotorById(slug);
  if (!motor) return { title: 'Motor niet gevonden' };
  return {
    title: `${motor.bouwjaar} ${motor.merk} ${motor.model} kopen — Occasion Tholen`,
    description: `${motor.merk} ${motor.model} uit ${motor.bouwjaar}, ${formatKm(motor.km)}, ${formatPrijs(motor.prijs)}. ${motor.beschrijving?.slice(0, 120) ?? 'Occasion motorfiets bij De Jonge Motoren in Tholen, Zeeland.'}`,
  };
}

export default async function MotorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const motor = await getMotorById(slug);
  if (!motor) notFound();

  const vergelijkbaar = (await getMotors(motor.type ? { type: motor.type } : undefined))
    .filter(m => m.id !== motor.id)
    .slice(0, 3);

  const motorNaam = `${motor.merk} ${motor.model} (${motor.bouwjaar})`;
  const whatsappMsg = encodeURIComponent(`Hoi, ik heb interesse in de ${motorNaam} — ${formatPrijs(motor.prijs)}.`);

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Motorcycle",
    "name": motorNaam,
    "brand": { "@type": "Brand", "name": motor.merk },
    "model": motor.model,
    "vehicleModelDate": String(motor.bouwjaar),
    "mileageFromOdometer": { "@type": "QuantitativeValue", "value": motor.km, "unitCode": "KMT" },
    "itemCondition": "https://schema.org/UsedCondition",
    ...(motor.kleur && { "color": motor.kleur }),
    ...(motor.fotos?.[0] && { "image": motor.fotos[0] }),
    "url": `https://www.dejongemotoren.nl/motor/${motor.id}`,
    "offers": {
      "@type": "Offer",
      "price": motor.prijs,
      "priceCurrency": "EUR",
      "availability": motor.status === 'gereserveerd'
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/InStock",
      "seller": {
        "@type": "MotorcycleDealer",
        "name": "De Jonge Motoren",
        "telephone": "+31166606090",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Stevinweg 14",
          "addressLocality": "Tholen",
          "postalCode": "4691 SM",
          "addressCountry": "NL",
        },
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FOTO + INFO */}
          <div className="lg:col-span-2">
            <div className="aspect-[4/3] bg-[#F5F5F5] flex items-center justify-center mb-4 overflow-hidden">
              {motor.fotos?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={motor.fotos[0]} alt={motorNaam} className="w-full h-full object-cover" />
              ) : (
                <Bike size={80} className="text-[#DDD]" />
              )}
            </div>

            {motor.fotos?.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mb-6">
                {motor.fotos.slice(1, 5).map((foto, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={foto} alt="" className="aspect-square object-cover" />
                ))}
              </div>
            )}

            <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[3px] text-[#E31E24] mb-1">
              {[motor.type, String(motor.bouwjaar)].filter(Boolean).join(' · ')}
            </div>
            <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase mb-2">
              {motor.merk} {motor.model}
            </h1>
            <div className="font-['Barlow_Condensed'] font-black text-3xl text-[#E31E24] mb-2">
              {formatPrijs(motor.prijs)}
            </div>
            {motor.status === 'gereserveerd' && (
              <div className="inline-block bg-[#F59E0B] text-white text-xs font-['Barlow_Condensed'] font-bold uppercase px-3 py-1 mb-4">
                Gereserveerd — bel voor beschikbaarheid
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: Calendar, label: 'Bouwjaar', value: String(motor.bouwjaar) },
                { icon: Gauge, label: 'Km-stand', value: formatKm(motor.km) },
                { icon: Zap, label: 'Vermogen', value: motor.vermogen ?? '—' },
                { icon: Tag, label: 'Kleur', value: motor.kleur ?? '—' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#F5F5F5] p-3">
                  <div className="flex items-center gap-1.5 text-[#888] text-xs mb-1">
                    <Icon size={12} /> {label}
                  </div>
                  <div className="font-['Barlow_Condensed'] font-bold text-sm">{value}</div>
                </div>
              ))}
            </div>

            {motor.beschrijving && (
              <div className="border-t border-[#E5E5E5] pt-6">
                <h2 className="font-['Barlow_Condensed'] font-bold text-xl uppercase mb-3">Omschrijving</h2>
                <p className="text-[#555] text-sm leading-relaxed">{motor.beschrijving}</p>
              </div>
            )}

            {motor.kenteken && (
              <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                <div className="text-[#888] text-xs mb-1 font-['Barlow_Condensed'] uppercase tracking-wide">Kenteken</div>
                <div className="font-['Barlow_Condensed'] font-bold">{motor.kenteken}</div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4">
            <div className="border border-[#E5E5E5] p-5">
              <h3 className="font-['Barlow_Condensed'] font-bold text-lg uppercase mb-4">Proefrit aanvragen</h3>
              <ProefritForm motorId={motor.id} motorNaam={motorNaam} />
            </div>

            <div className="border border-[#E5E5E5] p-5 space-y-3">
              <h3 className="font-['Barlow_Condensed'] font-bold text-lg uppercase mb-2">Direct contact</h3>
              <a href={`https://wa.me/31166606090?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-['Barlow_Condensed'] font-bold uppercase py-3 w-full hover:bg-[#20ba59] transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="tel:+31166606090"
                className="flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] font-['Barlow_Condensed'] font-bold uppercase py-3 w-full hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Phone size={16} /> 0166-606090
              </a>
            </div>

            <div className="bg-[#F5F5F5] p-4 text-sm border-l-4 border-[#E31E24]">
              <div className="font-['Barlow_Condensed'] font-bold uppercase text-xs mb-2 text-[#888]">Locatie</div>
              <div className="font-['Barlow_Condensed'] font-bold">Stevinweg 14</div>
              <div className="text-[#555]">4691 SM Tholen</div>
              <div className="text-[#888] text-xs mt-2">Wo – Vr: 10:00–12:00 en 13:00–17:30</div>
            </div>
          </div>
        </div>

        {vergelijkbaar.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#E5E5E5]">
            <h2 className="font-['Barlow_Condensed'] font-black text-3xl uppercase mb-6">Misschien ook interessant</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vergelijkbaar.map(m => <MotorCard key={m.id} motor={m} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
