export type BlogPost = {
  slug: string;
  titel: string;
  beschrijving: string;
  gepubliceerd: string;
  bijgewerkt: string;
  leestijd: number;
  categorie: string;
  inhoud: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'welke-motor-voor-beginners',
    titel: 'Welke motor is geschikt voor beginners?',
    beschrijving: 'Net je A2- of A-rijbewijs gehaald? Dit zijn populaire beginnersmotoren en de punten waar je op let bij een eerste occasion.',
    gepubliceerd: '2026-06-03',
    bijgewerkt: '2026-10-28',
    leestijd: 5,
    categorie: 'Koopadvies',
    inhoud: `
Een goede eerste motor is licht, voorspelbaar en past bij je rijbewijs. Met een A2-rijbewijs rijd je een motor van maximaal 35 kW met een vermogen-gewichtsverhouding van maximaal 0,2 kW per kilo. Een begrensde motor mag oorspronkelijk niet meer dan 70 kW hebben gehad.

## Populaire beginnersmotoren

**Honda CB500F en CB500X**
Twee veelgekozen motoren voor beginners. Ze zijn betrouwbaar, zuinig en goedkoop in onderhoud, en er zijn er veel van te koop als occasion. De CB500F is een naked bike, de CB500X heeft een avontuurlijkere zit.

**Kawasaki Z650 en Z650RS**
Iets sportiever dan de Honda. De Z650RS heeft een retro-uiterlijk, de Z650 een moderner design. Beide zijn er in een A2-versie.

**Yamaha MT-03**
Kleiner en lichter, met een lage zithoogte. Fijn in de stad en voor rijders die een lichte motor willen.

## Waar let je op bij een eerste occasion?

- **Kilometerstand:** een motor met weinig kilometers en goed onderhoud is een veilige keuze.
- **Onderhoudshistorie:** vraag naar het onderhoudsboekje en facturen.
- **A2-status:** controleer of de motor af fabriek A2 is of correct is begrensd, met de papieren erbij.
- **Banden en ketting:** versleten banden of een uitgerekte ketting zijn extra kosten na de aankoop.

## Ons advies

Kies een motor die past bij hoe je rijdt. Rijd je vooral korte stukken en woon-werkverkeer, dan is een naked bike prettig. Wil je toeren met bagage, kijk dan naar een adventure of tourer. Maak altijd een proefrit, want pas op de motor merk je of de zithouding en het vermogen bij je passen. Bekijk de [occasions](/occasions) of [plan een proefrit](/proefrit).
    `.trim(),
  },
  {
    slug: 'honda-vs-kawasaki-occasion',
    titel: 'Honda CB500F of Kawasaki Z650: welke occasion kies je?',
    beschrijving: 'Twee populaire middenklasse naked bikes vergeleken: karakter, onderhoud, A2-geschiktheid en voor welk type rijder ze passen.',
    gepubliceerd: '2026-05-18',
    bijgewerkt: '2026-10-28',
    leestijd: 4,
    categorie: 'Vergelijking',
    inhoud: `
De Honda CB500F en de Kawasaki Z650 zijn allebei betaalbare, betrouwbare naked bikes. Het verschil zit in het karakter: de Honda is rustig en voorspelbaar, de Kawasaki levendiger.

## Honda CB500F

De CB500F heeft een tweecilinder van 471 cc en is af fabriek A2-geschikt. De motor staat bekend om zijn betrouwbaarheid en lage onderhoudskosten. Hij is ideaal als je wilt leren rijden zonder verrassingen. Rijders die meer pit zoeken, vinden hem soms wat braaf.

## Kawasaki Z650

De Z650 heeft een tweecilinder van 649 cc en meer vermogen. Hij voelt sportiever aan en trekt beter door bij hogere snelheden. Er is een A2-versie, en later kun je de begrenzing laten verwijderen als je je A-rijbewijs hebt.

## Welke past bij jou?

Kies de **Honda** als je net begint en een rustige, zuinige motor wilt. Kies de **Kawasaki** als je wat ervaring hebt of een motor zoekt waar je langer plezier van hebt na je A-rijbewijs. Rijd ze allebei als het kan: het verschil voel je direct. Bekijk welke modellen nu in de [occasions](/occasions) staan.
    `.trim(),
  },
  {
    slug: 'motorverzekering-kosten',
    titel: 'Wat kost een motorverzekering?',
    beschrijving: 'WA, beperkt casco of allrisk: wat dekt elke motorverzekering, waar hangt de premie van af en welke dekking past bij een occasion?',
    gepubliceerd: '2026-05-02',
    bijgewerkt: '2026-10-28',
    leestijd: 4,
    categorie: 'Verzekering',
    inhoud: `
De premie van een motorverzekering hangt af van je leeftijd, schadevrije jaren, woonplaats, de waarde van de motor en de dekking die je kiest. Vraag daarom altijd een paar offertes op. Hieronder staan de drie soorten dekking.

## WA (wettelijke aansprakelijkheid)

WA is verplicht. Deze verzekering dekt schade die je met je motor aan anderen toebrengt, maar niet de schade aan je eigen motor. WA is de goedkoopste dekking.

## WA met beperkt casco

Beperkt casco dekt ook diefstal, brand, storm en ruitschade aan je eigen motor. Voor veel occasions is dit een goede middenweg.

## Allrisk (volledig casco)

Allrisk dekt ook schade aan je eigen motor als je zelf een ongeluk veroorzaakt. Dat is vooral zinvol bij een nieuwe of dure motor.

## Tips om premie te besparen

- Vergelijk een paar verzekeraars.
- Kies een hoger eigen risico.
- Bouw schadevrije jaren op.
- Vraag naar een seizoensverzekering als je alleen in de zomer rijdt.

## Welke dekking past bij een occasion?

Voor een gebruikte motor van een paar jaar oud kiezen veel rijders WA met beperkt casco. Bij een jonge, dure motor kan allrisk de moeite waard zijn. Twijfel je, laat je dan adviseren door je verzekeraar.
    `.trim(),
  },
  {
    slug: 'motor-onderhoud-zelf-doen',
    titel: '5 onderhoudstaken die je zelf aan je motor kunt doen',
    beschrijving: 'Bandenspanning, ketting, olie, verlichting en luchtfilter: dit kun je zelf controleren, en dit laat je beter aan de werkplaats over.',
    gepubliceerd: '2026-04-14',
    bijgewerkt: '2026-10-28',
    leestijd: 5,
    categorie: 'Onderhoud',
    inhoud: `
Met wat basiskennis houd je je motor tussen twee beurten door zelf in goede conditie. Je leert je motor beter kennen en ziet problemen eerder aankomen.

## 1. Bandenspanning controleren

Controleer de bandenspanning om de paar weken en voor een lange rit. Te lage spanning geeft meer slijtage en een zwaarder stuurgedrag, te hoge spanning minder grip. De juiste waarden staan in het instructieboekje of op een sticker op de motor.

## 2. Ketting spannen en smeren

Een te losse ketting slaat en kan eraf lopen, een te strakke ketting slijt sneller. Controleer de speling regelmatig en smeer de ketting na een regenrit of volgens het advies van de fabrikant.

## 3. Oliepeil controleren

Zet de motor rechtop, wacht tot de olie is gezakt en lees het peil af via het kijkglas of de peilstok. Het peil hoort tussen MIN en MAX te staan.

## 4. Verlichting nalopen

Koplamp, achterlicht, remlicht en richtingaanwijzers moeten werken. Loop ze regelmatig na; een lampje vervangen is meestal eenvoudig.

## 5. Luchtfilter reinigen of vervangen

Een vuil luchtfilter kost vermogen en brandstof. Een schuimfilter kun je reinigen, een papieren filter vervang je.

## Wat laat je aan de werkplaats over?

- Remvloeistof vervangen
- Kleppen stellen
- Injectie of carburateur afstellen
- Banden monteren en balanceren

Twijfel je, laat het dan nakijken. De [werkplaats van De Jonge Motoren](/werkplaats) helpt je verder.
    `.trim(),
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug) ?? null;
}

export function datumNL(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
}
