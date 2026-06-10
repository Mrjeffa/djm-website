import { notFound } from 'next/navigation';
export const runtime = 'edge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const posts: Record<string, { titel: string; datum: string; leestijd: string; categorie: string; inhoud: string }> = {
  'welke-motor-voor-beginners': {
    titel: 'Welke motor is geschikt voor beginners in 2026?',
    datum: '3 juni 2026',
    leestijd: '5 min',
    categorie: 'Koopadvies',
    inhoud: `
Je hebt net je rijbewijs gehaald. Gefeliciteerd — nu begint het echte werk: een motor kiezen. Met een A2-rijbewijs heb je max. 35 kW (48 pk) en mag de motor niet zwaarder zijn dan 0,2 kW/kg. Dat klinkt beperkend, maar er zijn uitstekende motoren in deze categorie.

## De beste A2-motoren in 2026

**Honda CB500F / CB500X**
De meest gekozen beginnersmotoren van Nederland. Betrouwbaar, goedkoop in onderhoud, en er zijn er veel van in de occasionmarkt. De CB500F is de naked versie, de CB500X heeft een avontuurlijker karakter.

**Kawasaki Z650RS**
Iets sportiever dan de Honda. Retro-design, goede rijeigenschappen. Populair bij rijders die iets eigens willen.

**Yamaha MT-03**
Kleiner en lichter. Perfecte stadsmachine. Minder geschikt voor lange ritten, maar geweldig voor wie dagelijks in de file staat.

## Waar je op moet letten

- **Km-stand:** onder de 20.000 km is ideaal voor een eerste motor
- **Bouwjaar:** 3-5 jaar oud is de sweet spot — afgeschreven maar nog modern
- **Servicehistorie:** vraag altijd naar de stempels in het boekje
- **A2-geschikt:** check altijd of de motor in originele A2-staat is, of correct beperkt is

## Ons advies

Kies geen motor omdat hij mooi is. Kies een motor die bij je rijstijl past. Ga je elke dag naar je werk? Neem een naked bike. Wil je weekenden op de hei? Dan is een adventure meer jouw ding. En kom gewoon langs voor een proefrit — je weet het pas als je rijdt.
    `.trim(),
  },
  'honda-vs-kawasaki-occasion': {
    titel: 'Honda CB500 vs Kawasaki Z650: welke occasion kies jij?',
    datum: '18 mei 2026',
    leestijd: '7 min',
    categorie: 'Vergelijking',
    inhoud: `
Twee van de populairste naked bikes in het occasion-segment. Beide betaalbaar, beide betrouwbaar. Maar ze zijn niet hetzelfde.

## Honda CB500F

De CB500F is de veilige keuze. Honda-kwaliteit, bewezen betrouwbaarheid, lage onderhoudskosten. Ideaal voor wie gewoon een goede motor wil zonder gedoe. Nadeel: hij is niet bijzonder opwindend.

**Prijs occasion (2020-2022):** €4.500 – €6.500

## Kawasaki Z650

De Z650 heeft meer karakter. Meer vermogen, agressiever design, beter gevoel bij hogere snelheden. Nadeel: iets duurder in onderhoud en minder geschikt voor A2.

**Prijs occasion (2020-2022):** €6.000 – €8.000

## De conclusie

Kies de **Honda** als je wilt leren rijden en geen verrassingen wilt. Kies de **Kawasaki** als je al wat ervaring hebt en meer motor wil.
    `.trim(),
  },
  'motorverzekering-kosten-2026': {
    titel: 'Wat kost een motorverzekering in 2026?',
    datum: '2 mei 2026',
    leestijd: '4 min',
    categorie: 'Verzekering',
    inhoud: `
Een motor kopen is één ding. Hem verzekeren is iets anders. Wat kun je verwachten?

## WA (wettelijke aansprakelijkheid)

De minimaal verplichte verzekering. Dekt schade aan anderen — niet aan jouw motor. Kosten: **€15 – €40 per maand**, afhankelijk van leeftijd en no-claimhistorie.

## WA + beperkt casco

Dekt ook diefstal, brand en weersschade. Populaire middenweg. Kosten: **€30 – €70 per maand**.

## Allrisk (volledig casco)

Dekt alles, ook eigen schuld. Alleen zinvol bij een nieuwe of dure motor. Kosten: **€60 – €150 per maand**.

## Tips om premie te verlagen

- Vergelijk via een vergelijkingssite
- Kies een hogere eigen risico
- Bouw no-claimkorting op via een WA-verzekering
- Sommige verzekeraars geven korting voor seizoensverzekering (alleen zomer)

## Advies

Voor een occasion motor van €5.000 – €8.000 is WA + beperkt casco vrijwel altijd de beste keuze. Allrisk is zelden de moeite waard voor een motor ouder dan 5 jaar.
    `.trim(),
  },
  'motor-onderhoud-zelf-doen': {
    titel: '5 onderhoudstaken die je zelf kunt doen aan je motor',
    datum: '14 april 2026',
    leestijd: '6 min',
    categorie: 'Onderhoud',
    inhoud: `
Je hoeft niet altijd naar de dealer. Met wat basiskennis bespaar je geld en leer je je motor beter kennen.

## 1. Bandenspanning controleren

Doe dit elke twee weken. Te lage spanning: meer slijtage en brandstofverbruik. Te hoge spanning: minder grip. De juiste druk staat in je instructieboekje of op de kettingkast.

## 2. Kettingspanning en smering

Een te losse ketting springt eraf. Een te strakke ketting slijt sneller. Controleer elke 500 km. Smeer elke 300-500 km met kettingspray.

## 3. Oliepeil checken

Voor elke rit even kijken. Motor op standaard, wacht tot de olie bezakt, check het kijkglaasje. Tussen MIN en MAX is goed.

## 4. Rem- en koplampen

Wettelijk verplicht dat ze werken. Controleer ze elke maand. Vervangen is eenvoudig en goedkoop.

## 5. Luchtfilter reinigen

Eén keer per seizoen. Een verstopt filter kost vermogen en brandstof. Foam-filters kun je zelf reinigen, papieren filters vervang je.

## Wat je beter aan een monteur overlaat

- Remvloeistof vervangen
- Kleppen stellen
- Carburateur of injectie afstellen
- Banden wisselen

Voor alles wat je niet zeker weet: breng hem gewoon langs. Beter een vraag te veel dan een kapotte motor.
    `.trim(),
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: 'Artikel niet gevonden' };
  return {
    title: `${post.titel} | De Jonge Motoren Blog`,
    description: post.inhoud.slice(0, 155) + '...',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center gap-1 text-[#888] text-sm mb-8 hover:text-[#E31E24] transition-colors">
        <ArrowLeft size={14} /> Terug naar blog
      </Link>

      <div className="flex items-center gap-2 mb-4">
        <span className="font-['Barlow_Condensed'] text-[10px] font-bold uppercase tracking-[2px] text-[#E31E24]">{post.categorie}</span>
        <span className="text-[#E5E5E5]">·</span>
        <span className="text-[#888] text-xs">{post.leestijd} lezen</span>
        <span className="text-[#E5E5E5]">·</span>
        <span className="text-[#888] text-xs">{post.datum}</span>
      </div>

      <h1 className="font-['Barlow_Condensed'] font-black text-4xl uppercase leading-tight mb-8">{post.titel}</h1>

      <div className="prose prose-sm max-w-none text-[#444] leading-relaxed space-y-4">
        {post.inhoud.split('\n\n').map((block, i) => {
          if (block.startsWith('## ')) {
            return <h2 key={i} className="font-['Barlow_Condensed'] font-black text-2xl uppercase mt-8 mb-3 text-[#1A1A1A]">{block.slice(3)}</h2>;
          }
          if (block.startsWith('**') && block.includes('**\n')) {
            const [bold, ...rest] = block.split('\n');
            return <div key={i}><strong className="font-['Barlow_Condensed'] font-bold text-[#1A1A1A]">{bold.replace(/\*\*/g, '')}</strong><br />{rest.join(' ')}</div>;
          }
          return <p key={i}>{block.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
        })}
      </div>

      <div className="mt-12 bg-[#F5F5F5] border-l-4 border-[#E31E24] p-6">
        <div className="font-['Barlow_Condensed'] font-bold uppercase mb-2">Interesse in een motor?</div>
        <p className="text-sm text-[#888] mb-4">Bekijk het actuele aanbod of neem direct contact op.</p>
        <Link href="/aanbod" className="inline-flex items-center gap-1 bg-[#E31E24] text-white font-['Barlow_Condensed'] font-bold uppercase px-5 py-2.5 text-sm hover:bg-[#c01920] transition-colors">
          Bekijk aanbod
        </Link>
      </div>
    </div>
  );
}
