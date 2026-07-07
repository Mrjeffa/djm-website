import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacyverklaring | De Jonge Motoren',
  description: 'Privacyverklaring van De Jonge Motoren. Hoe wij omgaan met uw persoonsgegevens.',
};

export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-[#0A0A0A] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[4px] text-[#E31E24] mb-2">Juridisch</div>
          <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            Privacyverklaring
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-sm text-[#444] leading-relaxed">
        <p className="text-[#888] text-sm mb-8">Laatst bijgewerkt: 1 januari 2026</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">1. Wie zijn wij?</h2>
        <p>
          De Jonge Motoren is een motordealer gevestigd aan de Stevinweg 14, 4691 SM Tholen, Nederland.
          KvK-nummer: [in te vullen]. E-mail: info@dejongemotoren.nl. Telefoon: 0166-606090.
        </p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">2. Welke gegevens verzamelen wij?</h2>
        <p>Wij verzamelen de volgende persoonsgegevens wanneer u een formulier invult op onze website:</p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>Naam</li>
          <li>Telefoonnummer</li>
          <li>E-mailadres (optioneel)</li>
          <li>Gewenste afspraakdatum</li>
          <li>Informatie over uw motor (bij taxatieaanvragen)</li>
        </ul>
        <p>Wij plaatsen alleen functionele cookies die noodzakelijk zijn voor het goed functioneren van de website. Met uw toestemming plaatsen wij ook analytische cookies.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">3. Waarvoor gebruiken wij uw gegevens?</h2>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li>Om contact met u op te nemen naar aanleiding van uw aanvraag</li>
          <li>Om een afspraak in te plannen voor een proefrit of servicebeurt</li>
          <li>Om een taxatieaanvraag te verwerken</li>
        </ul>
        <p>Wij gebruiken uw gegevens niet voor marketingdoeleinden zonder uw toestemming en delen uw gegevens niet met derden, tenzij dit wettelijk verplicht is.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">4. Hoe lang bewaren wij uw gegevens?</h2>
        <p>Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor zij zijn verzameld. Afspraakgegevens worden maximaal 2 jaar bewaard.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">5. Uw rechten</h2>
        <p>Op grond van de AVG heeft u de volgende rechten:</p>
        <ul className="list-disc pl-5 space-y-1 my-3">
          <li><strong>Recht op inzage</strong> — U kunt opvragen welke gegevens wij van u hebben.</li>
          <li><strong>Recht op rectificatie</strong> — U kunt onjuiste gegevens laten corrigeren.</li>
          <li><strong>Recht op verwijdering</strong> — U kunt verzoeken uw gegevens te verwijderen.</li>
          <li><strong>Recht op bezwaar</strong> — U kunt bezwaar maken tegen verwerking van uw gegevens.</li>
        </ul>
        <p>Om gebruik te maken van deze rechten kunt u contact opnemen via info@dejongemotoren.nl.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">6. Beveiliging</h2>
        <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen. Uw gegevens worden opgeslagen op beveiligde servers van Supabase (ISO 27001 gecertificeerd), gevestigd in de Europese Unie.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">7. Cookies</h2>
        <p>Onze website gebruikt functionele cookies voor de werking van de website. Bij uw toestemming gebruiken wij ook analytische cookies (Google Analytics of vergelijkbaar) om het gebruik van onze website te meten. U kunt uw toestemming te allen tijde intrekken via de cookieinstellingen.</p>

        <h2 className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">8. Contact en klachten</h2>
        <p>
          Voor vragen over deze privacyverklaring kunt u contact opnemen via info@dejongemotoren.nl of 0166-606090.
          U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens (AP) via <strong>autoriteitpersoonsgegevens.nl</strong>.
        </p>
      </div>
    </div>
  );
}
