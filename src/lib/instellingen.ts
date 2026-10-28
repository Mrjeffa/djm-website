// Client-safe: geen server imports

export type DagCode = 'ma' | 'di' | 'wo' | 'do' | 'vr' | 'za' | 'zo';

export const DAG_LABELS: Record<DagCode, string> = {
  ma: 'Maandag', di: 'Dinsdag', wo: 'Woensdag',
  do: 'Donderdag', vr: 'Vrijdag', za: 'Zaterdag', zo: 'Zondag',
};

export const DAG_SCHEMA: Record<DagCode, string> = {
  ma: 'Monday', di: 'Tuesday', wo: 'Wednesday',
  do: 'Thursday', vr: 'Friday', za: 'Saturday', zo: 'Sunday',
};

export const DAG_VOLGORDE: DagCode[] = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];

export const JS_DAY_TO_CODE: Record<number, DagCode> = {
  0: 'zo', 1: 'ma', 2: 'di', 3: 'wo', 4: 'do', 5: 'vr', 6: 'za',
};

export type OpeningsDag = { open: string | null; sluit: string | null; gesloten: boolean };

export type DienstGroep = { label: string; items: { naam: string; duur: number }[] };

export type WebsiteContent = {
  hero_regel1: string;
  hero_regel2: string;
  hero_ondertitel: string;
  service_intro: string;
  footer_tagline: string;
  over_ons_intro: string;
  proefrit_intro: string;
  inkoop_ondertitel: string;
};

export type Instellingen = {
  openingstijden: Record<DagCode, OpeningsDag>;
  gesloten_dagen: string[];
  gesloten_weken: string[];
  max_afspraken_per_dag: number;
  opmerking: string;
  tarieven: Record<string, number>;
  diensten: DienstGroep[];
  content: WebsiteContent;
};

export const CONTENT_FALLBACK: WebsiteContent = {
  hero_regel1: 'Jouw vrijheid.',
  hero_regel2: 'Vind hem hier.',
  hero_ondertitel: 'Occasion motoren kopen, je motor verkopen of laten onderhouden. Eerlijk geprijsd en met persoonlijk advies.',
  service_intro: 'Nieuwe klant en moet je motor onderhouden of gerepareerd worden? Vul het formulier in, dan plannen we een afspraak met je in.',
  footer_tagline: 'Motorzaak in Tholen, Zeeland. Al 25 jaar occasions, inkoop en werkplaats onder één dak.',
  over_ons_intro: 'We nemen De Jonge Motoren over: 25 jaar reputatie en dezelfde eerlijke aanpak.',
  proefrit_intro: 'Een motor koop je niet op basis van foto\'s. Kom langs, rij hem en voel of hij bij je past.',
  inkoop_ondertitel: 'Vrijblijvende taxatie, eerlijke prijs en snelle afhandeling.',
};

export const INSTELLINGEN_FALLBACK: Instellingen = {
  openingstijden: {
    ma: { open: null, sluit: null, gesloten: true },
    di: { open: null, sluit: null, gesloten: true },
    wo: { open: '09:00', sluit: '17:00', gesloten: false },
    do: { open: '09:00', sluit: '17:00', gesloten: false },
    vr: { open: '09:00', sluit: '17:00', gesloten: false },
    za: { open: '10:00', sluit: '16:00', gesloten: false },
    zo: { open: null, sluit: null, gesloten: true },
  },
  gesloten_dagen: [],
  gesloten_weken: [],
  max_afspraken_per_dag: 5,
  opmerking: '',
  tarieven: {},
  diensten: [],
  content: CONTENT_FALLBACK,
};

export function isDateGesloten(dateStr: string, inst: Instellingen): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr + 'T12:00:00');
  const dag = JS_DAY_TO_CODE[date.getDay()];
  if (inst.openingstijden[dag]?.gesloten) return `Op ${DAG_LABELS[dag].toLowerCase()} zijn we gesloten. Kies een andere dag.`;
  if (inst.gesloten_dagen.includes(dateStr)) return 'Op die datum zijn we gesloten. Kies een andere dag.';
  return null;
}

export function formatOpeningsTijden(inst: Instellingen): { label: string; waarde: string; gesloten: boolean }[] {
  const result: { label: string; waarde: string; gesloten: boolean }[] = [];
  let i = 0;
  while (i < DAG_VOLGORDE.length) {
    const tijden = inst.openingstijden[DAG_VOLGORDE[i]];
    if (!tijden) { i++; continue; }
    let j = i + 1;
    while (
      j < DAG_VOLGORDE.length &&
      inst.openingstijden[DAG_VOLGORDE[j]]?.gesloten === tijden.gesloten &&
      (tijden.gesloten || (
        inst.openingstijden[DAG_VOLGORDE[j]]?.open === tijden.open &&
        inst.openingstijden[DAG_VOLGORDE[j]]?.sluit === tijden.sluit
      ))
    ) j++;
    const groep = DAG_VOLGORDE.slice(i, j);
    const label = groep.length === 1
      ? DAG_LABELS[groep[0]]
      : `${DAG_LABELS[groep[0]]} t/m ${DAG_LABELS[groep[groep.length - 1]].toLowerCase()}`;
    result.push({ label, waarde: tijden.gesloten ? 'Gesloten' : `${tijden.open} – ${tijden.sluit}`, gesloten: tijden.gesloten });
    i = j;
  }
  return result;
}

export function vandaagStatus(inst: Instellingen, nu = new Date()): string {
  const local = new Date(nu.toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' }));
  const code = JS_DAY_TO_CODE[local.getDay()];
  const t = inst.openingstijden[code];
  const iso = local.toLocaleDateString('sv-SE');
  const hm = local.toTimeString().slice(0, 5);
  const openVandaag = t && !t.gesloten && t.open && t.sluit && !inst.gesloten_dagen.includes(iso);
  if (openVandaag && hm < t.open!) return `Vandaag open vanaf ${t.open}`;
  if (openVandaag && hm < t.sluit!) return `Nu open tot ${t.sluit}`;

  for (let k = 1; k <= 7; k++) {
    const d = DAG_VOLGORDE[(DAG_VOLGORDE.indexOf(code) + k) % 7];
    const v = inst.openingstijden[d];
    if (v && !v.gesloten && v.open) {
      return `Nu gesloten. ${k === 1 ? 'Morgen' : DAG_LABELS[d]} open vanaf ${v.open}`;
    }
  }
  return 'Nu gesloten';
}

export function tarief(inst: Instellingen, key: string): number | null {
  const v = inst.tarieven[key];
  return typeof v === 'number' && v > 0 ? v : null;
}

export function euro(n: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}
