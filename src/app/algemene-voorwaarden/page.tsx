import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | De Jonge Motoren',
  description: 'Algemene voorwaarden van De Jonge Motoren, motordealer in Tholen, Zeeland.',
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Juridisch</div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            Algemene Voorwaarden
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 text-[#444] leading-relaxed">
        <p className="text-[#888] text-sm mb-8">Versie 1.0 — Januari 2026</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 1 — Definities</h2>
        <p className="text-sm mb-4"><strong>De Jonge Motoren</strong>: de handelsnaam van de motordealer gevestigd aan Stevinweg 14, 4691 SM Tholen.</p>
        <p className="text-sm mb-4"><strong>Klant</strong>: de (rechts)persoon die een overeenkomst sluit met De Jonge Motoren.</p>
        <p className="text-sm mb-4"><strong>Voertuig</strong>: een motorfiets, scooter of bromfiets die onderwerp is van een koopovereenkomst of dienstverlening.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 2 — Toepasselijkheid</h2>
        <p className="text-sm mb-4">Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten van De Jonge Motoren, tenzij schriftelijk anders overeengekomen.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 3 — Aanbod en overeenkomst</h2>
        <p className="text-sm mb-4">Alle aanbiedingen op de website en in de showroom zijn vrijblijvend en geldig zolang de voorraad strekt. Een overeenkomst komt tot stand na schriftelijke bevestiging of ondertekening van een koopovereenkomst door beide partijen.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 4 — Proefrit</h2>
        <p className="text-sm mb-4">Een proefrit is vrijblijvend. De klant dient in het bezit te zijn van een geldig rijbewijs (categorie A of A2). De klant is aansprakelijk voor schade die tijdens de proefrit door zijn of haar toedoen ontstaat. De Jonge Motoren is niet aansprakelijk voor persoonlijk letsel tijdens een proefrit.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 5 — Prijs en betaling</h2>
        <p className="text-sm mb-4">Alle prijzen zijn inclusief btw, tenzij anders vermeld. Betaling dient te geschieden bij aflevering, tenzij schriftelijk anders overeengekomen. Bij niet-tijdige betaling is de klant de wettelijke rente verschuldigd.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 6 — Levering en risico</h2>
        <p className="text-sm mb-4">Levering vindt plaats op het moment van betaling en afgifte van het voertuig. Het risico gaat op dat moment over op de klant.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 7 — Garantie op occasions</h2>
        <p className="text-sm mb-4">Op gebruikte voertuigen geldt geen wettelijke garantie, tenzij schriftelijk anders overeengekomen. Wij beschrijven elk voertuig zo volledig en eerlijk mogelijk. Gebreken die bij bezichtiging redelijkerwijs zichtbaar waren, vallen niet onder garantie.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 8 — Aansprakelijkheid</h2>
        <p className="text-sm mb-4">De aansprakelijkheid van De Jonge Motoren is beperkt tot de factuurwaarde van de betreffende transactie. Wij zijn niet aansprakelijk voor gevolgschade.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 9 — Geschillen</h2>
        <p className="text-sm mb-4">Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Zeeland-West-Brabant.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">Artikel 10 — Contact</h2>
        <p className="text-sm">De Jonge Motoren · Stevinweg 14 · 4691 SM Tholen · 0166-606090 · info@dejongemotoren.nl</p>
      </div>
    </div>
  );
}
